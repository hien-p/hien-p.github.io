# AVM: Arbitrum Virtual Machine






AVM viết tắt của `Arbitrum Virtual Machine` là một máy ảo được thiết kế riêng cho chuỗi Arbitrum Classic nhằm phục vụ việc thực thi các chương trình (smart contract) và quản lý trạng thái của blockchain.

Trong lĩnh vực blockchain, `virtual machine (VM)` ([bạn có thể đọc thêm trong blockchain 101 course module 3 của mình](../../Blockchain_101_course/Module_3/02_EVM.md)) là một lớp phần mềm hoạt động như môi trường thực thi các hợp đồng thông minh. Nó mô phỏng một “máy tính ảo”, cho phép chạy các đoạn mã độc lập với phần cứng thực tế. VM chính là nơi mà logic của các smart contract được thực hiện, quyết định cách dữ liệu được xử lý và trạng thái của chuỗi được cập nhật.

![](https://storage.googleapis.com/hackquest-gcs-prod-asia-northeast1/courses/6d9521f9-7953-4041-9548-64038a35362a/3320db80-d80a-4fa0-a10a-4ca40294d5a8/0cf39c33-94fa-4ea0-ae4b-6ac12825591a/Y4FkN2qyYfplSOYQ6TsFo.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=hackquest-server-prod%40artela-hackquest.iam.gserviceaccount.com%2F20250730%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250730T125629Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=9f3af12274881c88ec993b49bbb9cef72b7e6a35107c42fd787ff0b77e84612e918f9359d2f1263c9196dbb3a6719630a65be9b691f764199eea5dbc2a1eede08c78ad5b1fc49141c5fff1265ee5d7079323314f5e006cad41976630d98891a23c442c9a2c2f62445e9ea653a762a7792512f7c2dbda4a9d9870124f3c9b84ea0e1c20e22bb47fec3d4af65f12a25563f84ae5745eacb760fd639e28e5201c627ef341aaab9416793bfdb58feb6a18df343756929ff88074d94986e70b08d64ca88a7792a0a57301a52a0763a7ec7ed9bf9c6a07aed045dee9d4b151f8602ac03d0b196516075dc7933516197a9b8f409286f693730571a1340dcb9e84360f1a)


#  Arbitrum Channels work như thế nào ?

Thiết kế của Arbitrum được xây dựng dựa trên ba thành phần cốt lõi: **Compiler, EthBridge, và Validator**s. Ba thành phần này phối hợp chặt chẽ với nhau để mang lại một Layer 2 nhanh, tương thích với Ethereum, đồng thời bảo đảm AnyTrust Guarantee tức là một Arbitrum Virtual Machine sẽ thực thi đúng nếu chỉ cần một validator hoạt động trung thực.

Trong đó, Arbitrum Compiler là công cụ chuyên biệt dùng để biên dịch một nhóm smart contract (viết bằng Solidity) thành một chương trình thực thi duy nhất, có thể chạy trên Arbitrum Virtual Machine (AVM).


> Tại sao Arbitrum tạo riêng AVM thay vì dùng EVM?
Bởi vì thiết kế máy ảo riêng giúp giảm footprint (khối lượng dữ liệu) cần ghi lên chuỗi Ethereum, từ đó tối ưu tốc độ và giảm chi phí.

Trong thực tế, nhiều dApp không chỉ có một smart contract mà là một nhóm contract tương tác với nhau. Arbitrum Compiler cho phép gộp tất cả các contract đó thành một “khối chương trình duy nhất có thể triển khai" (Gọi là single deployable unit nhưng chưa biết dịch sao), và khi chương trình này được triển khai và chạy, nó được gọi là Virtual Machine (VM).


**EthBridge** là một smart contract đặc biệt chạy trên Ethereum, do Offchain Labs xây dựng, đóng vai trò là **cầu nối giữa Layer 1 (Ethereum) và Layer 2 (Arbitrum)**.

Chức năng chính của EthBridge:
* Khởi chạy một Arbitrum VM từ Ethereum.
* Gửi giao dịch từ Ethereum xuống Arbitrum hoặc ngược lại.
* Chuyển ether hoặc token từ L1 sang L2 và ngược lại.
* Cung cấp API đọc dữ liệu trạng thái Arbitrum (không mutate, tốn 0 gas).

Ngoài ra, EthBridge còn có vai trò trọng tài nếu xảy ra tranh chấp giữa các validators. Arbitrum sử dụng cơ chế Optimistic Rollup kết hợp với **interactive fraud proof**, nên mọi tranh chấp đều được giải quyết một cách nhanh.

**Validators** là những người hoặc node theo dõi và vận hành trạng thái của một VM. Họ là phần quan trọng của Arbitrum, nhưng hoạt động gần như hoàn toàn off-chain. 

Mỗi VM có một nhóm validators riêng do nhà phát triển dApp chỉ định. Các validators mô phỏng toàn bộ logic của smart contract, cập nhật trạng thái liên tục theo các instruction trong chương trình đã biên dịch.

Trạng thái đầy đủ của VM không được đưa lên Ethereum, thay vào đó chỉ có một hash cryptographic đại diện cho trạng thái đó, được lưu bởi EthBridge.

Điều làm Arbitrum trở nên đặc biệt là cam kết **AnyTrust** chỉ cần một validator trung thực vẫn hoạt động, toàn bộ chương trình sẽ chạy chính xác, bảo toàn tính toàn vẹn và an toàn cho người dùng.
