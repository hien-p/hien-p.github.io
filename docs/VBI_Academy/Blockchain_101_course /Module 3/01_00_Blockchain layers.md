#  Layer 0, 1, 2, 3 - Hiểu Kiến Trúc Blockchain 

Mục tiêu Lesson: Giải thích mô hình kiến trúc phân lớp của Blockchain, tập trung vào cách các giải pháp Layer 2 và Layer 3 giúp cải thiện khả năng mở rộng và hiệu suất của Layer 1.

![](https://www.solulab.com/wp-content/uploads/2025/06/Blockchain-Layer-0-L1-L2-and-L3-scaled.webp)


> What are Layer 1 to Layer 3 doing?



# Why do we need so many layers?

“Layer” hiểu đơn giản là tầng trong hệ sinh thái blockchain, giống như cách mạng Web2 có mô hình 4 tầng TCP/IP: mỗi tầng lo một việc, từ gửi gói tin cho tới hiển thị web.

Trong blockchain, cũng vậy. Hệ sinh thái thường được chia làm nhiều tầng, và mỗi tầng là đất sống của hàng loạt dự án khác nhau. Hình trên minh hoạ về các layers. 

Bitcoin và Ethereum ưu tiên decentralization + security lên hàng đầu. Chính nhờ đó mà chúng đảm bảo được tính open, neutral, anti-censorship. Nhưng đổi lại, khả năng mở rộng (scalability) sẽ kém. 

Vì thế nên devs mới tìm mọi cách để scale blockchain lên mà không phá vỡ trilemma. Một hướng phổ biến nhất là đưa phần tính toán ra off-chain (ngoài chain), chỉ để phần xác minh và lưu trữ lại on-chain. Đây chính là lý do ra đời của Layer2. Bên dưới là sơ đồ kiến trúc phân tầng: 


![](https://img.learnblockchain.cn/pics/20230209171636.png)

#  Layer 0 – khả năng tương tác liên chuỗi( inter-chain interactions)

Chúng ta sẽ bắt đầu phân tích từ tầng thấp nhất trong kiến trúc Web3 là Layer 0. Layer 0 có thể được xem như là tầng vật lý (physical layer) trong mô hình Internet truyền thống. Vì Layer 0 đóng vai trò là hạ tầng liên kết và hỗ trợ tương tác giữa nhiều Layer 1 khác nhau.

Các chức năng chính được triển khai ở tầng Layer 0 bao gồm:

* Kết nối và tương tác giữa các blockchain khác nhau (Layer 1):
Layer 0 tạo điều kiện cho các blockchain độc lập có thể giao tiếp, chia sẻ dữ liệu hoặc tài sản, thay vì bị cô lập như trước đây.

* Tốc độ giao dịch nhanh hơn, chi phí rẻ hơn:
Nhờ cấu trúc thiết kế từ tầng hạ tầng, Layer 0 có thể hỗ trợ Layer 1 xử lý giao dịch hiệu quả hơn, từ đó giảm chi phí và tăng throughput.

* Cung cấp hạ tầng để dễ dàng triển khai blockchain mới:
Layer 0 thường cung cấp công cụ, SDK, framework để developers có thể tạo ra Layer 1 của riêng họ mà không phải xây lại từ đầu.


Những dự án tiêu biểu của Layer 0: 

* **Cosmos**: Với kiến trúc **IBC (Inter-Blockchain Communication)**, Cosmos cho phép các blockchain độc lập “nói chuyện” với nhau dễ dàng. Nổi bật với hệ sinh thái như **Osmosis, Oraichain...**
* **Polkadot**: Sử dụng mô hình **relay chain + parachains**, giúp nhiều chain chạy song song, kết nối mượt mà. Developer có thể build chain riêng thông qua **framework Substrate**.

* **Avalanche**: Mặc dù thường được nhắc là Layer 1, nhưng kiến trúc multi-chain của Avalanche **(X-Chain, C-Chain, P-Chain)** mang nhiều yếu tố Layer 0. Nó cho phép khởi tạo subnet riêng cho từng ứng dụng.

* **Cardano**: Dù thường được gọi là Layer 1, nhưng mục tiêu dài hạn của Cardano là phát triển thành một nền tảng đa chuỗi, hỗ trợ nhiều dApp và blockchain vận hành song song.


# Layer 1 Thực thi (execution) và xác nhận cuối cùng (final settlement) của các giao dịch.

Layer 1 chính là tầng blockchain quen thuộc nhất với tất cả chúng ta nơi diễn ra việc thực thi (execution) và xác nhận cuối cùng (final settlement) của các giao dịch.

Các blockchain như **Bitcoin, Ethereum, BNB Chain, Solana, Sui, Aptos…** đều là những ví dụ điển hình thuộc Layer 1.

Ở tầng này, mỗi blockchain sẽ:

* Tự xử lý giao dịch của chính mình
* **Thiết lập cơ chế đồng thuận dữ liệu (consensus)** thông qua các thuật toán như **Proof of Work (PoW) hoặc Proof of Stake (PoS)**..
* Ghi dữ liệu giao dịch lên chain để tạo thành sổ cái bất biến

Layer 1 cũng là nơi xuất hiện tam giác bất khả thi (blockchain trilemma) nổi tiếng. Bởi vì Một blockchain khó có thể đồng thời đạt được cả 3 yếu tố:

* Scalability – khả năng mở rộng để xử lý nhiều giao dịch
* Security – bảo mật chống lại tấn công
* Decentralization – phân quyền, không bị kiểm soát bởi một bên

Thông thường, nếu một chain tăng tốc độ (scalability), thì phải đánh đổi phần nào tính phi tập trung hoặc bảo mật và ngược lại. 

Ví dụ:
* Bitcoin ưu tiên bảo mật và phân quyền → rất chậm
* Solana tối ưu hiệu suất cao → giảm phần nào tính phân tán


## Self-improvement in ethererum 

Nhìn vào Ethereum Roadmap, ta thấy Ethereum đang đi theo hướng tối ưu hoá từng lớp của hệ thống, mà nổi bật nhất là 

* **SSF (Single Slot Finality)** sẽ là cơ chế sản xuất block mới với mục tiêu là tăng security + stability cho mạng lưới. Đây chính là trung tâm của quá trình nâng cấp cơ chế đồng thuận (consensus).

* **DA (Data Availability)** là vấn đề sống còn cho tương lai các ứng dụng, đặc biệt trong bối cảnh Layer2 phát triển mạnh. Ethereum Layer1 buộc phải giải quyết bài toán này để không trở thành bottleneck.

EVM thì vẫn đang được liên tục upgrade qua từng bản cập nhật..


![](https://img.learnblockchain.cn/attachments/2024/03/ZAr9vwtW65e9ccff091ed.png)

## Developer activity

Một trong những điều kiện tiên quyết để một hệ sinh thái Layer1 được chấp nhận rộng rãi là sự hiện diện của một cộng đồng lập trình viên mạnh mẽ.

Nếu không có các nhà phát triển xây dựng sản phẩm, sẽ không có gì để người dùng tương tác và sử dụng.

![](https://substackcdn.com/image/fetch/$s_!zdsw!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F1bf2ec1f-77e2-4db3-b9f1-0b9050cc22e8_685x324.png)



# Layer 2: Scaling based on Layer1

Một trong những vấn đề lớn của Ethereum là TPS (transaction per second) quá thấp, chỉ khoảng 15–45 giao dịch mỗi giây. Kết quả là Gas fee cao, trải nghiệm tệ và các Dự án khó scale để cả hệ sinh thái phát triển chậm.

Vì vậy ta cần một giải pháp mở rộng và đó là lý do Layer 2 ra đời. Hiểu đơn giản thì Layer 2 là **các giải pháp mở rộng chạy song song với Layer 1**, hoạt động như một “phụ tá” giúp xử lý giao dịch nhanh và rẻ hơn. Sau khi xử lý xong, kết quả sẽ được đưa trở lại Layer 1 để lưu trữ vĩnh viễn (final settlement).

Layer 2 giúp Ethereum (và các Layer 1 khác) nâng cao TPS mà không phải hy sinh bảo mật hay phi tập trung

Một số dạng Layer 2 phổ biến:

* **zkRollup (Zero-Knowledge Rollup)**: sử dụng bằng chứng mật mã để chứng minh giao dịch hợp lệ, rất bảo mật, dữ liệu nén cực tốt.

* **Optimistic Rollup (opRollup)**: giả định mọi giao dịch là hợp lệ

* **Sidechain**: chuỗi chạy song song, tự có cơ chế đồng thuận riêng, độ an toàn phụ thuộc vào thiết kế từng chain.

# Layer 3: Pure application layer

Đây còn được gọi là lớp ứng dụng, là một lớp blockchain được xây dựng trên Layer 2 (và gián tiếp trên Layer 1). Nó tập trung vào việc cung cấp môi trường cho các ứng dụng phi tập trung (DApps) 

Hiện tại, hầu hết các layer 3 đều được xây dựng trên Ethereum: 

![](https://img.learnblockchain.cn/attachments/2022/11/7QUUBQQx637ad3b461c3b.png!/scale/40)


**Vitalik** từng [chia sẻ một vài định nghĩa khá kỹ thuật về Layer 3](https://vitalik.eth.limo/general/2022/09/17/layer_3.html), dù không nói rõ nó sẽ “dùng để làm gì” trong thực tế. Nhưng từ bài viết đó, có thể tóm gọn thành 3 góc nhìn về L3 như sau:

* L2 để scale, L3 để tùy biến (custom features): Ở góc nhìn này, Layer2 đóng vai trò mở rộng TPS (throughput), còn **Layer3 sinh ra để phục vụ các nhu cầu riêng** ví dụ như **privacy, compliance**, hoặc các tính năng đặc thù của Dapp. L2 thì lo phần performance chung, còn L3 là sandbox cho mỗi ứng dụng tự tối ưu theo style riêng.

* L2 = general scaling, L3 = customized scaling: Vitalik đưa ra hướng phân biệt theo dạng scaling. L2 thì kiểu **EVM-compatible**, phục vụ chung cho mọi loại dApp. Còn **L3 thì thiên về kiểu application-specific**, tức mỗi app có thể tự chọn cách tính toán, format data riêng, thậm chí xài non-EVM VM.



* L2 = trustless (rollups), L3 = weak trust (validiums): Ở vision này, L2 thì là  fully trustless, giống như rollup: mọi thứ được xác minh và dữ liệu luôn công khai. Còn L3 sẽ là **semi-trust**, như **Validium** vẫn dùng SNARK để đảm bảo đúng sai, nhưng phần data availability thì phụ thuộc vào 1 bên thứ 3 hoặc hội đồng tin cậy.

Vitalik cho rằng **validium bị undervalued**, dù nó cực kỳ hợp với các use case enterprise, các mô hình kiểu doanh nghiệp chỉ cần đảm bảo dữ liệu được chứng thực, nhưng không cần phải công khai toàn bộ transaction ra public.

