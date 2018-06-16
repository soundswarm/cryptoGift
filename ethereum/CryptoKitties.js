import web3 from './web3';
const CryptoKittiesJson = require('./build/CryptoKitties.json');
import { contractAddress } from '../config';

const instance = new web3.eth.Contract(CryptoKittiesJson, contractAddress);
export default instance;
