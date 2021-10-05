angular.module("escolinha").factory("cadastroAPI", function ($http, $location) {
    const baseUrl = 'http://localhost:3333';
    const _postCadastro = function (data) {
        return $http.post(`${baseUrl}/user`, data);
    }

    return {
        fazerCadastro: _postCadastro,
    };
});