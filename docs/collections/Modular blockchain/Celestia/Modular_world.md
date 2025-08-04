# The Modular World

An article on the novel functionalities of Celestia and the future of the modular world: [https://rainandcoffee.substack.com/p/the-modular-world](https://rainandcoffee.substack.com/p/the-modular-world)

Bài viết này mình chỉ translate lại với mục dích research và học hỏi thêm. Bạn có thể đọc thêm từ bài gốc nhé.



# 1. Preface 

Vào năm 2019, khi Maven11 đầu tư vào LazyLedger (hiện tại là Celestia), thuật ngữ “modular” vẫn chưa được sử dụng rộng rãi trong lĩnh vực thiết kế blockchain. Trong vòng một năm qua, khái niệm này đã dần trở nên phổ biến hơ— nhờ vào những người như **polynya**, nhiều đội ngũ Layer 2, rất nhiều dev trong cộng đồng, và tất nhiên cả Celestia Labs đã đặt ra thuật ngữ này trong bài blog đầu tiên của họ với LazyLedger, khi nói về việc tách rời consensus và execution.


Nội dung này sẽ mang đến một góc nhìn rõ ràng hơn về toàn cảnh của modular blockchains mà chúng ta hình dung, các lớp (layers) và giao thức (protocols) cấu thành nên hệ sinh thái đó, và lý do tại sao tin rằng Celestia đang mở ra những tính năng đột phá chưa từng có trong ngành.


# 2. Về Architecture

Hiện nay, hầu hết các blockchain đang hoạt động công khai đều mang cấu trúc monolithic tức là “nguyên khối”. Nghĩa là một chain đơn lẻ tự đảm nhận cả ba chức năng: **data availability, settlement, và execution.**

Dù có một vài biến thể nhất định trong cách các chain tổ chức ví dụ như **rollups trên Ethereum hay subnets trên Avalanche**  cho thấy có yếu tố mô-đun ở đâu đó, thì nhìn chung, chúng vẫn không được xem là “modular blockchain” đúng nghĩa.

## 2.1 Vậy “modular” nghĩa là gì?

Để tránh hiểu nhầm, chúng ta cần làm rõ: khi nói “modular”, chúng tôi muốn nói đến một hệ thống **trong đó các lớp vốn thường được tích hợp lại được tách riêng (decoupled)**. Cụ thể là **ít nhất một trong ba thành phần chính (execution, consensus, data availability)** không còn nằm trong cùng một chain nữa.

Ví dụ: Rollups là mô hình modular vì chúng chỉ đảm nhận phần execution, trong khi Ethereum  với tư cách một chain nguyên khối vẫn chịu trách nhiệm cho consensus và data availability.


## 2.2 Celestia — Modular
Cho nên Celestia chính là một blockchain mô-đun đúng nghĩa. Nó chỉ đảm nhận data availability và consensus, còn execution và settlement được chuyển cho các lớp bên ngoài ví dụ như rollups hoặc các app-specific chains. Những lớp này cũng được xem là mô-đun, vì mỗi bên chỉ phụ trách một phần chức năng riêng biệt.


Ngược lại, Ethereum dù có tích hợp rollups vẫn là một chain monolithic, vì bản thân nó vẫn có thể tự xử lý execution. 

Rollups chỉ là “bổ sung” chứ không phải “thay thế”. Cho nên, dù rollups mang tính modular, Ethereum hiện tại vẫn vận hành như một chain nguyên khối.


## 2.3 Còn Polkadot và Avalanche thì sao?

Với **Avalanche** không hẳn là modular, mà là **hệ thống các mạng tách rời (subnets)**, mỗi cái đều có khả năng xử lý toàn bộ chức năng blockchain. Tức là nó **scale theo chiều ngang bằng cách nhân bản các chain nguyên khối** chứ không tách riêng từng chức năng.


Với **Polkadot** thì lại có nét giống rollups hơn các parachains chỉ lo execution, còn consensus và data availability được đảm nhận bởi relay chain. Tuy nhiên, relay chain vẫn tham gia xác thực tính hợp lệ của các giao dịch, mô hình này **không phải hoàn toàn tách rời như Celestia.**



## 2.4 Vấn đề của mô hình monolithic
Càng về sau, các chain nguyên khối càng đối mặt với **vấn đề tắc nghẽn và thiếu hiệu quả**. Nếu tất cả mọi thứ từ app DeFi, NFT, game, DAO… — đều chạy chung một chain, thì phí sẽ cao, tốc độ xử lý chậm, và trải nghiệm người dùng ngày càng tệ.

Chính vì vậy, ngày càng có nhiều blockchain đi theo **hướng tách nhỏ cấu trúc chain**. Ethereum là ví dụ rõ nhất sau **The Merge** chuyển sang Proof-of-Stake, họ còn có kế hoạch triển khai **sharding** chia blockchain thành các phần nhỏ, mỗi shard chuyên xử lý data availability. Khi kết hợp cùng rollups, đây là lời giải mà cộng đồng Ethereum đặt cược để giải quyết vấn đề mở rộng.


Để hiểu rõ hơn cách mà các kiến trúc “modular” vận hành trong thực tế, chúng ta hãy cùng phác hoạ sơ đồ kiến trúc của một số blockchain lớn hiện nay từ Ethereum, Avalanche, Cosmos đến Celestia để thấy rõ sự khác biệt về cách tách lớp (decoupling) trong hệ thống.


# 3.So sánh Kiến trúc: Từ Monolithic đến Modular



## 3.1 Ethereum: Từ Monolithic đến Sharded Settlement Layer
Hiện tại, Ethereum vẫn là một chain **nguyên khối (monolithic)**: tự đảm nhận **consensus, execution, data availability, settlement**. Tuy nhiên, một phần execution đã được **“outsource” sang các rollups L2**, sau đó tổng hợp (batch) dữ liệu và đẩy về Ethereum để xác thực và lưu trữ.

![](https://substackcdn.com/image/fetch/$s_!By2-!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4099ada-8b1c-4b35-a711-55e91013330f_2133x1890.png)


Trong tương lai, với sharding, Ethereum sẽ có kiến trúc như sau:

![](https://substackcdn.com/image/fetch/$s_!H3lI!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F09d526eb-dbb4-447f-8e78-6c35b4780ee6_1602x963.png)


* Ethereum mainnet trở thành lớp settlement thống nhất (unified settlement layer)
* Các shard sẽ đóng vai trò môi trường data availability dành cho rollups.
* Mỗi validator chỉ lưu trữ dữ liệu của shard mình phụ trách, thay vì toàn bộ chain → cho phép chạy light node như Celestia.


Ethereum vẫn giữ vai trò **trust anchor**, nhưng sẽ giảm gánh nặng DA và execution xuống các tầng dưới (rollup + shard).

## 3.2 Avalanche: Horizontal Scaling với Subnets

Avalanche mở rộng quy mô qua mô hình **subnet** tức là các **blockchain mới có thể được tạo dễ dàng**, mỗi cái được xác thực bởi một nhóm validator riêng biệt.

* **Mỗi subnet là một chain độc lập**: tự xử lý consensus, execution và data availability.
* Subnet có thể chọn token gas riêng (ví dụ: JEWEL cho subnet DefiKingdoms).
* Mỗi chain chỉ được xác thực bởi một subnet duy nhất.

![](https://substackcdn.com/image/fetch/$s_!Xd6v!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F403996b4-94da-4b34-b29f-bd1bee815b36_1900x1505.png)

Avalanche không thật sự modular vì mỗi subnet vẫn là một monolithic chain nhỏ, không có tách lớp rõ ràng.

## 3.3 Cosmos: Modular từ lớp Application

Cosmos không modular kiểu kiến trúc “layered”, mà modular ở lớp application layer:

* Dùng Tendermint (hoặc Optimint) để xử lý consensus + networking
* DApp không deploy vào một VM như Ethereum, mà viết riêng thành **một Cosmos SDK chain độc lập**
* ABCI (Application Blockchain Interface) là cầu nối giữa logic ứng dụng và consensus engine

![](https://substackcdn.com/image/fetch/$s_!N8Vk!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F4db697ec-7fc1-4778-89bb-b13938f74585_1248x698.png)

Cosmos chains vì vậy có thể:
* Định nghĩa transaction & state logic tùy ý
* Kết nối với nhau qua IBC để trao đổi dữ liệu/liquidity
* Triển khai nhanh một chain chuyên biệt, với tính năng độc đáo

->  Đây là mô hình modular về mặt logic ứng dụng, không phải modular về hạ tầng như Celestia.

## 3.4 Celestia: Shared DA + Consensus cho Modular Stack

Cuối cùng, ta đến với Celestia một blockchain không chạy ứng dụng, mà chỉ cung cấp:
* Data Availability Layer
* Consensus Layer

Celestia đóng vai trò là **lớp nền tảng dùng chung (shared base layer)** cho hàng loạt rollups ở tầng trên.

Hệ sinh thái Celestia có thể có:

![](https://substackcdn.com/image/fetch/$s_!vuKY!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F7e2f9451-04e7-4f64-8b93-658556d86f81_1248x1170.png)

Hệ sinh thái Celestia có thể có:

	•	Các sovereign rollups độc lập, không cần settlement layer
	•	Một số settlement layers trung gian giúp kết nối thanh khoản và bridge giữa rollups
	•	Các rollups tùy chọn môi trường execution riêng, tuỳ vào use case (game, DeFi, social…)



Như vậy bạn có thể hiểu Celestia đóng vai trò là lớp đồng thuận (consensus) và phân phối dữ liệu (data availability) dùng chung cho toàn bộ các loại rollups khác nhau trong mô hình modular stack.

Phía trên Celestia, có thể sẽ xuất hiện một số lớp settlement trung gian – làm nhiệm vụ kết nối, cung cấp thanh khoản và xử lý việc chuyển giao trạng thái giữa các rollups.

Sau khi đã phân tích các kiến trúc blockchain với mức độ modularity khác nhau từ monolithic, semi-modular đến fully modular thì giờ đến với nội dung với **mô hình hoàn toàn mô-đun như Celestia, chúng ta thực sự có thể làm được điều gì mới?**


## 4. Shared Security 

Một trong những ưu điểm dễ thấy của các blockchain monolithic là **mọi người dùng, ứng dụng và rollup vận hành trên đó đều thừa hưởng chung lớp bảo mật gốc của hệ thống.**

> Vậy điều này sẽ vận hành như thế nào trong một kiến trúc modular như Celestia?

Câu trả lời khá đơn giản **Celestia cung cấp chính lớp dữ liệu sẵn có (data availability layer)** là yếu tố cốt lõi giúp các chain có thể đạt được shared security một cách tự nhiên.


Trong mọi trường hợp, bất cứ layer nào sử dụng Celestia đều phải công bố toàn bộ dữ liệu giao dịch lên DA layer để chứng minh rằng dữ liệu thực sự đã được xuất bản (và không bị che giấu).

Điều này tạo ra một “trường thông tin chung” để quan sát, kết nối và chia sẻ dữ liệu.

Việc này cũng đơn giản hoá **quá trình fork (cả soft fork lẫn hard fork)**, bởi vì mọi dữ liệu và trạng thái đều được công bố công khai, minh bạch trên DA layer.

Celestia cho phép  triển khai các **execution layer mang tính thử nghiệm**, hoạt động song song  mà không cần phải dựa vào một lớp settlement cố định. Nhưng các layer đó vẫn kế thừa tính an toàn từ lớp DA dùng chung

Tính chất permissionless của modularity cho phép bất kỳ dev nào cũng có thể khởi chạy execution layer mới mà không cần xin phép, không bị rào cản kỹ thuật, và hoàn toàn tuỳ chọn stack phù hợp.

