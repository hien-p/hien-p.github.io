# Action Units trong web3 


Khi bạn nhấn “Send” để chuyển coin trong ví, hay bấm “Swap” trên một sàn DEX như `Uniswap` hay `PancakeSwap`, có một điều quan trọng xảy ra phía sau mà bạn có thể không để ý một giao dịch on-chain (on-chain transaction) được tạo và gửi lên blockchain.

Trong Blockchain, transaction (giao dịch) chính là đơn vị cơ bản và không thể tách rời gọi là **“atomic unit”**. Dù bạn đang làm gì trên nền tảng phi tập trung tất cả đều được thực hiện dưới dạng một giao dịch on-chain.


## Transaction là gì?

**Transaction (giao dịch)** là một **yêu cầu thực thi hành động (operation request)** do người dùng gửi lên mạng lưới blockchain, nhằm thay đổi **trạng thái của chuỗi (state of the chain).**



Cụ thể, mỗi transaction đều cần trải qua ba bước:

* Ký số (signing) Người dùng sử dụng private key (khóa riêng) để ký vào transaction, nhằm chứng minh rằng mình là chủ sở hữu hợp lệ của hành động đó.
* Xác minh (verification): Mạng lưới các node sẽ kiểm tra tính hợp lệ của chữ ký và nội dung transaction.
* Ghi vào block (inclusion): Transaction hợp lệ sẽ được đưa vào một block mới, và khi block đó được xác nhận (finalized), trạng thái của blockchain mới chính thức thay đổi.

### Các thành phần của một Ethereum transaction

| **Trường (Field Name)** | **Ý nghĩa (Meaning)** |
|-------------------------|------------------------|
| `from`                  | Địa chỉ người gửi (EOA – Externally Owned Account) |
| `to`                    | Địa chỉ người nhận (có thể là EOA hoặc smart contract) |
| `value`                 | Số lượng tài sản được gửi (ví dụ: 1 ETH) |
| `data`                  | Dữ liệu bổ sung (thường là thông tin gọi hàm trong smart contract) |
| `nonce`                 | Số thứ tự transaction của địa chỉ gửi, dùng để chống replay attack |
| `gasLimit`              | Giới hạn tối đa lượng gas được phép tiêu tốn cho transaction |
| `gasPrice`              | Mức phí gas bạn chấp nhận trả cho mỗi đơn vị gas |
| `signature`             | Chữ ký điện tử (tạo ra từ private key để xác thực giao dịch) |


