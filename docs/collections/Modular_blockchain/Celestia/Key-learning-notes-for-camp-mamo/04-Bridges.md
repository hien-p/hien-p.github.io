# Bridges

> If you’ve spent more than a week in crypto, chances are you’ve already cursed out at least one bridging UX.

# Vấn đề hiện tại với việc "bridging"

Người dùng crypto không chỉ ở một blockchain mà có nhu cầu chuyển tài sản giữa các chain (multi-chain). Nhưng việc bridge (chuyển tài sản) hiện tại còn phức tạp, chậm và dễ gây nhầm lẫn.

Celestia đang build bridging stack mới với 3 mảnh ghép chính:

* IBC: Trust-minimized protocol từ Cosmos, ổn định nhưng giới hạn cho SDK-based chains.
* Hyperlane: Mesh-like protocol, hiện đã native trên Celestia nhờ Lotus v4. Hỗ trợ đa VM (EVM, SVM, Move…)
* Lazybridging:  Bridging không cần quan tâm chain, proof-based, zero trust, user không biết mình đang bridge.


# Core concepts you need to get nếu muốn hiểu Lazybridging stack của Celestia:

* IBC – Trust-minimized messaging protocol được thiết kế cho Cosmos SDK chains. Cực ổn định nhưng khá SDK-native.
* Hyperlane – Giao thức messaging dạng mesh, đã kết nối 100+ chains, không quan trọng VM.
* Lazybridging – Bridging không cần committee. Dựa hoàn toàn vào ZK proofs
* ZK accounts – Thay vì dùng private key, rollups có thể dùng proving key để điều khiển account trên Celestia.
* Account abstraction – Người dùng có thể delegate quyền bridge sang cho app hoặc chain, không cần tự ký từng tx nữa.
* Committee vs Cryptographic Security – Mọi thứ đang dịch chuyển từ mô hình “trust validator set” sang “trust math”.

Những khái niệm trên đối với người bắt đầu web3 sẽ khá khó hiểu. Nên cùng mình đi qua chi tiết cơ bản về các kiến thức này nhé.


# Inter Blockchain Communication (IBC) là gì?

Nếu lấy Ethereum làm tiêu chuẩn thì hiện tại có 3 hướng chính để giúp smart contract scale tốt hơn. Hướng đầu tiên là sử dụng công nghệ **Rollup**.  Rollup basically là cách gom nhiều giao dịch nhỏ ở ngoài (off-chain), gói lại thành một block tổng hợp rồi gửi về Ethereum để xác nhận.


Con đường thứ hai là thay vì mở rộng trên Ethereum, ta tạo ra một Layer 1 blockchain hoàn toàn mới với mục tiêu có thông lượng cao hơn, xử lý nhanh hơn, scale mạnh hơn. Ví dụ: Solana và Internet Computer đều đi theo hướng này.
Nhưng để đạt được tốc độ khủng đó, họ yêu cầu mỗi node chạy blockchain phải cực kỳ mạnh.


Con đường thứ ba là một hướng thú vị hơn: kết nối nhiều blockchain khác nhau lại với nhau, tạo thành một mạng lưới liên kết.
Bạn có thể hình dung giống như việc xây dựng hệ thống đường cao tốc xuyên suốt cả nước – thay vì mở rộng từng thành phố, ta kết nối chúng lại với nhau bằng highway. Mỗi tỉnh (blockchain) có thể khác nhau về luật lệ (VM, consensus, use case), nhưng đều được kết nối với nhau thông qua các interoperability protocols. 

Các dự án nổi bật đi theo hướng này là Cosmos, Cosmos, Cosmos với subnet architecture. 

Như vậy bạn có thể Inter Blockchain Communication (IBC) là các hệ thống đường cao tốc giúp kết nối các blockchain riêng riêng trong Cosmos Network mà mình đã ví von ở phần trên.


Khi 2 chain muốn kết nối với nhau qua IBC, thường sẽ cần đệ trình một proposal qua governance trên chain đích. Việc này thường diễn ra trên Cosmos Hub hoặc Osmosis, hiện tại Osmosis đã kết nối với ~45 chain, còn Cosmos khoảng 40.


