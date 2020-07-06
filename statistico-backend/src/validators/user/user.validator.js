const Yup = require('yup');

const username = Yup.string().max(35).required();
const password = Yup.string().required();
const confirmPassword = Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required();

module.exports = Yup.object().shape({
    username,
    password,
    confirmPassword,
});
