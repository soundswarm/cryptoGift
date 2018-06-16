import React, { Component } from 'react';
import { Button, Menu, Input, Form } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import Layout from '../components/Layout';
import store from '../store';

@observer
export default class Transactions extends Component {
  render() {
    let data = store.localStorage[store.ownerAddress];
    let transactions = [];
    if (data) {
      data = JSON.parse(data);
      transactions = data.transactions;
    }
    return (
      <Layout>
        <h3> Transactions</h3>
        {transactions.map(transaction => (
          <div key={transaction.transactionHash}>
            <a
              href={`https://etherscan.io/tx/${transaction.transactionHash}`}
              target="_blank"
            >
              {transaction.transactionHash}
            </a>
          </div>
        ))}
      </Layout>
    );
  }
}
