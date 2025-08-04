# Exploring Celestia's Core Technologies

Web3 Industry Research Conference Sharing Link: [https://www.youtube.com/watch?v=O2KHor155dY](https://www.youtube.com/watch?v=O2KHor155dY)


Buổi seminar được tổ chức bởi nhóm nghiên cứu Web3. Diễn giả là anh Hoyt — technical partner tại W3.Hitchhiker. W3 là một quỹ đầu tư và nhóm nghiên cứu nhỏ, các thành viên chủ yếu đến từ các tổ chức tài chính truyền thống, công ty internet lớn và ngành game. Họ không phải đội dự án Celestia, nhưng mang đến buổi chia sẻ với góc nhìn độc lập để làm rõ một số hiểu nhầm phổ biến về Celestia, đặc biệt là về “data availability”.


 

# Celestia là gì?

Celestia là một public blockchain tập trung vào modularity (tính mô-đun). Thay vì tích hợp mọi chức năng như consensus, execution, settlement vào cùng một chain (như Ethereum hay Avalanche), Celestia tách chúng ra làm từng thành phần riêng biệt. Mỗi chain trong hệ sinh thái chỉ làm một việc cụ thể.


# Data Availability là gì và vì sao lại quan trọng?

Nhiều người nghĩ đơn giản: dữ liệu phải luôn có thể tải về bất cứ lúc nào. Nhưng đó không phải là định nghĩa trong Celestia.

Với Celestia, data availability nghĩa là dữ liệu không bị che giấu bởi block producer. Đây là điểm mấu chốt giúp các light node có thể xác thực tính toàn vẹn của dữ liệu mà không cần lưu trữ toàn bộ chain.

Việc tách rời các chức năng giúp các nhóm dev có thể tập trung vào phần việc chuyên môn của mình và đẩy nhanh tốc độ đổi mới. Điều này khác với Ethereum, nơi mà mọi upgrade đều phải thông qua quy trình dài.

Ethereum giả định đa số node là trung thực, và dựa vào các full node để duy trì bảo mật. Celestia thì đi hướng ngược lại: giả định đa số có thể không trung thực, và chỉ cần một vài full node thành thật là đã đủ để bảo vệ mạng  nhờ cơ chế **data sampling.**


