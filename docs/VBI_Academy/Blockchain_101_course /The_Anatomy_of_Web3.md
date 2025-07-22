---
title: A article on the anatomy of Web3
summary:  Bài viết này viết toàn cảnh về hệ sinh thái của Web3 Blockchain (my POV)
authors:
    - Harry Phan
date: 2025-07-22
some_url: https://mp.weixin.qq.com/s?__biz=MzA5OTI1NDE0Mw==&mid=2652494508&idx=1&sn=2124ff3f2f03fc0d439dfda30a1eff8e&chksm=8b6850bcbc1fd9aafcc633232ee64761c99d212716a190e05c1874419b781624906dcdaf2943&token=1958237421&lang=zh_CN#rd
extra:
  status:
    new: Recently added
---


# A article on the anatomy of Web3

Bài viết này viết toàn cảnh về hệ sinh thái của Web3 Blockchain (my POV). Web3 đến nay đã phát triển tương đối đầy đủ, hệ sinh thái cũng dần định hình rõ ràng. Nếu nhìn ở góc độ kiến trúc tổng thể hiện tại thì ta có thể chia thành các layers là blockchain network layer, middleware layer, application layer, và access layer...

Trong phần này sẽ nhắc đến khá nhiều cái tên dự án, nhưng vì dung lượng kiến thức mình có hạn nên mình sẽ không đi sâu vào từng cái mà chỉ overall.


# 1. Blockchain network layer

Ở tầng thấp nhất trong kiến trúc Web3 là lớp mạng lưới blockchain (blockchain network layer) hay còn gọi là lớp nền tảng (foundation layer). Đây chính là “cái móng nhà” của toàn bộ hệ sinh thái Web3, nơi tập hợp các blockchain khác nhau vận hành độc lập hoặc tương tác với nhau.


Hiện có rất nhiều blockchain nằm trong lớp này, có thể kể đến như: Bitcoin, Ethereum, BNB Chain (BSC), Polygon, Arbitrum, Polkadot, Cosmos, Celestia, Avalanche, Aptos, Sui và còn hàng tá cái tên khác nữa.

## Phân tầng kiến trúc: Layer 0 / Layer 1 / Layer 2




* Layer 0 (L0): Layer 0 là lớp trừu tượng hơn, thường được gọi là lớp hạ tầng blockchain (infrastructure layer) – nơi cung cấp các dịch vụ cơ bản giúp nhiều blockchain có thể tương tác hoặc chia sẻ tài nguyên. Ví dụ: Cosmos, Polkadot,

