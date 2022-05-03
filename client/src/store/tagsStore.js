import {makeAutoObservable} from 'mobx';

export default class TagsStore {
  constructor() {
    this._tags = [];
    makeAutoObservable(this);
  }

  setTags(tags) {
    this._tags = tags
  }

  get getTags() {
    return this._tags
  }  
  
} 