import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App/App"; // Correct import of App component
import store from './store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
<Provider store={store}><App />
</Provider>);
