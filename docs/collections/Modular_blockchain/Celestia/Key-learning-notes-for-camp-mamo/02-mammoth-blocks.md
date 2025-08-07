# MAMMOTH BLOCKS = MAMMOTH UNLOCKS

## Mục tiêu của bài học này:

> Trả lời câu hỏi: **"How do Celestia's 'mammoth blocks' benefit developers compared to traditional small blocks?"**

---

## 1. Mammoth Blocks = Băng thông siêu to khổng lồ

Celestia có khả năng mở rộng ấn tượng nhờ băng thông xử lý block cực khủng. Từ giới hạn 8MB/block trên mainnet hiện tại, Celestia đã mở rộng lên 128MB trên testnet `mamo-1`, và đang hướng đến mục tiêu 1GB/block trong tương lai gần. Với tốc độ xử lý khoảng **21.33MB mỗi giây**, Celestia đang thiết lập một chuẩn mới cho hạ tầng blockchain modular.

Điều này mở ra cánh cửa mới cho dev:

> Không còn bị bóp nghẹt bởi block size truyền thống.
> Có thể xây các ứng dụng full on-chain phức tạp như:

* Mạng xã hội lưu trữ toàn bộ dữ liệu on-chain
* Prediction markets
* Advanced DeFi protocols

---

## 2. Những khái niệm bạn cần biết:

### 🧱 Mammoth Blocks

Celestia hỗ trợ block cực lớn (từ 128MB trở lên), lý tưởng cho các ứng dụng stateful có tần suất tương tác cao, yêu cầu lưu trữ dày đặc.

### 🚀 Vacuum Protocol

Giao thức truyền tải dữ liệu thế hệ mới. Thay vì truyền dữ liệu theo kiểu push/gossip truyền thống, Vacuum sử dụng mô hình **pull-based**. Node chỉ nhận data khi **yêu cầu**, giúp giảm latency và tối ưu băng thông.

* Sử dụng **lazy gossiping**: chỉ gửi dữ liệu khi được hỏi → tiết kiệm cực mạnh.
* Kết hợp với **VACs (Validator Availability Certificates)** để pipeline dữ liệu trước cả khi block được tạo.
* Truyền dữ liệu kiểu "prep trước, race sau" → tốc độ khủng mà vẫn mở rộng tốt.
* Đặc biệt, Vacuum không cần biết trước topology mạng → linh hoạt mọi tình huống.

### ⏩ FBSS – Fast Blocks, Slow Squares

Một bước đột phá về kiến trúc:

> Tách block production ra khỏi square construction.

Trong thiết kế truyền thống, block và square là 1. Nhưng điều đó khiến block time bị kéo dài vì cần thời gian để xây square đủ lớn để sampling hiệu quả.

Với **FBSS**:

* Có thể tạo block siêu nhanh (sub-second block time)
* Square vẫn được xử lý, nhưng trong chu trình riêng, chậm hơn (30s+)
* Light client hưởng lợi → chỉ cần xử lý ít dữ liệu khi sampling

Hiện tại, FBSS chưa được triển khai full-stack trong Mammoth Mini, nhưng team đã **simulate** bằng cách dùng **Merkle tree đơn giản của txs** để commit block.

### 🧬 Based Rollups

Rollup có thể tận dụng Celestia để sequencing → kế thừa finality nhanh → giảm latency, tăng UX cực mạnh. Cực kỳ phù hợp cho game, DeFi real-time hoặc social.

### 🔍 Verification > Trust

Light node không cần trust ai. Họ có thể **tự verify** data availability qua sampling, thay vì chạy full node. Điều này mở ra tương lai nơi bạn có thể verify blockchain từ... điện thoại.

---

## 3. Mamo-1 là gì?

`mamo-1` là public testnet mới của Celestia, được dựng lên trong đúng 3 tuần. Đây không phải bản demo lý thuyết, mà là mô phỏng thực chiến để:

* Đẩy thông lượng lên cực hạn
* Test khả năng chịu tải mạng lưới
* Phát hiện bottleneck
* Tối ưu performance thực tế

### Thông số:

* Block size: 128MB
* Block interval: 6s
* Throughput: \~21.33MB/s

→ Nhanh hơn mainnet hiện tại (8MB/block) tới **16 lần**.

