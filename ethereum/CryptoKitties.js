import web3 from './web3';
const CryptoKittiesJson = require('./build/CryptoKitties.json');
const contractAddress = require('../config.js');

const instance = new web3.eth.Contract(CryptoKittiesJson, contractAddress);
export default instance;
