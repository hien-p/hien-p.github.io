# Modular blockchain: The importance of data availability

Trong Web3, “composability” tạm dịch là tính lắp ghép.Bất kỳ hệ thống nào khi phát triển đến một ngưỡng đủ lớn đều cần chuyên môn hoá (specialization) và phân mảnh chức năng (disassembly) để scale. Và blockchain cũng không ngoại lệ.


# 1. Blockchain stack: Gồm những lớp nào?

Một blockchain đầy đủ có thể chia thành 4 lớp chính:

	1.	Data Availability (DA) – Lớp lưu trữ & phân phối dữ liệu
	2.	Consensus – Lớp đồng thuận, quyết định điều gì là “sự thật”
	3.	Settlement – Lớp xác nhận & ghi nhận các trạng thái cuối cùng
	4.	Execution – Lớp xử lý giao dịch, tính toán logic hợp đồng


Trong kiến trúc monolithic (nguyên khối), cả bốn lớp này được tích hợp và xử lý trong cùng một mạng duy nhất. Tức là mỗi node đều phải xử lý từ xác thực dữ liệu cho đến thực thi giao dịch.


## 1.1 Monolithic blockchains are inevitably reaching bottlenecks

Khi khối lượng giao dịch gia tăng, các blockchain nguyên khối bắt đầu đối mặt với những điểm nghẽn rõ rệt. Hiện tại, người dùng vì cam kết với tầm nhìn phi tập trung vẫn chấp nhận phí giao dịch cao của Ethereum cũng như tốc độ xử lý chậm hơn nhiều so với các hệ thống tập trung như Visa.

Cốt lõi của điểm nghẽn này nằm ở việc tích tụ dữ liệu. Do tính bất biến của blockchain, khả năng dữ liệu luôn sẵn có (data availability) trở thành điều kiện tiên quyết không thể thương lượng nếu muốn mở rộng hệ thống.

Và vì mục tiêu cuối cùng là phổ cập blockchain đến đại chúng, kiến trúc nguyên khối buộc phải tiến hóa thành kiến trúc mô-đun.


Xét theo lộ trình phát triển của Ethereum, Vitalik Buterin đã khẳng định rằng hệ sinh thái Ethereum sẽ xoay quanh các giải pháp **rollup**. Đây là những giải pháp mở rộng tách lớp thực thi (execution) ra khỏi mạng chính, thực hiện xử lý off-chain nhưng vẫn lưu trữ một phần dữ liệu giao dịch on-chain.

Thông lượng của rollup tăng tuyến tính nghĩa là càng nhiều giao dịch, càng cần nhiều dữ liệu được broadcast về mainnet. Vì vậy, điểm nghẽn lớn nhất của rollup lại chính là băng thông của lớp data availability trên mạng cơ sở.

Để giải quyết vấn đề này, bước đi đầu tiên trong kế hoạch mở rộng dài hạn của Ethereum, sharding, được thiết kế nhằm giúp các chuỗi shard đảm nhiệm việc cung cấp data availability.


# Modular Blockchain là gì?

Một mạng blockchain được xem là modular khi nó tách và chuyển giao một hoặc nhiều chức năng cốt lõi sang các thành phần khác. 

Kể từ khi ra mắt testnet vào tháng 5/2022, Celestia đã trở thành tâm điểm trong cộng đồng blockchain, được phân tích và so sánh nhiều với Ethereum. Đây là mạng blockchain mô-đun đầu tiên được thiết kế chuyên biệt, tập trung hoàn toàn vào việc xử lý đồng thuận và cung cấp dữ liệu, chứ không xử lý logic giao dịch.

Vào ngày 20 tháng 10, Celestia gọi vốn thành công **55 triệu USD** trong vòng Series A & B, với sự dẫn dắt của Bain Capital Crypto và Polychain Capital. Với vòng gọi vốn này, Celestia chính thức trở thành unicorn với định giá 1 tỷ USD.

## 2.1 Celestia hoạt động như thế nào?

Celestia sử dụng **Tendermint** làm giao thức đồng thuận và đóng vai trò như một **lớp data availability + consensus có thể cắm vào (pluggable).**


## 2.2 Các tính năng nổi bật của Celestia

### 2.2.1 Decentralization

Nhờ chỉ tập trung vào data availability, Celestia cho phép các **light node sử dụng kỹ thuật data availability sampling (DAS)**  chỉ cần tải xuống một phần ngẫu nhiên của block thay vì toàn bộ. Điều này giúp:

	•	Chạy node nhẹ trên cả điện thoại di động
	•	Mở rộng mạng lưới node dễ dàng hơn
	•	Giảm rào cản vận hành mạng lưới


### 2.2.2 Scalability (Khả năng mở rộng)

Điểm nghẽn lớn nhất trong blockchain chính là state bloat – dữ liệu trạng thái phình to theo thời gian.  Celestia tách bạch việc “kiểm tra hợp lệ” ra khỏi “lưu trữ dữ liệu”, nghĩa là:

	•	Chỉ cần có light node xác minh DA là đủ
	•	Càng nhiều node tham gia sampling, block space càng tăng tuyến tính


### 2.2.3 Security (Bảo mật)

Bảo mật của Celestia phụ thuộc vào số lượng light node tham gia sampling. Càng nhiều node, càng khó để ẩn dữ liệu hoặc gian lận.

	•	Cơ chế sampling giúp chống “data withholding” (giấu block)
	•	Khả năng chạy node dễ dàng → tăng decentralization → tăng bảo mật



## 2.3 Những lợi thế của Modular Blockchain


Người dùng có thể triển khai execution layer riêng dựa trên Celestia, tận dụng khả năng cung cấp dữ liệu của nó.

Celestia không ràng buộc với EVM mở ra không gian thiết kế rộng hơn cho các máy ảo khác như: **MoveVM, CosmWasm, FuelVM, LLVM-based VM**

Chi phí xác minh trên Celestia tăng dưới tuyến tính khi throughput tăng vì:
	•	DAS chỉ yêu cầu node tải một phần nhỏ dữ liệu block
	•	Dữ liệu cần xác minh không tăng theo tổng block size

→ Giảm đáng kể chi phí xác minh, duy trì khả năng mở rộng dài hạn.

![https://img.learnblockchain.cn/pics/20230711152119.png](https://img.learnblockchain.cn/pics/20230711152119.png)

Bạn có thể đọc kỹ hơn trong phần [giải thích về Modular World](Modular_world.md)