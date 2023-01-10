import { ethers, network } from 'hardhat'
import * as fs from 'fs';

const FRONT_END_ADDRESSES_FILE = "..\\..\\nextjs-smartcontract-lottery\\constants\\contractAddresses.json"
const FRONT_END_ABI_FILE = "..\\nextjs-smartcontract-lottery\\constants\\abi.json"

const updateFrontEnd = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end")
        updateContractAddresses()
    }
}


const updateContractAddresses = () => {
    //const raffle = await ethers.getContract("Raffle")
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, 'utf8'))
    console.log("here")
    // if (!network.config.chainId) return;
    // const chainId = network.config.chainId.toString()

    // if (chainId in contractAddresses) {
    //     if (!contractAddresses[chainId].includes(raffle.address)) {
    //         contractAddresses[chainId].push(raffle.address)
    //     }
    // } else {
    //     contractAddresses[chainId] = [raffle.address]
    // }
    // fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses))

}


const updateAbi = async () => {
    // const raffle = await ethers.getContract("Raffle")
    // fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))



}

export default updateFrontEnd

updateFrontEnd.tags = ["all", "update"]