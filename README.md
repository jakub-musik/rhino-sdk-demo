# rhino.fi SDK Demo

A minimal Node.js + TypeScript project demonstrating the [rhino.fi SDK](https://www.npmjs.com/package/@rhino.fi/sdk). It initializes the SDK, fetches the bridge configuration, and requests a cross-chain bridge quote.

## Prerequisites

- Node.js 18+
- Yarn (or npm)
- A rhino.fi API key — obtain one from [rhino.fi](https://rhino.fi)

## Setup

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Configure your API key**

   Copy the example env file and add your key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and replace the placeholder with your actual API key:

   ```
   RHINO_API_KEY=your-api-key-here
   ```

## Usage

Run the demo:

```bash
yarn start
```

This will:

1. Load your API key from `.env`
2. Initialize the rhino.fi SDK
3. Fetch and display the bridge configuration (all supported chains)
4. Request a quote for bridging 60,000 USDT from TRON to Ethereum
5. Print the quote details (amounts, fees, estimated duration) to the console

### Example output

```
Bridge config loaded — 33 chains supported:
ARBITRUM, AVALANCHE, BASE, BINANCE, CELO, ETHEREUM, ...

Requesting quote: 60000 USDT from TRON → ETHEREUM ...
Quote received:
{
  "_tag": "bridge",
  "chainIn": "TRON",
  "chainOut": "ETHEREUM",
  "payAmount": "60000",
  "receiveAmount": "59928.58",
  "fees": { ... },
  ...
}
```

## Project Structure

```
├── .env.example     # Environment variable template (committed)
├── .env             # Your actual API key (git-ignored)
├── package.json
├── tsconfig.json
└── src/
    └── index.ts     # Demo script
```

## Customizing the Quote

Edit `src/index.ts` to change the quote parameters. The SDK provides `SupportedChains` and `SupportedTokens` constants for available values:

```typescript
const quoteResponse = await rhinoSdk.api.bridge.getUserQuote({
  token: SupportedTokens.USDT,    // USDT, USDC, ETH, WBTC, etc.
  chainIn: SupportedChains.TRON,  // Source chain
  chainOut: SupportedChains.ETHEREUM, // Destination chain
  amount: '60000',                // Amount to bridge
  mode: 'pay',                    // 'pay' = fixed input amount, 'receive' = fixed output amount
  depositor: '...',               // Sender wallet address
  recipient: '...',               // Receiver wallet address
})
```

To see all supported chains and tokens, check the bridge config output or refer to the [SDK documentation](https://docs.rhino.fi).
