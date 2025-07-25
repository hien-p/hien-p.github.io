
![](https://pbs.twimg.com/media/GwmCQx1aAAANawG?format=png&name=900x900)

# Bài viết này nói về Quilt - giải pháp lưu trữ file nhỏ. 





Bài viết này viết vào *2025-07-24* nghĩa là sau 3 tháng từ khi walnet ra mắt mainnet. Tính thời điểm hiện tại đã lưu trữ hơn **800 TB**. Tuy nhiên, Với Walrus thì khả năng xử lý file là rất tốt vấn đề là với các file nhỏ thì phải tự bundle (gộp file) thủ công → phức tạp & tốn thời gian cũng như truy xuất chậm & khó tổ chức metadata.

![](https://pbs.twimg.com/media/GwjtCa2XkAASEU1?format=jpg&name=medium)



Vậy nên Quilt ra đời để gộp files nhỏ thành 1 Quilt unit. 

![](https://pbs.twimg.com/media/GwmHbofb0AAs40T?format=jpg&name=medium)

Và mình dựa trên bài viết của [Walrus blog](https://www.walrus.xyz/blog/introducing-quilt?utm_source=twitter&utm_medium=organic&utm_campaign=walrus) để viết phiên bản việt version cho các bạn.







# Let's compare the differences pre- and post-Quilt and see how Walrus stacks up against the competition.

![](https://pbs.twimg.com/media/Gwl9AiiagAEoRjj?format=jpg&name=large)