angular.module("escolinha").factory("expTime", function (localStorage) {
 return {
    request: function (config) {
        const timePassed = new Date().getTime() - localStorage.time();
        if (localStorage.token() && timePassed > 10800000) {
            localStorage.removeToken();
        };

        return config;
    },
 };
});