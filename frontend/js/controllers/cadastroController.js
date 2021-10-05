angular.module("escolinha").controller("cadastroController", function ($scope, $location, cadastroAPI) {
    $scope.requestCadastro = function (form) {
        $scope.error = isValid(form);

        if ($scope.error.length) {
            return;
        }

        submitCadastro(form);
    };

    const isValid = function (form) {
        const errors = [];
        if (form.nome.length < 4){
            errors.push('Digite pelo menos 4 caracteres no nome');
        }
        if (!isEmailValid(form.email)){
            errors.push('Email inválido');
        }
        if (form.password.length <= 6){
            errors.push('Digite pelo menos 6 caracteres na senha');
        }
        return errors;

    };

    const isEmailValid = function (email) {
        const arroba = email.lastIndexOf('@');
        const ponto = email.lastIndexOf('.');
        if (!arroba || !ponto) {
            return false;
        };

        if (email.substring(0, arroba).length === 0 || email.substring(arroba, ponto).length === 1 || email.substr(ponto).length === 1) {
            return false;
        };
        return true;
    };

    const submitCadastro = function (form) {
        cadastroAPI.fazerCadastro(form).then(function (data) {
            $location.path("login");
        }).catch(function (data) {
            $scope.error = [data.data.error];
        });
    };
});