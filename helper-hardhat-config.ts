import { BigNumber } from "ethers"
import { ethers } from "hardhat"

interface NetworkConfig {
    [key: number]: {
        name: string
        ethUsdPriceFeedAddress?: string
        goerliCoordinator?: string
        entraceFee: BigNumber
        gasLane?: string
        subscriptionId?: string
        callbackGasLimit: string
        interval: string
    }
}

export const networkConfig: NetworkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        goerliCoordinator: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        entraceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "8377",
        callbackGasLimit: "500000",
        interval: "30",
    },
    31337: {
        name: "hardhat",
        entraceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000",
        interval: "30",
    },
}

export const developmentChain = ["hardhat", "localhost"]
