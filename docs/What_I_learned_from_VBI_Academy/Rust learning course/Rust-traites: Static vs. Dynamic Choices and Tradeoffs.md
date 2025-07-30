# Hiểu tường tận Trait Dispatch trong Rust: Static vs. Dynamic

Khi viết code Rust, bạn sẽ thường xuyên bắt gặp **impl Trait** và **&dyn Trai** nhìn thì tưởng na ná nhau, nhưng thực chất lại đại diện cho hai cơ chế **Trait Dispatch** hoàn toàn khác nhau: **static dispatch (tĩnh) và dynamic dispatch (động).**

Việc hiểu sâu hai cơ chế này là chìa khóa để viết code Rust hiệu quả, tận dụng tối đa khả năng tối ưu mà ngôn ngữ mang lại.


# 1.Trait Dispatch là gì?

Trait dispatch là cách mà Rust xác định và gọi phương thức từ trait. Tùy vào cách sử dụng, Rust sẽ quyết định thực hiện điều đó tại **thời điểm biên dịch (compile time)** hoặc **thời điểm chạy (runtime)**.



## 1.1 Static Dispatch - Phân phối tĩnh

Static dispatch xảy ra khi sử dụng `impl Trait` hoặc `generic parameter` có ràng buộc trait:

```rust
fn do_something<T: MyTrait>(x: T) {
    x.method();
}
```

Cơ chế là Rust sẽ thực hiện **monomorphization (quá trình nhân bản)** hàm generic cho từng kiểu cụ thể mà bạn sử dụng. Mỗi bản sao sẽ có tất cả kiểu dữ liệu cụ thể thay cho generic. Điều này giúp compiler biết chính xác địa chỉ của method cần gọi và có thể tối ưu rất mạnh

Ưu điểm: 

* Hiệu suất cao nhất

* Gọi phương thức không tốn chi phí phụ trội

* Cho phép tối ưu hóa sâu như inline, unroll loop...

Nhược điểm

* Tăng thời gian biên dịch

* Tăng kích thước file nhị phân

* Có thể giảm hiệu quả cache CPU do nhiều bản sao


## 1.2 Dynamic Dispatch - Phân phối động

Dynamic dispatch xảy ra khi sử dụng **&dyn Trait** hoặc **Box<dyn Trait>**:

```
fn do_something(x: &dyn MyTrait) {
    x.method();
}
```

Rust sẽ tạo một trait object, bao gồm:

* Con trỏ đến dữ liệu thực tế

* Con trỏ đến bảng phương thức ảo (vtable)
Khi gọi phương thức, Rust sẽ tìm địa chỉ tương ứng trong vtable và gọi gián tiếp.

Ưu điểm: 

* Giảm thời gian biên dịch
* Giảm kích thước nhị phân do không cần tạo nhiều bản sao
* Cho phép viết code linh hoạt, độc lập với kiểu cụ thể

Nhược điểm

* Gọi phương thức tốn chi phí vtable lookup
* Không thể tối ưu như static dispatch
* Trait cần tuân thủ điều kiện object-safe mới dùng được

--- 

# Object Safety - Tính an toàn của trait object

Không phải trait nào cũng có thể dùng dưới dạng trait object. Một trait chỉ được gọi là `object-safe` nếu thỏa các điều kiện:

* Không có generic trong phương thức
* Không có phương thức trả về Self
* Không có phương thức tĩnh (fn static_fn() -> ...)


Ví dụ, trait sau không `object-safe`:

```
trait Clone {
    fn clone(&self) -> Self;
}
```

Bạn có thể dùng `Where Self: Sized` để giới hạn phương thức không được gọi qua trait object.

