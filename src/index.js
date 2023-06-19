import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./redux/store.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <PersistGate persistor={persistor}>
        <Provider store={store} >
          <App />
        </Provider>
      </PersistGate>

    </BrowserRouter>

  </React.StrictMode>
);
