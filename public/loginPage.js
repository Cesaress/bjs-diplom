"use strics";

let userForm = new userForm();

// login

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage('Ошибка авторизации: ' + response.error);
        }
    });
};

// registration

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success === true) {
            userForm.id = response.id;
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Ошибка регистрации: ' + response.error);
        }
    });
};