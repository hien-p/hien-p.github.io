# Intro to Avalanche Subnets: Scalable, Custom Blockchains for Every Builder

> . Subnets basically cho phép bạn tạo blockchain riêng với luật chơi tự chọn: dùng gas token gì, bao nhiêu validator, tốc độ xử lý giao dịch nhanh hay chậm, v.v

# 1. Giới thiệu về Avalanche Subnets – Khi blockchain cần scale thực sự


**Số liệu – Phần 1: Vấn đề về thông lượng (Throughput)**
	
    •	17 TPS: số giao dịch mỗi giây mà Ethereum xử lý được.
	•	4.500 TPS: tốc độ xử lý hiện tại của Avalanche.
	•	24.000 TPS: khả năng xử lý giao dịch mỗi giây của Visa.

So với Ethereum, Avalanche rõ ràng nhanh hơn và rẻ hơn – nhưng chưa đủ. Để đáp ứng nhu cầu thực tế như thanh toán ở quy mô lớn (Visa xử lý tới 24.000 TPS) hoặc game có hàng triệu user mỗi ngày (như Call of Duty với 1-3 triệu DAUs), thì con số 4.500 TPS của Avalanche vẫn là chưa thấm.

**Số liệu – Phần 2: Vấn đề về nơi để phát triển (Dev environment)**
	
    •	10+: số lượng bridges đang kết nối các chain khác đến Avalanche.
	•	35: số lượng blockchain hiện có trên $50 triệu TVL (Total Value Locked).
	•	131: số lượng dApp có hơn $50 triệu được khoá trong protocol của họ.

Devs cần thêm nơi để build, không chỉ Ethereum hay Avalanche

Crypto giờ đã đa chuỗi (multi-chain) rõ ràng, không còn là lý thuyết nữa. Có hơn 35 chain và hơn 131 dApp vượt mốc $50 triệu TVL, tương đương với một thị trường hơn $50 tỷ USD.

Các dApp đang liên tục mở rộng sang các hệ sinh thái mới, nơi có phí gas rẻ, giao dịch nhanh, và môi trường linh hoạt để dev tha hồ sáng tạo. Nếu blockchain muốn tiến tới đại chúng (mainstream), thì việc cung cấp nhiều “đất diễn” hơn cho developer là điều bắt buộc.

Nếu crypto muốn scale thật sự, các blockchain phải scale. Và nếu muốn devs tiếp tục xây dựng những ứng dụng gas rẻ, giao dịch mượt cho người dùng – thì hạ tầng cần phải đáp ứng được.

Avalanche hiểu điều đó.

Và đó là lý do Avalanche tạo ra Subnets giải pháp mở rộng tích hợp ngay trong lõi của hạ tầng. Subnets chính là lời giải kết hợp cả Kết luận #1 (cần throughput cao hơn) và Kết luận #2 (cần môi trường phát triển mới cho dev) thành một cơ chế duy nhất và đặc biệt là cực kỳ dễ khởi tạo.

# 2. AVALANCHE IS A SUBNET, SUBNETS ARE AVALANCHE

Okay, giờ nói sơ về Avalanche trước. Avalanche là một mạng blockchain tương thích với EVM tức là nó hoạt động gần như y chang Ethereum, nhưng nó không chỉ là một chain duy nhất, mà được cấu thành từ ba blockchain riêng biệt.

*  C-Chain (Contract Chain): Đây là nơi dành cho developer triển khai smart contract bằng Solidity – ngôn ngữ quen thuộc bên Ethereum. Mọi dApp, NFT, DeFi protocol… đều được build trên C-Chain.
* 🛠 P-Chain (Platform Chain): P-Chain là nơi xử lý staking và consensus (theo cơ chế Proof of Stake), và đặc biệt: P-Chain chính là nơi tạo ra và quản lý Subnets
*  X-Chain (Exchange Chain): X-Chain được dùng để chuyển và trao đổi các token native của Avalanche


Nhìn tổng thể thì cấu trúc Avalanche sẽ như vầy:


