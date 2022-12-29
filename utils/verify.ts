import hre, { ethers, run } from "hardhat"

export const verify = async (address: string, args: any) => {
    const raffleContract = await ethers.getContract("Raffle")

    try {
        await hre.run("verify:verify", {
            address,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}
