# EVM vs Non-EVM - Chọn Nền Tảng Nào?

## Objective 
- *EVM-compatible chains: Ethereum, Polygon, Arbitrum, Base*
- *Non-EVM alternatives: Solana, Near, Sui, Aptos*
- *So sánh performance, cost, developer experience*


Ethereum vừa là một blockchain, vừa là một loại tài sản kỹ thuật số. Nhưng điểm khác biệt là Ethereum được thiết kế chuyên biệt để chạy các smart contract  những đoạn mã tự thực thi, không cần bên trung gian.

Chính nhờ smart contract mà dev có thể build ra vô số ứng dụng phi tập trung (dApps), từ tài chính (DeFi), đến game, NFT, social… Và đứng sau tất cả những điều kỳ diệu này là Ethereum Virtual Machine (EVM)



# Sự khác biệt giữa EVM và non EVM

Một blockchain tương thích với Ethereum không nhất thiết là phải chạy EVM và ngược lại, một blockchain không phải EVM thì sẽ không tương thích với hệ sinh thái Ethereum.

Hãy tưởng tượng `EVM và non-EVM` giống như hai hệ điều hành smartphone khác nhau. Ví dụ, Android chính là đại diện cho EVM. Các điện thoại chạy Android *(Samsung, Xiaomi, Oppo…)* thì dù khác nhau về thương hiệu, nhưng vẫn có thể cài chung app từ Play Store, vì tất cả đều hỗ trợ Android.

Ngược lại, iOS (Apple) là một hệ điều hành riêng, không tương thích với Android. App viết cho iOS thì không thể chạy trên Android được – tương tự như các blockchain non-EVM không thể chạy smart contract viết bằng Solidity. 

# Code Comparison Example: Counter Contract


Với Solidity:

```solidity
pragma solidity ~0.8.0;

contract Counter {
    uint256 public count;

    function (increment) external {
    count += 1;
    }
}
```

Với rust:

```rust

#[program]

pub mod counter {
    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = counter.count.checked_add(1).unwrap();
        Ok(())
    }
}
```

Sự khác biệt này cho cả đoạn mã Solidity lẫn Rust đều chỉ đơn giản là *tăng giá trị của một biến đếm*, nhưng cách chúng thực hiện điều đó lại rất khác nhau từ cách mô hình hoá dữ liệu on-chain, cơ chế đảm bảo an toàn, đến cách tổ chức luồng phát triển cho dev. 


Những khác biệt này không chỉ đến từ ngôn ngữ lập trình (Solidity vs Rust), mà còn phản ánh thiết kế và cấu trúc của từng máy ảo (EVM với Solidity và Solana VM với Anchor/Rust). Điều này ảnh hưởng trực tiếp đến trải nghiệm của developer và cách họ tư duy khi xây dựng smart contract trên mỗi nền tảng.

Ví dụ như sự khác nhau về *Type Safety & Error Handling*: 

* Trên Solidity, ta thường dùng các kiểu dữ liệu cơ bản như uint256, address. Các lỗi logic (như chia cho 0, overflow, truy cập sai state…) chỉ được phát hiện khi giao dịch thực sự chạy trên blockchain, tức là khi đã tốn phí gas. Điều này khiến smart contract dễ bị bug nếu không test kỹ từ trước.

* Còn rust thì cho phép kiểm tra lỗi ngay từ thời điểm biên dịch vì Rust nổi tiến với khả năng *memory safety*  nên. *Framework Anchor* trên Solana tận dụng điều này bằng cách yêu cầu developer phải xử lý rõ ràng từng khả năng lỗi (thông qua `Result<T, E>`), nhờ đó tăng độ tin cậy và an toàn của smart contract trước khi deploy.


Hoặc nói về DevX:
*  Solidity/EVM: Hệ sinh thái đã hoàn thiện với nhiều tool như Hardhat, Remix, Truffle. Việc setup và test cực kỳ nhanh chóng, phù hợp cho cả dev mới lẫn team production.

* Rust/Anchor: Dù đang phát triển nhanh với *Anchor CLI*, Solana localnet, nhưng vẫn đòi hỏi kiến thức nền tốt và thời gian compile/test dài hơn đáng kể.


# Security và Auditing

