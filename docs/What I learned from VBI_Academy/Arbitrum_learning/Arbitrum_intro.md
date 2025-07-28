# Arbitrum Nitro: A đọc là arbitrum, A cũng là tháng 8 (autumn) 🤣

Cũng rảnh nên ngồi đọc whitepaper ở đây: https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf


# 1. Giao thức Layer 2 tương thích Ethereum của Arbitrum

Nitro là hệ thống thực thi smart contract được thiết kế như một Layer 2 chạy phía trên blockchain Ethereum. Mặc dù hiện tại Nitro được triển khai trên Ethereum, về mặt nguyên lý, nó hoàn toàn có thể được tích hợp trên bất kỳ  blockchain nào có hỗ trợ chức năng smart contracts. 

Giao thức Nitro đảm bảo:
* Tính an toàn (safety): Nếu không có gian lận, mọi thứ chạy đúng.
* Tính tiến trình (liveness): Các giao dịch vẫn tiếp tục được xử lý, không bị kẹt.

Nhưng để đạt được hai điều này, Nitro giả định hai điều:
* Ethereum – chuỗi Layer 1 phía dưới – vẫn đang hoạt động bình thường (an toàn và live).
* Có ít nhất một người dùng trong mạng Nitro hành xử trung thực (ví dụ như challenge nếu phát hiện gian lận).

Nitro thuộc loại optimistic rollup, nghĩa là mặc định mọi giao dịch đều được coi là hợp lệ (optimistic = lạc quan). Chỉ khi ai đó phát hiện có gian lận, họ mới cần thực hiện fraud proof để chứng minh sai phạm. Điều này giúp Nitro hoạt động nhanh hơn và tiết kiệm tài nguyên, vì không phải mọi giao dịch đều được kiểm tra lại.

## 1.1 Anytrust là gì? 

**AnyTrust** là một phiên bản biến thể của Nitro. Nó giúp giảm chi phí hơn nữa, nhưng đổi lại bạn phải tin rằng có ít nhất một node đáng tin trong nhóm xác thực.

Chi tiết **khác biệt giữa Nitro và AnyTrust** sẽ được đề cập riêng ở phần dưới ( dựa theo paper)

# 2. Thiết kế của Nitro có  4 điểm khác biệt

Kiến trúc của Nitro được xây dựng dựa trên 4 đặc trưng chính – cũng chính là 4 điểm giúp Nitro trở thành một trong những Layer 2 mạnh mẽ nhất hiện nay:

* **Sequencing rồi mới execution** nghĩa là cần phải xử lý theo thứ tự định trước. Nitro chia quá trình xử lý giao dịch thành hai giai đoạn rõ ràng:
    *  **Sequencing**: Sắp xếp các giao dịch theo thứ tự cụ thể và cam kết với chuỗi đó (giống như “xếp hàng”).
    *  **Deterministic execution** – Thực hiện từng giao dịch theo đúng thứ tự đó, dựa trên một hàm chuyển trạng thái được định nghĩa sẵn

Điều này đảm bảo mọi node đều chạy cùng một logic, dẫn đến kết quả trạng thái thống nhất.

