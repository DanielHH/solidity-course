import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)

    const summary = await campaign.methods.getSummary().call()

    return {
      address: props.query.address,
      minimumContribution: parseInt(summary[0]._hex, 16),
      balance: parseInt(summary[1]._hex, 16).toString(),
      requestsCount: parseInt(summary[2]._hex, 16),
      approversCount: parseInt(summary[3]._hex, 16),
      manager: summary[4],
    }
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'blablablabl',
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description: 'Number of people who have already donated to campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money thiscampaign has left to sepnd',
      },
    ]

    return <Card.Group items={items}></Card.Group>
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow
