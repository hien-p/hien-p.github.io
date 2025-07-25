
# Advanced Smart Contract – Modules, Entry Functions & Practice

![](https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=300,height=300/event-covers/98/db4a428f-e07b-4685-85f6-116d26448d3a.png)

link event: 

#  Nội dung chính:

* ​Hiểu rõ vai trò và cấu trúc của Module trong Move
​* Tìm hiểu Entry Function – cách tương tác với contract thông qua call
​* Tổ chức project chuẩn theo cấu trúc Move.toml và sources/
​* Viết thêm các chức năng nâng cao cho token và NFT đã học
* ​Luyện tập và review code mẫu – chuẩn bị cho dự án mini cá nhân


# 1. Set up Move trên Sui package

Objective là mọi người hiểu về **Package structure / Published Package / Package Manifest** trên Sui

## 2. Vậy package là gì ?

Theo định nghĩa từ documentation:

> Packages are immutable. After you publish a package object on chain to a network, it lives there forever. You cannot directly change the code of an on-chain

Nghĩa là một package là khi được publish trên Blockchain và được xác định là một address. Trong package có thể chứa một hoặc nhiều modules.

![](../img/move_101_img/code_org_move.png)

Riêng phần Package, mình sẽ chia nhỏ thành từng phần là: 

* Package Layout: Cấu trúc của package
* Published Package: Các package đã được published bạn cần lưu ý
* Manifest Structure( Move.toml ): Config file trong sui move contract
* Artifact



### 2.1 Package Layout

Một package sẽ chứa nhiều Modules. Trong từng modules đó bao gồm functions, types...






---

# 3. Modules trong Sui là gì ?

Ở Sui Move, khi khai báo một smart contract, ta sẽ sử dụng từ khoá module, giống với ở solidity ta sẽ có từ contract. Đây là syntax khi khai báo smart contract

```
module <package_name>::<module_name> { 
    //module code ở đây 
}
```

Nhưng mọi người có thể set up một module thế này cũng được:

```
module <package_name>::<module_name>;
```

`package_name` là tên của package mà bạn đã tạo. Ví dụ trong lệnh `sui move new hello_world` thì package name sẽ là `hello_world`. Còn `module_name` sẽ là cái tên module mà bạn đã tạo trong package.


Ở đây bạn cũng có thể xem như `module` là thư viện con trong package.

> Tính chất đóng gói (encapsulation) của module giúp cho việc phát triển smart contract trở nên module hóa, có khả năng kết hợp linh hoạt, đồng thời nâng cao khả năng tái sử dụng mã nguồn và tính bảo mật.



## 3.1 Từ khoá use - cách để import bất kỳ module

Trong Sui move, `use` được sử dụng để import bất kì module. Đây là cấu trúc của cách sử dụng use:

```
use <Address/Alias>::<ModuleName>;
```

Giải thích về `<Address/Alias>` và `<ModuleName>`:

* `<Address/Alias>` là những địa chỉ của package có chứa những module mà ta muốn dùng. Chúng ta thể sử dụng alias được đặt trong Move.toml mà đã viết ở mục Package manifest. Ví dụ: 

```
[addresses]
sui = "0x2"
# Trước là suilend = "0x0" nhưng giờ package đã published rồi nên ta có thể thay thế thành
suilend = "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf"
```


* `<ModuleName>` đơn giản đại diện cho tên của module đó.

Sau đây là một số Sui modules mà bạn sẽ thường sử dụng:

```rust
# Module này giúp chúng ta xử lý liên quan đến string 
use std::string;
 
// https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/move-stdlib/sources/string.move
 
# Module này sẽ giúp khi ta cần các chức năng transfer object từ một account đến account khác 
use sui::transfer; 
// https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/transfer.move
 
# dòng dưới đây giúp cho việc tạo object trong module.
use sui::object;
// https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/object.move
 
 
# Đây là đoạn import từ sui framework. Giúp ta trong việc đinh nghĩa các thông tin của transaction như là địa chỉ của sender, địa chỉ người ký ...
use sui::tx_context;
// https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/tx_context.move
```

Bên cạnh việc import một module, Move cho phép bạn import cụ thể đối tượng từ module bao gồm functions và types. Điều này hữu ích khi bạn chỉ muốn một chức năng của module, Giảm việc không cần những đoạn code không cần thiết. Ví dụ:

```
// import function từ một module 
use sui_bootcamp::module_one::learn; 
 
// import từ Learner Type 
use sui_bootcamp::module_one::Learner;
```

Không chỉ thế Move cho phép ta import nhiều từ module hoặc package bằng cách dùng dấu `{}`:

```
// import learn function và Learner type từ module one
use sui_bootcamp::module_one::{learn, Learner};
 
// import module và Learner type
 
use sui_bootcamp::module_one::{Self, Learner};
```


> Làm sao để giải quyết vấn đề trùng tên? (Name conflict) 👀 
> Mình để các bạn tìm câu trả lời nhé hoặc thảo luận trong nhóm First Movers 
----