import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { developmentChain, networkConfig } from "../helper-hardhat-config"

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9

const deployMock: DeployFunction = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer
    const { deploy, log } = deployments

    if (developmentChain.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        const result = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK],
            log: false,
        })

        log("Mocks Deployed")
        log("----------------------------")
    }
}

export default deployMock

deployMock.tags = ["DeployMocks"]
