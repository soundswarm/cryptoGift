import React, { Component } from 'react';
import store from '../store';
import { Card, Button, Image, Input, Message } from 'semantic-ui-react';

const s = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: { marginTop: '10px', width: '100%' }
};

class Cat extends Component {
  state = {
    showTransfer: false,
    receiverAddress: '',
    sendingCat: false,
    errorMessage: '',
    catSent: false
  };
  sendCat = async () => {
    try {
      this.setState({ sendingCat: true, errorMessage: '' });
      const transaction = await store.sendCat(
        this.state.receiverAddress,
        this.props.id
      );
      store.saveTransaction(transaction);
      this.setState({ catSent: true });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ sendingCat: false });
  };

  render() {
    const cat = this.props;
    return (
      <Card>
        <Image src={cat.image_url_cdn} />
        <Card.Content>
          <Card.Header>{cat.name}</Card.Header>
          <Card.Meta>
            <span>{`gen ${cat.generation}`}</span>
          </Card.Meta>
        </Card.Content>
        {this.props.metaMaskAccount === store.ownerAddress ? (
          <Card.Content>
            {this.state.catSent ? (
              <Message success content="Cat Sent Successfully" />
            ) : (
              <div>
                <Input
                  style={s.inputContainer}
                  placeholder="receiver address"
                  onChange={e =>
                    this.setState({ receiverAddress: e.target.value })
                  }
                  value={this.state.receiverAddress}
                />
                <Button
                  style={s.button}
                  onClick={this.sendCat}
                  loading={this.state.sendingCat}
                  primary
                >
                  Send Cat to an Address
                </Button>
              </div>
            )}
            {this.state.errorMessage ? (
              <Message error content={this.state.errorMessage} />
            ) : null}
          </Card.Content>
        ) : null}
      </Card>
    );
  }
}
export default Cat;
