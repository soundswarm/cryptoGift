import { observable, computed, flow, action } from 'mobx';
import {
  connectLocalStorage,
  setOwnerAddress,
  getOwnerCats,
  getCat,
  sendCat,
  saveTransaction
} from './actions';

class Store {
  @observable ownerCats = [];
  @observable ownerAddress = '';
  @observable fetchingCats = null;
  @observable localStorage = {};
  @observable noCatsMesage = '';

  getOwnerCats = flow(getOwnerCats);
  sendCat = flow(sendCat);
  getCat = flow(getCat);
  setOwnerAddress = action(setOwnerAddress);
  connectLocalStorage = action(connectLocalStorage);
  saveTransaction = action(saveTransaction);
}

const store = new Store();
export default store;