---

## 4. Vacuum Protocol Explained

Vacuum là giao thức truyền block với:

* **Lazy gossip**: chỉ gửi khi được hỏi → tiết kiệm cực mạnh
* **VACs**: Validator báo trước đã nhận blob data → giúp proposer tối ưu pipeline tạo block

### Cơ chế Pull-Based Broadcast Tree (PBBT):

* Một dạng cây truyền dữ liệu theo mô hình pull
* Giúp phục hồi block nhanh và hiệu quả

> Vacuum giống với DAG-based protocols ở tư duy pipeline, nhưng **đơn giản và hiệu quả** hơn, không cần biết topology mạng như Turbine (Solana).

### JIT Routing (Just-In-Time)

* Khi truyền blob, hệ thống sẽ tự khám phá tuyến đường tối ưu dựa trên:

  * Latency
  * Congestion
  * Trust level giữa peers

→ Khác với AOT (Ahead-of-Time) routing cứng nhắc, JIT routing cực kỳ linh hoạt và phù hợp với Web3 environments đầy biến động.

**Cảnh báo:** Lazy gossip tuy hiệu quả, nhưng cũng mang lại một chút latency. Đây là trade-off có chủ đích: hy sinh tốc độ tức thì để đổi lấy **khả năng mở rộng ổn định, băng thông mạnh và hoạt động tốt trong mạng không đồng đều**.

