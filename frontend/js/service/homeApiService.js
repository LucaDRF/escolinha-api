angular.module('escolinha').factory("homeAPI", function ($http) {
    const baseUrl = 'http://localhost:3333';

    const _getAlunos = function () {
        return $http.get(`${baseUrl}/aluno`);
    };

    const _postAluno = function (aluno) {
        return $http.post(`${baseUrl}/aluno`, aluno);
    };

    const _putAluno = function (id, changes) {
        return $http.put(`${baseUrl}/aluno/${id}`, changes);
    };

    const _deleteAluno = function (id) {
        return $http.delete(`${baseUrl}/aluno/${id}`);
    };

    const _getAccount = function () {
        return $http.get(`${baseUrl}/user`)
    }

    const _putAccount = function (data) {
        return $http.put(`${baseUrl}/user`, data);
    }

    return {
        getAlunos: _getAlunos,
        deleteAluno: _deleteAluno,
        postAluno: _postAluno,
        putAluno: _putAluno,

        getAccount: _getAccount,
        putAccount: _putAccount,
    };
});