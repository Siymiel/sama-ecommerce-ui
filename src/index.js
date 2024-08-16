import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store";
// import { PersistGate } from 'redux-persist/integration/react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ProductProvider } from './utils/contexts/productProvider';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);