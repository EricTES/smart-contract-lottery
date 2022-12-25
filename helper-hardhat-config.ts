interface NetworkConfig {
    [key: number]: {
        name: string
        ethUsdPriceFeedAddress: string
        goerliCoordinator: string
    }
}

export const networkConfig: NetworkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        goerliCoordinator: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
    },
}

export const developmentChain = ["hardhat", "localhost"]
