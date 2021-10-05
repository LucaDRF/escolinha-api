angular.module("escolinha").controller("homeController", function ($filter, $scope, $location, localStorage, imagemAPI, homeAPI, alunos) {
	const formatAlunos = function (data) {
		data.sort(function (a, b) {
			return a.nome.toLowerCase() < b.nome.toLowerCase() ? -1 : a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : 0;
		});
		let formatedArray = [];
		let arrayFive = [];
		for (c of data) {
			arrayFive.push(c);
			if (arrayFive.length === 5) {
				formatedArray.push(arrayFive);
				arrayFive = [];
			};
		}
		if (arrayFive) formatedArray.push(arrayFive);
		return formatedArray;
	};


	$scope.alunosSelected = {};
	$scope.alunos = alunos.data;
	$scope.alunosFormated = formatAlunos(alunos.data);
	$scope.qtdTab = Math.ceil($scope.alunos.length / 5);
	$scope.actualPage = 0;
	let user;

	const modalForm = { 'display': 'none' };
	const modalOption = { 'display': 'none' };
	const modalAlert = { 'display': 'none' };
	const modalAlertAlunos = { 'display': 'none' };
	const modalAlertAccount = { 'display': 'none' };
	const modalOptionAccount = { 'display': 'none' };


	homeAPI.getAccount().then(data => {
		const { id, nome, email } = data.data;
		user = { id, nome, email };
	}).catch(error => {

	});

	$scope.filterAll = function (collection, value) {
		const newAlunos = $filter('filter')(collection, value);
		$scope.qtdTab = Math.ceil(newAlunos.length / 5);
		$scope.alunosFormated = formatAlunos(newAlunos);
		$scope.actualPage = 0;
	};

	$scope.changeActualPage = function (page) {
		$scope.actualPage = page;
	};

	$scope.previousPage = function () {
		if ($scope.actualPage === 0) {
			return;
		};

		$scope.actualPage -= 1;
	};

	$scope.nextPage = function () {
		if ($scope.actualPage === ($scope.qtdTab - 1)) {
			return;
		};

		$scope.actualPage += 1;
	}

	$scope.changePage = function (location) {
		$location.path(location);
	};

	$scope.exitAccount = function () {
		localStorage.removeToken();
		window.location.reload();
	};

	$scope.changePass = function () {
		$scope.passChanged = !$scope.passChanged;
	}

	const isEmailValid = function (email) {
		const arroba = email.lastIndexOf('@');
		const ponto = email.lastIndexOf('.');
		if (!arroba || !ponto) {
			return false;
		};

		if (email.substring(0, arroba).length === 0 || email.substring(arroba, ponto).length === 1 || email.substr(ponto).length === 1) {
			return false;
		};
		return true;
	};

	$scope.upadteAccount = function (accountOption) {
		if (!$scope.accountOption.emailCheckbox) {
			delete accountOption.email;
		}

		if ($scope.accountOption.emailCheckbox && !isEmailValid(accountOption.email)) {
			$scope.errorAccount = { email: "Email inválido" };
			return;
		}

		if (!$scope.passChanged) {
			delete accountOption.oldPassword;
			delete accountOption.password;
			delete accountOption.confirmPassword;

			homeAPI.putAccount(accountOption).then(data => {

				user.nome = data.data.keyChanged.nome;
				user.email = data.data.keyChanged.email || user.email;
				$scope.setModal('updateAccount');
				accountOption = user;
			}).catch(error => {
				$scope.errorAccount = { email: error.data.error };
			});
			return;
		}

		if (accountOption.password !== accountOption.confirmPassword) {
			$scope.errorAccount = { password: "Senhas não coincidem" };
			return;
		}

		if (accountOption.password.length < 6) {
			$scope.errorAccount = { password: "Senha deve possuir mais de 6 caracteres" };
			return;
		}

		homeAPI.putAccount(accountOption).then(data => {
			user.nome = data.data.keyChanged.nome;
			user.email = data.data.keyChanged.email || user.email;
			$scope.setModal('updateAccount');
			accountOption = user;
		}).catch(error => {
			$scope.errorAccount = { oldPassword: error.data.error };
		});
	};

	$scope.deleteImage = function (aluno) {

		imagemAPI.deleteImagem(aluno.id).then(data => {

		}).catch(error => {

		})
	};

	$scope.setModal = function (type, aluno) {
		if (type === "alertDeleteAlunos") {
			if (modalAlertAlunos.display == "none") {
				modalAlertAlunos.display = "block";
			}
			else if (modalAlertAlunos.display == "block") {
				modalAlertAlunos.display = "none";
			}
			$scope.modalAlertAlunos = modalAlertAlunos;
			$scope.alunosDelete = aluno;
		}

		if (type === "exitAccount") {
			if (modalAlertAccount.display == "none") {
				modalAlertAccount.display = "block";
			}
			else if (modalAlertAccount.display == "block") {
				modalAlertAccount.display = "none";
			}
			$scope.modalAlertAccount = modalAlertAccount;
		}

		if (type === "updateAccount") {
			if (modalOptionAccount.display == "none") {
				modalOptionAccount.display = "block";
			}
			else if (modalOptionAccount.display == "block") {
				$scope.passChanged = false;
				modalOptionAccount.display = "none";
			}
			$scope.modalOptionAccount = modalOptionAccount;
			$scope.accountOption = { ...user };
		}

		if (type === "alertDelete") {
			if (modalAlert.display == "none") {
				modalAlert.display = "block";
			}
			else if (modalAlert.display == "block") {
				modalAlert.display = "none";
			}
			$scope.modalAlert = modalAlert;
			$scope.alunoDelete = aluno;
		}
		if (type === "form") {
			if (modalForm.display == "none") {
				modalForm.display = "block";
			}
			else if (modalForm.display == "block") {
				$scope.newAluno = {};
				modalForm.display = "none";
			}
			$scope.modalForm = modalForm;
		}
		if (type === "options") {
			if (modalOption.display == "none") {
				modalOption.display = "block";
			}
			else if (modalOption.display == "block") {
				modalOption.display = "none";
			}
			$scope.modalOption = modalOption;
			$scope.alunoOption = { ...aluno };
		};
	}

	$scope.upadteAluno = function (aluno) {
		const { id, nome, sobrenome, email, peso, altura } = aluno;
		const obj = { nome, sobrenome, email, peso, altura }
		if (!aluno.emailCheckbox) {
			delete obj.email;
		}
		homeAPI.putAluno(id, obj).then(data => {
			homeAPI.getAlunos().then(data => {
				$scope.alunosFormated = formatAlunos(data.data);
			})
			$scope.setModal('options');
		}).catch(error => {
			$scope.alunoOptionError = { error: error.data.error };
		})
	};

	$scope.addAluno = function (newAluno) {
		homeAPI.postAluno(newAluno).then(function (data) {
			$scope.alunos.push(data.data)
			$scope.alunosFormated = formatAlunos($scope.alunos);
			$scope.setModal('form');
			$scope.qtdTab = Math.ceil($scope.alunos.length / 5);

		}).catch(function (error) {
			$scope.alunoError = { error: error.data.error };
		});
	};

	$scope.isAlunoSelected = function (alunos) {
		return alunos.some(value => value.selected);
	}

	$scope.deleteAlunos = function () {
		$scope.alunos = $scope.alunosDelete.filter(value => {
			if (value.selected) {
				homeAPI.deleteAluno(value.id);
				return false
			}
			return true;
		});
		$scope.setModal('alertDeleteAlunos');
		$scope.qtdTab = Math.ceil($scope.alunos.length / 5);
		$scope.alunosFormated = formatAlunos($scope.alunos);
	};

	$scope.deleteAluno = function () {
		homeAPI.deleteAluno($scope.alunoDelete.id);
		$scope.alunos = $scope.alunos.filter(value => !(value.id === $scope.alunoDelete.id));
		$scope.setModal('alertDelete');
		$scope.qtdTab = Math.ceil($scope.alunos.length / 5);
		$scope.alunosFormated = formatAlunos($scope.alunos);
	};

});