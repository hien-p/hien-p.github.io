# Ethereum Virtual Machine (EVM)

Smart contracts có thể được compiled thành EVM bytecode. Hình dung cho dễ: Solidity code ngôn ngữ  để viết smart contractgiống như C++ trong lập trình truyền thống. 

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



