const apostas = [
  { branco: 0, cor: 4 },
  { branco: 0, cor: 6.8 },
  { branco: 0, cor: 11.56 },
];

const losses = 25;
const brancos = 0;
const greens = 201;

let saldoInicial = 200;

function fazerAposta(
  tentativa: number,
  green: boolean,
  loss: boolean,
  deuBranco: boolean
) {
  if (green) {
    return apostas[tentativa].cor * 1.7;
  } else if (deuBranco) {
    return apostas[tentativa].branco * 14;
  } else {
    return -(apostas[tentativa].cor + apostas[tentativa].branco);
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

  let arraySemFalhas = Array.from(Array(123), () => 0);
  let arrayUmaFalha = Array.from(Array(55), () => 1);
  let arrayDuasFalha = Array.from(Array(23), () => 2);
  let arrayTodasFalhas = [
    ...arraySemFalhas,
    ...arrayUmaFalha,
    ...arrayDuasFalha,
  ];
  todasAsApostas = shuffle(todasAsApostas);
  arrayTodasFalhas = shuffleFalha(arrayTodasFalhas);
  // console.dir(todasAsApostas);
  todasAsApostas.forEach((status, index) => {
    console.log("saldo antes da aposta: ", saldoInicial.toFixed(2));
    let falhas = arrayTodasFalhas[index] || 0;
    if (status.green) {
      // console.log('tenho que gastar ', apostas[0].cor, 'e ganhar', apostas[0].cor * 2);
      console.log('deu win com gale', falhas);
    } else {
      console.log('deu loss');
    }

    let resultadoAposta = 0;
    console.log("falhas :>> ", falhas);
    if (falhas >= 2 || status.loss) {
      console.log('gale2');
      resultadoAposta += fazerAposta(2, false, true, false);
      console.log('resultadoAposta :>> ', resultadoAposta);
    }
    if (falhas >= 1 || status.loss) {
      console.log('gale1');
      resultadoAposta += fazerAposta(1, false, true, false);
      console.log('resultadoAposta :>> ', resultadoAposta);
    }

    resultadoAposta += fazerAposta(0, status.green, status.loss, status.branco);
    console.log('resultadoAposta :>> ', resultadoAposta);
    if (resultadoAposta > 0) {
      console.log('ganhei ', resultadoAposta.toFixed(2));
    } else {
      console.log('perdi ', resultadoAposta.toFixed(2));
    }
    saldoInicial += resultadoAposta;
    console.log('-'.repeat(50))
    console.log('')
  });

  console.log("Terminei com", saldoInicial.toFixed(2));
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

function shuffleFalha(array: number[]) {
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
