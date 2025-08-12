
# What is SuiUp?
> suiup is a tool for managing binary files related to Sui blockchain, but the current version has deficiencies in version update prompts, error message processing, and nightly version switching.


This article will detail solutions to these issues, aiming to improve the reliability and user-friendliness of the tool.

# Installation

From script: 
```
curl -sSfL https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh | sh
```


# Quick Start

> Install sui -- this will install the latest available testnet release

```
suiup install sui@testnet
```

Install walrus

```
suiup install walrus -y

```

Install mvr (Move Registry CLI)
```
suiup install mvr
```


List available binaries to install

```
suiup list
```

Github: https://github.com/mystenLabs/suiup