import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router
} from "react-router-dom";
import 'lib-flexible/flexible'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root');

const render = (Component) => {
  createRoot(rootElement).render(  
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>);
}

render(App)

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
