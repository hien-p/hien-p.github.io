# Cài Rust cho mọi OS 

Trong chương này, mình sẽ hướng dẫn cách cài đặt Rust trên ba nền tảng phổ biến nhất hiện nay: **Linux, macOS và Windows**.


# 1. Rust cho Linux

Với Linux, Rust cung cấp 2 cách cài chính:

## 📦 Cách 1: Download trực tiếp gói cài đặt


Nếu bạn chọn cách này thì cần kiểm tra trước xem hệ điều hành hiện tại của bạn là **64-bit hay 32-bit** để tải đúng version phù hợp.


Để kiểm tra hệ điều hành, mở terminal và chạy lệnh sau:

```
uname -a
```

Kết quả sẽ trả về kiểu kiểu như vầy:

```
Linux harry-laptop 5.15.0-106-generic #116-Ubuntu SMP x86_64 GNU/Linux
```

Như hình minh hoạ ở trên, nếu output chứa dòng x86_64 → nghĩa là bạn đang dùng 64-bit system hãy tải gói cài đặt 64-bit.

Ngược lại, nếu output là i386 hoặc x86-32 thì bạn đang dùng 32-bit system → nhớ tải đúng gói 32-bit tương ứng nha.

Để giải nén cài đặt thì ta dùng: 
```
tar -zxvf rust-1.5.0-x86_64-unknown-linux-gnu.tar.gz
```

Di chuyển vào thư mục đã giải nén:
```
cd rust-1.5.0-x86_64-unknown-linux-gnu
```

 Chạy script cài đặt:
```
./install.sh
```

Nếu mọi thứ diễn ra ok, bạn sẽ thấy:
```
Rust is ready to roll.
```

**Kiểm tra phiên bản Rust đã cài:** bằng cách chạy lệnh: 
```
rustc --version 
```

Output sẽ giống như vầy:

```
rustc 1.5.0 (3d7cd77e4 2015-12-04)
```

Dòng này xác nhận bạn đã có **Rust compiler (rustc)** hoạt động ổn định trên máy.


##  Cách 2: Cài Rust bằng một dòng lệnh duy nhất (One-click install)

Mở Terminal và chạy:

```
curl -sSf https://static.rust-lang.org/rustup.sh | sh
```

Lệnh này sẽ:
* Tự tải script cài đặt về
* Chạy quá trình setup tự động
* Thiết lập môi trường cargo, rustc, rustup,… đầy đủ


Tuy nhiên, rust sẽ không chỉ có mỗi **stable version (bản ổn định)**, mà còn có:

* Beta
* Nightly: bản bleeding-edge, hỗ trợ tính năng mới, nhưng không đảm bảo ổn định

Bạn có thể chọn và tải các bản này tại:
[https://www.rust-lang.org/zh-CN/other-installers.html](https://www.rust-lang.org/zh-CN/other-installers.html)

Hoặc dùng trực tiếp với bản browser: [http://play.rust-lang.org/](http://play.rust-lang.org/)


# 2. Rust cho MacOS




# 3. Rust cho Windows


# 4. Rustup – Quản lý phiên bản Rust

Website dự án: [https://github.com/rust-lang/rustup](https://github.com/rust-lang/rustup)

Rustup là công cụ chính thức dùng để cài đặt và quản lý các phiên bản Rust. Đây là lựa chọn hàng đầu dành cho bất kỳ ai bắt đầu học hoặc làm việc với Rust.

Khi bạn cài Rust thông qua rustup, bạn không chỉ có rustc (compiler) mà còn có thêm:

* cargo: trình quản lý package và build tool
* rustup: công cụ cài, cập nhật và chuyển đổi giữa các phiên bản Rust
* khả năng chuyển đổi nhanh giữa stable, beta, nightly
* khả năng cấu hình toolchain riêng cho từng project hoặc thư mục
* khả năng cài thêm target để cross-compile
* và nhiều tiện ích khác giúp dev Rust thoải mái hơn trong quá trình phát triển

## 4.1 Cài đặt rustup

Trên Windows

1.	Truy cập trang chủ: [https://rustup.rs](https://rustup.rs)
2.	Tải file rustup-init.exe
3.	Chạy file và làm theo hướng dẫn. Bạn sẽ thấy màn hình tương tác như sau:

```bash
Welcome to Rust!

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
```

Bạn có thể chọn:

1: Cài đặt nhanh với thiết lập mặc định (stable, thêm vào PATH)
2: Tuỳ chỉnh cho phép chọn toolchain (nightly, beta…), kiến trúc, và có thêm PATH hay không

Trên Linux & macOS thì mở Terminal và gõ lệnh sau:
```
curl https://sh.rustup.rs -sSf | sh
```

Lệnh này sẽ:

* Tải script cài đặt về
* Tự động cài rustup, cargo, rustc
* Thiết lập stable làm toolchain mặc định
* Tự thêm $HOME/.cargo/bin vào PATH

📍 Sau khi cài xong, bạn cần restart terminal hoặc thêm dòng sau vào `.bashrc/.zshrc` nếu chưa tự động nhận:

```
export PATH="$HOME/.cargo/bin:$PATH"
```

Nếu bạn muốn gỡ toàn bộ Rust và rustup, chỉ cần chạy:

```
rustup self uninstall
```


## 4.2 Các lệnh rustup thường dùng (Common rustup commands)

Sau khi cài đặt rustup, bạn có thể sử dụng hàng loạt lệnh tiện lợi để quản lý Rust toolchain và cấu hình môi trường lập trình của mình.

Cấu hình toolchain:

```
rustup default <toolchain>
```

Thiết lập phiên bản Rust mặc định cho toàn hệ thống.
```
rustup default stable
rustup default nightly
```

Quản lý toolchain, cài một toolchain mới:

```
rustup toolchain install <toolchain>

# rustup toolchain install nightly
# rustup toolchain install 1.68.2

```

Liên kết toolchain tùy chỉnh:
```
rustup toolchain link <toolchain-name> "<toolchain-path>"
```


Gán toolchain riêng cho thư mục,rustup override cho phép thiết lập toolchain cụ thể cho một folder và tất cả các thư mục con bên trong.



```
rustup override set <toolchain>

# rustup override set nightly
```


Quản lý cross-compilation target. Nếu bạn muốn build Rust cho một nền tảng khác (như WebAssembly, ARM, iOS…), bạn cần thêm target vào toolchain của mình.

```
rustup target add <target>
```
Ví dụ: 

```
rustup target add wasm32-unknown-unknown



# gỡ target 
rustup target remove <target>

# Cài target cho một toolchain cụ thể:

rustup target add --toolchain <toolchain> <target>
```


Rustup component cho phép cài thêm các thành phần như linter, source code, RLS…


```
rustup component add <component>

# Gỡ component 
rustup component remove <component>

# Xem danh sách component khả dụng:

rustup component list
```