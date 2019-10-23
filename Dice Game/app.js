/*Code-Start*/
// criamos variaveis de escopo global para acessalas depois
var scores, roundScore, activePlayer, gamePlaying, dice, dicetwo, diceTwoValue;

//por conta da regra de hoiting e escopo conseguimos acessar essa função antes dela ser criada.
init();
/********************************************************BOTÃO-ROLL*************************************************/

// Aqui acessamos a classe do botão 'Roll' via querySelector , e para o botão fazer alguma ação nos adicionamos o 'addEventListener'  nele nos passamos dois argumentos no parametro, um de click e uma função.
document.querySelector(".btn-roll").addEventListener("click", function() {
  // if criado com booleana para saber quando o jogo começa.
  if (gamePlaying) {
    // Aqui nos usamos o Math.Floor para utilizarmos numeros Inteiros e Math.Random para sortear um numero entre 6 e 1.

    dice = Math.floor(Math.random() * 6) + 1;
    dicetwo = Math.floor(Math.random() * 6) + 1;

    // Criamos uma variavel de escopo fechado que vamos apenas acessa-lá dentro dessa função.
    var diceDOM = document.querySelector(".dice");
    var diceDOMtwo = document.querySelector(".dice-two");

    // Dentro dessa na variavel diceDom que esta atribuida a classe dice nós acessamos seu style, e dizemos para ela ser um display:'Block';
    diceDOM.style.display = "block";
    diceDOMtwo.style.display = "block";

    // Aqui usamos um truque utilizando um sufixo que que é um numero acim concatenamos ele com a Variavel Dice, assim conseguimos trocar a imagem do dado dinamicamente.
    diceDOM.src = "dice-" + dice + ".png";
    diceDOMtwo.src = "dice-" + dicetwo + ".png";

    // Agora adicionamos a nossa logica da gameplay dizendo que se o dado for diferente de 1 mudamos o content para o placar local, caso ele seja 1 chamamos a função criada para dar a vez ao outro player.

    if (dice === 6 && diceTwoValue === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice === 1 || dicetwo === 1) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dicetwo !== 1 && dice !== 1) {
      roundScore += dice + dicetwo;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    diceTwoValue = dice;
  }
});
/********************************************************BOTÃO-ROLL*************************************************/

/********************************************************BOTÃO-HOLD*************************************************/

// Aqui acessamos a classe do botão 'Hold' via querySelector , e para o botão fazer alguma ação nos adicionamos o 'addEventListener'  nele nos passamos dois argumentos no parametro, um de click e uma função.
document.querySelector(".btn-hold").addEventListener("click", function() {
  // if criado com booleana para saber quando o jogo começa.
  if (gamePlaying) {
    // Aqui atribuimos o valor do activePlayer (player 1 ou 2) ao nosso placar.
    scores[activePlayer] += roundScore;

    // aqui mudamos o valor do nosso score baseado na logica anterior.
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector(".input-value").value;
    console.log(input);
    let winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    // aqui definimos a logica do nosso jogo, se for acima de 100 o jogo para automaticamente.
    if (scores[activePlayer] >= winningScore) {
      //Nosa mudamos o texto para aparecer winner.
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      // aqui removemos a imagem do dado quando atingirmos 100 pontos
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice-two").style.display = "none";

      // aqui adicionamos o CSS ja criado para o vencedor
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      // essa linha diz em especifico para o jogo parar
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

/********************************************************BOTÃO-HOLD*************************************************/

// função criada para adicionar o proximo player a rodada;
function nextPlayer() {
  // criamos um if ternario para dizer para zerar o roundScore atual.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // Aqui zeramos o texto do current score
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // aqui usamos o toggle para adicionar o active quando não tiver e se tiver remover.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // Aqui escondemos o dado.
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-two").style.display = "none";
}
// Essa linha criada para a iniciar um novo jogo quando clicarmos no botão new.
document.querySelector(".btn-new").addEventListener("click", init);

// Função criada para iniciar o jogo
function init() {
  // aqui zeramos todas as variaveis
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  // acessamos a propriedade do style e depois o valor do CSS
  // document.querySelector('.dice').style.display = 'none';
  // document.querySelector('.dice-two').style.display = 'none';

  // Aqui setamos todos os valores para o 'Default'
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
