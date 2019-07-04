import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Site from './App';

import * as serviceWorker from './serviceWorker';
import "assets/css/nucleo-icons.css";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Site />, document.getElementById('root'));
serviceWorker.unregister();
