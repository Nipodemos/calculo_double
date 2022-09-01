const apostas = [
  { branco: 0, cor: 4 },
  { branco: 0, cor: 8 },
  { branco: 0, cor: 16 },
];

const losses = 49;
const brancos = 36;
const greens = 373 - brancos;

let saldoInicial = 200;

function fazerAposta(
  tentativa: number,
  green: boolean,
  loss: boolean,
  deuBranco: boolean
) {
  if (green) {
    return apostas[tentativa].cor * 2;
  } else if (deuBranco) {
    return apostas[tentativa].branco * 14;
  } else {
    return 0;
  }
}

function fazerApostas() {
  const arrayGreens = Array.from(Array(greens), () => ({
    green: true,
    loss: false,
    branco: false,
  }));
  const arrayLosses = Array.from(Array(losses), () => ({
    green: false,
    loss: true,
    branco: false,
  }));
  const arrayBrancos = Array.from(Array(brancos), () => ({
    green: false,
    loss: false,
    branco: true,
  }));
  let todasAsApostas = [...arrayGreens, ...arrayLosses, ...arrayBrancos];

  let arraySemFalhas = Array.from(Array(227), () => 0);
  let arrayUmaFalha = Array.from(Array(105), () => 1);
  let arrayDuasFalha = Array.from(Array(41), () => 2);
  let arrayTodasFalhas = [
    ...arraySemFalhas,
    ...arrayUmaFalha,
    ...arrayDuasFalha,
  ];
  todasAsApostas = shuffle(todasAsApostas);
  console.dir(todasAsApostas);
  todasAsApostas.forEach((status, index) => {
    let falhas = arrayTodasFalhas[index] || 0;
    console.log("saldo antes da aposta: ", saldoInicial);
    let saldoAntesDaAposta = saldoInicial;
    if (falhas === 0 && !status.loss) {
      saldoInicial -= apostas[0].cor;
      saldoInicial -= apostas[0].branco;
      let valorGasto = saldoAntesDaAposta - saldoInicial;
      saldoInicial += fazerAposta(0, status.green, status.loss, status.branco);
      console.log(
        "Gastei R$" + valorGasto,
        "ganhei R$" + (saldoInicial - saldoAntesDaAposta)
      );
    } else if (falhas === 1 && !status.loss) {
      saldoInicial -= apostas[0].cor;
      saldoInicial -= apostas[0].branco;
      saldoInicial += fazerAposta(0, false, true, false);

      saldoInicial -= apostas[1].cor;
      saldoInicial -= apostas[1].branco;
      let valorGasto = saldoAntesDaAposta - saldoInicial;
      saldoInicial += fazerAposta(0, status.green, status.loss, status.branco);
      console.log(
        "Gastei R$" + valorGasto,
        "ganhei R$" + (saldoInicial - saldoAntesDaAposta)
      );
    } else if (falhas === 2 && !status.loss) {
      saldoInicial -= apostas[0].cor;
      saldoInicial -= apostas[0].branco;
      saldoInicial += fazerAposta(0, false, true, false);

      saldoInicial -= apostas[1].cor;
      saldoInicial -= apostas[1].branco;
      saldoInicial += fazerAposta(1, false, true, false);

      saldoInicial -= apostas[2].cor;
      saldoInicial -= apostas[2].branco;
      let valorGasto = saldoAntesDaAposta - saldoInicial;
      saldoInicial += fazerAposta(2, status.green, status.loss, status.branco);
      console.log(
        "Gastei R$" + valorGasto,
        "ganhei R$" + (saldoInicial - saldoAntesDaAposta)
      );
    } else if (status.loss) {
      saldoInicial -= apostas[0].cor;
      saldoInicial -= apostas[0].branco;
      saldoInicial += fazerAposta(0, false, true, false);

      saldoInicial -= apostas[1].cor;
      saldoInicial -= apostas[1].branco;
      saldoInicial += fazerAposta(1, false, true, false);

      saldoInicial -= apostas[2].cor;
      saldoInicial -= apostas[2].branco;
      let valorGasto = saldoAntesDaAposta - saldoInicial;
      saldoInicial += fazerAposta(1, false, true, false);
      console.log(
        "Gastei R$" + valorGasto,
        "ganhei R$" + (saldoInicial - saldoAntesDaAposta)
      );
    } else {
      console.log("erro");
    }
  });

  console.log("Terminei com", saldoInicial);
}

function shuffle(array: { green: boolean; loss: boolean; branco: boolean }[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

fazerApostas();
