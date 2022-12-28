import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-deploy"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "hardhat-contract-sizer"
import "dotenv"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "0xkey"
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            //@ts-ignore
            blockConfirmations: 1,
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/K9hxrDpLKuRSuXFBA2B_C7LInlGEc6ws",
            accounts: ["0x23e5d8736d371d3624c3238ccf5c651c14c1a13c7edac7930aef6d7323b58c83"],
            chainId: 5,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            goerli: 0,
        },
        player: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
    },
    mocha: {
        timeout: 200000, // 200 seconds max
    },
}

export default config
