# What is Arbitrum Orbit?

Arbitrum Orbit là framework cho phép bạn tự xây dựng các **blockchain lớp 2 (L2) hoặc lớp 3 (L3) tùy chỉnh**, dựa trên nền tảng kiến trúc [**Arbitrum Nitro**]().


Orbit đặc biệt phù hợp với các builder muốn toàn quyền kiểm soát mạng lưới của mình, khi cung cấp những tính năng như **Sovereign governance, Custom gas token, Modular data availability** 

Orbit chains có thể vận hành ở 2 chế độ khác nhau:

* Rollup mode: dữ liệu và giao dịch được gửi và bảo mật thông qua Ethereum, đảm bảo trustless security.
* AnyTrust mode: sử dụng DA committee (ủy ban dữ liệu) để xác nhận dữ liệu, giúp giảm chi phí hoạt động, phù hợp với các ứng dụng cần tối ưu gas fee    

Điểm cộng lớn: Dù chạy ở chế độ nào, các Orbit chain đều thừa hưởng toàn bộ sức mạnh của Nitro, bao gồm tốc độ cao, chi phí thấp và khả năng tương thích EVM.

# What are the components of Arbitrum Orbit?


![](../img_events/arbitrum-orbit.png)

Để so sánh đúng bản chất với các mô hình như **OP Stack**, ta cần phân tích Orbit theo từng tầng trong kiến trúc blockchain hiện đại.


# Data Availability Layer (Lớp dữ liệu sẵn có)

Orbit hỗ trợ nhiều tùy chọn DA (Data Availability):

* Rollup mode: Dữ liệu giao dịch được publish trực tiếp lên Ethereum thông qua calldata hoặc EIP-4844 blobs, đảm bảo tính trustless và bảo mật.
* AnyTrust mode: Sử dụng Data Availability Committee (DAC) để tạo chứng chỉ (certificates) và chỉ đăng thông tin cần thiết lên chain → giúp giảm đáng kể chi phí.
* Third-party DA: Orbit mở cổng tích hợp với các giải pháp DA bên thứ ba như Celestia, Avail, NEAR,… thông qua giao diện pluggable DA.