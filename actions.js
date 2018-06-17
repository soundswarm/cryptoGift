import axios from 'axios';
import cryptoKitties from './ethereum/CryptoKitties';
import web3 from './ethereum/web3';

function reportError(error) {
  // send error to reporting service: https://www.bugsnag.com/
}
export function* getCat(id) {
  try {
    const kitty = yield cryptoKitties.methods.getKitty(id);
    return kitty;
  } catch (e) {
    return reportError(e);
  }
}
export function* sendCat(receiverAddress, catId) {
  try {
    const accounts = yield web3.eth.getAccounts();
    const transaction = yield cryptoKitties.methods
      .transfer(receiverAddress, catId)
      .send({ from: accounts[0] });
    return transaction;
  } catch (e) {
    return reportError(e);
  }
}
export function saveTransaction(transaction) {
  const senderAddress = transaction.from;
  if (localStorage[senderAddress]) {
    const data = JSON.parse(localStorage[senderAddress]);
    data.transactions.push(transaction);
    localStorage[senderAddress] = JSON.stringify(data);
  } else {
    localStorage[senderAddress] = JSON.stringify({
      transactions: [transaction]
    });
  }
}
export function* getOwnerCats(address) {
  try {
    this.fetchingCats = true;
    this.noCatsMesage = '';
    const ownerCats = yield axios.get(
      'https://api.cryptokitties.co/v2/kitties',
      {
        params: {
          owner_wallet_address: address,
          limit: 100
        }
      }
    );
    this.ownerCats = ownerCats.data.kitties;
    if (this.ownerCats.length === 0) this.noCatsMesage = 'No Cats Found';
    this.fetchingCats = false;
  } catch (error) {
    reportError(error);
  }
}
export function connectLocalStorage() {
  this.localStorage = localStorage;
}
export function setOwnerAddress(address) {
  if (address !== this.ownerAddress) {
    // convert address to lower case: https://web3js.readthedocs.io/en/1.0/web3-eth.html#note-on-checksum-addresses
    this.ownerAddress = address ? address.toLowerCase() : '';
    this.getOwnerCats(this.ownerAddress);
  }
}