![Layer 0 - coinbase](https://images.ctfassets.net/q5ulk4bp65r7/5w8dZBJye0z6uKpPaYD764/ef88b236609d4483917a031945e819e8/Learn_Illustration_What_are_Layer-0_protocols.jpg)
<br/>

* Layer 1 (L1): Các Layer 1 cũng chính là ví dụ điển hình cho [`“tam giác bất khả thi”`](blockchain_dilemma.md) của blockchain khó để một blockchain đồng thời đảm bảo cả 3 yếu tố: mở rộng (scalability), bảo mật (security), và phi tập trung (decentralization).

<br/>

* Layer 2 (L2): Layer 2 ra đời để giải bài toán “TPS thấp” của Layer 1, nhất là Ethereum. Layer 2 là các chuỗi phụ (subchain) nằm phía trên Layer 1, có nhiệm vụ xử lý giao dịch nhanh và rẻ hơn, sau đó gửi kết quả về Layer 1 để lưu trữ. Layer 2 giúp Layer 1 trở thành settlement layer (lớp thanh toán), còn mình thì lo phần execution layer (lớp thực thi). Một số Layer 2 nổi bật của Ethereum gồm: Arbitrum, Optimism, zkSync, StarkNet, Polygon. Bitcoin cũng có Layer 2 như: `Lightning Network`, `Stacks`, `RSK`, nhưng hiện tại vẫn chưa phổ biến bằng Ethereum.






## Môi trường chạy smart contract

Sự phát triển của Web3 chủ yếu nhờ vào smart contract, và các smart contract cần có môi trường để chạy – gọi là virtual machine (máy ảo). Tương tự như Java cần JVM vậy.



Sau khi hiểu cấu trúc phân tầng, ta tiếp tục phân loại blockchain theo góc nhìn EVM compatibility  hay nói cách khác, blockchain đó có chạy được smart contract viết bằng Solidity và tương thích với máy ảo Ethereum hay không.

Về cơ bản, có thể chia thành hai nhóm: `EVM chains` và `Non-EVM chains`.

Hiện nay, EVM chains vẫn là dòng chủ đạo. Những blockchain này thu hút lượng lớn DApp và người dùng Web3, nhờ vào cộng đồng phát triển rộng và hệ sinh thái công cụ phong phú. Một số blockchain tương thích với EVM từ đầu như BSC, Heco, Arbitrum, Optimism, v.v. Một số khác thì phát triển sau này để tương thích, ví dụ như zkSync: phiên bản 1.0 không hỗ trợ EVM, nhưng từ 2.0 trở đi thì đã embrace EVM hoàn toàn. 


Tính đến hiện tại, phần lớn các blockchain lớn đều đã hoặc đang hỗ trợ EVM. Tuy nhiên, vẫn còn một số chuỗi nổi bật nằm ngoài hệ EVM, như Solana, Terra, NEAR, Aptos, và Sui. 

Các blockchain này thường chọn hướng đi khác biệt, cả về kiến trúc lẫn ngôn ngữ lập trình smart contract: nếu EVM chains dùng Solidity, thì các Non-EVM chains thường dùng Rust hoặc Move



> Tóm lại 
* [`EVM chains`](https://gfiblockchain.com/evm-la-gi-tai-sao-evm-la-trai-tim-cua-ethereum.html): Là những blockchain tương thích với Ethereum Virtual Machine, có thể chạy các smart contract được viết bằng Solidity. Ví dụ: Ethereum, BNB Chain, Polygon, Avalanche C-Chain…
* [`Non-EVM chains`](https://coin98.net/phan-tich-non-evm-blockchain): Không tương thích với EVM, sử dụng máy ảo riêng và thường có ngôn ngữ lập trình riêng, như: Solana (Rust/C/C++), Aptos & Sui (Move), Near protocol/ Cosmos dùng rust, Cardano dùng Haskell/Plutus..

---

## Các vai trò trong toàn hệ sinh thái như `Tính toán` hay `Lưu trữ`

Ta cũng có thể chia blockchain theo mục tiêu sử dụng:
* Compute Chains: Tập trung vào xử lý logic và chạy smart contract.
* Storage Chains: Tập trung vào lưu trữ dữ liệu phi tập trung – ví dụ: Filecoin, Arweave, Walrus..


## Cross-chain bridges

Mở rộng hơn là các giao thức giao tiếp giữa nhiều blockchain. Khá khó để thống kê ra số lượng bao nhiêu cross-chain được triển khai nhưng ta có những tên dẫn đầu cho phép chuyển tài sản giữa layer 2 và Ethereum một cách mược mà như `Polygon`, `Arbitrum` và `Optimism`.  Xếp sau là `Multichain` (trước đây là Anyswap) - tuy nhiên, trải qua khoảng thời gian khắc nghiệt của thị trường, cái tên Multichain đã dần phai mờ trong trí nhớ của nhiều người.



Tạm thời, đó là bức tranh tổng quan về các “thành viên” đang tạo nên lớp mạng lưới của blockchain. Tất nhiên, danh sách này sẽ còn tiếp tục thay đổi sẽ có những cái tên mới gia nhập, và cũng sẽ có những hệ sinh thái từng rầm rộ rồi dần bị lãng quên ở một góc của lịch sử Web3.

# 2. Middleware layer

Ngay phía trên lớp mạng blockchain, mình gọi đây là "middleware layer" chuyên cung cấp các dịch vụ và chức năng nền tảng cho các ứng dụng **Security audits, oracles, index query services, API services, data analysis, data storage, basic financial services, digital identities, DAO governance..**

Các thành phần trong lớp middleware này có thể là:

* On-chain protocol (chạy trực tiếp trên blockchain),
* Off-chain platform (chạy ngoài blockchain),
* Hoặc các tổ chức  centralized enterprise.


Trước tiên là về kiểm toán bảo mật (`Security Auditing`). Đây là một loại middleware cốt lõi. Vì phần lớn các blockchain và ứng dụng Web3 đều `mã nguồn mở` (open-source), và nhiều ứng dụng liên quan trực tiếp tới tài chính, nên vấn đề bảo mật trở thành ưu tiên hàng đầu, và kiểm toán bảo mật đương nhiên trở thành một nhu cầu bắt buộc. 


 Các công ty nổi tiếng trong lĩnh vực này gồm: `CertiK`, `OpenZeppelin`, `ConsenSys`, `Hacken`, `Quantstamp`; ở Trung Quốc có `SlowMist`, `ChainSec`, và `Paidun`. Ngoài ra còn có nhiều công ty/team nhiều hơn thế nữa...


Bên cạnh đó, không thể không kể tới các Bug Bounty platform như `Immunefi`, `Hacker proof`...


Tiếp theo là `Oracle`, thành phần đóng vai trò rất quan trọng trong hệ sinh thái Web3. 

Oracle là cầu nối giữa hệ thống blockchain và nguồn dữ liệu bên ngoài, giúp thực hiện việc giao tiếp dữ liệu giữa smart contract và thế giới thực. Vì bản thân mạng lưới blockchain bị giới hạn bởi tính nhất quán trạng thái (`state consistency`), nên để đảm bảo rằng mỗi node đều cho ra cùng một kết quả khi nhận cùng một input, blockchain được thiết kế như một hệ thống đóng, chỉ có thể lấy dữ liệu nội bộ (on-chain), không thể chủ động lấy dữ liệu từ bên ngoài (off-chain). 

Tuy nhiên, trong nhiều tình huống ứng dụng, dữ liệu bên ngoài là bắt buộc và chúng được cung cấp thông qua `oracle`. Đây cũng là cách duy nhất để blockchain có thể tương tác với dữ liệu ngoài chuỗi.

Các loại oracle hiện nay có thể chia thành: oracle cho DeFi, NFT, SocialFi, oracle cross-chain, oracle bảo mật riêng tư, oracle tín dụng, và mạng lưới oracle phi tập trung. Một số dự án oracle tiêu biểu gồm: CreDA, Privy, UMA, Banksea, DOS, NEST, Chainlink, v.v. Trong đó, Chainlink là dự án dẫn đầu mảng oracle, được định vị là một mạng lưới oracle phi tập trung, cung cấp nhiều sản phẩm như: Data Feeds, VRF, Keepers, Proof of Reserve, CCIP,…


Tiếp theo là  truy vấn dữ liệu (`Index Query`), một middleware quan trọng giúp giải quyết bài toán truy vấn dữ liệu on-chain phức tạp. Ví dụ, nếu muốn truy vấn tổng khối lượng giao dịch trên Uniswap trong một ngày cụ thể, thì việc truy vấn trực tiếp từ blockchain là rất khó khăn. Do đó, cần có các dịch vụ truy vấn chỉ mục, với những đại diện chính là The Graph và Covalent. The Graph hoạt động bằng cách giám sát dữ liệu on-chain và chuyển hóa chúng thành dữ liệu tùy chỉnh để lưu trữ và truy vấn. Trong khi đó, Covalent đóng gói các dữ liệu phổ biến và thường dùng thành các API thống nhất để người dùng dễ truy vấn.


Khi nói đến dịch vụ API, ngoài Covalent, còn có nhiều nhà cung cấp API phục vụ các mục đích khác nhau, ví dụ:
* NFTScan: chuyên cung cấp dữ liệu API về NFT,
* Infura và Alchemy: cung cấp dịch vụ node cho blockchain.

*Data analytics* cũng là một thành phần middleware liên quan tới dữ liệu. Bạn có thể từng nghe như `Dune Analytics`, `Flipside Crypto`, `DeBank`, `Chainalysis`. 

Tiếp theo là middleware cung cấp các dịch vụ tài chính cơ bản. Các giao thức tiêu biểu gồm: Uniswap, Curve, Compound, Aave, v.v.
	•	Uniswap và Curve là các giao thức giao dịch (DEX),
	•	Compound và Aave là các giao thức cho vay (lending).

Về bản chất, đây là các giao thức ở lớp ứng dụng (application layer), nhưng vì ngày càng có nhiều ứng dụng khác dựa vào chúng như một thành phần cơ bản để xây dựng, nên chúng trở thành các giao thức dùng chung, tương tự như các khối Lego – từ đó đảm nhận vai trò của middleware.

⸻

Trên thực tế, bất kỳ thành phần có thể tái sử dụng (composable) nào – dù là giao thức on-chain, dịch vụ off-chain do thực thể tập trung cung cấp, hoặc tổ chức DAO – đều có thể được phân loại vào “lớp middleware”, miễn là dịch vụ mà nó cung cấp được đa số ứng dụng khác cần sử dụng.