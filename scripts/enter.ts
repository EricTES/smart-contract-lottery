import { ethers } from "hardhat"

async function enterRaffle() {
    const raffle = await ethers.getContract("Raffle")
    const entranceFee = await raffle.getEntranceFee()
    const tx = await raffle.enterRaffle({ value: entranceFee + 1 })
    await tx.wait(1)
    console.log(tx.hash)
    console.log("Entered")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
enterRaffle().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
