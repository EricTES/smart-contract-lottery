import { network } from "hardhat"
import { Address, DeployFunction } from "hardhat-deploy/types"
import { developmentChain, networkConfig } from "../helper-hardhat-config"

const deployRaffle: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log, get } = deployments

    let coordinatorAddress: Address
    if (developmentChain.includes(network.name)) {
        coordinatorAddress = (await get("VRFCoordinatorV2Mock")).address
    } else {
        coordinatorAddress = networkConfig[network.config.chainId || 5].goerliCoordinator
    }

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [
            coordinatorAddress,
            1,
            0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15,
            7924,
            100000,
        ],
        log: true,
        waitConfirmations: 6,
    })
    console.log(raffle)
}
export default deployRaffle

deployRaffle.tags = ["deployRaffle"]
