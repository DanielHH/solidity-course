import Web3 from 'web3'

const OPTIONS = {
  defaultBlock: 'latest',
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
}

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.ethereum, null, OPTIONS)
  window.ethereum.enable()
} else {
  //We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/b7745a668a074194b32bfbeb50443f9c',
  )
  web3 = new Web3(provider, null, OPTIONS)
}

export default web3
