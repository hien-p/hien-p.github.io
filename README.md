# Harry's Blockchain Documentation 📚

Personal documentation site for blockchain development, Web3 tutorials, and technical resources.

## 🚀 Quick Start

### Development
```bash
# Start the development server
mkdocs serve --dev-addr=127.0.0.1:8001

# Open in browser
open http://127.0.0.1:8001
```

### Auto Navigation System

This project uses an **auto-navigation system** that automatically detects and lists all your markdown files. No need to manually update navigation!

#### When you add new files:

**Quick Update (Recommended)**
```bash
python update_nav.py
```

**Full Navigation Regeneration**
```bash
python generate_full_nav.py
```

## 📁 Project Structure

```
docs/
├── collections/          # Main content collections
│   ├── Layer_0/         # Cross-chain solutions
│   ├── Layer_1/         # Base layer protocols
│   ├── EVM/            # Ethereum Virtual Machine
│   ├── Defi/           # Decentralized Finance
│   ├── Modular_blockchain/  # Scalable architecture
│   └── security researcher/ # Smart contract security
├── What_I_learned_from_VBI_Academy/  # VBI Academy content
├── vibe_coding/        # Development tools
└── weminal/           # Project documentation
```

## 🛠️ Features

- **Auto Navigation**: Automatically detects and lists all `.md` files
- **Responsive Design**: Works on all devices
- **Dark Mode**: Built-in theme switching
- **Search**: Full-text search across all content
- **Mobile Sidebar**: Sliding sidebar on mobile devices

## 📝 Adding New Content

1. **Add your markdown file** to any folder in `docs/collections/`
2. **Run the navigation updater**:
   ```bash
   python update_nav.py
   ```
3. **That's it!** Your file will automatically appear in the navigation

## 🎯 Collections Overview

### Layer 0 - Cross-chain Solutions
- Polkadot ecosystem
- Interoperability protocols

### Layer 1 - Base Layer Protocols  
- Sui development (Move language)
- Avalanche (subnets, AWM)

### EVM - Ethereum Virtual Machine
- EVM internals deep dive
- Smart contract development

### DeFi - Decentralized Finance
- Token standards (ERC-6551)
- DEX protocols (Uniswap V1)

### Modular Blockchain
- Celestia (data availability)
- Camp Mamo learning materials

### Security Researcher
- Smart contract auditing
- Security best practices

## 🔧 Customization

### Theme
Based on **MkDocs Windmill** theme with custom enhancements:
- Custom CSS: `docs/css/custom.css`
- Custom JS: `docs/js/custom.js`

### Configuration
Main config: `mkdocs.yml`

## 📚 Resources

- [MkDocs Documentation](https://www.mkdocs.org/)
- [MkDocs Awesome Pages Plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)
- [Windmill Theme](https://github.com/gristlabs/mkdocs-windmill)

---
