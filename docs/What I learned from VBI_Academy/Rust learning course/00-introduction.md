

# Intro đầu tiên cho Rust Deep learning

Build rust_deep community for this:

1. Telegram: Unvailable 👀
2. Facebook group: Unvailable 👀

---

![](https://github.com/sunface/rust-course/blob/main/assets/banner.jpg?raw=true)


Rust là một **systems-level programming language** được thiết kế với mục tiêu bảo đảm **memory safety và thread safety** tức là tránh các lỗi kinh điển như segmentation fault, crash hay race condition.

Với triết lý `zero-overhead abstraction`, Rust hướng tới việc viết code cấp thấp (như C/C++) nhưng vẫnan toàn mà không phải trả giá bằng hiệu suất. Nói một cách dễ hiểu thì **tốc độ của Rust gần như là same same với C/C++, nhưng lại an toàn hơn rất nhiều.**


Rust được xếp vào nhóm **multi-paradigm compiled programming languages**  tức là hỗ trợ nhiều phong cách lập trình khác nhau và được biên dịch (chứ không phải interpreted). Về bản chất, nó có thể thay thế cho C/C++ trong nhiều tình huống, nhưng điểm đặc biệt là Rust là **thread-safe by default.**


Rust vẫn có đầy đủ control structure quen thuộc như if, else, for, while,… và dùng {} để bao khối lệnh giống phong cách curly-brace của các ngôn ngữ như C, Java.

Tuy nhiên, Rust không dùng class hay inheritance như C++/Java mà chọn hướng khác: dùng struct, impl và trait – một cách tiếp cận khá giống với functional languages như Haskell hay OCaml. 

Điều ấn tượng là **Rust không dùng garbage collector** như Java hay C#, nhưng vẫn đảm bảo memory safety thông qua ownership, borrowing, lifetime và hệ thống type-checking cực kỳ chặt chẽ. Khi bạn hiểu được ownership model của Rust, bạn sẽ thấy nó là một masterpiece về design system.

Ví dụ đơn giản nhất – Hello World:

```
fn main() {
    println!("hello, world");
}
```

Rust chịu ảnh hưởng từ nhiều ngôn ngữ nổi tiếng như C, C++, Haskell, OCaml, Ruby, Scheme, Swift,… và ngược lại, cũng ảnh hưởng tới C# 7, Elm, Idris, Swift sau này. 

Việc cài đặt rust rất dễ bạn chỉ cần vào trang [rust-lang.org](rust-lang.org) tải installer phù hợp OS là xong. Hỗ trợ mọi hệ điều hành phổ biến như Windows, macOS, Linux, FreeBSD, Android, iOS.


Về lịch sử:

>  Rust bắt đầu như một dự án cá nhân của Graydon Hoare (một dev ở Mozilla) vào năm 2009, sau đó được Mozilla Research hỗ trợ chính thức và công bố public năm 2010. Từ đó đến khi ra mắt bản stable 1.0 (ngày 15 tháng 5 năm 2015), Rust đã trải qua nhiều lần lột xác, thay đổi thiết kế một hành trình khá “painful” nhưng cực kỳ đáng nể. Và kể từ đó, Rust trở thành một ngôn ngữ với cộng đồng dev đóng góp mạnh, tài liệu, và một quy trình contribution rất bài bản tại [github](https://github.com/rust-lang/rust)


Mục tiêu của khoá học này là để **truyền tải Rust một cách đúng nhất, cập nhật, dễ hiểu bằng tiếng việt cho những người mới bắt đầu.**


# Reference 

1. https://course.rs/about-book.html
2. https://rustcc.gitbooks.io/rustprimer/content/install/rustup.html
