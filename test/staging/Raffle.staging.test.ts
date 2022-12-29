import { assert, expect } from "chai"
import { BigNumber, Contract, Signer } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChain, networkConfig } from "../../helper-hardhat-config"

developmentChain.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging tests", function () {
          let raffle: Contract, deployer: string, entraceFee: BigNumber

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              entraceFee = await raffle.getEntranceFee()
          })

          describe("fulfilleRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  const accounts = await ethers.getSigners()

                  await new Promise<void>(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnePicked event fired!!!")

                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLatestTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].getAddress())
                              assert.equal(raffleState.toString(), "0")
                              assert.equal(winnerEndingBalance.toString(), entraceFee.toString())
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })

                      console.log("Entering Raffle...")
                      const tx = await raffle.enterRaffle({ value: entraceFee })
                      await tx.wait(1)
                      console.log("Ok, time to wait...")

                      const winnerStartingBalance = await accounts[0].getBalance()

                      //this code wont complete until our listener has finished listening!
                  })
              })
          })
      })
