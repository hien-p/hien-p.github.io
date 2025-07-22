# A article on the anatomyo of Web3

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
