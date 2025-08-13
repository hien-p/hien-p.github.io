---
title: "Deploy Smart Contract trên 0G Labs - Hướng dẫn chi tiết"
description: "Học cách deploy smart contract trên 0G Labs testnet. Từ setup môi trường đến deploy và test contract trên nền tảng modular blockchain cho AI."
keywords: "0G Labs, smart contract deployment, EVM, Solidity, Foundry, testnet, blockchain development"
author: "Harry Phan"
date: "2025-8-13"
tags: ["0G Labs", "Smart Contract", "Deployment", "EVM", "Solidity", "Web3"]
---

# How to deploy smart contract on 0G labs ?


# Cài đặt Foundry bằng Foundryup
Foundryup là một installer dành cho bộ công cụ Foundry, giúp bạn setup nhanh gọn. Cách làm như sau:

1.	Mở terminal rồi chạy lệnh này để tải Foundryup:

```
curl -L https://foundry.paradigm.xyz | bash
```

Sau đó, cài Foundry bằng lệnh:

```
foundryup
```

Khi cài xong, các tool quan trọng sẽ được setup tự động:
* forge
* cast
* anvil
* chisel


# Claim Faucet testnet 

Testnet hiện tại đã được nâng cấp lên Galileo. Trước khi deploy smart contract, bạn sẽ cần test token từ Galileo Faucet để chi trả gas fee.

## Bước 1: Cấu hình Wallet của bạn

Đảm bảo bạn đã cài một EVM-compatible wallet (ví dụ: MetaMask), sau đó thêm mạng Galileo vào wallet:

* Network Name: 0G-Galileo-Testnet
* RPC URL: https://evmrpc-testnet.0g.ai/
* Chain ID: 16601
* Currency Symbol: 0G
* Block Explorer: https://chainscan-galileo.0g.ai/

Sau khi thêm xong, wallet của bạn sẽ sẵn sàng kết nối với testnet để test smart contracts.


## Bước 2: Nhận Test Tokens

Truy cập [Galileo Faucet](https://faucet.0g.ai) và làm theo các bước:

1.	Connect X (Twitter) account của bạn
2.	Nhập địa chỉ wallet
3.	Hoàn thành captcha
4.	Nhấn “Request Tokens”

Lưu ý:
* Galileo Faucet giờ đã phân phối nhanh hơn và có chống bot tốt hơn
* Tokens này chỉ để test, không thể transferable.

Bạn có thể xem balance theo hai cách:

1.	Trong wallet (ví dụ: MetaMask), chuyển sang mạng Galileo
2.	Truy cập explorer: https://explorer.0g.ai và nhập địa chỉ wallet của bạn


# Viết và deploy **ERC20 token contract**

Trong phần này, chúng ta sẽ tạo một **minimal ERC20 token** tên là `MyToken`. Đây là điểm khởi đầu phổ biến để làm quen với on-chain dev workflow.

Bước 1: Mở terminal, tạo folder mới và chạy:
```
mkdir mytoken-foundry
cd mytoken-foundry
forge init --no-git
```

Lệnh này sẽ setup một **Foundry project cơ bản.**

Bước 2: Thêm OpenZeppelin Contracts

Vì Git chưa được init, ta sẽ thêm OpenZeppelin thủ công:
```
mkdir -p lib/openzeppelin-contracts
cd lib/openzeppelin-contracts
curl -L https://github.com/OpenZeppelin/openzeppelin-contracts/archive/refs/tags/v5.0.2.tar.gz | tar -xz --strip-components=1
cd ../..
```

Bước 3: Tạo file MyToken.sol

Trong src/, tạo file mới MyToken.sol với nội dung:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Dùng đường dẫn tương đối từ src/ tới lib/
import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(uint256 initialSupply) 
        ERC20("MyToken", "MTK") 
        Ownable(msg.sender) // Add initialOwner cho OpenZeppelin 5.x
    {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

* Constructor khởi tạo token với initialSupply.
* mint cho phép chủ sở hữu tạo thêm token khi cần.


Giờ sẽ dùng Foundry để compile, test (tuỳ chọn) và deploy lên testnet.

Bước 1: Compile Contract, trong thư mục gốc của dự án, chạy:

```
forge build 
```

Nếu thành công, bạn sẽ thấy thông báo và file output sẽ nằm trong out/, bao gồm **ABI và bytecode.**

Bước 2 (Tuỳ chọn): Chạy local tests

Bạn có thể skip bước này lúc đầu. Khi đã quen với Foundry, thử explore testing trong **test/** với:

```
forge test
```

Bước 3: Tạo Deploy Script, đảm bảo bạn đã có:

* Contract: `src/MyToken.sol`
* Script: `script/DeployMyToken.s.sol`

Nội dung deploy script:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { Vm } from "forge-std/Vm.sol";
import { MyToken } from "../src/MyToken.sol";

contract DeployMyToken is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        if (deployerPrivateKey == 0) {
            revert("PRIVATE_KEY environment variable not set or invalid");
        }

        uint256 initialSupply = 1_000_000 * 10**18; // 1 triệu token, 18 decimals

        console.log("Deployer address:", vm.addr(deployerPrivateKey));

        vm.startBroadcast(deployerPrivateKey);

        MyToken myToken = new MyToken(initialSupply);

        vm.stopBroadcast();

        console.log("MyToken deployed to:", address(myToken));
    }
}
```

Bước 4: Thiết lập Environment Variable. Tạo file .env trong project root, thêm private key test wallet:

```
PRIVATE_KEY=0xYourPrivateKey
```

Bước 5: Deploy lên 0G Galileo. Chạy deploy script:

```
forge script script/DeployMyToken.s.sol:DeployMyToken \
  --rpc-url https://evmrpc-testnet.0g.ai/ \
  --broadcast \
  --legacy
```

Nếu thành công, terminal sẽ hiển thị **transaction hash, contract address, và confirmation status.**


Sau khi deploy contract, bước quan trọng là verify kết quả—kiểm tra transaction, xác nhận contract address, và đảm bảo token của bạn đã live. Hãy dùng những công cụ blockchain cơ bản sau:

Bước 1: Lưu thông tin deploy. Khi deploy thành công, terminal sẽ hiển thị ví dụ:

```
✅ [Success] Hash: 0x04b2f32f...
Contract Address: 0x6Ce2039f...
Block: 4178624
Paid: 0.00000067 ETHs
```

* Contract Address (ví dụ: 0x6Ce2039f…)
* Transaction Hash (ví dụ: 0x04b2f32f…)


Bước 2: Dùng 0G Explorer

Truy cập https://explorer.0g.ai và paste:
* Wallet address → Xem balance & transactions
* Contract address → Xem deployment details (và code nếu được support)
* Transaction hash → Kiểm tra status, gas fee, logs, và kết quả


Bước 3: Kiểm tra Token trong Wallet

Vì đây là ERC20 custom, token sẽ không tự hiển thị. Thêm thủ công bằng cách nhập:
* Token contract address
* Symbol (ví dụ: MTK)
* Decimals (thường là 18)

Bước 4: Query với Cast. Foundry’s cast cho phép query dữ liệu trực tiếp từ chain. Ví dụ:

```
cast code 0xYourContractAddress --rpc-url https://evmrpc-testnet.0g.ai/
cast balance 0xYourWalletAddress --rpc-url https://evmrpc-testnet.0g.ai/
```

-> Bạn đã deploy thành công smart contract đầu tiên trên 0G và biết cách verify trạng thái on-chain. ✨