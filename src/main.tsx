import ReactDOM from 'react-dom';
import App from './App.tsx';
import { HashRouter } from "react-router-dom";
import "./style.css";

ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById('root')
);
