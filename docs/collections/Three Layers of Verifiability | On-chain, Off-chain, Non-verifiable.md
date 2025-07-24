

# (verifiability) là lợi thế lớn nhất của crypto.

The original link(english): https://x.com/paramonoww/status/1948064814439207010

Bitcoin và Ethereum đã mang lại cho chúng ta `verifiable money` (tiền có thể kiểm chứng được) và `verifiable finance` (tài chính có thể kiểm chứng được). Nhưng bước tiếp theo liên quan đến tính kiểm chứng sẽ rất khác so với 2 cái trước đó.

Điểm chung của Bitcoin và Ethereum là Dạng verifiability mà chúng cung cấp đều diễn ra trong crypto environment, cụ thể là trên môi trường on-chain.  Tức là việc bạn kiểm tra, xác minh thông tin đều xảy ra trong một hệ kín – nơi mọi thứ đã được chuẩn hoá bởi blockchain.


Sau khi mọi người thật sự cảm được sức mạnh của on-chain verifiability (khả năng kiểm chứng on-chain), đã có một thời kỳ mà ai cũng nghĩ: “Mọi thứ đều nên on-chain!”. Từ game, app chat, nhạc, news... tất tần tật app truyền thống đều bị… quăng lên chain.


> During that mania, few people said: "Why does it have to be on the blockchain?".

Những builder từ TradFi hay IT truyền thống cũng lao vào crypto, xây lại y chang thứ họ đã quen, chỉ khác là “trên chain”. Kết quả là 90% fail. Mà thật ra là gần như chẳng cái nào sống sót cả.

Câu hỏi đó sau này thành meme, và câu trả lời cũng viral không kém:

> "it doesn’t have to be on the blockchain".

Cả câu hỏi lẫn câu trả lời… đều sai 

# (1) Vấn đề đầu tiên: Mọi người không thật sự hiểu core value của crypto

Bởi vì mindset phổ biến của mọi người là cứ cái gì on-chain là auto tốt hơn cái off-chain, đơn giản chỉ vì nó dùng kiến trúc phi tập trung.

Công bằng mà nói ta có điểm mạnh là  decentralized infra, trustless, permissionless các kiểu và điểm trừ là  xử lý chậm, tốn gas, không scale nổi những thứ phức tạp. Từ đó dễ kết luận là on-chain app là xịn vì dùng decentral infra

Nhưng thật ra, cái giá trị lớn nhất không nằm ở decentral infra. Giá trị thật nằm ở cái `verifiability` mà hạ tầng đó mang lại. Tức là không phải cái gì chạy trên chain cũng tốt. Chỉ khi nào bạn thật sự cần tính kiểm chứng minh bạch (verifiability), thì on-chain mới đáng.

Việc build toàn bộ logic ứng dụng on-chain nghe thì có vẻ “thuần crypto”, nhưng thực tế là thiếu hợp lý vì nhiều lý do:

* Bị giới hạn bởi software chỉ chạy trong 1 VM cụ thể (ex: EVM, MoveVM…)
* Bị trói buộc bởi phần cứng của mạng blockchain (giới hạn compute, storage, bandwidth…)
* Phải tuân theo consensus protocol hiện tại 
* Giao tiếp với thế giới bên ngoài hạn chế

Có thể bạn sẽ bảo smart contracts có thể lấy data từ ngoài qua `oracles`. Nhưng bản thân oracles lại có vấn đề trust và data đó thì ai cũng thấy, vì blockchain là transparent by design.

Nên nếu bạn muốn  Lấy data public thì ok. Nhưng nếu bạn muốn đưa vào một dữ liệu private để xử lý? 

Điều mạnh nhất mà crypto mang lại chính là verifiability tức là người dùng có thể tự kiểm chứng tính đúng đắn, toàn vẹn, tính xác thực của bất kỳ hành động nào trong hệ thống.


Như đã nói không phải cái gì cũng nên (hoặc có thể) nhét lên on-chain. Nó slow, expensive, hoặc đơn giản là impossible. 

