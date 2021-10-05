angular.module("escolinha").controller("imagemController", function ($scope, $location, imagemAPI, fileReader, alunos) {
    $scope.alunos = alunos.data;
    const modalForm = { 'display': 'none' };

    $scope.changePage = function (location) {
        $location.path(location);
    }

    $scope.setModal = function () {
        if (modalForm.display == "none") {
            modalForm.display = "block";
        }
        else if (modalForm.display == "block") {
            modalForm.display = "none";
        }
        $scope.aluno = 'Aluno';
        $scope.modalForm = modalForm;
    };

    $scope.sendImage = function (aluno, image) {
        const originalname = document.getElementById('formFileLg').value.substr(12);
        if (aluno.Imagem) {

            $scope.info = { aluno, image };
            $scope.setModal();
            return;
        }
        imagemAPI.postImagem(aluno, image, originalname).then(data => {

        }).catch(error => {

        })

    }

    $scope.updateAlunoImage = function () {
        const { aluno, image } = $scope.info;
        const originalname = document.getElementById('formFileLg').value.substr(12);

        if (!aluno.Imagem) {
            $scope.setModal();
            return;
        }

        imagemAPI.putImagem(aluno, image, originalname).then(data => {

        }).catch(error => {

        })

    }

    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
            });
    };

    $scope.$on("fileProgress", function (e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });
});