angular.module("escolinha").factory("imagemAPI", function ($http) {
    const baseUrl = 'http://localhost:3333';

    const _getAlunos = function () {
        return $http.get(`${baseUrl}/aluno`);
    };

    const _postImagem = function (aluno, image, originalname) {
        const formData = new FormData();
        formData.append('img', image);
        formData.append('aluno_id', aluno.id);
        formData.append('originalname', originalname);
        return $http({
            url: `${baseUrl}/img`,
            headers: {"Content-Type": undefined },
            data: formData,
            method: "POST"
        });
    };

    const _putImagem = function (aluno, image, originalname) {
        const formData = new FormData();
        formData.append('img', image);
        formData.append('aluno_id', aluno.id);
        formData.append('originalname', originalname);
        return $http({
            url: `${baseUrl}/img`,
            headers: {"Content-Type": undefined },
            data: formData,
            method: "PUT"
        });
    };

    const _deleteImagem = function (aluno_id) {
        return $http.delete(`${baseUrl}/img/${aluno_id}`);
    };

    return {
        getAlunos: _getAlunos,
        postImagem: _postImagem,
        putImagem: _putImagem,
        deleteImagem: _deleteImagem,
    };
});