> You cannot just put expressive and complex instructions (code) onchain. Copy and paste doesn’t work in that case. 


# (2) Nếu không thể build toàn bộ infrastructure on-chain, thì… liệu ta có thể đưa một phần lên không?

> Có phải mọi ứng dụng đều cần tính verifiability (xác minh được)?

Không. Nhưng đa số thì có. Lấy ví dụ twitter cần verifiability cho: 
* Tính tiền quảng cáo (để creator biết mình có bị ăn chặn không)
* Đếm số view thật sự (để tránh bị bot spam)
* Trending topics
* Và nhiều thứ khác nữa 


Có người sẽ nói: 
> Ai lại đem Twitter lên blockchain?

Không ai đem cả Twitter lên on-chain được vì không thể gọi API để fetch dữ liệu ngoài. Không chạy được bot-detection hay machine learning và Không xử lý được các tính toán phức tạp


Cái bạn có thể làm chỉ là viết một smart contract đơn giản tính tiền payout dựa vào view count nhưng view đó dễ bị bot giả mạo.


Giờ xét tới những hệ thống phức tạp hơn như AI: 
> “Một tác vụ càng dễ xác minh → càng dễ huấn luyện AI để làm được.”

Ví dụ: 
* Gửi coin → dễ → có thể verify on-chain
* Training AI model → cực nặng


Nhưng vậy có phải ta bỏ cuộc không? Không hề. Thay vì nhét toàn bộ app logic lên on-chain, sao không nhét phần lõi, phần mà thực sự liên quan đến giá trị & niềm tin?

Bạn không thể detect bot view. Nhưng View nào đã được xác thực (off-chain), tôi sẽ dùng nó để payout (on-chain). 

Cái cần lưu giữ và update on-chain không phải toàn bộ logic, mà là state cuối cùng thứ quyết định việc ai nhận gì. Và cái này không quá tốn tài nguyên, rất khả thi.


Để thấy rõ khoảng cách giữa “muốn đưa hết lên chain” và “nên đưa cái gì lên”, hãy nghe @0xbodu ví dụ:
* 	Chỉ riêng để clone lại Uber toàn cầu lên blockchain → bạn sẽ cần hàng ngàn MegaETH chains


# (3) Liệu ta có thể giữ phần logic cơ bản ở on-chain và làm cho phần logic phức tạp trở nên verifiable (xác minh được)?

Phần logic đơn giản như transfer token, cập nhật state cơ bản thì để on-chain là hợp lý. Nhưng khi đụng tới những phần nặng đô hơn như gọi API, chạy AI, ML, hoặc mấy thuật toán phức tạp… thì không ổn nếu cứ cố nhét hết vào smart contract.

Vậy nên ta cần 1 giải pháp. Một cách để khiến những hệ thống phức tạp có thể verify được, ngay cả khi nó chạy off-chain. Về cơ bản, Web3 đã làm tốt mảng verifiability cho tài sản số và smart contract. Nhưng giờ, chúng ta cần mở rộng ra những thứ to và phức tạp hơn nhiều như entire infra. 

`EigenCloud` nổi tiếng với concept “restaking” trên Ethereum. Nhưng bản chất restaking không chỉ để khóa ETH. Restaking là một cách để tạo verifiability, vì khi bạn có thể slash người nào đó nếu họ làm sai thì bạn đang tạo động lực để họ chơi đúng luật.

> Restaking ≠ Verifiability

Insight cốt lõi mà EigenCloud đưa ra là ung dụng nào cũng có nhiều thành phần. Và không phải thành phần nào cũng cần (hoặc nên) được xác minh.

Tùy loại logic, ta chia được 3 cấp độ verifiability:

1. Logic đơn giản (như chuyển token, vote, update state nhỏ): nên verifiable on-chain
2. Logic phức tạp (AI, ML, gọi API, điều phối logic): thì cần verifiability off-chain
3. Logic lặp lại / routine tasks (build UI, render ảnh, kiểm tra syntax, v.v.): có thể không cần verify





![](https://pbs.twimg.com/media/GwjpvrnWoAAwwVx?format=jpg&name=medium)

