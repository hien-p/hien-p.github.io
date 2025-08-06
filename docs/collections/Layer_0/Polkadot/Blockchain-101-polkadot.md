
Bài viết này sẽ giới thiệu triết lý thiết kế và kiến trúc của **blockchain Polkadot**, đặc biệt là cách nó hỗ trợ **Rollups**. Polkadot ra đời để giải quyết hai vấn đề kinh điển của blockchain truyền thống: **state fragmentation (phân mảnh trạng thái) và interoperability (khả năng tương tác)**, bằng cách triển khai một **relay chain** tối giản và hỗ trợ các **Rollups** có thể tùy biến cao (trước đây gọi là Parachains).



Logic của Rollup được định nghĩa bởi **runtime**, và có thể được xây dựng thông qua các công cụ như **Polkadot SDK và FRAME**. Đặc biệt, runtime có thể được lưu trực tiếp **on-chain**, cho phép nâng cấp mà không cần fork một điều cực kỳ “ngon” cho những ai đã từng khổ sở vì hard fork.


Mình recommend hết mình cho bất kỳ ai muốn học blockchain bài bản nên bắt đầu học Polkadot và nếu được thì join ecosystem của Polkadot luôn. Riêng mình hiện tại thì không.. 🥲 Tất nhiên là Polkadot vẫn evolve liên tục, còn mình thì… không catch up kịp.

Những bài viết này không chỉ dành cho bạn đọc mà giúp chúng ta cùng hiểu rõ blockchain này.

Enough intro rồi ha =V

---

# Rollups Review: Let’s rewind a bit

Tụi mình đã nói đến khái niệm Rollups  hay còn gọi là layer 2s (L2s). Hiểu nôm na, một Rollup là một công nghệ DLT (distributed ledger technology) mà phần consensus (đồng thuận) sẽ được delegate về cho blockchain cha, hay còn gọi là L1 (layer 1).

Người ta thường mô tả Rollup kiểu như:

> “L2 inherits the security of L1” nói cách khác là bảo mật của L2 theo L1 

không biết có phải chỉ do bản thân mình không nhưng mỗi khi ai đó nói về **Rollups là auto nghĩ tới Ethereum ecosystem**.  Và cũng dễ hiểu thôi, vì danh sách Rollups trên Ethereum rất là nhiều.


Nhưng sự thật là **Rollup** là một khái niệm tổng quát hơn nhiều. Thậm chí Bitcoin cũng có L2 ví dụ như **Rootstock** hay **Lightning Network** và gần đây [bên Solana cũng bắt đầu lộ diện vài mô hình L2](https://solanacompass.com/projects/category/infrastructure/scaling).

Vấn đề lớn là các L1s đời đầu không sinh ra để chơi với Rollups. Vì nó đều được thiết kế như một **hệ thống độc lập** và điều đó hoàn toàn hợp lý ở thời điểm đó – bởi concept Rollup còn chưa tồn tại. Nhưng điều này dẫn đến một loạt hệ quả, nổi bật nhất là **State Fragmentation** tức là mỗi L2 sẽ có state riêng biệt, không ăn nhập gì nhau. Bạn có thể hình dung mỗi Rollup như một vũ trụ song song: dữ liệu, tài sản, người dùng… nằm tách biệt hoàn toàn.

Và điều này kéo theo vấn đề lớn hơn **Chuyển tài sản từ L2 này sang L2 khác cực kỳ khó.** Mà Rollups thì lại được xem như hệ độc lập (so với nhau), nên không ai design interoperability ngay từ đầu cả

> Nếu hồi xưa chúng ta đã biết Rollup sẽ quan trọng thế này, tại sao không xây luôn một blockchain sinh ra để phục vụ Rollups? Một nền tảng mà native support Rollups, full interoperability? 


