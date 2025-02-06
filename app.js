
let numsSorteados = [];
let possibilidades = 40;
let numSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
console.log(numSecreto);

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Adivinhando o número!');
    exibirTextoNaTela('p','Escolha um número entre 1 e 40:');    
}
exibirMensagemInicial();

function verificarChute(){

    let chute = document.querySelector('input').value;
    let tentativa_ = tentativas > 1? 'tentativas':'tentativa';
    
    if(chute == numSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${tentativa_}!`
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else {
        if(chute > numSecreto){
            exibirTextoNaTela('p', 'O número escolhido é maior que o número secreto.');
        } else {
            exibirTextoNaTela('p','O número escolhido é menor que o número secreto.');
        }
        
        tentativas = tentativas + 1;
        limparCampo();
    }
    
}

function gerarNumAleatorio(){
   let numSorteado = parseInt(Math.random()*possibilidades+1);
   let quantElementosLista = numsSorteados.length;

   if(quantElementosLista == possibilidades){
    numsSorteados = [];
   }
   if(numsSorteados.includes(numSorteado)){
    return gerarNumAleatorio();
   } else {
    numsSorteados.push(numSorteado);
    return numSorteado;
   }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
