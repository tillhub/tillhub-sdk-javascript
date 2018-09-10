import React from 'react'
import 'prismjs/themes/prism.css'
import 'prismjs'
import PrismCode from 'react-prism'
import { codeBlock } from 'common-tags'
import th from '../../dist/lib/tillhub-js'

export default class Simple extends React.Component {
  state = {
    result: null,
    email: '',
    password: '',
  }

  async makeCall() {
    th.init({
      base: 'https://staging-api.tillhub.com'
    })

    const options = {
      username: this.state.email,
      password: this.state.password
    }

    try {
      let [err, body] = await th.auth.loginUsername(options)
      this.setState({ result: err ? err.toString() : JSON.stringify(body, null, 2) })
    } catch (err) {
      this.setState({ result: err })
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Call Auth</h2>

        <span>Code:</span>

        <PrismCode component="pre" className="language-javascript">
          {
            codeBlock`
import th from '@tillhub/javascript-sdk'

const options = {
  username: '${this.state.email}',
  password: '${this.state.password}'
}

let [err, body] = await th.auth.loginUsername(options)
        `}
        </PrismCode>

        <input
          type="text"
          style={{ maxWidth: '10em', marginBottom: '1em' }}
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
          placeholder="Email" />
        <input
          type="text"
          style={{ maxWidth: '10em', marginBottom: '1em' }}
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
          placeholder="Password" />

        <button style={{ maxWidth: '5em', marginBottom: '1em' }} onClick={() => this.makeCall()}>Call</button>

        <span>Result:</span>


        <PrismCode component="pre" className="language-javascript" style={{ minHeight: '5em' }}>
          {
            codeBlock`
        ${this.state.result || ''}
        `}
        </PrismCode>
      </div>
    )
  }
}
