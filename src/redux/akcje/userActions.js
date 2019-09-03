import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/user');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const forgetPassword = (userEmail) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/forget', userEmail)
        .then(res => {
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const changePassword = (userPassword, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/user/password', userPassword)
        .then(res => {
            dispatch({type: CLEAR_ERRORS});
        })
        .then ( res => {
            localStorage.removeItem('FBIdToken');
            delete axios.defaults.headers.common['Authorization'];
            dispatch({type: SET_UNAUTHENTICATED});
            history.push('/login');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};


export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/user');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.get('/get')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

export const uploadImage = (formData) => (dispatch) =>{
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch => {
    dispatch({type: LOADING_USER});
    axios.post('/user/edit', userDetails)
        .then(() => {
            dispatch(getUserData())
        }).catch((err => console.log(err)));

});

export const paymentNormal = () => (dispatch => {
    dispatch({type: LOADING_USER});
    axios.post('/user/normal')
        .then(() => {
            dispatch(getUserData())
        }).catch((err => console.log(err)));
});

export const paymentPro = () => (dispatch => {
    dispatch({type: LOADING_USER});
    axios.post('/user/pro')
        .then(() => {
            dispatch(getUserData())
        }).catch((err => console.log(err)));
});

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};