import { Contract } from "ethers"
import { ethers, network } from "hardhat"
import { Address, DeployFunction } from "hardhat-deploy/types"
import { developmentChain, networkConfig } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")

const deployRaffle: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log, get } = deployments

    let vrfCoordinatorV2Mock: Contract, coordinatorAddress: Address, subscriptionId: string
    // If on hardhat or localhost, mock our own VRF Coordinator
    if (developmentChain.includes(network.name)) {
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        coordinatorAddress = vrfCoordinatorV2Mock.address
        // Creating our own subscription ID for when requesting random words
        const transactionReponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionReponse.wait(1)

        subscriptionId = transactionReceipt.events[0].args.subId

        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
    } else {
        coordinatorAddress = networkConfig[network.config.chainId || 5].goerliCoordinator || ""
        subscriptionId = networkConfig[network.config.chainId || 5].subscriptionId || ""
    }

    // Gathering all information for the Raffle constructor
    const entraceFee = networkConfig[network.config.chainId || 5].entraceFee
    const gasLane = networkConfig[network.config.chainId || 5].gasLane
    const callbackGasLimit = networkConfig[network.config.chainId || 5].callbackGasLimit
    const interval = networkConfig[network.config.chainId || 5].interval
    const args = [
        coordinatorAddress,
        entraceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        interval,
    ]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1,
    })

    // Ensure the Raffle contract is a valid consumer of the VRFCoordinatorV2Mock contract.
    // This is using the programatic was of subscribing. Only for local network
    if (developmentChain.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        await vrfCoordinatorV2Mock.addConsumer(subscriptionId, raffle.address)
    }

    if (!developmentChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Veriying...")
        await verify(raffle.address, args)
    }
}
export default deployRaffle

deployRaffle.tags = ["all", "raffle"]
