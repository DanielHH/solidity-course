import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x49105E5D6bBAa6eB601fcC987140337b992a5e96',
)

export default instance
