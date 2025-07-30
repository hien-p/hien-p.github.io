# How Arbitrum Nitro works ?

Arbitrum Nitro là phiên bản nâng cấp toàn diện của Arbitrum, được thiết kế lại để cải thiện hiệu suất, tính tương thích và trải nghiệm nhà phát triển. Không giống như kiến trúc **AVM (Arbitrum Virtual Machine)** tùy chỉnh trong phiên bản **Arbitrum Classic**, Nitro biên dịch toàn bộ hệ thống sang WebAssembly (WASM). 

Điều này cho phép thay thế ngôn ngữ và trình biên dịch đặc thù trước đây bằng các công cụ tiêu chuẩn phổ biến, giúp việc phát triển và bảo trì trở nên dễ dàng hơn.


Để tăng hiệu quả giao tiếp cross-chain và giảm chi phí trên Layer 1, [**Offchain Labs cũng đã viết lại nhiều thành phần của ArbOS bằng ngôn ngữ Go**](../ArbOS.md). Ngoài ra, họ còn giới thiệu một cơ chế batching và compression mới, được tối ưu hóa để đóng gói và nén dữ liệu gửi về Ethereum một cách hiệu quả hơn, từ đó giảm gas fee đáng kể.

Theo tài liệu chính thức, lõi của Nitro và những cải tiến then chốt xoay quanh bốn khái niệm chính:

* **Sequencing (Trình tự giao dịch)**: Nitro áp dụng hai bước chính để xử lý giao dịch. Trước tiên, tất cả các giao dịch được sắp xếp thành một chuỗi có thứ tự duy nhất, và hệ thống cam kết với chuỗi đó. Sau đó, một hàm chuyển trạng thái xác định sẽ xử lý các giao dịch theo đúng thứ tự này, đảm bảo tính nhất quán và khả năng xác minh.

* Geth Integration (Tích hợp Geth): Nitro tích hợp trực tiếp lõi mã nguồn của go-Ethereum (Geth), giúp nó hỗ trợ đầy đủ các cấu trúc dữ liệu, định dạng và máy ảo của Ethereum. Việc sử dụng Geth như một thư viện nền tảng đảm bảo mức độ tương thích rất cao giữa Arbitrum và Ethereum

* Separate Proving from Execution (Tách biệt bằng chứng và thực thi): Một điểm đặc biệt trong Nitro là việc biên dịch mã nguồn thành hai phiên bản riêng biệt. Một bản native code được dùng cho quá trình chứng minh (proving). Một bản WASM được tối ưu hóa cho hiệu suất, dùng để thực thi trực tiếp trên các node Nitro.

* Optimistic Rollup: Nitro tiếp tục sử dụng giao thức Optimistic Rollup với các cơ chế chứng minh gian lận (fraud proofs) của Arbitrum. Các giao dịch được xử lý off-chain ở Layer 2 và sau đó được ghi nhận và bảo mật ở Layer 1 Ethereum, đảm bảo độ tin cậy cao mà không hy sinh hiệu suất.


![](https://chainstack.com/wp-content/uploads/2022/11/04-sequencer-1024x497.png)
