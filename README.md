# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Starting installation packages

-   hardhat-deploy
-   @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers

-   yarn add --dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0'

-   yarn add --dev hardhat-contract-sizer
-   yarn add --dev hardhat-gas-reporter
-   yarn add --dev @nomiclabs/hardhat-etherscan

-   yarn add --dev prettier prettier-plugin-solidity

-   yarn add --dev solhint solidity-coverage

IF TYPESCRIPT

-   yarn add --dev ts-node typescript chai @types/node @types/mocha @types/chai

## Chainlink VRF (Verifiable Random Function)

This allows us to query a random number.
To use it , our contract must inherit from the VRFConsumerBaseV2.sol. We also need to store the coordinator using the VRFCoordinatorV2Interface.sol. The contract contains two main function, requestRandomWords (name however you want) and fulfillRandomWords (name has to be spelt this way).

requestRandomWords is external and used by outsiders to call. It request a requestId from the VRF Coordinator and then sends an Event to be picked up by the VRF Service. After some calculations, the VRF Service then sends the random number back to the VRF Coordinator. Inorder for the coordinator to send the request we need the following parameters:

-   keyhash/gasLane
-   subscriptionId
-   number of confirmations
-   gasLimit
-   number of words

fulfillRandomWords is what the VRF Coordinator use to send the random word back into the contract to store.

Since the VRFConsumerBaseV2 and VRFCoordinatorV2Interface.sol comes from @chainlink/contracts, we need to run "yarn add --dev @chainlink/contracts"

## Chainlink Keepers

This allows us to trigger a function in our smart contract based on Time or Some logic.

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol"
Contract is AutomationCompatible

The two main funciton that we need to implement is checkUpKeep() and performUpkeep();

The nodes on the blockchain preiodically runs the checkUpKeep function to check if our logic has been met or if the time is up. If either is true then it notifies the Automation Registry to run the performUpKeep which is whatever code you want to run.

## Data of type Bytes

If you see a data type of bytes, it means it can be anything even a function. How cool !!!

## VRFCoordinatorV2Mock

In the actual Etheruem blockchain, the VRF Service does the calculation for the random number. However in a local network, we don't have the VRF Service, therefore we just choose the random numbers ourselves in one of the functions of the VRFCoordinatorV2Mock. This is just for the sake of being able to test.

## Manipulating local blockchain

If you go to the docs at this link https://hardhat.org/hardhat-network/docs/reference, you'll find at the #special-testing/debugging-methods methods you can call to manipulate your local network.

example:
await network.provider.send("evm_increaseTime", [interval + 1]) - moves the time fowards by the specified value in the square brackets

await network.provider.send("evm_mine", []) - mine one block in the blockchain

## Call static

.callStatic allows us to call a contract function without sending a transaction. This is for the purpose of just getting the returned value when we are testing.

e.g:
await raffle.checkUpkeep([]) --> await raffle.callStatic.checkUpkeep([])

## Blank bytes object

If you want to send a blank bytes object into a parameter just use "0x"

## Listening to events emit

By using contract.once("event_name", function()) , we can execute a function when we hear the event being emited.

In the unit test, we are able to execute the performKeepup and fulfillRandomWords function ourselves so we don't really need to listen to the events since we know when it will be done.

However in the actual testnet (Goerli) , the functions are called by the VRFCoordinator. However, we can't really predict when it will be called. Therefore, we need to add a listener to listen to the event fired.
