import React from "react";
import { Provider } from 'react-redux';
import AppRouter from "./router.jsx";

const Root = ({store, fb}) => (
  <Provider store={store}>
    <AppRouter fb={fb} />
  </Provider>
);

export default Root;
