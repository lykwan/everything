import React from  "react";
import ReactDOM from  "react-dom";
import configureStore from "./store/store.js";
import Root from "./components/root.jsx";
import Modal from "react-modal";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser}};
    window.store = store = configureStore(preloadedState);
  } else {
    window.store = store = configureStore();
  }
  const root = document.getElementById('root');
  Modal.setAppElement(document.body);
  ReactDOM.render(<Root store={store} fb={FB}/>, root);
  
});
