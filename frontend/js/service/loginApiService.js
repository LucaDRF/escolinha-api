angular.module("escolinha").factory("loginAPI", function ($http) {
    const baseUrl = 'http://localhost:3333';
    const _postLogin = function (data) {
        return $http.post(`${baseUrl}/login`, data);
    };


    return {
        login: _postLogin,
    }
});