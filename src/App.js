import React, {Component} from 'react';
import './App.css';
import "assets/css/blk-design-system-react.css";
import "assets/css/nucleo-icons.css"
import Regulamin from './components/regulamin/regulamin';
import MainPage from './components/mainpage/mainpage';
import User from './components/user/user';
import SignUp from './components/Register/rejestracja.jsx';
import Login from './components/Login/login.js';
import Forget from './components/ForgetPassword/password.js';
import Test from './components/Payment/payment';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import {SET_AUTHENTICATED} from "./redux/types";
import {logoutUser, getUserData} from "./redux/akcje/userActions";
import Examples from "./components/Navbars/MainNavbar";

axios.defaults.baseURL = 'http://localhost:5001/projekt-studia/us-central1/api';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class Site extends Component {
    render() {
        return (

            <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Examples/>
                    <div className="main-body2">
                        <Switch>
                            <AuthRoute exact path='/' component={MainPage}/>
                            <Route path='/user' component={User}/>
                            <AuthRoute path='/regulamin' component={Regulamin}/>
                            <AuthRoute path='/login' component={Login}/>
                            <AuthRoute path='/signup' component={SignUp}/>
                            <AuthRoute path='/forget' component={Forget}/>
                            <AuthRoute path='/test' component={Test}/>
                        </Switch>
                    </div>
                    <footer className="page-footer font-small ">
                        <div className="footer-copyright text-center py-3 color-copyright">© 2019 Copyright:
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#"> Student Kielce</a>
                        </div>
                    </footer>
                </BrowserRouter>
            </Provider>
            </div>
        );
    }
}

export default Site;
