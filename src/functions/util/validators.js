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

const isEmpty = (string) => {
    if (string === '') return true;
    else return false;
};

exports.validateSignUpData = (data) => {
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

    if (isEmpty(data.company)) errors.company = 'Pole nie może być puste';

    if (isEmpty(data.city)) errors.city = 'Pole nie może być puste';

    if (isEmpty(data.province)) errors.province = 'Pole nie może być puste';

    if (isEmpty(data.zip)) {
        errors.zip = 'Nie może być puste';
    } else if (!isZip(data.zip)) {
        errors.zip = 'Blędnie wpisany zip';
    }

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

    if (isEmpty(data.city)) errors.city = 'Pole nie może być puste';

    if (isEmpty(data.province)) errors.province = 'Pole nie może być puste';

    if (isEmpty(data.zip)) {
        errors.zip = 'Nie może być puste';
    } else if (!isZip(data.zip)) {
        errors.zip = 'Blędnie wpisane dane';
    }

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