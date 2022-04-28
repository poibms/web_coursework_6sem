import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/userStore";
import CollectionStore from './store/collectionsStore';
import TagsStore from './store/tagsStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    collection: new CollectionStore(),
    tags: new TagsStore(),
  }}>
    <App />,
  </Context.Provider>,
  document.getElementById('root')
);