[Đọc thêm về Vacuum tại đây](https://github.com/celestiaorg/celestia-app/blob/e666c7d38940ef32c475d8347eee301fa91fe327/specs/src/vacuum.md?ref=blog.celestia.org#vacuum-spec)

---

## 5. Vì sao dev nên quan tâm đến mamo-1?

* Rollups có thể xử lý block lên tới **32MB**
* Có thể tạo block **permissionless**
* Light node có thể verify từ **trình duyệt hoặc mobile**

> Dev không cần lo chuyện scaling hay infra nữa, chỉ cần **tập trung build sản phẩm**.

---

## Tóm lại:

Celestia đang định nghĩa lại cách blockchain mở rộng bằng:

* Mammoth Blocks
* Vacuum Protocol
* FBSS
* Based Rollups
* Trustless light clients

Với mamo-1 testnet, dev có thể hình dung chính xác những gì Celestia **có thể làm được** trong thực tế. Đây không còn là lời hứa – nó đang xảy ra.



--- 
Advanced: Who has the fastest block propagation? 

![](https://pbs.twimg.com/media/GoBlS6RasAA8A6M?format=jpg&name=medium)

Cả Solana, Monad và Celestia đều chia block thành các mảnh nhỏ được mã hóa (erasure coded) rồi phân phối cho validators không phải leader.

Solana và Monad dùng cơ chế push — leader chủ động gửi block tới validators, ưu tiên tốc độ finality bằng cách để những validator có stake cao nhận data sớm và bắt đầu xác minh ngay.


Ngược lại, Celestia với giao thức Vacuum! chọn cách pull — các validator tự yêu cầu phần dữ liệu còn thiếu, giúp giảm tải cho proposer (chỉ cần upload ~1x dung lượng block), tối ưu cho throughput thay vì tốc độ finality.


Cấu trúc chung của data pipeline:

Mỗi mạng blockchain thường có 2 pha xử lý dữ liệu:
(1) Preparation – giai đoạn chuẩn bị trước khi block được tạo
(2) Dissemination – giai đoạn phân phối dữ liệu sau khi block được tạo

Ở pha chuẩn bị, Solana dùng hệ thống Gulfstream kết hợp với swQOS. Điểm đặc biệt là Solana không có global mempool như các chain khác — thay vào đó, mỗi leader duy trì một local mempool riêng. Điều này giúp tránh được overhead từ việc gossip nhiều hop trong mempool lớn, từ đó giữ cho mạng luôn ở tốc độ cao mà không overload node.

Ứng dụng sẽ gửi transaction đến RPC node, sau đó node này sẽ gửi trực tiếp (chỉ 1 hop) tới một vài leader kế tiếp qua Gulfstream. Do lịch trình leader được biết trước, nên validator nào cũng có thể chủ động route tx tới leader sắp tới. Để chống spam, leader sẽ ưu tiên xử lý tx đến từ validators có stake cao hơn đó chính là logic của swQOS (stake-weighted Quality of Service).

Khi bước vào pha phân phối, Solana dùng Turbine — một engine truyền block theo mô hình cây (tree-based fanout). Trong khi leader đang build block, dữ liệu block được chia thành các mảnh nhỏ gọi là shreds (~1280 bytes mỗi shred), sau đó gửi đi. Điều này cho phép các bước verify và voting được pipeline luôn khi block chưa build xong.

Cụ thể: Leader gửi shreds đến root node thì root chia validators thành các tầng dựa theo stake → những validator có stake cao nhận shred trước, sau đó forward xuống tầng dưới. Với fanout mặc định là 200, phần lớn validator sẽ nhận được dữ liệu chỉ sau 2–3 hops (leader → root → L1 → L2).

---

Celestia lại chọn hướng tiếp cận khác là tối ưu cho throughput thay vì latency. Không giống như Turbine (Solana) hay RaptorCast (Monad)  đều là cơ chế **push**. Celestia dùng **Vacuum!**, một mô hình pull-based, cho phép thiết lập liên lạc kiểu just-in-time giữa các node.

Ở pha chuẩn bị, thay vì gửi full txs, validators trên Celestia sẽ sync mempool thông qua một loại chứng chỉ tên là VAC (Validator Availability Certificate). Đây là lời hứa của validator rằng họ đang giữ một tx nào đó và sẽ đảm bảo tx đó có sẵn đến một độ cao block nhất định.


VAC hoạt động như một dạng pre-announcement: thay vì đẩy tx ra mạng, validator chỉ cần phát tán VACs để thông báo **“tao đang giữ tx này, đứa nào cần thì hỏi”**. Việc này giúp mạng biết nhanh các tx quan trọng mà không bị ngập vì payload lớn.


![](https://pbs.twimg.com/media/GoBlbKqbwAA4KXY?format=png&name=small)


Ở thời điểm  Data Retrieval, khi node cần dữ liệu, nó chủ động đi xin. Khi một node thấy VAC từ validator khác mà nó chưa có dữ liệu, nó sẽ quyết định có nên đi fetch hay không.

Chính sách của Vacuum! là **luôn lấy ít nhất VAC đầu tiên (tx quan trọng nhất)** từ mỗi validator mới thấy lần đầu. Còn các VAC tiếp theo thì chỉ fetch nếu node còn đủ băng thông, hoặc nếu tx đó quan trọng hơn những tx nó đang định drop.


Để lấy dữ liệu, node gửi một yêu cầu có tên **‘WantBlob’** đến peer đang giữ blob. Peer sẽ gửi lại blob đó, chia thành từng chunk nhỏ. Điều thú vị là ngay khi node bắt đầu tải blob về, nó sẽ gossip VAC đó ra cho những node khác, tạo ra một chuỗi fetch pipeline theo nhu cầu.

Mô hình lazy gossiping kiểu này tránh được việc truyền dữ liệu trùng lặp, giúp mỗi tx chỉ chảy qua mạng đúng một lần, theo tuyến đường tối ưu  vừa tiết kiệm, vừa tăng throughput.

![](https://pbs.twimg.com/media/GoBlcIPbwAAbSrp?format=png&name=900x900)

Vì mempool đã được sync kỹ nhờ VACs từ trước, nên khi leader chuẩn bị tạo block, phần lớn dữ liệu đã nằm sẵn ở các validator.

Leader lúc này chỉ cần broadcast một compact block cực nhẹ, gần như không tốn băng thông.

Compact block gồm 3 phần chính:

* Cam kết (commitment) với danh sách txs trong block
* Bitmap thể hiện những tx nào leader có thể cung cấp nếu cần
* Metadata để mapping chunk so với dữ liệu thực

Sau khi nhận compact block, các validator sẽ check xem mình có đủ data chưa. Nếu thiếu, họ yêu cầu phần parity data còn thiếu để reconstruct lại block. Vì mỗi node đã có đủ dữ liệu từ trước. Lúc này, leader không cần truyền gì thêm ngoài compact block.

**Đây là actual black magic của Vacuum!**

