import React, { Component } from 'react';
import { Button, Menu, Input, Form } from 'semantic-ui-react';
import Link from 'next/link';
import store from '../store';
import { observer } from 'mobx-react';
import { Router } from '../routes';

@observer
export default class Header extends Component {
  state = { inputAddress: '' };
  handleClick = () => {
    Router.replaceRoute('/');
    store.setOwnerAddress(this.state.inputAddress);
    store.getOwnerCats(store.ownerAddress);
  };
  render() {
    return (
      <div>
        <Input
          placeholder="cat owner address"
          onChange={e => this.setState({ inputAddress: e.target.value })}
          value={this.state.inputAddress}
          action={{
            content: 'See Cats at Address',
            onClick: this.handleClick
          }}
        />
        <Link href="transactions">
          <Button floated="right" content="My Transactions" primary />
        </Link>
      </div>
    );
  }
}
