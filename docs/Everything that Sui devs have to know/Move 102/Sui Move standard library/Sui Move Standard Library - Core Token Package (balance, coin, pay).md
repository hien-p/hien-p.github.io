# Sui Move Standard Library - Core Token Package (balance, coin, pay)

This article analyzes the three core components of Sui Move tokens: balance (value storage layer), coin (token operation layer), and pay (payment abstraction layer). Through principle diagrams and code examples, the design principles of the three-layer architecture are revealed.

# 1. Module Description

| Modules     | Tiers                                        | Function                                                                 | Scenario                                                |
|-------------|----------------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------------|
| `sui::balance` | Value storage layer (underlying storage)     | Manage the mapping relationship **between addresses and token balances** | Balance query, token ownership verification             |
| `sui::coin`    | Token operation layer (basic operation)      | Focus on **the life cycle management of the token itself**, including: token creation, destruction and metadata management | Custom token issuance and token metadata maintenance    |
| `sui::pay`     | Payment abstraction layer (high-level encapsulation) | Provides **compound operations for token payment**, including: single or batch token splitting, merging, transfer, etc. | Batch transfer, split account logic, airdrop etc.       |


The balance.move: https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/balance.move

The Coin.move: https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/coin.move

The Pay.move: https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/pay.move

![](https://img.learnblockchain.cn/attachments/2025/06/KkT4imET685d6769f311e.png)


# 2. Method Description

## 2.1 `sui::balance`

| Classification     | Function Name     | Parameter                                   | Functional Description                                                      |
|--------------------|-------------------|---------------------------------------------|------------------------------------------------------------------------------|
| **Balance Operations** | `zero`             | No parameters                               | Create a balance object with a quantity of zero                             |
|                    | `value`            | `self: &Balance<T>`                         | Get the amount stored in the balance object                                 |
|                    | `join`             | `self: &mut Balance<T>, balance: Balance<T>`| Merge two balance objects                                                    |
|                    | `split`            | `self: &mut Balance<T>, value: u64`         | Separate the specified number of sub-balance objects from the balance object|
|                    | `withdraw_all`     | `self: &mut Balance<T>`                     | Withdraw all balances, remaining balance is 0                               |
|                    | `destroy_zero`     | `balance: Balance<T>`                       | Destroys the balance object with zero quantity                              |
| **Supply Operation** | `create_supply`    | `_: T`                                      | Create new supply for type T                                                |
|                    | `supply_value`     | `supply: &Supply<T>`                        | Get the value of supply                                                     |
|                    | `increase_supply`  | `self: &mut Supply<T>, value: u64`          | Increases the supply and creates a corresponding amount of balance          |
|                    | `decrease_supply`  | `self: &mut Supply<T>, balance: Balance<T>` | Destroy balances and reduce supply                                          |
|                    | `destroy_supply`   | `self: Supply<T>`                           | Destroys supply, preventing further minting and burning                     |


## 2.2 `sui::coin`

| Classification       | Function Name         | Parameter                                                                                      | Functional Description                                      |
|----------------------|-----------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| **Supply Operation** | `total_supply`        | `cap: &TreasuryCap<T>`                                                                         | Returns the total number of tokens in circulation           |
|                      | `treasury_into_supply`| `treasury: TreasuryCap<T>`                                                                      | Unpack TreasuryCap to obtain Supply (irreversible)          |
|                      | `supply_immut`        | `treasury: &TreasuryCap<T>`                                                                     | Get an immutable reference to the treasury’s Supply         |
|                      | `supply_mut`          | `treasury: &mut TreasuryCap<T>`                                                                 | Get a mutable reference to the treasury’s Supply            |
| **Balance Operations**| `value`               | `self: &Coin<T>`                                                                                | Get the value of the coin                                   |
|                      | `balance`             | `coin: &Coin<T>`                                                                                | Get an immutable reference to the coin’s balance            |
|                      | `balance_mut`         | `coin: &mut Coin<T>`                                                                            | Get a mutable reference to the coin’s balance               |
|                      | `from_balance`        | `balance: Balance<T>, ctx: &mut TxContext`                                                      | Wrap the balance into transferable coins                    |
|                      | `into_balance`        | `coin: Coin<T>`                                                                                 | Deconstruct coin wrapper and preserve balance               |
|                      | `take`                | `balance: &mut Balance<T>, value: u64, ctx: &mut TxContext`                                     | Withdraw coins of specified value from balance              |
|                      | `put`                 | `balance: &mut Balance<T>, coin: Coin<T>`                                                       | Add coins to balance                                        |
| **Token Operations** | `join`                | `self: &mut Coin<T>, c1: Coin<T>`                                                               | Merge two coins                                             |
|                      | `split`               | `self: &mut Coin<T>, split_amount: u64, ctx: &mut TxContext`                                    | Split the coin into two parts                               |
|                      | `divide_into_n`       | `self: &mut Coin<T>, n: u64, ctx: &mut TxContext`                                               | Divide coin equally into n–1 coins                         |
|                      | `zero`                | `ctx: &mut TxContext`                                                                           | Create a coin with zero value                               |
|                      | `destroy_zero`        | `c: Coin<T>`                                                                                    | Destroy coins with zero value                               |
|                      | `mint`                | `cap: &mut TreasuryCap<T>, value: u64, ctx: &mut TxContext`                                     | Mint coins of specified value                               |
|                      | `mint_balance`        | `cap: &mut TreasuryCap<T>, value: u64`                                                          | Mint a balance of specified value                           |
|                      | `burn`                | `cap: &mut TreasuryCap<T>, c: Coin<T>`                                                          | Destroy coins and reduce total supply                       |
|                      | `create_currency`     | `witness: T, decimals: u8, symbol: vector<u8>, name: vector<u8>, description: vector<u8>, icon_url: Option<u8>, ctx: &mut TxContext` | Create a new currency type               |
|                      | `mint_and_transfer`   | `c: &mut TreasuryCap<T>, amount: u64, recipient: address, ctx: &mut TxContext`                  | Mint coins and transfer to recipients                       |
| **Metadata Operations**| `update_name`       | `t_treasury: &mut TreasuryCap<T>, metadata: &mut CoinMetadata<T>, name: string::String`         | Update the name of the coin                                 |
|                      | `update_symbol`       | `t_treasury: &mut TreasuryCap<T>, metadata: &mut CoinMetadata<T>, symbol: ascii::String`        | Update coin symbol                                          |
|                      | `update_description`  | `t_treasury: &mut TreasuryCap<T>, metadata: &mut CoinMetadata<T>, description: string::String`  | Update coin description                                     |
|                      | `update_icon_url`     | `t_treasury: &mut TreasuryCap<T>, metadata: &mut CoinMetadata<T>, url: ascii::String`           | Update the coin icon URL                                    |
|                      | `get_decimals`        | `metadata: &CoinMetadata<T>`                                                                    | Get number of decimal places of the coin                   |
|                      | `get_name`            | `metadata: &CoinMetadata<T>`                                                                    | Get the name of the coin                                    |
|                      | `get_symbol`          | `metadata: &CoinMetadata<T>`                                                                    | Get the coin symbol                                         |
|                      | `get_description`     | `metadata: &CoinMetadata<T>`                                                                    | Get the description of the coin                             |
|                      | `get_icon_url`        | `metadata: &CoinMetadata<T>`                                                                    | Get the coin icon URL                                       |


## 2.3 `sui::coin` (Regulated currency & deny list functions)

| Classification       | Function Name                       | Parameter                                                                                                                              | Functional Description                                        |
|----------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **Create and Migrate** | `create_regulated_currency_v2`       | `witness: T, decimals: u8, symbol: vector<u8>, name: vector<u8>, description: vector<u8>, icon_url: Option<u8>, allow_global_pause: bool, ctx: &mut TxContext` | Creating a Currency with Regulatory Functions                  |
|                      | `migrate_regulated_currency_to_v2` | `deny_list: &mut DenyList, cap: DenyCap<T>, allow_global_pause: bool, ctx: &mut TxContext`                                             | Migrate regulated currency to v2                              |
| **Blacklist Operation** | `deny_list_v2_add`                 | `deny_list: &mut DenyList, _deny_cap: &mut DenyCapV2<T>, addr: address, ctx: &mut TxContext`                                           | Add an address to a deny list                                 |
|                      | `deny_list_v2_remove`              | `deny_list: &mut DenyList, _deny_cap: &mut DenyCapV2<T>, addr: address, ctx: &mut TxContext`                                           | Remove an address from the deny list                          |
|                      | `deny_list_v2_contains_current_epoch` | `deny_list: &DenyList, addr: address, ctx: &TxContext`                                                                                  | Check if current epoch's deny list contains the address       |
|                      | `deny_list_v2_contains_next_epoch` | `deny_list: &DenyList, addr: address`                                                                                                   | Check if next epoch's deny list contains the address          |
|                      | `deny_list_v2_enable_global_pause` | `deny_list: &mut DenyList, deny_cap: &mut DenyCapV2<T>, ctx: &mut TxContext`                                                           | Enable global pause                                           |
|                      | `deny_list_v2_disable_global_pause`| `deny_list: &mut DenyList, deny_cap: &mut DenyCapV2<T>, ctx: &mut TxContext`                                                           | Disable global pause                                          |
|                      | `deny_list_v2_is_global_pause_enabled_current_epoch` | `deny_list: &DenyList, ctx: &TxContext`                                                                         | Check if global pause is enabled for the current epoch        |
|                      | `deny_list_v2_is_global_pause_enabled_next_epoch`   | `deny_list: &DenyList`                                                                            | Check if global pause is enabled for the next epoch           |



## 2.4 `sui::pay`

| Classification | Function Name           | Parameter                                                                                   | Functional Description                                                    |
|----------------|-------------------------|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Transfer**   | `keep`                  | `c: Coin<T>, ctx: &TxContext`                                                               | Transfer coins to the sender of the current transaction                  |
| **Segmentation** | `split`               | `coin: &mut Coin<T>, split_amount: u64, ctx: &mut TxContext`                                | Split the coin into two parts, specify the split amount                  |
|                | `split_vec`             | `self: &mut Coin<T>, split_amounts: vector<u64>, ctx: &mut TxContext`                       | Split the coin into multiple coins, balances specified by a vector       |
|                | `split_and_transfer`    | `c: &mut Coin<T>, amount: u64, recipient: address, ctx: &mut TxContext`                     | Split specified amount of coins and send them to the recipient           |
|                | `divide_and_keep`       | `self: &mut Coin<T>, n: u64, ctx: &mut TxContext`                                           | Divide the coin into n–1 coins equally, and keep the remainder           |
| **Merge**      | `join`                  | `self: &mut Coin<T>, coin: Coin<T>`                                                         | Merge two coins (**deprecated**)                                         |
|                | `join_vec`              | `self: &mut Coin<T>, coins: vector<Coin<T>>`                                                | Merge all coins in the vector into the main coin                         |
|                | `join_vec_and_transfer` | `coins: vector<Coin<T>>, receiver: address`                                                 | Combine the coins in the vector and transfer them to the recipient       |


# 3. Example 

```
module cookbook::aig_token {
    use std::string::{Self, String};
    use std::ascii;
    use sui::coin::{Self, TreasuryCap};
    use sui::balance::{Self, Balance};
    use sui::url::{Self, Url};
    use sui::event;

    public struct EventMint has copy, drop {
        sender: address,
        amount: u64,
        coin_left: u64
    }

    public struct EventAirdrop has copy, drop {
        method: String,
        sender: address,
        amount: u64
    }

    public struct EventCoinMeta has copy, drop {
        decimals: u8,
        symbol: ascii::String,
        name: String,
        description: String,
        icon_url: Option<Url>,
    }

    public struct EventTotalSupply has copy, drop {
        total_supply: u64
    }

    public struct Vault has key {
        id: UID,
        balance: Balance<AIG_TOKEN>,
    }

    public struct AIG_TOKEN has drop {}

    fun init(
        witness: AIG_TOKEN,
        ctx: &mut TxContext
    ) {

        let decimals = 3;
        let symbol = b"AIG";
        let name = b"AIG Token";
        let description = b"AIG Token is a token that is used to incentivize the community to achieve the goals of the AI Goal.";
        let url = url::new_unsafe_from_bytes(b"https://ai-goal.vercel.app/");

        let (treasury_cap, metadata) = coin::create_currency<AIG_TOKEN>(
            witness,
            decimals,
            symbol,
            name,
            description,
            option::some(url),
            ctx
        );

        event::emit(
            EventCoinMeta {
                decimals: coin::get_decimals(&metadata),
                symbol: coin::get_symbol(&metadata),
                name: coin::get_name(&metadata),
                description: coin::get_description(&metadata),
                icon_url: option::some(url),
            }
        );

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, ctx.sender());

        transfer::share_object(
            Vault {
                id: object::new(ctx),
                balance: balance::zero(),
            }
        );
    }

    public(package) fun airdrop(
        vault: &mut Vault,
        amount: u64,
        method: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = ctx.sender();

        let mut balance_drop = balance::split(&mut vault.balance, amount);
        let coin_drop = coin::take(&mut balance_drop, amount, ctx);
        transfer::public_transfer(coin_drop, sender);
        balance::destroy_zero(balance_drop);

        event::emit(
            EventAirdrop {
                method: string::utf8(method),
                sender,
                amount,
            }
        );
    }

    public fun mint_balance(
        treasury_cap: &mut TreasuryCap<AIG_TOKEN>,
        vault: &mut Vault,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let balance_minted = coin::mint_balance(treasury_cap, amount);
        balance::join(&mut vault.balance, balance_minted);

        event::emit(
            EventMint {
                sender: ctx.sender(),
                amount: amount,
                coin_left: balance::value(&vault.balance)
            }
        );
    }

    #[allow(lint(self_transfer))]
    public fun mint_coin(
        treasury_cap: &mut TreasuryCap<AIG_TOKEN>,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let coin_minted = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin_minted, ctx.sender());

        coin::mint_and_transfer(
            treasury_cap,
            amount,
            ctx.sender(),
            ctx
        );

        event::emit(
            EventTotalSupply {
                total_supply: coin::total_supply(treasury_cap)
            }
        )
    }
}

```