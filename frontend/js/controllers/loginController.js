angular.module("escolinha").controller("loginController", function ($scope, $location, loginAPI, localStorage) {

    $scope.cadastro = function () {
        $location.path("/cadastro");
    };

    $scope.requestSubmitLogin = function (login) {
        submitLogin(login);
    };

    const submitLogin = function (login) {
        loginAPI.login(login).then(function (data){
            localStorage.setToken(data.data.token);
            $location.path("/home");
        }).catch(function (data) {
            $scope.error = data.data.error;
        });
    };
});