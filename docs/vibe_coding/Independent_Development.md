#  Indie Hacker với Poor Stack 

Bài viết này được dịch lại từ nguyên gốc tiếng trung:
[https://guangzhengli.com/blog/zh/indie-hacker-poor-stack](https://guangzhengli.com/blog/zh/indie-hacker-poor-stack). Mình cũng được học hỏi rất nhiều từ mindset ở đây.

Tháng 4 năm 2024, tác giả đã xuất bản một bài viết về [Independent Development Technology Stack 2024](https://guangzhengli.com/blog/zh/indie-hacker-poor-stack), trong đó phân tích chi tiết những công nghệ và nền tảng phù hợp cho phát triển độc lập. Theo thời gian, nhiều gợi ý trong danh sách đó không chỉ trở thành phổ biến mà còn được cộng đồng và các công cụ AI đánh giá là những lựa chọn công nghệ tốt nhất.



Trong giai đoạn tiếp theo, tác giả thường xuyên nhận được câu hỏi từ đồng nghiệp về việc nên chọn stack hay nền tảng nào. Phần lớn những người hỏi đều mới bước vào con đường phát triển độc lập, còn khá cân nhắc về chi phí. Đặc biệt, do đa phần các nền tảng quốc tế yêu cầu **thanh toán qua thẻ tín dụng**, nên việc quản lý hóa đơn hằng tháng dễ trở nên mất kiểm soát. Chính vì vậy, tác giả đã quan sát và chờ đợi thêm một thời gian.

Đến nay, khi bối cảnh công nghệ đã có nhiều thay đổi so với thời điểm bài viết trước, tác giả quyết định chia sẻ một bài blog mới nhằm cung cấp những gợi ý cập nhật về phát triển độc lập, đồng thời giới thiệu khái niệm **barefoot developer** – Dev tối giản chi phí :V. 

Bài viết hướng đến người quan tâm đến việc tối ưu chi phí khi bắt đầu con đường indie dev, trong khi dev giàu có thể bỏ qua các phần đầu và tham khảo trực tiếp phần cuối cùng.

# Lựa chọn công nghệ stack mới nhất

Trước hết cần làm rõ: bài viết này tập trung vào **stack cho full-stack web development** và việc chọn nền tảng phù hợp. Các mảng khác như **mobile, backend hay browser plugin** sẽ được bàn tới trong những bài viết sau nếu có đủ quan tâm.

Đối với phát triển web full-stack, hiện có rất nhiều lựa chọn công nghệ như **Next.js, Nuxt, Laravel, Django, .NET Core, Ruby on Rails…**

Mặc dù Next.js 14 và 15 vẫn còn nhiều điểm gây tranh cãi về tính năng và phong cách code, ở thời điểm hiện tại Next.js vẫn là **framework full-stack duy nhất được khuyến nghị.** Lý do là vì Next.js kế thừa toàn bộ hệ sinh thái React, vốn đang có sức sống mạnh mẽ nhất. Hầu hết các thư viện mã nguồn mở và nền tảng trong và ngoài nước đều ưu tiên hỗ trợ Next.js, mang lại hai lợi thế rõ rệt:

1. Tính tiện lợi: bất kể nền tảng hay nhu cầu, gần như luôn có sẵn thư viện open-source hoặc tài liệu hỗ trợ liên quan.

2. Tương thích với AI: trong kỷ nguyên AI, một hệ sinh thái mạnh cùng tài liệu phong phú giúp AI/AI IDE sinh code tuân thủ chuẩn hơn và ít lỗi hơn.

# Next.js Tech Stack Recommendation

Next.js rất linh hoạt, hỗ trợ nhiều chế độ khác nhau như SSR, SSG, ISR… đáp ứng hầu hết nhu cầu business. Dưới đây là một general Next.js tech stack đã được test và có thể deploy gần như trên mọi platform, đồng thời cover đa số nhu cầu SaaS:

* Database: [Drizzle ORM](https://orm.drizzle.team/): thư viện ORM gọn nhẹ, thân thiện với kiểu dữ liệu và hỗ trợ nhiều cơ sở dữ liệu như **PostgreSQL, MySQL và SQLite**. Quan trọng hơn cả, nó mang lại hiệu năng tốt hơn p[Prisma](https://www.prisma.io/) và đặc biệt hữu ích khi triển khai trên các nền tảng như Edge
* Authentication: [better auth](https://www.better-auth.com/): Authentication library khá comprehensive, hỗ trợ nhiều phương thức login như **Email/Password, Social Login…** Ngoài ra còn có nhiều plug-in (ví dụ: Admin plug-in). Phần docs cũng rõ ràng và đầy đủ hơn [Auth.js](https://authjs.dev/)
* Payment:  [Stripe](https://stripe.com/) + [Creem](https://www.creem.io/) (new payment platform)
* Email: [React Email](https://react.email/templates) + [Resend (email sending service)](https://resend.com/)
* Object Storage: [S3](https://aws.amazon.com/s3/) / [R2](https://www.cloudflare.com/developer-platform/products/r2/)
* Blog: Đối với blogging và documentation, mình chọn [Fumadocs](https://fumadocs.dev/). Những ai quen với các [open-source blogging project](https://github.com/guangzhengli/nextjs-blog-template) của mình thì biết là mình thường dùng [content-collections](https://www.content-collections.dev/) để quản lý và render MDX. Tuy nhiên, Fumadocs không chỉ hỗ trợ các tính năng document như search, theme, rendering mà còn quản lý và render MDX luôn. Vì vậy, để giảm bớt dependency và unify tech stack, mình đang dần migrate sang Fumadocs
* Internationalization: [Next-intl](https://next-intl.dev/)
* Analytics: [vanilla-cookieconsent](https://github.com/orestbida/cookieconsent) + [GA](https://analytics.google.com/analytics/web/) + umami (open source web analytics) + [plausible](https://plausible.io/) (privacy-friendly analytics)
* UI/UX: Tailwind CSS + Shadcn/UI + Radix UI + Framer Motion
* State: [Zustand](https://github.com/pmndrs/zustand) + [TanStack Query](https://tanstack.com/query/latest) + [React Hook Form](https://react-hook-form.com/)


# Làm rõ nhu cầu và chi phí

Trước hết, cần làm rõ rằng việc tự phát triển là nhắm đến những sản phẩm có lợi nhuận hoặc sẵn sàng kiếm lợi nhuận, chứ không phải project cá nhân hoặc project làm vì sở thích.

Nếu bạn chỉ build một project cá nhân cho bản thân hoặc bạn bè, thì không quan trọng lắm; cứ chọn tech stack và platform bạn thích. Hầu hết các platform đều có quota miễn phí khá rộng rãi, ví dụ như `Vercel` + `Neon`. Ngay cả khi build chatbot cá nhân, cũng khó mà chạm tới giới hạn free của Vercel.

Nhưng nếu bạn định build một sản phẩm có lợi nhuận, hoặc tận dụng sản phẩm free để tạo tên tuổi rồi convert một phần user sang bản trả phí, thì bạn cần xem xét chi phí kỹ lưỡng.

Trước khi đi sâu vào chi phí cụ thể, hãy cùng xem qua 3 lựa chọn phổ biến cho một web development plan tiết kiệm:

## 1. Dùng free quota của các cloud platform lớn

Ví dụ: **Supabase (BaaS), Neon (Serverless PostgreSQL), Railway, Fly.io, Zeabur, v.v.**

-> Ưu điểm: Bắt đầu với chi phí = 0, không cần tự maintain server và backup. Về sau có thể scale và xử lý traffic đột biến.
-> Nhược điểm: Quota miễn phí có giới hạn, vượt là phải trả phí (thường khá cao). Một số platform yêu cầu verify bằng credit card, và nhiều platform không cho commercial use với free plan (ví dụ: `Vercel Free` không cho deploy commercial project).

## 2. Tận dụng tối đa Cloudflare

Cloudflare được dev gọi là **“Cyber Bodhisattva”** vì hào phóng miễn phí CDN, compute, storage, logging… với giá rẻ và số lượng lớn.

* Ưu điểm: Chỉ với $5/tháng là gần như không phải lo về traffic và cost.
* Nhược điểm: Phải trả ít nhất $5/tháng, free service còn nhiều hạn chế. Cộng đồng hỗ trợ chưa mạnh, cần tự mày mò.


## 3. Tự host (Self-hosted deployment)

Thuê một VPS/VM giá rẻ để tự phát triển, dùng open-source project như [Dokploy](https://dokploy.com/), [Coolify (self-hosted PaaS)](https://coolify.io/).

-> Ưu điểm: Tùy biến cao, chi phí thấp. Có thể deploy nhiều dịch vụ cùng lúc: DB (PostgreSQL), analytics (Umami), email service (Unsend),… tất cả trong một hệ thống.

-> Nhược điểm: Phải tự maintain server tốn thời gian, phải lo vấn đề stability, security, backup, monitoring, logging. Ngoài ra còn phải chuẩn bị plan cho việc scale khi traffic tăng.

# Cách tiếp cận Cloud Platform

Nếu bạn muốn bắt đầu với chi phí rẻ thật sự, thì chỉ có thể chọn free quota từ các cloud platform lớn, hoặc tham gia startup plan của **AWS, Azure, Google Cloud** (cho rất nhiều quota). Ở đây mình sẽ không bàn về startup plan.

Gợi ý combination cho bạn tham khảo:

## Entry-level package (hoàn toàn free):

* Deployment: Vercel (non-commercial project)
* Database: Supabase hoặc Neon
* Authentication: Clerk hoặc Better-Auth (tự implement)
* Storage: Cloudflare R2
* Email: Resend

👉 Monthly cost: `$0` (trong free quota)


## Stable package (small commercial project):

- **Deployment:** Vercel Pro
- **Database:** Neon
- **Authentication:** Clerk Pro
- **Storage:** Cloudflare R2
- **Email:** Resend Pro
- **Payment:** Stripe hoặc Creem

👉 Monthly cost ước tính: $25–100

# Một số quota free của các Cloud Platform (tham khảo nhanh)

## Deployment Platform

- **Vercel**
  - 100GB bandwidth/tháng, 4 CPU-hrs, 1M edge requests.
  - Free plan không hỗ trợ commercial.
  - Pro: $20/tháng.
  - Ưu: Được Next.js hỗ trợ chính thức, triển khai nhanh chóng, có CDN toàn cầu, mang lại trải nghiệm phát triển tốt, và cũng là nền tảng triển khai tiêu chuẩn nhất cho Next.js.
  - Nhược:  Free quota không hỗ trợ dự án thương mại, chính sách tính phí phức tạp, và nếu không tối ưu cẩn thận thì rất dễ nhận phải một hóa đơn “trên trời”.

- **Zeabur**
  - Free $5 quota, Pro từ $5/tháng.
  - Pay-as-you-go, hỗ trợ container.
  - Ưu điểm: Mô hình pay-as-you-go, chi phí khởi đầu rẻ, hỗ trợ container deployment. Nếu traffic lớn, bạn có thể mua server hosting trực tiếp trên platform và vẫn dùng chung dịch vụ. Ngoài ra còn có thể deploy database, Redis, project Next.js… hoặc tự host server của bạn.

- **Railway**
  - Free $5 credit/tháng, sau đó pay-as-you-go.
  - Giá: Tính phí theo mức sử dụng tài nguyên, khoảng $0.000463/GB-hour (memory), $0.000231/vCPU-hour, $0.000000047683716/KB bandwidth.
  - Ưu điểm: Là một nền tảng PaaS linh hoạt, hỗ trợ nhiều ngôn ngữ và framework, có thể deploy PostgreSQL database và Docker container, đồng thời đơn giản và dễ sử dụng.
  - Nhược điểm: Giá có thể cao đối với các project nhỏ, và chi phí sẽ tăng nhanh khi traffic tăng.


- **Fly.io**
  - Free < $50/tháng (policy không chính thức).
  - Ưu: global app deployment, support Docker.
  - Nhược: free policy có thể bị cut bất cứ lúc nào.

# Database Platform

Supabase: 

- **Free database quota:**
  - 500MB database storage
  - Tối đa 2 projects
  - 5GB bandwidth

- **Paid plan:** Pro $25/tháng (bao gồm 8GB database, 100GB bandwidth)

- **Ưu điểm:**
  - Nền tảng Backend-as-a-Service (BaaS) mã nguồn mở
  - Cung cấp PostgreSQL database
  - Hỗ trợ real-time
  - Built-in authentication
  - File storage

- **Nhược điểm:**
  - Bản free giới hạn dung lượng database nhỏ
  - Các truy vấn phức tạp có thể ảnh hưởng đến hiệu năng


- **Neon**

  - **Free database quota:**
    - 0.5 GiB storage
    - 10 projects
    - 10 branches
    - 190 giờ computing/tháng
  - **Paid plans:** Launch $19/tháng, Scale $69/tháng
  - **Ưu điểm:**
    - Serverless PostgreSQL
    - Hỗ trợ branching
    - Dễ dàng mở rộng nhanh chóng
  - **Nhược điểm:**
    - Bản free bị giới hạn storage và computing time