![](https://substackcdn.com/image/fetch/$s_!4Y-Z!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7478dad1-eec2-4c11-ae1d-eaff3362e12c_1600x920.png)


**Sự kết hợp giữa C-Chain, P-Chain và X-Chain tạo nên “Primary Network”**

Khi gộp lại, ba chain C, P và X tạo thành cái mà ta gọi là Primary Network – chính là hình ảnh mà nhiều người nghĩ đến khi nhắc đến Avalanche.

Cấu trúc ba lớp này giúp giảm tắc nghẽn trên C-Chain (nơi smart contract hoạt động chính) và góp phần giữ phí gas của Avalanche luôn thấp hơn nhiều so với Ethereum.

Điều này rất tốt, nhưng chưa đủ và **đây là lúc Subnets xuất hiện**

Một Subnet trong hệ Avalanche là một mạng sovereign **tức là độc lập, tự chủ và tự quản**. Mỗi Subnet có thể định nghĩa luật chơi riêng của nó từ việc dùng gas token nào, ai được làm validator, số lượng TPS tối đa, tới cả cơ chế đồng thuận (consensus mechanism).

Thứ duy nhất bắt buộc để một Subnet được xem là “Subnet thuộc Avalanche” là Các validator của nó phải stake trên Primary Network (thông qua P-Chain).

> Nếu bạn còn rối thì cứ hình dung Subnets là hình chữ nhật. Primary Network là hình vuông một trường hợp đặc biệt của hình chữ nhật.

Tức là Primary Network chỉ là một loại Subnet cụ thể, với bộ rule riêng của nó. Nhưng các Subnet khác thì có thể “kéo giãn” – giống như những hình chữ nhật có chiều dài, chiều rộng khác nhau vậy. Mỗi Subnet có thể tự quyết định gas token là gì, staking yêu cầu bao nhiêu, consensus có cần permission hay không. Avalanche kỳ vọng rằng chính sự tự do này sẽ giúp developer xây dựng được những trải nghiệm tốt hơn, đủ sức phục vụ hàng triệu người dùng như các hệ thống Web2 hiện nay.

![](https://substackcdn.com/image/fetch/$s_!Nslb!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F13ad6781-991e-4ef7-be6a-35a39864c317_750x500.jpeg)


# Khả năng của Subnet

Avalanche xây dựng toàn bộ kiến trúc của mình dựa trên Subnets, và chính Subnets là thứ đã giúp Avalanche đạt được tốc độ xử lý lên tới 4.500 giao dịch mỗi giây (TPS) vượt trội so với Ethereum chỉ có khoảng 17 TPS.

. Trong lý thuyết (và cả thực tế với đủ điều kiện), một Subnet hoàn toàn có thể đạt 10.000 TPS nếu được thiết kế chuẩn, mà không cần tuân theo các luật lệ cứng nhắc của Primary Network.

Nói đơn giản: Subnet giống như một phiên bản Avalanche riêng biệt, được dev sử dụng để tạo nên trải nghiệm blockchain riêng. Trong đó, Subnet được toàn quyền:

	•	định nghĩa logic xử lý giao dịch (execution logic),
	•	chọn mô hình phí (fee regime),
	•	quản lý trạng thái (state),
	•	kiểm soát hạ tầng mạng (networking),
	•	và cả thiết lập cơ chế bảo mật (security) như một blockchain độc lập hoàn toàn.

Tất nhiên Subnet vẫn có một mối liên kết duy nhất với hệ sinh thái Avalanche đó là các validator của Subnet phải **đồng thời xác thực (validate) cả trên Primary Network.**. Khi nhiều dev muốn spin-up Subnet, họ sẽ triển khai validator riêng để hỗ trợ Subnet của mình (vì được hưởng lợi từ token model riêng), điều này kéo thêm validator mới về cho Primary Network tăng tính phân tán, độ bảo mật toàn mạng.


Điều này có lợi cả ba phía. Vì validator của Subnet buộc phải đủ năng lực để xác thực trên Primary Network giúp Subnet có hệ bảo mật đáng tin cậy ngay từ đầu. Thứ hai là Khi nhiều dev muốn spin-up Subnet, họ sẽ triển khai validator riêng để hỗ trợ Subnet của mình (vì được hưởng lợi từ token model riêng), điều này kéo thêm validator mới về cho Primary Network. Tặng tính phi tập trung cho toàn mạng. Và Validator có thể nhận thêm reward bằng cách tham gia bảo mật cho các Subnets mới (thường Subnet sẽ phát token reward riêng theo cơ chế Proof-of-Stake để thu hút validator)


> Subnets trong hệ sinh thái Avalanche khá giống với Rollups trong Ethereum. Tuy nhiên, có một điểm khác biệt là Subnets không chia sẻ execution (xử lý giao dịch), storage (lưu trữ dữ liệu) hay networking (mạng lưới) với Primary Network hoặc bất kỳ Subnet nào khác. Trong khi đó, Rollups luôn phải đổ dữ liệu về Ethereum mainnet để được bảo mật và xác nhận cuối cùng (finality). **Chính điều này tạo ra giới hạn về khả năng tương tác (interoperability) giữa các Subnet** nhưng [**Avalanche Warp Messaging (AWM)**](Avalanche-Warp-Messaging.md) đang được phát triển và hứa hẹn sẽ giải quyết bài toán này trong tương lai gần.


Để giải thích dễ hiểu hơn. Thì giờ tưởng tượng Avalanche là phần mềm Microsoft Word. Còn Subnets thì giống như các mẫu template có sẵn trong Word vậy.

![](https://substackcdn.com/image/fetch/$s_!_HCN!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6193f6f-41a6-401a-b252-b0db0d832e33_520x384.png)

Thay vì bắt đầu từ trang trắng, người dùng chỉ cần chọn mẫu → rồi dễ dàng tuỳ chỉnh theo mục đích riêng. Việc đơn giản hoá quá trình tạo blockchain là cực kỳ quan trọng.

# SUBNET VÀ NHỮNG THỨ ĐANG ĐƯỢC XÂY DỰNG

Một Subnet là môi trường cực kỳ lý tưởng cho các dự án muốn kiểm soát một trong các yếu tố sau đây:

	1.	Tokenomics: chọn xem người dùng sẽ dùng token nào để trả gas
	2.	Block Space: kiểm soát mức TPS cao hơn hoặc thấp hơn Primary Network
	3.	Access: tạo các hệ thống whitelist hoặc permissioned để ai được phép deploy smart contract
	4.	Execution (Virtual Machine): chỉnh các thông số xử lý giao dịch, tức là viết lại luật chơi của blockchain

Một vài điểm nhấn nổi bật từ Subnets:

*  [DeFi Kingdoms](https://defikingdoms.medium.com/introducing-the-crystalvale-realm-defi-kingdoms-is-coming-to-avalanche-d0730ba54b63) – ban đầu được build trên Harmony, nhưng sau đó dự án game Web3 này đã launch một Subnet riêng trên Avalanche tên là Crystalvale, để tối ưu hoá trải nghiệm người chơi. Nhờ vậy, người dùng được chơi game trên một blockchain được tùy chỉnh riêng cho gameplay. 

Bạn có thể xem qua *JEWEL Contract Address (Avalanche)*: 0x4f60a160d8c2dddaafe16fcc57566db84d674bd6

* Crabada:  Người chơi Crabada không cần lo phí gas cao hay phải chờ giao dịch confirm chậm chạp trên Primary Network
* Dexalot – một sàn giao dịch phi tập trung (DEX) được triển khai dưới dạng Subnet, cho phép người dùng giao dịch nhanh với phí thấp.



#  NHƯNG MÀ…

Luôn luôn có một chữ “nhưng” trong crypto. Các Subnet không thể giao tiếp với nhau một cách native.
Tức là, muốn chuyển tài sản/liquidity giữa các Subnet thì hiện tại vẫn phải dùng bridge. Điều này tạo ra ma sát và rủi ro.( điều này sẽ sớm thay đổi nhờ vào Avalanche Warp Messaging – AWM )


Rủi ro tập trung là có thật, đặc biệt khi build các Subnet theo kiểu permissioned (tức là có whitelist, giới hạn ai được vào).

Subnet phát triển không đồng nghĩa là hệ Avalanche cũng phát triển. Ví dụ: một Subnet cực thành công vẫn có thể “tách biệt” với hệ sinh thái Avalanche gốc nếu nó không tái đầu tư, không liên kết tokenomics, hay không mang người dùng về cho mạng chính.

Subnets đang phải cạnh tranh trực tiếp với các hệ dAppchain khác như Cosmos, Polkadot, hay các mô hình RollApps (dạng app-specific rollup).


Đó là toàn bộ lý thuyết nhanh về **subnets**.  Có thể chúng ta cũng sẽ tìm hiểu thêm để so sánh Subnets với:
* Cosmos Appchains
* Polkadot Parachains
* Optimistic Superchains

Nhưng giời thì cảm ơn bạn đã đọc đến đây. Đây là the Orginal link: https://lifi.substack.com/p/explaining-subnets-to-grandma

