import {ACCESS_TOKEN, BASE_URL} from "./consts";

const request = (method, data, url) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    let init = {};

    if(data !== '') {
        init = {
            method,
            headers,
            body: JSON.stringify(data)
        };
    }
    else{
        init = {
            method,
            headers,
            body: JSON.stringify(data)
        };
    }

    const request = new Request(url, init);

    return fetch(request)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: BASE_URL + "/employee/me",
        method: 'GET'
    });
}


export function login(data) {
    return request(
        'POST',
        data,
        BASE_URL + "/auth/login"
    );
}

export function register(data){
    return request(
        'POST',
        data,
        BASE_URL + "/auth/signup"
    );
}

export function payment(sum) {
    return request(
        'POST',
        '',
        BASE_URL + '/paypal/make/payment?sum='+sum,
    );
}

export function completePayment(paymentId, payerId) {
    return request(
        'POST',
        '',
        BASE_URL + '/paypal/complete/payment?paymentId=' + paymentId + '&PayerID=' + payerId,
    );
}