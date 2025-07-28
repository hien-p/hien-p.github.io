# Ethereum Virtual Machine (EVM)

![](https://ethereum.org/_next/image/?url=%2Fcontent%2Fdevelopers%2Fdocs%2Fevm%2Fevm.png&w=1920&q=75)

Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)

> The EVM is the part of Ethereum that handles the deployment and execution of smart contracts. In reality, a simple value transfer transaction from one EOA to another does not require the EVM, but everything else will involve state updates computed by the EVM. From a higher level perspective, the EVM running on the Ethereum blockchain can be viewed as a global decentralized computer containing millions of executable objects, each with its own permanent data storage.

*—Andreas Antonopoulos** and Dr. Gavin Wood, Mastering Ethereum*

---
Tạm dịch: 

> EVM là phần trong Ethereum chịu trách nhiệm triển khai và thực thi các smart contract. Thực tế, nếu chỉ đơn giản chuyển giá trị (value transfer) từ một ví thông thường (EOA) sang ví khác thì không cần đến EVM. Nhưng bất kỳ hành động nào khác đều sẽ liên quan đến việc cập nhật trạng thái (state) do EVM tính toán.

> Nếu nhìn ở góc độ trừu tượng hơn, EVM chạy trên blockchain Ethereum có thể được xem như một chiếc máy tính phi tập trung toàn cầu, nơi chứa hàng triệu “đối tượng thực thi” (executable objects) mỗi đối tượng có không gian lưu trữ dữ liệu riêng và tồn tại vĩnh viễn.


---

# Nếu bạn quá lười đọc 🤣 thì giải thích ngắn gọn là 

Ethereum Virtual Machine (EVM) có thể được hiểu đơn giản là một môi trường độc lập, được thiết kế riêng để xử lý các giao dịch liên quan đến smart contract, và quan trọng hơn cả là **xác định state tổng thể của blockchain Ethereum** sau mỗi block mới được tạo ra.

Bạn có thể tưởng tượng EVM như một chiếc máy tính chuyên xử lý các giao dịch smart contract, đồng thời định nghĩa các quy tắc thay đổi trạng thái của mạng Ethereum theo từng block.

Tuy nhiên, khác với máy tính vật lý, EVM là một máy ảo nó không phụ thuộc vào hệ điều hành cụ thể hay vị trí địa lý nào cả. Chính vì vậy, bất kỳ ai ở bất kỳ đâu đều có thể truy cập và vận hành một node Ethereum để chạy EVM.


# 1. Deep dive more about EVM 

Có nhiều cách kháu nhau để mọi người mô tả về EVM. Như là 

* EVM như là một Vitural Machine ( máy ảo)
* EVM là State machine 
* Hay EVM là Quasi-Turing Complete Machine 

Một số thuật ngữ đây sẽ nghe có vẻ lạ nhưng thực ra mỗi định nghĩa trên đều theo từng góc nhìn khác nhau về EVM. Và tất cả đều đúng theo góc nhìn đó. 

## 1.1 VM như là một Virtual Machine 

