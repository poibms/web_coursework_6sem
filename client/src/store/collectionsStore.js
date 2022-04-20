import {makeAutoObservable} from "mobx";

export default class CollectionStore {

  constructor() {
    this._tags = []
    this._collections = []
    this._selectedTag = {}
    makeAutoObservable(this);
  }

  setTags(tags) {
    this._tags = tags;
  }

  setCollections(collections) {
    this._collections = collections
  }

  setSelectedTag(tag) {
    this._selectedTag = tag;
  }

  get tags() {
    return this._tags;
  }
  get collections() {
    return this._collections;
  }

  get selectedTag() {
    return this._selectedTag;
  }
}