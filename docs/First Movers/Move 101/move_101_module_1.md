
---
title: Move 101 – Buổi 1: Giới thiệu Sui Blockchain và Move
summary: Move 101 – Buổi 1: Giới thiệu Sui Blockchain và Move
  - Harry Phan 
date: 2025-07-12
some_url: 
---

![](https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/521766420_760522626660610_2328849087728819226_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFdS37NQq0m_wxCn3VlwblzcmXwRwja2S9yZfBHCNrZLz1nabjY_wZ5p-jHOcWXaXNzy0brcfh8PI2ZNOMgLGdP&_nc_ohc=YX5uilUwubkQ7kNvwGoHQ3L&_nc_oc=AdllMsDyMmBxTRILNuV8_5R-_tj6INSYPQfn3fDOONv18mT6PNm1StUAk-ghq0H7k-g&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=FSKYOH0r3D0vYQ04Nix9qw&oh=00_AfT7Nb3p1pbvV5tQG-ImgXQALA17WuQkluXyR6B0KNqL1g&oe=68867B7A)

# Move 101 – Buổi 1: Giới thiệu Sui Blockchain và Move

Link Luma: https://lu.ma/1ybrbfcf 

> Bài viết này để recap lại event hôm `Saturday, July 12`. 

Nếu Blockchain là một căn nhà ?


Hình dung blockchain như một căn nhà. Trong nhà đó có nhiều phòng: A, B, C, D… nhưng vấn đề là mỗi lần chỉ được 1 người bước vô nhà. Người đó vô rồi thì người khác phải xếp hàng chờ để xử lý tuần tự từng người một. Đó là kiểu sequential processing của blockchain truyền thống.

Mọi người thấy rõ vấn đề rồi đúng không? Vậy giả sử tại sao không chia căn nhà ra thành những phòng độc lập, để người khác có thể vào các phòng song song (parallel) mà không đụng nhau?


Thay vì coi căn nhà là một khối thống nhất, mình chia ra thành từng phòng độc lập thì mỗi phòng là một object riêng biệt.

> Bạn cần vào phòng A, mình cần vào phòng D → tụi mình cùng vào xử lý song song

Đây chính là core idea của Sui: **Parallel Execution via Object-centric State Management.**
---
# Vậy Sui làm được điều đó như thế nào?
S
ui scale theo chiều ngang (horizontal) để đáp ứng nhu cầu cao của mạng. Khi cần, validators có thể thêm compute power để xử lý nhiều giao dịch hơn.
Ngoài ra thì Gas fee trên Sui vẫn thấp và ổn định dù traffic tăng cao, nhờ vào tokenomics thiết kế hợp lý. Do Validators được incentivized bằng việc xử lý nhiều tx hơn chứ không phải tăng gas fee.

Bên cạnh đó Khả năng scale của Sui không chỉ dừng ở transaction processing. Phần storage cũng rẻ và có thể scale theo chiều ngang(horizontally scalable) . Nên devs có thể tạo ra các tài sản (object) phức tạp, nhiều thuộc tính trên on chain.
