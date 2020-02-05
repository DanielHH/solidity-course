const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') //constructor function. when using a constructor function always capitalise.
const provider = ganache.provider()
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(provider, null, OPTIONS)
const { interface, bytecode } = require('../compile')

let accounts
let inbox
const INITIAL_MESSAGE = 'Hi there!'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' })

    //inbox.setProvider(provider)
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_MESSAGE)
    })

    it('can change the message', async() => {
        await inbox.methods.setMessage('New message').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, 'New message')
    })
})





/*
class Car {
    park() {
        return 'stopped'
    }

    drive() {
        return 'vroom'
    }
}

let car

beforeEach(() => {
    car = new Car()
})

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped')
    })

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom')
    })
})
*/