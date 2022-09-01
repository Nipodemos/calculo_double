var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var apostas = [
    { branco: 0, cor: 4 },
    { branco: 0, cor: 8 },
    { branco: 0, cor: 16 },
];
var losses = 49;
var brancos = 36;
var greens = 373 - brancos;
var saldoInicial = 200;
function fazerAposta(tentativa, green, loss, deuBranco) {
    if (green) {
        return apostas[tentativa].cor * 2;
    }
    else if (deuBranco) {
        return apostas[tentativa].branco * 14;
    }
    else {
        return 0;
    }
}
function fazerApostas() {
    var arrayGreens = Array.from(Array(greens), function () { return ({
        green: true,
        loss: false,
        branco: false
    }); });
    var arrayLosses = Array.from(Array(losses), function () { return ({
        green: false,
        loss: true,
        branco: false
    }); });
    var arrayBrancos = Array.from(Array(brancos), function () { return ({
        green: false,
        loss: false,
        branco: true
    }); });
    var todasAsApostas = __spreadArray(__spreadArray(__spreadArray([], arrayGreens, true), arrayLosses, true), arrayBrancos, true);
    var arraySemFalhas = Array.from(Array(227), function () { return 0; });
    var arrayUmaFalha = Array.from(Array(105), function () { return 1; });
    var arrayDuasFalha = Array.from(Array(41), function () { return 2; });
    var arrayTodasFalhas = __spreadArray(__spreadArray(__spreadArray([], arraySemFalhas, true), arrayUmaFalha, true), arrayDuasFalha, true);
    todasAsApostas = shuffle(todasAsApostas);
    console.dir(todasAsApostas);
    todasAsApostas.forEach(function (status, index) {
        var falhas = arrayTodasFalhas[index] || 0;
        console.log("saldo antes da aposta: ", saldoInicial);
        var saldoAntesDaAposta = saldoInicial;
        if (falhas === 0 && !status.loss) {
            saldoInicial -= apostas[0].cor;
            saldoInicial -= apostas[0].branco;
            var valorGasto = saldoAntesDaAposta - saldoInicial;
            saldoInicial += fazerAposta(0, status.green, status.loss, status.branco);
            console.log("Gastei R$" + valorGasto, "ganhei R$" + (saldoInicial - saldoAntesDaAposta));
        }
        else if (falhas === 1 && !status.loss) {
            saldoInicial -= apostas[0].cor;
            saldoInicial -= apostas[0].branco;
            saldoInicial += fazerAposta(0, false, true, false);
            saldoInicial -= apostas[1].cor;
            saldoInicial -= apostas[1].branco;
            var valorGasto = saldoAntesDaAposta - saldoInicial;
            saldoInicial += fazerAposta(0, status.green, status.loss, status.branco);
            console.log("Gastei R$" + valorGasto, "ganhei R$" + (saldoInicial - saldoAntesDaAposta));
        }
        else if (falhas === 2 && !status.loss) {
            saldoInicial -= apostas[0].cor;
            saldoInicial -= apostas[0].branco;
            saldoInicial += fazerAposta(0, false, true, false);
            saldoInicial -= apostas[1].cor;
            saldoInicial -= apostas[1].branco;
            saldoInicial += fazerAposta(1, false, true, false);
            saldoInicial -= apostas[2].cor;
            saldoInicial -= apostas[2].branco;
            var valorGasto = saldoAntesDaAposta - saldoInicial;
            saldoInicial += fazerAposta(2, status.green, status.loss, status.branco);
            console.log("Gastei R$" + valorGasto, "ganhei R$" + (saldoInicial - saldoAntesDaAposta));
        }
        else if (status.loss) {
            saldoInicial -= apostas[0].cor;
            saldoInicial -= apostas[0].branco;
            saldoInicial += fazerAposta(0, false, true, false);
            saldoInicial -= apostas[1].cor;
            saldoInicial -= apostas[1].branco;
            saldoInicial += fazerAposta(1, false, true, false);
            saldoInicial -= apostas[2].cor;
            saldoInicial -= apostas[2].branco;
            var valorGasto = saldoAntesDaAposta - saldoInicial;
            saldoInicial += fazerAposta(1, false, true, false);
            console.log("Gastei R$" + valorGasto, "ganhei R$" + (saldoInicial - saldoAntesDaAposta));
        }
        else {
            console.log("erro");
        }
    });
    console.log("Terminei com", saldoInicial);
}
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
fazerApostas();
