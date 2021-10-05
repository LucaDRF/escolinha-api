angular.module("escolinha").config(function ($httpProvider) {
    $httpProvider.interceptors.push("expTime");
    $httpProvider.interceptors.push("authInterceptor");
});