Dù nền tảng là EVM hay non-EVM, **bảo mật** luôn là yếu tố tối quan trọng trong phát triển smart contract. Tuy nhiên, cách tiếp cận của hai hệ sinh thái lại khác nhau đáng kể.

EVM/Solidity: Phát hiện lỗi ở runtime thường dùng tool & library

Trong môi trường EVM, developer thường phải chủ động secure contract khỏi các lỗi phổ biến như:
* Reentrancy (gọi lại contract gây lỗi logic)
* Integer overflow/underflow
* External call không được kiểm tra đúng cách...

Để xử lý, họ thường dùng các thử viện đã audit ví dụ như OpenZeppelin.. hoặc các toool để quét lỗ hổng. Hoặc các pattern như`modifier`, `interface`.. giúp enforce logic truy cập(`access controls`).

Trong khi đó, các ngôn ngữ như Rust dùng  Cơ chế ownership và borrow checker loại bỏ hầu hết các lỗi liên quan đến quản lý bộ nhớ, use-after-free, hay race condition.

Hoặc là Move ta  Resource-type system hay Sui thì Object centric model giúp đảm bảo tài sản chỉ hỉ có thể được sở hữu bởi một entity duy nhất tại một thời điểm, giúp đảm bảo logic tài sản không thể bị nhân bản hoặc destroy.


#  So sánh hiệu năng và cost của  EVM vs non-EVM

Performance và cost là  là một trong những điểm nghẽn dễ thấy nhất của các blockchain tương thích EVM, đặc biệt là Ethereum. 

Trên **Ethereum Layer 1**, hiệu suất xử lý giới hạn ở khoảng 15 giao dịch mỗi giây (TPS). Trong giai đoạn cao điểm (như NFT mint), mạng có thể tắc nghẽn nghiêm trọng, khiến phí gas tăng vọt có thể lên tới hàng chục hoặc hàng trăm đô cho một giao dịch.

Để cải thiện, các giải pháp Layer-2 như `PolyGon` hay 	`Arbitrum`,`Optimism` (rollups) đã được phát triển nhằm xử lý giao dịch off-chain, sau đó “gộp” (batch) lại và đưa lên Ethereum để xác nhận.


Các giải pháp này đi kèm với trade-off riêng:
* Độ trễ(finality delay)
* Rủi ro bảo mật liên quan đến cầu nối (bridge) và fraud proof

Ngược lại, các nền tảng non-EVM như Solana hoặc các chain dùng Move (Aptos, Sui) được thiết kế để giải quyết vấn đề hiệu năng như tận dụng parallel execution  cho phép nhiều giao dịch chạy đồng thời

Solana sử dụng mô hình tính phí dựa trên đơn vị tính toán (compute units), với mức phí cố định cho mỗi đơn vị. [Cách tiếp cận này cho phép mạng lưới xử lý hàng nghìn giao dịch mỗi giây với chi phí cực kỳ thấp](https://www.cfbenchmarks.com/blog/solana-the-high-speed-low-cost-blockchain-rival-2).






# Đâu là lựa chọn tốt nhất ? 

Thực tế thi lựa chọn giữa EVM và non-EVM chains, developer cần đánh giá dựa trên nhiều yếu tố kỹ thuật và hệ sinh thái.

Với EVM chains, Cung cấp một môi trường phát triển với hệ sinh thái lớn. Thư viện lớn với nhiều code examples có sẵn và các tiêu chuẩn phổ biến như  `ERC-20`, `ERC-721`,... giúp dApp dễ tích hợp và tương thích.

Tuy nhiên cũng có những mặc giới hạn như khả năng mở rộng thấp (đặc biệt trên Ethereum L1). Phí gas biến động cao và cần phụ thuộc vào Layer-2 để đạt hiệu suất cao hơn.


Còn với Non-EVM chains sẽ có những mô hình mới dùng để thiết kế tối ưu cho hiệu suất cao, khả năng xử lý hàng nghìn TPS. Sử dụng cơ chế đồng thuận chuyên biệt hoặc tích hợp khả năng interoperability ngay từ đầu (IBC, native bridge, cross-chain API…). Nhưng non-EVM chains cũng đi kèm với một số thách thức như về mặt DevX tooling sẽ chưa đồng bộ và đôi khi phát triển trên EVM bạn sẽ thấy tiện hơn nhiều. Khó tiếp cận trực tiếp nguồn thanh khoản lớn từ Ethereum. 

