# Tổng quan về wallet và các biện pháp bảo mật

Nếu bạn đã từng dùng blockchain thì chắc cũng nhận ra rồi là lý do vì sao ví blockchain được chia thành nhiều loại khác nhau thực ra chỉ xoay quanh cách quản lý private key mà thôi.

Có loại ví thì user tự giữ private key (như ví self-custody kiểu MetaMask, Phantom, hay Trust Wallet).

Có loại thì chia sẻ quyền kiểm soát, như ví MPC hoặc ví có cơ chế social recovery.

Cũng có loại hoàn toàn smart contract-based, kiểu ví Safe hay những smart wallet trên Sui/Aptos chẳng hạn.


# Các loại ví blockchain – Wallet Type

* Ví tập trung: Centralized wallet. Đây là loại ví mà private key được lưu trữ trên server tập trung, do một bên thứ ba quản lý  thường là các sàn giao dịch. Ví dụ: ví sàn Binance, OKX, Bybit,…

* Ví phi tập trung - Decentralized wallet (HD wallet): Private key được lưu trữ trực tiếp trên thiết bị của người dùng như điện thoại hay laptop. Loại ví này thường sử dụng cấu trúc Hierarchical Deterministic (HD) – tạo nhiều địa chỉ ví từ một seed phrase duy nhất. Ví dụ: TP (TokenPocket), imToken, MetaMask,…

* Ví cứng – Hardware wallet: Private key được lưu trữ trong thiết bị phần cứng riêng biệt, không kết nối internet gần như không thể bị hack từ xa.  Ví dụ: Ledger, OneKey,…

* Ví Web3 của sàn – Exchange Web3 Wallet: Một số sàn hiện đại (như OKX Wallet, Binance Web3 Wallet) cung cấp ví kết hợp giữa ví tập trung, ví phi tập trung, tích hợp luôn với ví cứng.

* Ví uỷ thác – Custodial wallet (MPC wallet): Thường dùng thuật toán MPC (multi-party computation) chia private key ra nhiều mảnh (shards), mỗi node giữ 1 phần. Giao dịch chỉ được ký nếu có đủ M trong tổng N node đồng ý (N-M signature). Phù hợp với tổ chức

* Ví đa chữ ký – Multi-signature wallet: trên các chain EVM, thường dùng ví Gnosis Safe để yêu cầu nhiều người cùng ký để thực hiện giao dịch. Dùng cho DAO, quỹ đầu tư, team startup,… để tránh "1 người nắm quyền".

* (Account Abstraction) – EVM Chain AA Wallet:  Ứng dụng theo tiêu chuẩn ERC-4337, biến ví thành một smart contract có thể 	Dùng fee token khác thay vì ETH, Social recovery tích hợp sẵn

# 3. Centralized Wallet
3.1. Centralized Wallet Architecture

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gu5fJaQQzJYzZIuOooHAkQ.jpeg)

Ví được sử dụng bởi các sàn giao dịch thường được gọi là ví tập trung (centralized wallets). Lý do là vì private key của các ví này thường được quản lý trên các máy chủ tập trung, và mỗi sàn sẽ có cách quản lý private key khác nhau.

Một số phương pháp lưu trữ private key phổ biến:

1. Cách đơn giản nhất là mã hóa private key bằng thuật toán DES rồi lưu vào cơ sở dữ liệu hoặc file như `wallet.data.`
2. Cách dễ thứ hai là dùng môi trường KMS (Key Management System) để lưu trữ private key đã được mã hóa.


Dù là lưu file hay dùng KMS thì private key vẫn phải được giải mã trước khi ký giao dịch. Đây chính là điểm rủi ro lớn nhất vì private key có thể bị lộ ngay tại thời điểm giải mã, dẫn đến khả năng bị đánh cắp.

3. Môi trường TEE (Trusted Execution Environment): TEE là một môi trường thực thi an toàn, nhưng **private key vẫn được mã hóa và lưu trong database hoặc file nội bộ của môi trường đó.**

Mỗi lần ký, hệ thống phải giải mã private key trong môi trường TEE để ký giao dịch.  Nguy cơ lộ key vẫn rất cao, và người nội bộ vẫn có thể ghi log trước thời điểm ký để lấy private key.


4. Cách chuyên nghiệp và an toàn nhất là sử dụng `CloudHSM` hoặc `signature device with multi-node backup`


Dù sử dụng cơ sở dữ liệu, file dữ liệu, hệ thống KMS, môi trường TEE hay CloudHSM, thì mức độ bảo mật cũng chỉ là tương đối. Bất kể giải pháp nào được sử dụng  kể cả CloudHSM hay máy ký chuyên dụng, việc phòng ngừa bị trộm ví từ trong nội bộ vẫn luôn là thách thức lớn nhất.


Nên các ví sàn tiêu chuẩn bắt buộc phải triển khai một hệ thống kiểm soát rủi ro ở cấp độ liên kết (link-level risk control) nơi mọi giao dịch phải được kiểm tra kỹ lưỡng trước khi được gửi đến thiết bị ký.


Ví dụ như các Consumer Exchange Wallet: Binance, Coinbase	




# Giới thiệu về Decentralized Wallet (HD Wallet)

Private key của ví phi tập trung (decentralized wallet) được lưu trữ trực tiếp trên thiết bị của người dùng, và không ai có thể truy cập được ngoại trừ chính người dùng.

Hầu hết các ví phi tập trung hiện nay đều là ví deterministic (xác định) và có cấu trúc phân cấp (hierarchical). 

Cơ chế hoạt động thường như sau:

1.Trước tiên, ví sẽ tạo ra một cụm từ ghi nhớ (mnemonic phrase).
2.	Từ cụm từ này, hệ thống sinh ra private key chính (master private key).

3.	Từ master key này tiếp tục sinh ra các private key con và public key con,

4.	Sau đó, các key con này được dùng để tạo địa chỉ ví (address).

Private key trong ví phi tập trung thường được mã hóa và lưu trữ cục bộ trên thiết bị của người dùng. Nên khi người dùng cần ký giao dịch, họ sẽ nhập mật khẩu để giải mã private key, rồi mới tiến hành ký.

Một số ví phi tập trung phổ biến hiện nay gồm có ..


# How to set up a secure multi-sig wallet


