
Developing on PolkaVM with Ink!

> Bài viết này hướng dẫn bạn cách phát triển smart contract trên Polkadot bằng ink! một framework viết bằng Rust chạy bên trong máy ảo **PolkaVM**. Vì PolkaVM hỗ trợ giao diện Ethereum JSON-RPC, nên các smart contract viết bằng ink! (phiên bản 6) có thể chạy mượt mà trên đó. Nội dung cũng bao gồm hướng dẫn từng bước: cài đặt ink! v6, xây dựng và compile hợp đồng flipper, tạo dự án VIE để tương tác với PolkaVM, và tiến hành test.

Tôi nghĩ với mấy chương trình simple như sample, demo app, hay proof-of-concept trên testnet thì Solidity is enough. Nhưng thật lòng, nếu build app cho production thì Solidity không phải là language mình sẽ ưu tiên chọn.

Solidity works fine với simple logic. Nhưng khi cần xử lý processes phức tạp hơn một chút, thì cảm thấy Solidity có điểm thiếu sót. Lý do là do thiếu robust libraries, knowledge base còn hạn chế, và cộng đồng dev cũng không đủ lớn mạnh để support.


Tình huống này giống hệt như lúc TypeScript xuất hiện từ JavaScript. khi codebase grows bigger và phức tạp hơn, và yêu cầu maintainability, correctness tăng lên thì cần một ngôn ngữ phù hợp hơn.

Từ đó, việc dùng Rust để develop smart contracts là một công cụ cực kỳ powerful cho dev nào muốn build production-ready apps với độ tin cậy và hiệu quả cao.

![](https://img.learnblockchain.cn/2025/08/12/1RVdiLgpQ489KdnXFT-tkvw.png)


# Rust in Smart Contract

Hiện tại, nếu bạn muốn làm smart contract bằng Rust thay vì Solidity thì trên Ethereum ( Có thể nghiên cứu qua Arbitrum Stylus) nhưng cách khác là chọn WASM contracts trên Polkadot làm con đường thay thế để triển khai app riêng. Đây là chỗ Ink! framework mà hôm nay được giới thiệu. 

Rust cũng là language được dùng làm cho các smart contract trên Near, Solana, Sui...Tuy nhiên, khi làm WASM contract trên Polkadot, một giới hạn lớn là trừ khi bạn chơi cross-chain bridges, thì không có cách native nào để communicate trực tiếp với Ethereum smart contracts. 

Các chain của Polkadot thường chạy 2 VM riêng biệt, một cho EVM, một cho WASM contracts đều cùng trên một chain, nhưng việc share data giữa 2 cái này cực kỳ khó khăn về mặt kỹ thuật. (Có một giải pháp tên XVM, công nghệ inter-VM communication được team Astar phát triển, nhưng chưa phải hoàn hảo.)

# Vậy Ink! là gì? 

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hL8mP1y4PRSRL6GcahxJfg.png)

Phần trên là trích dẫn từ trang web chính thức của Ink!. Nói nhanh gọn thì mình hiểu Ink! là một môi trường phát triển smart contract cho phép bạn code bằng Rust. Muốn biết sâu hơn thì bạn cứ vào thẳng homepage chính thức của Ink! mà xem nhé. [https://use.ink/](https://use.ink/)



# Vậy lần này có gì mới? 

Đó chính là PolkaVM, một virtual machine dựa trên kiến trúc RISC-V. Muốn rõ hơn thì mình để link phía dưới cho bạn [tự khám phá nhé](https://docs.polkadot.com/polkadot-protocol/smart-contract-basics/polkavm-design/?source=post_page-----6b6aacbb48e1---------------------------------------).

Như trong diagram dưới đây, PolkaVM support Ethereum’s JSON-RPC interface luôn. Tức là dù nó không phải EVM thật sự, nhưng bạn vẫn có thể dùng nó như một EVM để tương tác với smart contracts. Dĩ nhiên, nó không hoàn toàn y hệt EVM, nên sẽ có vài điểm khác biệt, nhưng nhiều smart contract viết bằng Solidity được kỳ vọng chạy trên nó.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Jl9VhGiZE3N_nh5Q3hXnHQ.png)

Điều mình muốn nhấn mạnh nhất lần này là smart contracts viết bằng ink! (version 6) tức là contracts dev bằng Rust có thể chạy ngon lành trên PolkaVM.


* Reference link: https://blog.blockmagnates.com/polkavm-with-ink-6b6aacbb48e1

