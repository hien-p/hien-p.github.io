# Data Types in Rust

> Rust is a systems programming language designed with performance, safety, and reliability in mind. One of the foundational concepts that supports these goals is `data typing`. Every value in Rust has a specific `data type`, which helps the compiler understand how that value should behave. 

We will learn about the following data types in rust and understand how they work under the hood:
* Scalar
* Floating point types
* Numeric Operation
* Boolean
* character types
* compound types


# 🥷 Static Typing trong Rust là sao?

Rust là một ngôn ngữ có kiểu tĩnh (`statically typed language`). Điều này có nghĩa là kiểu dữ liệu (`data type`) của mỗi biến phải được xác định ngay tại thời điểm biên dịch (`compile time`).

Nhờ đó, trình biên dịch có thể bắt lỗi sớm (`early bug detection`), và quản lý bộ nhớ hiệu quả hơn vì nó biết chính xác mỗi biến cần bao nhiêu byte.

Tuy nhiên, bạn không cần lúc nào cũng khai báo rõ kiểu biến. Rust có khả năng suy luận kiểu dữ liệu (`type inference`) khá thông minh, dựa trên ngữ cảnh. Ví dụ:

```rust
let x = 5; // Rust hiểu đây là i32
let name = "Harry"; // hiểu là &str
```

>  Tức là bạn không cần viết `let x: i32 = 5`; nếu Rust tự đoán được rồi.


Nhưng nếu Rust gặp tình huống không thể tự đoán kiểu được ví dụ như khi parsing từ chuỗi "42" thì bạn phải cung cấp rõ kiểu dữ liệu:

```
let guess: u32 = "42".parse().expect("Not a number!");
```

> 💡 Ở đây, "42".parse() có thể trả về nhiều kiểu số (i32, u32, f64, etc.), nên Rust cần bạn nói rõ là bạn muốn guess là kiểu gì (u32 trong trường hợp này).

Nếu bạn không sử dụng biến đó sau khi khai báo, Rust sẽ cảnh báo như trong hình:

![screen data types](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*owBewwsWJbQSVpUaK2-y7A.png)

Ở đây, `"42".parse()` có thể trả về nhiều kiểu số (i32, u32, f64, etc.), nên Rust cần bạn nói rõ là bạn muốn guess là kiểu gì (u32 trong trường hợp này).


```bash
warning: unused variable: `guess`
help: if this is intentional, prefix it with an underscore: `_guess`
```

> ✨ Cái hay của Rust là nó cực kỳ quan tâm đến độ an toàn (safety). Ngay cả những biến không dùng cũng được nhắc nhở rõ ràng, để tránh bug tiềm ẩn.
 
# ⚙️ Scalar Types – Kiểu dữ liệu có một giá trị trong Rust

`Scalar types` đại diện cho một giá trị duy nhất. Trong Rust, có 4 kiểu scalar chính:

## 1️⃣ Integers – Số nguyên

Số nguyên là những con số **không có phần thập phân (no floating-point)**. Rust chia thành hai loại:

* `Signed integers` (i): chứa được cả số âm và số dương. Ví dụ: -42, 0, 123
* `Unsigned integers` (u): chỉ chứa được số dương. Ví dụ: 0, 200, 999


Cả hai loại đều có các “size” khác nhau như: *i8, i16, i32, i64, i128* — tương ứng với số bit lưu trữ. Tương tự với u8, u16, v.v.

![scalar types](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QNJNfJJVyLMJpmHx2gS0XQ.png)


> 💡 Nhớ nha: càng nhiều bit thì càng chứa được số to hơn, nhưng cũng tốn nhiều bộ nhớ hơn!

### Integer Overflow – Tràn số trong Rust

Trong Rust, khi bạn gán một giá trị **vượt quá giới hạn của kiểu số nguyên**, thì sẽ xảy ra hiện tượng **overflow (tràn số).**


Ví dụ: bạn thử gán 256 cho u8 (kiểu này chỉ chứa từ 0 đến 255) thì chuyện gì xảy ra? 👀

Trong `Debug mode`:
=> Rust sẽ panic ngay lập tức và báo lỗi. Điều này giúp bạn phát hiện bug sớm, tránh `silent errors`

Còn khi `Release mode` thì Rust sẽ wrap around giá trị (giống kiểu quay vòng vòng):
Ví dụ: 256 thành 0, 257 thành 1, v.v.

Vậy nên để xử lý `overflow` một cách chủ động. Rust cung cấp một số hàm “chuyên trị” overflow để bạn kiểm soát kết quả rõ ràng hơn:

Method | Mô tả ngắn gọn 
------------ | ------------- 
wrapping_add | Cho ra kết quả kiểu wrap (giống release mode)  
checked_add | Trả về None nếu bị tràn
overflowing_add | Trả về tuple (value, is_overflow)
saturating_add | Trả về max/min nếu vượt giới hạn


## Floating-Point Numbers – Số thực dấu phẩy động

Rust hỗ trợ 2 kiểu số thực chính:
* f32: số thực 32-bit (nhẹ, nhanh hơn, nhưng độ chính xác thấp hơn)
* f64: số thực 64-bit (default, chính xác hơn, dùng phổ biến)

Ví dụ:
```
let x = 2.0;       // kiểu f64 – được suy luận tự động
let y: f32 = 3.0;  // kiểu f32 – được chỉ định rõ
```

##  Boolean – Kiểu logic đúng/sai

Rust có kiểu bool, đại diện cho hai giá trị: `true` hoặc `false`. Cực kỳ quan trọng trong điều kiện, vòng lặp, v.v.

```
let t = true;
let f: bool = false;
```

Thường dùng trong các biểu thức điều kiện như:


```rust
if t {
    println!("It’s true!");
}
```




# Reference 
[1]. https://medium.com/@estheraladioche569/data-types-in-rust-eef697a3408e