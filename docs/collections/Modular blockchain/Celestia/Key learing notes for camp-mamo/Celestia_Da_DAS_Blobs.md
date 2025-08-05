# DA, DAS, and Blobs — Celestia Lesson 📦🧠

> 🎯 Target: Học từ chính những nhà sáng lập Celestia — Mustafa, Ismail và John — để "grok" các công nghệ cốt lõi: Data Availability (DA), Data Availability Sampling (DAS), và Blobs. Cùng nhau bóc tách: Web3 app thật ra là gì, và làm sao Celestia trao cho bạn full-stack control để tự do xây dựng theo cách của mình.

---

Bài học này sẽ giúp bạn thấu hiểu kiến trúc bên trong của **Celestia**, đặc biệt là ba yếu tố then chốt: **Data Availability**, [**Data Availability Sampling (DAS)**](https://celestia.org/glossary/data-availability-sampling/), và **Blobs** — nơi mọi thứ bắt đầu.

> "In the academic sense, Celestia provides a highly scalable verifiable data availability layer that allows your application to be built in a way users know they have the data needed to audit correctness."  
> — *John, Celestia Labs*

---

Và đây là câu hỏi bạn cần tự trả lời sau buổi học:

> **“Full-stack control” trên Celestia thực sự nghĩa là gì đối với developer?**  
> **Khó khăn chính khi tự triển khai một Layer 1 blockchain so với xây dựng trên Celestia là gì?**

👉 Hint: Bạn có thể xây dựng app bằng bất kỳ ngôn ngữ lập trình nào, tự do tuỳ biến cách app hoạt động và cả mô hình kiếm tiền của nó. Một cuộc cách mạng cho user onboarding 👀

---

## 🧠 Data Availability là gì?

> "It’s the property that, in a blockchain network, the data block — meaning the transactions inside the block — has been fully published to the network."  
> — *Ismail, Celestia*

Nếu không có DA, block producers và validators sẽ không thể xuất bản (publish) block một cách minh bạch. Dữ liệu không được public = Blockchain không hoạt động. Vậy nên DA là *xương sống* của mọi thứ.
