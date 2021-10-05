angular.module("escolinha").filter("uppercaseName", function () {
    return function (input) {
        const names = input.split(' ');
        const namesUpper = names.map(nome => {
            if (nome.length < 2) {
                return nome;
            }
            const upper = nome.charAt(0).toUpperCase();
            return upper + nome.substr(1).toLowerCase();
        })
        return namesUpper.join(' ');
    }
});