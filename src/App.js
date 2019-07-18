import React, {Component} from 'react';
import './App.css';
import "components/Navbars/IndexNavbar.jsx";
import "assets/css/blk-design-system-react.css";
import "assets/css/nucleo-icons.css"
import Regulamin from './components/regulamin/regulamin';
import MainPage from './components/mainpage/mainpage';
import User from './components/user/user';
import Test from './components/test/test';
import {BrowserRouter, Route, Switch} from "react-router-dom";


class Site extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">

                    <div className="main-body2">
                        <Switch>
                            <Route exact path='/' component={MainPage}/>
                            <Route path='/user' component={User}/>
                            <Route path='/regulamin' component={Regulamin}/>
                            <Route path='/test' component={Test}/>
                        </Switch>
                    </div>
                    <footer className="page-footer font-small ">
                        <div className="footer-copyright text-center py-3 color-copyright">© 2019 Copyright:
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#"> Student Kielce</a>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

export default Site;
