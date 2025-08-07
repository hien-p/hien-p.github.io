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
