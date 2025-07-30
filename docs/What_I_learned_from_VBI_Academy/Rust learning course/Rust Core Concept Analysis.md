# Rust core concepts analysis: references, borrowing and internal mutability

The Rust language provides strong guarantees for solving these problems at the compile stage through its ownership and borrowing checking system.

>  This article focuses on a key part of this system: references. We will analyze in detail the differences between shared references (&T) and mutable references (&mut)


# Tham chiếu (References)

Rust cho phép bạn **mượn giá trị mà không cần chuyển quyền sở hữu**, thông qua **tham chiếu (reference)**.


> Một reference là một con trỏ (`pointer`) nhưng có kèm theo “hợp đồng” về quyền truy cập.


# &T – Shared Reference (tham chiếu chia sẻ)
