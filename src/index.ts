import 'dotenv/config'
import sdk from '@rhino.fi/sdk'

const { RhinoSdk, SupportedChains, SupportedTokens } = sdk

const apiKey = process.env.RHINO_API_KEY
if (!apiKey) {
  console.error('Missing RHINO_API_KEY in .env file. Copy .env.example to .env and add your key.')
  process.exit(1)
}

const rhinoSdk = RhinoSdk({ apiKey })

// Fetch bridge config to show available chains
const configResponse = await rhinoSdk.api.bridge.getBridgeConfig()
const bridgeConfig = configResponse.data

if (!bridgeConfig) {
  console.error('Failed to fetch bridge config:', configResponse.error)
  process.exit(1)
}

const chainNames = Object.keys(bridgeConfig)
console.log(`Bridge config loaded — ${chainNames.length} chains supported:`)
console.log(chainNames.join(', '))
console.log()

// Request a user quote for 100 USDT from Ethereum to Arbitrum One.
// In a real app, depositor/recipient would be actual wallet addresses.
const placeholderAddress = '0x0000000000000000000000000000000000000001'
const placeholderTronAddress = 'TYD4pB7wGi1p8zK67rBTV3KdfEb9nvNDXh'

console.log('Requesting quote: 60000 USDT from TRON → ETHEREUM ...')
const quoteResponse = await rhinoSdk.api.bridge.getUserQuote({
  token: SupportedTokens.USDT,
  chainIn: SupportedChains.TRON,
  chainOut: SupportedChains.ETHEREUM,
  amount: '60000',
  mode: 'pay',
  depositor: placeholderTronAddress,
  recipient: placeholderAddress,
})

if (quoteResponse.data) {
  console.log('Quote received:')
  console.log(JSON.stringify(quoteResponse.data, null, 2))
} else {
  console.error('Failed to get quote:', JSON.stringify(quoteResponse.error, null, 2))
}
