

# Nội dung cho Module 4 - move 101 

# Objective 


* Giới thiệu các pattern phổ biến trong Sui Move. Ví dụ: capability pattern, module-based access control, event emission pattern.

* Học cách tích hợp nhiều module và quản lý các tương tác phức tạp giữa object


# Common Patterns to Watch Out for When Programming in Sui Move

Whether you’re building DeFi apps or other protocols on Sui, it’s crucial to perform rigorous security audits and thorough code testing during development—or before launching on Mainnet. Below are some common patterns that developers should be aware of.


# Don’t give a struct too many abilities; only assign the necessary ones

When defining custom structs in Move, it’s best not to grant overly broad abilities.

That means you should first think about **how the object will be used and assign it only the essential abilities to avoid unintended actions.**

**Over-assigning abilities in event structs**

For example, in `sui::event`, the `event` parameter only requires the copy and drop abilities—no more are needed.


```
module sui::event {
    public native fun emit<T: copy + drop>(event: T);
}
```

Consider the following struct, which serves as a parameter for events to hold key information. In this case, the `store` ability is unnecessary and can be omitted.


```
  /// Emitted when a new pool is created
  public struct PoolCreated has copy, store, drop {
      /// object ID of the newly created pool
      pool_id: ID,
      token_x_name: TypeName,
      token_y_name: TypeName,
  }

/// Emit the PoolCreated event
event::emit(PoolCreated { … });
```


> Suggestion: By removing the store ability, we can bring the struct in line with best practices.

```
/// Emitted when a new pool is created
struct PoolCreated has copy, drop {
    /// object ID of the newly created pool
    pool_id: ID,
    token_x_name: TypeName,
    token_y_name: TypeName,
}
```


**Flashloan Struct** Không nên cấp quá nhiều abilities. Đây là snippet từ một smart contract có feature flash loan:
-> 	loan() → cho user mượn một lượng tài sản lớn mà không cần collateral
-> 	repay() → user trả lại khoản vay


Nguyên tắc khi triển **khai flash loan trên Sui là** struct dùng để track khoản vay không được có abilities gì cả. Tại sao? Vì struct này được tạo ở method này và destroyed ở method khác, và tất cả phải xong trong một transaction duy nhất.

Nhìn vào ví dụ dưới đây, Receipt struct bị gán thừa abilities: store + drop. Sai lầm này có thể khiến repay() bị bỏ qua, và kết quả là tài sản user mượn có thể không bao giờ được trả lại 


```
/// A shared object offering flash loans to any buyer willing to pay `fee`.
struct FlashLender<phantom T> has key {
    id: UID,
    /// Coins available to be lent to prospective borrowers
    to_lend: Balance<T>,
    /// Number of `Coin<T>`'s that will be charged for the loan.
    /// In practice, this would probably be a percentage, but
    /// we use a flat fee here for simplicity.
    fee: u64,
}


struct Receipt<phantom T> has store, drop {
    /// ID of the flash lender object the debt holder borrowed from
    flash_lender_id: ID,
    /// Total amount of funds the borrower must repay: amount borrowed + the fee
    repay_amount: u64
}


/// Request a loan of `amount` from `lender`. The returned `Receipt<T>` "hot potato" ensures
/// that the borrower will call `repay(lender, ...)` later on in this tx.
/// Aborts if `amount` is greater that the amount that `lender` has available for lending.
public fun loan<T>(
    self: &mut FlashLender<T>, amount: u64, ctx: &mut TxContext
): (Coin<T>, Receipt<T>) {

let to_lend = &mut self.to_lend;
    assert!(balance::value(to_lend) >= amount, ELoanTooLarge);
    let loan = coin::take(to_lend, amount, ctx);
    let repay_amount = amount + self.fee;
    let receipt = Receipt { flash_lender_id: object::id(self), repay_amount };


    (loan, receipt)
}


/// Repay the loan recorded by `receipt` to `lender` with `payment`.
/// Aborts if the repayment amount is incorrect or `lender` is not the `FlashLender`
/// that issued the original loan.
public fun repay<T>(self: &mut FlashLender<T>, payment: Coin<T>, receipt: Receipt<T>) {
    let Receipt { flash_lender_id, repay_amount } = receipt;
    assert!(object::id(self) == flash_lender_id, ERepayToWrongLender);
    assert!(coin::value(&payment) == repay_amount, EInvalidRepaymentAmount);


    coin::put(&mut self.to_lend, payment)
}
```

> Solution: Remove Excess Abilities from Receipt Struct

To fix the issue, simply remove the store and drop abilities from the Receipt struct. The corrected struct should look like this:

```
struct Receipt<phantom T> {
    /// ID of the flash lender object the debt holder borrowed from
    flash_lender_id: ID,
    /// Total amount of funds the borrower must repay: amount borrowed + the fee
    repay_amount: u64,
}
```

Now, the struct has no extra abilities, ensuring the flash loan logic is safe: it is created and destroyed within the same transaction, and users cannot bypass repay().



# The metadata in Coin should be frozen
