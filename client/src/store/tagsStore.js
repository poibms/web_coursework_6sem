import {makeAutoObservable} from 'mobx';

export default class UserStore {
  constructor() {
    this.tags = [];
    makeAutoObservable(this);
  }

  setTags(tags) {
    this._user = user
  }

  get user() {
    return this._user
  }  
  
} 