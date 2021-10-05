angular.module("escolinha").factory("authInterceptor", function (localStorage) {

    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (localStorage.token()) {
                config.headers.Authorization = 'Bearer ' + localStorage.token();
            };
            return config;
        },
    };
});