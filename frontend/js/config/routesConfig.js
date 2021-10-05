angular.module("escolinha").config(function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: 'views/login.html',
        controller: 'loginController',
    });
    $routeProvider.when("/cadastro", {
        templateUrl: 'views/cadastro.html',
        controller: 'cadastroController',
    });
    $routeProvider.when("/home", {
        templateUrl: 'views/homeAlunos.html',
        controller: 'homeController',
        resolve: {
            alunos: function ($route, homeAPI, localStorage, $location) {
                if (!localStorage.token()) {
                    $location.path("/login");
                    return;
                };
                return homeAPI.getAlunos();
            },
        },
    });
    $routeProvider.when("/home/imagens", {
        templateUrl: 'views/homeImagem.html',
        controller: 'imagemController',
        resolve: {
            alunos: function (imagemAPI, localStorage, $location) {
                if (!localStorage.token()) {
                    $location.path("/login");
                    return;
                };
                return imagemAPI.getAlunos();
            }
        },
    });
    $routeProvider.otherwise({ redirectTo: "/home" });
});