const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

const isZip = (zip) => {
    const regEx = /^[0-9]{2}(?:-[0-9]{3})?$/;
    if (zip.match(regEx)) return true;
    else return false;
};

const isDateAfter = (date) => {
    return new Date(date.toDateString()) > new Date(new Date().toDateString());
};

const isEmpty = (string) => {
    if (string === '') return true;
    else return false;
};

const isValidDate = (date) => {
    const isDateFormat = require('is-date-format');
    if (isDateFormat(date, 'mm/dd`/yyyy')) return true;
    return false;

};

exports.validateEmail = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'Email nie może być pusty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Błędny adres email';
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateSignUpData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'Email nie może być pusty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Błędny adres email';
    }

    if (isEmpty(data.password)) errors.password = 'Pole nie może być puste';
    if (data.password.length < 6) errors.password = 'Hasło musi się składać z conajmniej 6 znaków';
    if (isEmpty(data.confirmPassword)) errors.confirmPassword = 'Pole nie może być puste';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Hasła nie pasują do siebie';

    /*
    if (isEmpty(data.name)) errors.name = 'Pole nie może być puste';
    if (isEmpty(data.surname)) errors.surname = 'Pole nie może być puste';
    if (isEmpty(data.company)) errors.company = 'Pole nie może być puste';
    if (isEmpty(data.city)) errors.city = 'Pole nie może być puste';
    if (isEmpty(data.province)) errors.province = 'Pole nie może być puste';
    if (isEmpty(data.zip)) {
        errors.zip = 'Nie może być puste';
    } else if (!isZip(data.zip)) {
        errors.zip = 'Blędnie wpisany zip';
    }
    */

    if (isEmpty(data.handle)) errors.handle = 'Nie może być puste';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Pole nie może być puste';
    if (isEmpty(data.password)) errors.password = 'Pole nie może być puste';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validatePasswordData = (data) => {
    let errors = {};

    if (isEmpty(data.password)) errors.password = 'Pole nie może być puste';
    if (data.password.length < 6) errors.password = 'Hasło musi się składać z conajmniej 6 znaków';
    if (isEmpty(data.confirmPassword)) errors.confirmPassword = 'Pole nie może być puste';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Hasła nie pasują do siebie';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateOrderData = (data) => {
    let errors = {};

    if (isEmpty(data.body)) errors.body = 'Pole nie może być puste';
    if (isEmpty(data.title)) errors.title = 'Pole nie może być puste';
    if (isEmpty(data.deadline)) {
        errors.deadline = 'Pole nie może być puste';
    } else if (!isValidDate(data.deadline)) {
        errors.deadline = 'Błędnie wpisana data';
    } else if (!isDateAfter(new Date(data.deadline))) {
        errors.deadline = 'Data nie może być wcześniejsza niz obecna';
    }


    if (isEmpty(data.complexity)) {
        errors.complexity = 'Nie może być puste';
    } else if (isNaN(data.complexity)) {
        errors.complexity = 'Blędnie wpisane dane';
    } else if (data.complexity < 0) {
        errors.complexity = 'Blędnie wpisane dane';
    }


    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateWorkerData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'Email nie może być pusty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Błędny adres email';
    }

    if (isEmpty(data.password)) errors.password = 'Pole nie może być puste';



    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Hasła nie pasują do siebie';

    if (isEmpty(data.name)) errors.name = 'Pole nie może być puste';

    if (isEmpty(data.surname)) errors.surname = 'Pole nie może być puste';

    if (isEmpty(data.title)) errors.title = 'Pole nie może być puste';

    if (isEmpty(data.salary)) {
        errors.salary = 'Nie może być puste';
    } else if (isNaN(data.salary)) {
        errors.salary = 'Blędnie wpisane dane';
    } else if (data.salary < 0) {
        errors.salary = 'Blędnie wpisane dane';
    }

    if (isEmpty(data.performance)) {
        errors.performance = 'Nie może być puste';
    } else if (isNaN(data.performance)) {
        errors.performance = 'Blędnie wpisane dane';
    } else if (data.performance < 0 || data.performance > 100) {
        errors.performance = 'Zła liczba. Zakres to 0-100';
    }

    if (isEmpty(data.admin)) errors.admin = 'Nie może być puste';

    if (isEmpty(data.handle)) errors.handle = 'Nie może być puste';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.name.trim())) userDetails.name = data.name;
    if (!isEmpty(data.surname.trim())) userDetails.surname = data.surname;
    if (!isEmpty(data.website.trim())) {
        //website
        if (data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;
        } else userDetails.website = data.website;
    }
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;
    return userDetails;
};

exports.getPremium = (data) => {
    let userPremium = {};

    if (!isEmpty(data.timePremium.trim())) userPremium.name = data.name;

    return userPremium;
};