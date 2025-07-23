# ERC-6551 Token Bound Accounts
(aka how NFTs can own assets). Every NFT has it owns wallet 

The ERC-6551 standard specifies how an NFT can "own" other assets. Essentially, the NFT owns a variation of a *"smart wallet"* that itself is the owner of other assets.

If you want to bring together your knowledge of proxies, assembly optimization, NFTs, and several other ERCs, ERC-6551 will do that for you!



The interace 

```solidity
interface IERC6551Registry {
    function createAccount(
    address implementation,
    uint256 chainId,
    address tokenContract,
    uint256 tokenId,
    uint256 salt,
    bytes calldata initData
    ) external returns (address) ;


    function account(
    address implementation,
    uint256 chainId,
    address tokenContract,
    uint256 tokenId,
    uint256 salt
    ) external view returns (address);
}
```

# Case studies 

1. AI-powered simulation game using NFT character 
2. Mint unique digital signature NFTS

video: https://www.youtube.com/watch?v=TNuLH47vZ2w



![token ](https://pbs.twimg.com/media/GweWsZia0AAVqh1?format=jpg&name=medium)