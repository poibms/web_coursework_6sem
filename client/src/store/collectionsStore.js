import {makeAutoObservable} from "mobx";

export default class CollectionStore {

  constructor() {
    // this._tags = []
    this._collections = []
    this._selectedTag = {}
    this._userCollections = [];
    this._collectionItems = [];
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

  setUserCollections(collections) {
    this._userCollections = collections;
  }
  setCollectionUtems(items) {
    this._collectionItems = items;
  }

  // get tags() {
  //   return this._tags;
  // }
  get collections() {
    return this._collections;
  }

  get selectedTag() {
    return this._selectedTag;
  }

  get userCollections() {
    return this._userCollections;
  }

  get collectionItem() {
    return this._collectionItems;
  }
}