# Scoped Threads trong Rust

Quản lý vòng đời của thread và chia sẻ dữ liệu giữa các thread luôn là bài toán hóc búa trong lập trình đồng thời bằng Rust. 

Cách tiếp cận truyền thống thông qua `std::thread::spawn` yêu cầu closure phải có vòng đời 'static, khiến việc mượn (borrow) dữ liệu từ thread cha trở nên rườm rà và thường cần đến các công cụ như Arc để giải quyết bài toán ownership.

Để khắc phục bất tiện này, Rust giới thiệu Scoped Threads smột cơ chế giúp lập trình đồng thời an toàn và dễ viết hơn. Bài viết này sẽ trình bày `khái niệm, ưu điểm và hạn chế của scoped threads`, đồng thời minh hoạ bằng nhiều ví dụ cụ thể để bạn có thể áp dụng ngay trong rust thực tế. 

# Scoped Threads là gì?

Scoped Threads (thread theo phạm vi) là các thread được khởi tạo bên trong hàm `std::thread::scope`. Chúng có vòng đời bị giới hạn bởi phạm vi (scope) của closure truyền vào, đồng nghĩa với việc:


* Mỗi thread được spawn bên trong scope phải hoàn tất trước khi scope kết thúc.
* Không cần quản lý thủ công JoinHandle.
* Có thể mượn dữ liệu từ thread cha một cách an toàn mà không cần move hay 'static.



