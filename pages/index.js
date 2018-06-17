import React, { Component } from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import store from '../store';
import Layout from '../components/Layout';
import Cat from '../components/Cat';
import web3 from '../ethereum/web3';

@observer
class Index extends Component {
  state = { metaMaskAccount: null };
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      this.setState({ metaMaskAccount: accounts[0].toLowerCase() });
    }
  }
  render() {
    return (
      <Layout>
        <h3>
          {' '}
          {store.ownerAddress
            ? `Cats at address: ${store.ownerAddress}`
            : 'Sign in to Metamask for all the features'}
        </h3>
        <h3>{store.noCatsMesage}</h3>
        {store.fetchingCats ? (
          <Loader active inline="centered" />
        ) : (
          <Card.Group>
            {store.ownerCats.map(cat => (
              <Cat
                {...cat}
                metaMaskAccount={this.state.metaMaskAccount}
                key={cat.id}
              />
            ))}
          </Card.Group>
        )}
      </Layout>
    );
  }
}
export default Index;
