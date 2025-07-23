# What is a liquidity pool?

>  What is a liquidity pool?

Uniswap hoạt động không giống sàn tập trung (CEX). Nó không có order book. Thay vào đó, nó dùng một thứ gọi là liquidity pool nơi mà người dùng ( liquidity provider) đổ cả ETH và token vào để người khác swap qua lại.


## Liquidity Pool là gì?

`Liquidity Pool (LP)` là một smart contract chứa hai loại tài sản (vd: ETH và DAI). Ai cũng có thể swap qua lại giữa 2 token này trong pool, không cần order book, không cần matching engine.

## LP Token là gì?

Khi  thêm thanh khoản vào pool, Uniswap sẽ mint ra `LP token` để chứng nhận rằng:

> “You now own a piece of the pool, homie.” 💸

LP token giống vé xác nhận quyền sở hữu. Tất nhiên LP cũng là token chuẩn ERC-20 nên bạn có thể chuyển nhượng, bán, farm, hoặc cầm đi thế chấp nếu protocol nào đó cho phép.

> ‼️ Nếu bạn chuyển LP token cho người khác, tức là bạn đã chuyển quyền sở hữu pool cho họ luôn. Họ có thể rút ETH và token ra thay bạn 🫠

# Ai là Liquidity Provider (LP-er)?

Là người chơi chịu bỏ ETH và token (cùng giá trị) vào pool. Khi swapper swap token trong pool → LP-er nhận được phí giao dịch (0.3%/swap trên V1).

```solidity
/**
 * @notice Remove liquidity, burn LP tokens, and retrieve ETH and tokens proportionally
 * @param amount The amount of LP tokens to burn
 * @param min_eth The minimum amount of ETH expected to receive
 * @param min_tokens The minimum amount of tokens expected to receive
 * @param deadline The transaction deadline (timestamp)
 * @return The actual amounts of ETH and tokens withdrawn
 */
function removeLiquidity(
    uint256 amount,
    uint256 min_eth,
    uint256 min_tokens,
    uint256 deadline
) external returns (uint256, uint256) {
    // Validate input parameters
    require(amount > 0, "Factory: INVALID_AMOUNT"); // LP token amount must be greater than 0
    require(deadline >= block.timestamp, "Factory: DEADLINE_EXCEEDED"); // Ensure the transaction hasn't expired

    // Get the total current liquidity
    uint256 totalLiquidity = totalSupply;
    require(totalLiquidity > 0, "Factory: EMPTY_LIQUIDITY"); // Ensure there is liquidity in the pool

    // Calculate the amount of ETH and tokens to return proportionally
    uint256 tokenReserve = IERC20(token).balanceOf(address(this)); // Get the current token balance in the contract
    uint256 ethWithdrawn = (amount * address(this).balance) / totalLiquidity; // Proportional ETH to return
    uint256 tokenWithdrawn = (amount * tokenReserve) / totalLiquidity; // Proportional token to return

    // Ensure the returned amounts meet the minimum expected values (to prevent slippage)
    require(ethWithdrawn >= min_eth, "Factory: ETH_UNDERFLOW");
    require(tokenWithdrawn >= min_tokens, "Factory: TOKEN_UNDERFLOW");

    // Burn the user's LP tokens using inherited _burn function
    _burn(msg.sender, amount);

    // Safely send ETH back to the user
    (bool success, ) = msg.sender.call{value: ethWithdrawn}("");
    require(success, "Factory: ETH_TRANSFER_FAILED"); // Ensure ETH transfer succeeds

    // Send tokens back to the user
    require(IERC20(token).transfer(msg.sender, tokenWithdrawn), "Factory: TOKEN_TRANSFER_FAILED");

    // Emit the RemoveLiquidity event
    emit RemoveLiquidity(msg.sender, ethWithdrawn, tokenWithdrawn);

    // Return the actual amounts of ETH and tokens withdrawn
    return (ethWithdrawn, tokenWithdrawn);
}
```

# Calculation principle of proportional extraction

Uniswap V1 sử dụng nguyên tắc cốt lõi là *phân phối theo tỷ lệ*:


Công thức tính:
* Số ETH có thể rút = (Số lượng LP token người dùng nắm / Tổng số LP token trong pool) × Tổng lượng ETH trong pool

> Số token có thể rút = (Số lượng LP token người dùng nắm / Tổng số LP token trong pool) × Tổng lượng token trong pool

Ví dụ cụ thể:

Giả sử trạng thái hiện tại của pool là:
* Tổng cộng có 1000 LP token
* Pool chứa 10 ETH
* Pool có 20,000 USDC
* Mình đang nắm 100 LP token (tức là chiếm 10% tổng pool)

Vậy mình có thể rút: 
* ETH: 100 ÷ 1000 × 10 = 1 ETH
* USDC: 100 ÷ 1000 × 20000 = 2000 USDC

> Cơ chế này đảm bảo rằng người cung cấp thanh khoản sẽ nhận lại lượng tài sản tương ứng với tỷ lệ đóng góp của mình, bao gồm cả phần phí giao dịch đã tích lũy trong quá khứ.


## ❓Tại sao phải hủy (burn) LP token?

Như đề cập ở trên, LP token là chứng chỉ thể hiện phần sở hữu của mình trong pool.

Khi  rút thanh khoản, LP token phải được tiêu hủy để đảm bảo tính toán phần trăm sở hữu còn lại của các LP khác là chính xác. Ngoài ra ngăn việc  LP token bị tái sử dụng sai mục đích.

>  Duy trì tỷ lệ giữa tổng LP token và tổng tài sản trong pool

## Slippage (Trượt giá) là gì?

Slippage là sự chênh lệch giữa giá bạn kỳ vọng và giá thực tế khi giao dịch được thực thi.
Khi bạn remove liquidity, slippage thường đến từ biến động giá đột ngột trong thời gian chờ giao dịch xác nhận.

## Cơ chế bảo vệ slippage hoạt động như thế nào?

1.	Bạn chọn mức slippage tolerance (ví dụ: 5%) trên Dapp
2.	Dapp sẽ tính toán trước min_eth và min_tokens dựa theo giá hiện tại và mức slippage đó
3.	Nếu lượng thực nhận thấp hơn mức tối thiểu → giao dịch sẽ bị revert (thất bại)