Để hiểu được phần [“Virtual Machine”](https://en.wikipedia.org/wiki/Virtual_machine?ref=decipherclub.com) trong cái tên EVM (Ethereum Virtual Machine), tụi mình cần quay lại một chút vè **physical machines**.

Đó là  x86, ARM, hay Apple M1 mà máy tính bạn đang chạy. Ở Layer thấp nhất, mấy  này chỉ hiểu được nhị phân tức là dãy số 0 và 1.  Mọi thao tác như cộng, trừ, lưu file, render ảnh… đều được điều khiển bởi chuỗi opcode là lệnh máy tính đọc được – toàn số 0 và 1.

khái niệm Virtual Machine (VM) – máy ảo. VM về cơ bản cũng hoạt động y chang máy thật là có opcode, có các bước thực thi logic. Một số ví dụ quen thuộc là **JVM (Java Virtual Machine)** hay **LLVM** trong hệ sinh thái của nhiều ngôn ngữ như Rust, C, Swift…


Nhưng điểm khác biệt quan trọng là: VM không bị gắn với phần cứng cụ thể nào. Bạn có thể chạy một virtual machine trên bất kỳ loại máy nào, hệ điều hành nào miễn là có phần mềm support nó. **Tức là VM mang lại một môi trường thực thi độc lập với nền tảng**


Quay lại với Ethereum thì **EVM chính là virtual machine của riêng Ethereum**. Điều đó có nghĩa là bạn có thể chạy EVM trên bất kỳ hệ điều hành nào (Windows, macOS, Linux…), trên bất kỳ phần cứng nào (PC, laptop, server, thậm chí Raspberry Pi), miễn là bạn cài một **Ethereum node**.


Đây chính là điểm then chốt khiến Ethereum thực sự phi tập trung (decentralized)vì ai cũng có thể chạy EVM ở bất cứ đâu.

---
> In the pre-EVM era, this would have been a nightmare as a new blockchain with custom logic had to be created every time a new app with specific use case was to be built.

Tạm dịch là: 
Trước khi có EVM, nếu bạn muốn chạy một app có logic riêng trên blockchain, bạn phải tạo nguyên một blockchain mới từ thiết kế, consensus, state machine… cực kỳ tốn công.
---

Nhưng giờ có thể viết bất kỳ ứng dụng nào bằng Solidity → biên dịch thành EVM bytecode → deploy lên Ethereum → chạy ngay trong EVM. Nói cách khác, EVM biến Ethereum thành một “máy tính global, có thể chạy bất kỳ đoạn arbitrary code nào.





# Bytecode là gì ? 

Bytecode basically là “machine code” được generate sau khi compile ngôn ngữ smart contract cấp cao như Solidity. Nó kiểu như vầy (số liệu dài quá nên mình bỏ bớt):

![](https://img.learnblockchain.cn/2020/07/08/15941927182518.jpg)


Tại vì nếu bạn không có source code và ABI (Application Binary Interface) của smart contract đó thì việc tương tác với nó trên blockchain sẽ rất risky và dễ sai.

Đoạn bytecode mà mình show phía trên chính là `deployment bytecode` của contract HelloWorld.sol là contract mẫu mà tụi mình đã deploy.




# Deployment và runtime bytecode

Khác với **runtime bytecode**, deployment bytecode sẽ gồm thêm mấy code hỗ trợ (**auxiliary code**) để giúp quá trình deploy diễn ra thành công. Sau khi contract được deploy thành công, chỉ còn runtime bytecode ở lại nằm tại địa chỉ contract trên blockchain đây chính là phần sẽ được EVM dùng mỗi khi có người gọi hàm của contract đó.


## EVM Assembly

Solidity compiler có thể in ra phiên bản `human-readable` của EVM Assembly cho contract `HelloWorld.sol`. 

Khi bạn biên dịch contract, bạn không chỉ ra bytecode mà  còn có thể lấy cả assembly code, tức là ngôn ngữ gần sát máy nhất nhưng vẫn có thể đọc được phần nào nếu bạn đã quen với EVM.


Ví dụ đoạn dưới là một phần của EVM assembly cho contract `HelloWorld`:

```rust
mstore(0x40, 0x80)
callvalue
dup1
iszero
jumpi(tag_1)
...
greeting = "Hello, World."
0x48656c6c6f2c20576f726c642e...
```


![](https://img.learnblockchain.cn/2020/07/08/15941926928582.jpg)










Smart contracts có thể được compiled thành EVM bytecode. Hình dung cho dễ thif Solidity code ngôn ngữ  để viết smart contractgiống như C++ trong lập trình truyền thống. 

Còn `EVM bytecode` thì như machine code mà CPU hiểu được.

`EVM bytecode` là một chuỗi các opcode (operation code) và dữ liệu, được EVM xử lý để thực hiện state transition – tức là thay đổi trạng thái toàn cục của Ethereum sau mỗi giao dịch hoặc function call trong smart contract.

> Vậy rốt cuộc vai trò của EVM trong việc execute một transaction là gì?

Đầu tiên, nó cho phép chuyển WEI (1 ETH = 10¹⁸ WEI) từ account này sang account khác.

Và nếu account nhận được giao dịch đó có chứa bytecode liên quan tới EVM, thì EVM sẽ phải chạy cái đoạn `bytecode` đó  có thể kèm theo `transaction.data` làm input (input này là dữ liệu từ trường data của transaction).

> Vậy account nào cũng có bytecode hết à?”

Câu trả lời là: không.

Trong Ethereum, chỉ có 2 loại account:

* EOA (Externally Owned Account): Là account do một người/ tổ chức kiểm soát thông qua private key. Kiểu như ví Metamask của bạn ấy.

* CA (Contract Account): Là account được tạo ra bằng cách deploy smart contract. Những account này không có private key, và được control bởi code, thông qua các call từ EOA (transaction).


Nói đơn giản, chỉ có `Contract Account` mới chứa `bytecode` để EVM thực thi. Let’s dive deeper… vào kiến trúc bên trong của EVM:

![image ](https://img.learnblockchain.cn/attachments/2021/11/oeU12q7B619b5741a42fc.png)

*Diagram from https://ethereum.org/en/developers/docs/evm/*

Mỗi EVM instance được khởi chạy là để thực thi một đoạn bytecode cụ thể (vì mục tiêu của transaction là một Contract Account). Do đó, đoạn bytecode này hoạt động như ROM, bộ nhớ chỉ đọc của `EVM instance`, và tất nhiên là không thể bị thay đổi sau khi đã deploy.


Tưởng tượng giống như một [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine), EVM cũng có các thành phần cơ bản gồm:

* Program Counter (PC): Là một con trỏ chỉ tới opcode tiếp theo trong bytecode mà EVM cần thực thi. PC là số nguyên không âm trong khoảng `[0, số lượng byte của bytecode - 1].`

* Memory: Là bộ nhớ tạm, có thể mở rộng vô hạn (miễn là bạn chịu trả thêm phí gas cho việc mở rộng). Mỗi slot trong memory là 1 byte (unsigned 8-bit integer).


* Stack: Stack trong EVM có thể chứa tối đa `1024 phần tử`, mỗi phần tử là một unsigned integer 256-bit (tức 32 byte). Đây là nơi các giá trị trung gian được xử lý liên tục như push, pop, add, sub, v.v.

* External Storage: vùng lưu trữ permanent của các account, nơi contract có thể lưu state. EVM bytecode có thể đọc/ghi vào storage của account hiện tại hoặc external account khác


Trong đó, `external storage` là nơi lưu trữ vĩnh viễn tất cả trạng thái và dữ liệu liên quan đến smart contract.

 Ngược lại, các thành phần còn lại như` PC, stack, và memory` đều là volatile – tức là chỉ tồn tại trong lúc EVM instance đang chạy và sẽ bị reset mỗi lần instance mới được tạo.

---
Tương tự như CPU hiểu các lệnh trong Instruction Set, EVM cũng cần hiểu các `opcode` (mỗi opcode là 1 byte => tối đa 256 opcode). Mặc dù không liệt kê toàn bộ ở đây, nhưng ta có thể chia opcode thành các nhóm chính như sau:

* Control Opcodes: điều khiển PC, stack, memory, storage
* Arithmetic & Bitwise: như ADD, MUL, AND, OR, XOR…
* Contextual Info: truy xuất thông tin block, transaction, msg.sender
* Log: tạo log record (LOG0, LOG1,…)
* System-level: tạo contract mới (CREATE), gọi contract khác (CALL, DELEGATECALL), xoá contract (SELFDESTRUCT)




# Hiệu năng của EVM

Khi chạy trên mainnet, `EVM (Ethereum Virtual Machine)` thường xử lý bytecode chậm hơn kha khá so với các loại máy ảo thông thường. Nhưng cái này không phải bug đâu mà là tính năng 😎. 

Lý do chính là bởi mỗi phép toán (operation) phải được thực thi bởi tất cả các full node trong mạng để đảm bảo tính trustless tức không cần tin tưởng ai mà vẫn hoạt động được.

Chính vì ưu tiên cho tính `đồng thuận phân tán (decentralized consensus)` này mà EVM chấp nhận đánh đổi xử lý chậm hơn và chi phí tính toán (gas fee) cao hơn nhiều so với các hệ thống tập trung.

 Đổi lại thì tính bất biến gần như tuyệt đối, khả năng chống lỗi cao, và zero downtimekhông bị “nghỉ server” giữa chừng như web2. Chưa hết, EVM còn có cơ chế gas metering như đồng hồ đo gas vậy.
 
  Nó đảm bảo rằng miners (hoặc validators sau The Merge) sẽ được trả công xứng đáng khi thêm transaction của bạn vào block. Đồng thời, cơ chế này ngăn chặn đoạn code bị loop vô tận. Nếu một chương trình chạy mãi không dừng và vượt quá giới hạn gas đã set, EVM sẽ auto *“đập”* giao dịch đó, revert toàn bộ các thay đổi state tạm thời (sandboxed state)
