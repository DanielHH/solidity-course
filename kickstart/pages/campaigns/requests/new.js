import React, { Component } from 'react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import Layout from '../../../components/Layout'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loadin: false,
    errorMessage: '',
  }

  static async getInitialProps(props) {
    const { address } = props.query

    return { address }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state

    this.setState({ LOADING: true, ERRORmESSAGE: '' })

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            ></Input>
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            ></Input>
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew
