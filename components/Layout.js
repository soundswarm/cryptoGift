import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import store from '../store';
import web3 from '../ethereum/web3';

export default class Layout extends Component {
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const ownerAddress = accounts[0];
    store.connectLocalStorage();
    store.setOwnerAddress(ownerAddress);
    // the contract has to search for through a list of all cats
    // which times out, so this doesn't work:
    // const balance = await cryptoKitties.methods
    //   .tokensOfOwner(ownerAddress)
    //   .call();
    // instead, the cryptoKitties API is called:
    store.getOwnerCats(ownerAddress);
  }
  render() {
    return (
      <Container style={{ marginTop: '30px' }}>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <Header />
        {this.props.children}
      </Container>
    );
  }
}