Để IBC hoạt động, mỗi chain cần:
* Một light client của chain kia: để có thể xác minh cryptographically trạng thái của chain đối tác
* Một relayer: đây là thành phần trung gian, chuyên đưa tin nhắn từ chain A sang chain B. Relayer không cần trust, nhưng cần để duy trì tính liveness để đảm bảo thông điệp được gửi liên tục và các node vẫn có thể đồng thuận qua lại.

![](https://img.learnblockchain.cn/2025/03/11/F7cc6ab77-549d-42c3-b88d-69ebd06f7809_1456x921.png)





# How Hyperlane Compliments Celestia


Bản nâng cấp **Lotus** của Celestia đã tích hợp Hyperlane, mở đường cho native TIA mở rộng sang các chain ngoài Cosmos. Ở thời điểm launch, Celestia sẽ kết nối trực tiếp với **Ethereum, Solana, Base, Arbitrum One, Eclipse, và Abstract**.

Cách đây 2 năm, team core của Hyperlane đã đánh cược vào một tầm nhìn:

> Modular blockchain sẽ là tương lai.

Celestia là chain đầu tiên hiện thực hóa tầm nhìn modular. Tách rời rõ ràng giữa các thành phần cốt lõi cụ thể là consensus và data availability ra khỏi execution.


Nhờ vậy, Celestia mở đường cho các rollup hiệu suất cao, L2 tự chủ, và quan trọng nhất là trao full-stack control vào tay những anh em builder nghiêm túc. Và tương tự, **Hyperlane** cũng đi theo tư duy modular nhưng trong mảng interoperability.

Nó tách biệt phần message passing khỏi phần verification, giúp dev tự chọn hoặc tùy chỉnh từng lớp trong cross-chain stack của mình.


Bạn có thể xem qua cách [Deploying Hyperlane with Osmosis Testnet](https://github.com/many-things/cw-hyperlane/blob/main/DEPLOYMENT.md)

# Lazybridging: The solution to solve fragmentation and stream assets from anywhere

![https://blog.celestia.org/content/images/size/w2000/2024/11/Celestia_Lazybridging5.jpg]


Về cơ bản, Lazybridging sẽ cho phép user tương tác với tài sản ở nhiều rollup (và cả ngoài rollup) mà vẫn giữ được cảm giác như đang dùng một chain duy nhất. Bạn sẽ không cần nhảy ví, không cần chọn chain, không cần manually bridge.

Celestia gọi đây là triết lý “lazy” vì Lazy for users do không phải suy nghĩ mình đang ở chain nào. Lazy for devs do không cần lo vụ build bridge riêng.

Để các blockchain mô-đun (modular blockchains) có thể phát triển bền vững về lâu dài, các ứng dụng không thể bị buộc phải lựa chọn giữa **tính linh hoạt (flexibility) và khả năng tiếp cận thanh khoản và người dùng (access to liquidity and users)**. Thực trạng hiện tại là sự phân mảnh giữa các chain (cross-chain fragmentation) đang khiến tài sản bị cô lập trong từng hệ sinh thái riêng biệt, làm giảm đáng kể tiềm năng phát triển và tương tác của chúng.

Đối với các builders, đây là một bài toán khó. Việc triển khai ứng dụng trên các rollup có thể mang lại lợi ích về khả năng mở rộng (scalability), chi phí thấp, và tùy biến cao. Tuy nhiên, đổi lại, họ thường phải chấp nhận hy sinh khả năng tiếp cận thanh khoản và tập người dùng rộng lớn điều mà các blockchain nguyên khối (monolithic blockchains) như Ethereum đang làm tốt hơn.

Lazybridging của Celestia ra đời nhằm giải quyết tận gốc sự phân mảnh này. Tầm nhìn của Celestia là tạo ra một hệ sinh thái mô-đun nơi các rollups không chỉ cùng tồn tại (coexist) mà còn có thể tương tác tự nhiên (interoperate) và tận dụng chung blockspace của Celestia một cách hiệu quả.


Vấn đề hiện tại là **Modular Fragmentation**. Modular blockchain mang lại flexibility & performance cho devs – ai cũng muốn tự build rollup theo nhu cầu riêng. Nhưng điều đó đi kèm một trade-off lớn là  Access tới user và liquidity bị giới hạn, vì chain bạn build ra tách biệt với phần còn lại.

Hiện tại, chỉ những tài sản có thanh khoản khủng như ETH, USDC là có thể bridge ngay được (qua solver-based protocols như Hop, Across…).


-> Lazybridging giải quyết điều đó

Ví dụ, một người dùng muốn chuyển token từ Solana sang Celestia. Hành động này được bắt đầu trên Solana thông qua một smart contract hoặc frontend UI hỗ trợ. Thay vì gửi toàn bộ dữ liệu giao dịch sang chain đích, hệ thống sẽ xử lý giao dịch ngoài chuỗi (off-chain) và tạo ra một bằng chứng ZK (zero-knowledge proof) xác minh rằng giao dịch đã diễn ra đúng và hợp lệ trên chain gốc.

Bằng chứng ZK này sau đó được gửi lên Celestia. Celestia sẽ xác minh tính hợp lệ của bằng chứng, nhưng không cần thực thi logic giao dịch gốc (tức là không cần phải “hiểu” logic của Solana). 

Khi bằng chứng ZK được xác minh thành công, một ZK account tương ứng trên Celestia sẽ tự động cập nhật trạng thái, hoàn tất việc nhận tài sản hoặc dữ liệu liên quan đến giao dịch. Không cần bất kỳ sự tương tác trực tiếp nào với chain gốc ở bước này.

Bởi vì Celestia không thực hiện toàn bộ logic hoặc lưu trữ đầy đủ trạng thái của các chain khác — nó chỉ cần đủ thông tin để xác minh tính hợp lệ của một bằng chứng. Mọi phần “nặng nề” (execution, state transition) đã được đẩy về cho chain gốc và off-chain prover xử lý. Điều này giúp: 

* Tiết kiệm tài nguyên trên Celestia
* Giảm latency trong việc xử lý cross-chain
* Giữ được modularity mà không đánh đổi UX hoặc security






Một video sâu hơn về lazybriding protocols: [https://www.youtube.com/watch?app=desktop&v=hqYDg9AVk1I&t=518s](https://www.youtube.com/watch?app=desktop&v=hqYDg9AVk1I&t=518s)


# Overview of ZK Accounts

Để đạt được trạng thái [“functional escape velocity”](https://vitalik.eth.limo/general/2019/12/26/mvb.html) tức là đủ khả năng để hỗ trợ các L2 phức tạp. Một lockchain cần có mức độ biểu đạt (expressivity) đủ cao. Trước đây, nhiều người mặc định rằng điều này đồng nghĩa với việc blockchain đó phải cung cấp khả năng thực thi tổng quát (general-purpose execution), như cách Ethereum cho phép chạy bất kỳ logic nào trong EVM.

Tuy nhiên, với sự phát triển của ZK proofs (hay còn gọi là validity proofs), yêu cầu này đã trở nên bớt cứng nhắc hơn. Thay vì phải thực thi toàn bộ logic giao dịch, blockchain chỉ cần có khả năng xác minh các bằng chứng ZK do các hệ thống khác tạo ra.

Điều này mở ra một hướng đi hoàn toàn mới cho các blockchain mô-đun: chúng có thể tối giản hóa vai trò execution, chỉ tập trung vào việc cung cấp môi trường xác minh (verification layer). Miễn là chúng có thể xác thực tính đúng đắn của một bằng chứng. 

ví dụ, rằng một giao dịch đã được thực hiện đúng trên L2 thì bản thân chain L1 đó không cần biết hay xử lý logic chi tiết bên trong.


Ethereum từng làm nổi tiếng mô hình account model nơi điều kiện để một giao dịch được xem là hợp lệ và tiêu tiền từ một tài khoản chỉ cần:

* Đúng nonce của tài khoản (hoặc cơ chế chống replay khác)
* Đủ số dư để trả phí và gửi tiền
* Chữ ký số hợp lệ dựa trên public key của tài khoản


Khác với Bitcoin dùng mô hình UTXO, nơi mỗi đồng được kiểm soát bởi một đoạn script nhỏ (stateless predicates) cho phép định nghĩa điều kiện tiêu tiền khá chi tiết.

Vấn đề là account model truyền thống lại quá “cứng”, hạn chế quyền định nghĩa điều kiện sử dụng tài khoản. Ví dụ: Ethereum không thể có native multisig mà không viết thêm smart contract. Một số blockchain account-based khác, như những chain dùng Cosmos SDK, có thể hỗ trợ thêm tính năng như multisig hay vesting ngay trong giao thức, nhưng mỗi tính năng như vậy đều phải được “đóng đinh” (enshrined) riêng lẻ vào protocol.

ZK proofs xuất hiện để giữ được sinh hoạt trong việc control accounts.


# Ứng dụng của ZK Accounts

Chúng ta có thể mở rộng đáng kể chức năng của ZK Accounts. 

## Account Abstraction

Cho phép messages từ các account khác làm đầu vào (input) cho verifier. Điều này giúp ZK account có thể:

* Ủy quyền hạn chế (Restricted control): Ví dụ khi hai ZK rollup cần thực hiện atomic bridging thông qua Celestia state machine trong một giao dịch duy nhất. Rollup thứ nhất rút token từ ZK account của mình, gửi message sang rollup thứ hai, và được nạp vào ZK account của rollup đó.  (Chi tiết hơn được mô tả ở phần Lazybridging.)

* Ủy quyền không hạn chế (Unrestricted control): Cho phép một account khác toàn quyền điều khiển ZK account. Cách này có thể áp dụng với keystore rollups.


## Upgrades

Verification key của ZK account không nhất thiết phải cố định từ khi tạo account. Mỗi ZK account có thể lưu verification key ở dạng mutable (có thể thay đổi). Một nhánh thực thi (execution path) cụ thể của verifier có thể kích hoạt việc nâng cấp (upgrade) thông qua:

* Gửi một bằng chứng hợp lệ (valid proof) trực tiếp lên ZK account
* Hoặc thông qua một account khác

Việc upgrade này sẽ thay đổi verification key và do đó thay đổi chương trình điều khiển việc tiêu tiền của ZK account. Trong bối cảnh ZK rollup, điều này tương đương với việc nâng cấp logic thực thi của rollup.


##  Lazybridging

Lazybridging là một phần mở rộng của ZK account, cho phép tạo cầu hai chiều (two-way bridge) với mức độ tin cậy tối thiểu (trust-minimized) giữa Celestia state machine và các rollup (bao gồm cả TIA và các token khác), đồng thời hỗ trợ nhận tài sản từ các chain ngoài IBC.

Khác với bản phác thảo giao thức, extension này cho phép mở khóa (unlock) một phần tài sản cụ thể trong ZK account, thay vì toàn bộ số dư.

Với các rollup (cả ZK và optimistic), Lazybridging gồm hai thành phần phối hợp:

1. Một phần trong Celestia state machine (như đã mô tả ở trên)
2. Một phần trong state transition function của rollup. ví dụ: rollup có thể tích hợp một loại giao dịch đặc biệt hoặc một smart contract để burn tài sản, từ đó kích hoạt việc rút tài sản từ ZK account liên kết trên Celestia.

Một biến thể khác là chuyển tài sản từ các chain ngoài IBC như Ethereum. Trong trường hợp này, ZK account sẽ xác minh tính đúng đắn của consensus và một phần state transition của chain gốc (ví dụ: logs của EVM chain), mà không cần chain đó phải chủ động tích hợp Celestia để dùng data availability.

## Keystore Rollups

Keystore rollup là loại rollup trừu tượng hóa public key có thể thay đổi (mutable) của người dùng bằng một identifier duy nhất, cố định (immutable). Tài sản được kiểm soát bởi identifier thay vì trực tiếp bởi public key.

Khi kết hợp với account abstraction, keystore rollup có thể kiểm soát cả:

* Các account khác trong Celestia state machine
* Các rollup khác sử dụng ZK accounts