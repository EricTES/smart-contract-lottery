import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { developmentChain, networkConfig } from "../helper-hardhat-config"

const deployMock: DeployFunction = async ({ deployments, getNamedAccounts }) => {
    const deployer = (await getNamedAccounts()).deployer
    const { deploy, log } = deployments

    if (developmentChain.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        const result = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: [100000, 100000],
            log: false,
        })

        console.log(result.address)
    }
}

export default deployMock

deployMock.tags = ["DeployMocks"]
