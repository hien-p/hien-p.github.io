# Sự khác biệt về syntax và concept khi chuyển từ Solidity sang Move 

Những bạn quen code bằng Solidity cần để ý một vài khác biệt về syntax và concept khi chuyển sang Move. Dù cả hai đều là ngôn ngữ lập trình cho smart contract, nhưng Move và Solidity khác nhau khá rõ về triết lý thiết kế (design philosophy) và cách triển khai (implementation details)


Nếu dev smart contract bằng Solidity, thì chắc cũng đã thân thuộc với mô hình `account-based` của Ethereum và cú pháp `msg.sender` để kiểm soát quyền truy cập(access control). Nhưng Move sẽ xoay quanh vào phần `resource-oriented programming (lập trình hướng tài nguyên)`. Riêng với `Sui Move`  triển khai theo  Nói cách khác, thay vì nghĩ mọi thứ chỉ là resource trong storage toàn cục (kiểu như trong các chain khác dùng Move), thì Sui đẩy mọi thứ lên một level là object  có chủ sở hữu rõ ràng.

Để hiểu rõ những điểm khác biệt này thì mình sẽ quay lại các khái niệm quen thuộc từ Solidity để nhìn chúng qua POV của Sui Move nhé.

Trong Solidity, mỗi smart contract khi được deploy lên một địa chỉ (address) cụ thể thì sẽ có **storage riêng biệt**. Ví dụ, một contract ERC-20 có thể khai báo biến trạng thái như sau:

```
mapping(address => uint256) public balances;
```

Mapping này sẽ lưu số dư (token balance) của từng địa chỉ. Và tất cả dữ liệu đó được lưu bên trong storage của chính contract, tại địa chỉ mà nó được deploy. Cấu trúc global state của Ethereum về cơ bản là một bản đồ từ contract address → storage data. 

Ví dụ như khi Alice gửi token cho Bob, contract sẽ thực hiện 2 bước:

1.	Giảm số dư của Alice
2.	Tăng số dư của Bob

![](https://images.ctfassets.net/v0qht4wq59vi/1fTuwKNm2p8iARp06qQREE/20cd4edfbbd91b3ff4a7af423f18733e/2_Alice_and_Bob_Example.png)


> Vậy Sui Move làm điều khác biệt như thế nào? 

Như mình đề cập thì Sui sử dụng một phiên bản khác của Move, theo hướng object-centric, nghĩa là mọi thứ xoay quanh object. Khi một transaction chạy trên Sui, nó phải khai báo rõ những object nào sẽ được đọc (read) hoặc chỉnh sửa (mutate). Các object này được truyền vào như input cho function của transaction. Nếu trong quá trình thực thi có tạo thêm object mới, thì khi transaction kết thúc, các object này sẽ được thêm vào global state của Sui, mỗi cái đều có chủ sở hữu (owner) hoặc kiểu sở hữu rõ ràng như Owned, Shared, Immutable hay Warraped. 


Để dễ hình dung mô hình object-centric của Sui, hãy xem cách `coin balances` được quản lý. Trong standard implementation của Sui, không hề tồn tại một biến balance duy nhất nằm trong một account hay contract như trên Ethereum. Thay vào đó, `mỗi coin balance là một object riêng biệt.`


    Ví dụ: nếu Alice có 10 X token, thì cô ấy sẽ sở hữu một object đại diện cho 10 X trong Sui state. Khi Alice muốn gửi 5 X cho Bob, transaction sẽ di chuyển một phần của object này sang cho Bob  có thể là tách object 10 X ra thành hai object: một object 5 X chuyển cho Bob, và một object 5 X còn lại Alice giữ.

    Sau transaction, Bob sẽ nhận được **một coin object mới trị giá 5 X**, và object này sẽ có chủ sở hữu là **địa chỉ của Bob.**


![](https://images.ctfassets.net/v0qht4wq59vi/6WVehaGFacG7Z73f08merJ/f601f73657cffebe9328674da67ec755/5_Flow_Chart.png)
