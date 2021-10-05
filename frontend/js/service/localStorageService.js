angular.module("escolinha").factory("localStorage", function ($window) {
    const _setToken = function (token) {
        $window.localStorage.setItem('BearerToken', token);
        $window.localStorage.setItem('TokenTime', new Date().getTime());
    };

    const _removeToken = function () {
        $window.localStorage.removeItem('BearerToken');
        $window.localStorage.removeItem('TokenTime');
    };

    const _token = function () {
        return $window.localStorage.getItem('BearerToken');
    };

    const _time = function () {
        return $window.localStorage.getItem('TokenTime');
    };

    return {
        token: _token,
        time: _time,
        removeToken: _removeToken,
        setToken: _setToken,
    };
});