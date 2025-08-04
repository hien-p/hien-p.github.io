
Bài viết này nhằm giới thiệu vai trò quan trọng của “data availability” (DA) trong hệ sinh thái Rollup, và cách mà các giải pháp DA dạng mô-đun (như Celestia, EigenDA, và Avail) đang góp phần nâng cao khả năng tương tác (interoperability) và tính bền vững (maintainability) của các Rollup.

Hệ sinh thái Rollup đại diện cho một bước tiến lớn trong thiết kế blockchain hiện đại — cho phép nhiều mạng rollup vận hành hiệu quả trong cùng một hệ sinh thái thống nhất. Khi Rollup ngày càng chiếm lĩnh trung tâm các thảo luận về mở rộng quy mô (scaling) cho Ethereum và các lớp nền tảng khác, có một trụ cột kỹ thuật ít được nhắc đến nhưng cần thiết đó là Data Availability (DA).

Không có một lớp DA đáng tin cậy, có thể mở rộng và chi phí tối ưu, Rollup không thể đảm bảo được tính trustless khi thực thi, cũng như không thể đạt đến composability quy mô lớn.

Trong bối cảnh đó, các giải pháp DA mô-đun như **Celestia, EigenDA, và Avail** đang giữ vai trò trung tâm trong việc giúp Rollup **tương tác lẫn nhau (interoperable) và dễ bảo trì (maintainable)** theo cách vừa an toàn, vừa tiết kiệm chi phí.


Mục tiêu là cung cấp cho **developers, researchers và protocol designers** một cái nhìn rõ ràng về:
* Động lực kỹ thuật dẫn đến nhu cầu về DA
* Những đánh đổi kiến trúc khi tích hợp DA mô-đun
* Và chiến lược triển khai lớp DA như Celestia trong tầm nhìn của Rollup Hub


# Tổng quan kiến trúc blockchain

Lớp Data Availability (DA) là một thành phần quan trọng, gắn liền với hai trường phái kiến trúc blockchain đối lập:

Trong giai đoạn đầu, các blockchain được xây dựng theo mô hình monolithic, còn gọi là “chain tích hợp”.

Ở mô hình này, một blockchain đơn lẻ chịu trách nhiệm toàn bộ các chức năng cốt lõi:

	•	Consensus (đồng thuận)
	•	Data Availability (khả dụng dữ liệu)
	•	Execution (thực thi giao dịch)
	•	Settlement (xác nhận trạng thái cuối cùng)


Mặc dù cách thiết kế này giúp đơn giản hoá việc đồng bộ hóa và tương tác nội bộ, nhưng nó gặp phải nhiều hạn chế như là càng mở rộng quy mô, yêu cầu phần cứng của validator càng cao. Tình trạng state bloat (phình to trạng thái) và state contention (cạnh tranh truy cập dữ liệu) làm giảm hiệu suất...



![](https://img.learnblockchain.cn/2025/06/26/19AoyOQcTyU6n8QJNmXyamg.png)


Để vượt qua giới hạn trên, cộng đồng phát triển dần chuyển sang kiến trúc modular. Mô hình modular tách riêng các lớp chức năng (như consensus, execution, DA, settlement) → cho phép các chain:
	
    •	Hoạt động song song và độc lập
	•	Tự duy trì chủ quyền về logic, governance, nâng cấp

Nhờ đó, kiến trúc này nâng cao khả năng mở rộng, đồng thời mở ra không gian sáng tạo lớn hơn cho developer.







# Reference 

[1] Orginial link: [https://medium.com/tokamak-network](https://medium.com/tokamak-network/exploring-data-availability-solutions-in-the-rollup-ecosystem-bc3a4a9a9a4b)

[2] [https://blog.celestia.org/modular-vs-monolithic-a-beginners-guide/](https://blog.celestia.org/modular-vs-monolithic-a-beginners-guide/)

[3] [https://www.symbolic.capital/writing/a-deep-dive-into-data-availability-the-promises-and-challenges-of-scaling-web3#other-da-players](https://www.symbolic.capital/writing/a-deep-dive-into-data-availability-the-promises-and-challenges-of-scaling-web3#other-da-players)