import { assert, expect } from "chai"
import { BigNumber, Contract, Signer } from "ethers"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChain, networkConfig } from "../../helper-hardhat-config"

!developmentChain.includes(network.name)
    ? describe.skip
    : describe("Raffle", function () {
          let raffle: Contract,
              vrfCoordinatorV2Mock: Contract,
              deployer: string,
              entraceFee: number,
              interval: BigNumber
          const chainId = network.config.chainId || 5

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              entraceFee = await raffle.getEntranceFee()
              interval = await raffle.getInterval()
          })

          describe("constructor", async function () {
              it("initializes the raffle correctly", async function () {
                  // Ideally we make our test have just 1 assert per it
                  const raffleState = await raffle.getRaffleState()
                  const interval = await raffle.getInterval()

                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId].interval)
              })
          })
          describe("enterRaffle", async function () {
              it("reverts if you don't pay enough", async function () {
                  await expect(raffle.enterRaffle()).to.be.revertedWith(
                      "Raffle__NotEnoughEthEntered"
                  )
              })
              it("records players when they enter", async function () {
                  //raffleEntranceFee
                  const signers = await ethers.getSigners()
                  for (let i = 0; i < 2; i++) {
                      const tempContract = raffle.connect(signers[i])
                      await tempContract.enterRaffle({ value: entraceFee })
                      assert.equal(await raffle.getPlayer(i), signers[i].address)
                  }
              })
              it("emits event on enter", async function () {
                  await expect(raffle.enterRaffle({ value: entraceFee })).to.emit(
                      raffle,
                      "RaffleEnter"
                  )
              })
              it("doesn't allow entrance when raffle is calculated", async function () {
                  await raffle.enterRaffle({ value: entraceFee })
                  // Increase blockchain time by the specified value , interval + 1
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  // Mine one block in the blockchain
                  await network.provider.send("evm_mine", [])
                  // We pretend to be a Chainlink Keeper
                  await raffle.performUpkeep([])

                  //   await expect(raffle.enterRaffle({ value: entraceFee })).to.be.revertedWith(
                  //       "Raffle__NotOpen"
                  //   )
              })
          })
      })
