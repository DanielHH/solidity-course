const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'furnace size shell swallow grunt virtual copper slim aunt link flower dose',
    'https://rinkeby.infura.io/v3/b7745a668a074194b32bfbeb50443f9c'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to ', result.options.address)
}
deploy()