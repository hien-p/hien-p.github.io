

Okay, so you’ve just heard of Rust. Maybe từ cái game sinh tồn 🤣 hoặc   là qua một đứa dev nhìn như hacker đang nói về “memory safety without GC” giữa quán cafe hay trong một conference tech

> Memory safety without garbage collection is cool 

# Stage 1: Awareness

Mình lên google và search: "“Rust programming language". Một đống code syntax kỳ quặc hiện ra như Ownership? Borrowing? vcl. 

❌ Stage 2: Denial & Coping

“Rust khó vl.
Thôi học Go dễ thở hơn.”
“Công ty tao xài Java mà, học làm gì?”
“Viết mấy thứ đó bằng C++ cũng được mà?”

Meanwhile, bạn thấy thằng đồng nghiệp vừa rewrite một service backend bằng Rus


# 🧪 Stage 3: First Attempt & Compiler Hell

Okay fine. You give it a shot.
Copy code từ tutorial…

> “cannot borrow `x` as mutable because it is also borrowed as immutable”

LOL Lifetime? Static? Mutable reference?

🌈 Stage 4: Small Wins & Fake Confidence

Sau hàng giờ đồng hồ gõ phím như đang summon quỷ,
cuối cùng bạn viết được 1 cái CLI tool… mà chạy được!
Mặc dù feature còn thiếu, nhưng nó compile được là đủ vui.

Bạn bắt đầu nói với bạn bè:

“Thật ra Rust cũng dễ mà, chỉ cần quen thôi.”
(trong đầu vẫn chưa biết pin là gì…)

⸻

📦 Stage 5: Cargo Pilled & Existential Crisis

Bạn bắt đầu xài cargo như thần chú.
Join Discord Rust server.
Copy macro từ Stack Overflow mà không hiểu gì.
Rust-analyzer bị crash → bạn ngồi debug 3 tiếng đồng hồ.
Nhưng mà code chạy mượt thật sự.
Bạn bắt đầu nói mấy câu kiểu:

“Zero-cost abstraction bro.”
“Borrow checker is actually my friend.”

⸻

⚔️ Stage 6: Rust Pilled Mode: Activated

Neovim.
Code trên giấy.
Đọc doc Rust nomicon như đọc kinh Phật.
Bạn tranh luận về “pin”, async/await và lifetime như người tu luyện.
Mọi thứ bạn viết đều hướng tới “safety”, “performance”, và “determinism.”
Bạn genuinely believe Rust có thể thay thế tất cả các ngôn ngữ khác.

⸻

🧘‍♂️ Stage 7: Enlightenment

Rust giờ không còn là ngôn ngữ nữa.
Đó là mindset sống.
Nó khiến bạn khiêm tốn, kiên nhẫn, và hiểu bản chất của việc “thinking before you type.”

Bạn rewrite cả blog bằng Rust dù chỉ cần dùng Notion là đủ.
Tại sao?

“I wanted to write one tool, compile it once, and flex forever.”

Rust không làm bạn code nhanh hơn.
Rust làm bạn code đúng hơn