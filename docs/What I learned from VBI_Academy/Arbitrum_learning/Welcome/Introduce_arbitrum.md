

# Giới thiệu về Arbitrum


[Video](https://youtu.be/UQqvO4SlUZ4)

Arbitrum là một trong những giải pháp mở rộng quy mô (scaling solution)ucủa Ethereum, nhưng ít ai biết rằng nó được khởi nguồn từ môi trường học thuật.

> Dự án được hình thành tại Đại học Princeton (Mỹ), nơi Giáo sư Ed Felten đã khởi xướng ý tưởng cùng với hai nghiên cứu sinh tiến sĩ của mình là Steven Goldfeder và Harry Kalodner.

Từ những thảo luận học thuật ban đầu vào năm 2015, đến năm 2018, nhóm nghiên cứu đã chính thức công bố một bài nghiên cứu chi tiết về giải pháp mở rộng Ethereum, đồng thời xin cấp phép thương mại hoá công nghệ từ Đại học Princeton. Từ đây, Arbitrum chính thức ra đời và tiếp tục phát triển mạnh mẽ dưới sự điều hành của công ty **Offchain Labs** – nơi cả ba người sáng lập cùng tham gia.

Vào tháng 8 năm 2021, Arbitrum đã huy động thành công **120 triệu USD** trong vòng gọi vốn Series B, đạt mức định giá **1,2 tỷ USD**, chính thức trở thành một kỳ lân (unicorn) trong ngành blockchain.

Mục tiêu trọng tâm của Arbitrum là giải quyết **vấn đề tắc nghẽn và chi phí cao của Ethereum**, đồng thời vẫn duy trì được các yếu tố cốt lõi như **tính bảo mật, tính phi tập trung, và khả năng tương thích với EVM.**


![https://pbs.twimg.com/media/GwPMeUIbkAALkVC?format=jpg&name=medium]()


Để hiện thực hóa điều này, Arbitrum sử dụng một giải pháp có tên gọi Optimistic Rollup – cơ chế giúp gộp nhiều giao dịch thành một cụm và xử lý ngoài chuỗi chính (off-chain), sau đó ghi lại kết quả lên Ethereum. Cách làm này giúp giảm tải cho mạng lưới Ethereum.

Hiện tại, hệ sinh thái Arbitrum bao gồm nhiều sản phẩm phục vụ các nhu cầu khác nhau trong Web3:

* Arbitrum One: mạng Layer 2 chính dành cho hầu hết các ứng dụng DeFi và dApps thông thường.
* Arbitrum Nitro: kiến trúc nâng cấp giúp cải thiện hiệu suất của Arbitrum One, giảm chi phí và tăng thông lượng.
* Arbitrum Nova: mạng chuyên biệt cho các ứng dụng có tần suất giao dịch cao như gaming và mạng xã hội.
* Arbitrum Orbit: framework cho phép các developer tạo Layer 3 chain tuỳ chỉnh, xây dựng hệ sinh thái riêng trên nền tảng Arbitrum.
* Arbitrum Stylus: môi trường lập trình mới cho phép viết smart contract bằng Rust, C và C++, mở rộng khả năng phát triển ra ngoài phạm vi của Solidity.

![](https://storage.googleapis.com/hackquest-gcs-prod-asia-northeast1/courses/6d9521f9-7953-4041-9548-64038a35362a/172cd9f1-c69f-49bc-8c93-3f59f594c7d3/0da030fd-4c40-4ef9-a10a-82585eed2990/3pJve-f_CIroY1XyaO7v-.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=hackquest-server-prod%40artela-hackquest.iam.gserviceaccount.com%2F20250730%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250730T101751Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=00ac4aa4288a5bc7a4fc53fe764e398f3635e866205d7b23ae3a15ab5cd4eb647add4e6e3c8e969a56b028b6e8f49b0e8d5591e6f793d98b5d43e57925aa8fe5ea57751a27c940265ac228a74a4725c023ca728f3167aecfaaa694044e4a584a23fe53de94de83033677dae765bd67256b0260921a0b2657af47ad05ee908766cd6fb490bba6c2753536284185d964d2fa627bf980191389f077bb7892509793680818d4d2fe8d9de52f215e0aa22fb1331a5e5edd2c30ad607ece6d579c8e43f1e425ffa78d808534a16b32f24080e78a623da68a43b0c72cd1f3c9be02f8d7b7690b8a563cd2593ad1305c053ea201d16c46ef45bd4103782d21911f82e460)


# What the heck is Arbitrum Stylus?

Arbitrum Stylus là một giải pháp Layer 2 được phát triển trên nền tảng Ethereum, cho phép dev viết smart contract bằng Rust (hoặc C/C++), thay vì chỉ dùng mỗi Solidity như trước đây. 

Stylus hoạt động dựa trên kiến trúc **Arbitrum Nitro**  nghĩa là nó thừa hưởng khả năng mở rộng, chi phí thấp và bảo mật từ Ethereum, đồng thời mang lại một môi trường mới mạnh mẽ hơn cho việc phát triển ứng dụng phi tập trung (dApps).





# Vì sao nên dùng Arbitrum Stylus?

## 1. Viết smart contract bằng Rust

Rust nổi tiếng là ngôn ngữ lập trình an toàn, nhanh và cực kỳ phù hợp cho các hệ thống đòi hỏi hiệu năng cao. Nếu bạn là dev đã quen với Rust, Stylus là cầu nối để bạn bước vào thế giới Web3 mà không cần học lại từ đầu.

## 2. Chi phí thấp, tốc độ cao

Stylus chạy trên Layer 2 nên giao dịch và triển khai contract có:

* Gas fee thấp hơn rất nhiều so với Ethereum mainnet
* Thời gian xử lý nhanh hơn, gần như tức thì

Điều này cực kỳ quan trọng cho các dApps cần xử lý nhiều giao dịch (DeFi, game, social…).

## 3. Bảo mật cao như Ethereum

Mặc dù hoạt động ngoài mainnet, Stylus kế thừa toàn bộ mô hình bảo mật từ Ethereum. Các giao dịch đều được xác thực và đảm bảo tính toàn vẹn, giúp bạn build ứng dụng Web3 mà vẫn giữ được sự tin cậy và phi tập trung.

