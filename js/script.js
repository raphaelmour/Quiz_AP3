const iniciar_btn = document.querySelector(".iniciar_btn button");
const boxes_info = document.querySelector(".boxes_info");
const sair_btn = boxes_info.querySelector(".botoes .sair");
const continue_btn = boxes_info.querySelector(".botoes .reiniciar");
const box_quiz = document.querySelector(".box_quiz");
const lista_opcoes = document.querySelector(".lista_opcoes");




iniciar_btn.onclick = ()=>{
    boxes_info.classList.add("infoAtivo");
}

sair_btn.onclick = ()=>{
    boxes_info.classList.remove("infoAtivo"); 
}

continue_btn.onclick = ()=>{
    boxes_info.classList.remove("infoAtivo"); 
    box_quiz.classList.add("quizAtivo"); 
    nQuestoes (0);
    questaoContador (1);
    

}

let contador_questao =0;
let questao_numero = 1;
let userPontuacao = 0;

const proximo_btn = box_quiz.querySelector("footer .proximo_btn");
const box_resultado = document.querySelector(".box_resultado");
const reiniciar_quiz = box_resultado.querySelector(".botoes .reiniciar");
const sair_quiz = box_resultado.querySelector(".botoes .sair");


reiniciar_quiz.onclick = () => {
    box_quiz.classList.add("quizAtivo"); 
    box_resultado.classList.remove("resultadoAtivo");     
    contador_questao = 0;
    questao_numero = 1;
    userPontuacao = 0;    
    nQuestoes(contador_questao); 
    questaoContador(questao_numero);  
    proximo_btn.style.display = "none";
}

sair_quiz.onclick = () => {
    window.location.reload();
}


proximo_btn.onclick = ()=> {
    if(contador_questao < questoes.length - 1) {
        contador_questao++;
        questao_numero++;
        nQuestoes (contador_questao);
        questaoContador (questao_numero);
        
        proximo_btn.style.display = "none";
        
       
    } else {
        console.log("Questões completadas");
        nResultadoBox();
    }
}

function nQuestoes (index) {
    const texto_questao = document.querySelector(".pergunta");
    
    
    let questao_tag = '<span>'+  questoes[index].numero + " - " +questoes[index].questao +'</span>';
    let opcoes_tag = '<div class="opcoes">'+ questoes[index].opcoes[0] +'<span></span></div>'
                    + '<div class="opcoes">'+ questoes[index].opcoes[1] +'<span></span></div>'
                    + '<div class="opcoes">'+ questoes[index].opcoes[2] +'<span></span></div>'
                    + '<div class="opcoes">'+ questoes[index].opcoes[3] +'<span></span></div>'
                    + '<div class="opcoes">'+ questoes[index].opcoes[4] +'<span></span></div>';
    texto_questao.innerHTML = questao_tag;
    lista_opcoes.innerHTML = opcoes_tag;

    const opcoes = lista_opcoes.querySelectorAll(".opcoes");
    for(let i = 0; i < opcoes.length; i++) {
        opcoes[i].setAttribute("onclick", "selecaoOpcao(this)");
    }
}

let iconeErrado = '<div class="icone errado"><i class="fas fa-times-circle"></i></div>';
let iconeCerto = '<div class="icon certo"><i class="fas fa-check-circle"></i></div>';

function selecaoOpcao(resposta) {
    let userResposta = resposta.textContent;
    let respostaCorreta = questoes[contador_questao].resposta;
    const totalOpcoes = lista_opcoes.children.length; 
    if (userResposta == respostaCorreta) {
        userPontuacao += 1;
        
        resposta.classList.add ("correta");
        resposta.insertAdjacentHTML("beforeend", iconeCerto);
        console.log("Resposta Correta");
        console.log(userPontuacao);
        
        
    } else {
        resposta.classList.add("incorreta");
        resposta.insertAdjacentHTML("beforeend", iconeErrado);
        console.log("Resposta Incorreta");
        

        for(i = 0; i < totalOpcoes; i++){
            if(lista_opcoes.children[i].textContent == respostaCorreta){ 
                lista_opcoes.children[i].setAttribute("class", "opcoes correta"); 
                lista_opcoes.children[i].insertAdjacentHTML("beforeend", iconeCerto);
                console.log("Auto selected correct answer.");
            }
        }
       
    }

    for(i=0; i < totalOpcoes; i++) {
        lista_opcoes.children[i].classList.add("desativado");
    }
    
    proximo_btn.style.display = "block";
    
}
   
function nResultadoBox() {
    boxes_info.classList.remove("infoAtivo"); 
    box_quiz.classList.remove("quizAtivo"); 
    box_resultado.classList.add("resultadoAtivo");
    const pontuacaoTexto = box_resultado.querySelector(".texto_pontuacao");
    if (userPontuacao == 10) {
        let pontuacaoTag = '<span>Magnífico, você acertou: <p>'+ userPontuacao + '</p> de <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    } else if (userPontuacao >= 5) {
        let pontuacaoTag = '<span>Que legal, você acertou: <p>'+ userPontuacao + '</p> de <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    } else if (userPontuacao >= 1) {
        let pontuacaoTag = '<span>Infelizmente você só acertou: <p>'+ userPontuacao + '</p> de <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    } else {
        let pontuacaoTag = '<span>Você não acertou nenhuma: <p>'+ userPontuacao + '</p> de <p>'+ questoes.length +'</p></span>';
        pontuacaoTexto.innerHTML = pontuacaoTag;
    }
}


function questaoContador (index) {
    const contagem_nQuestoes = box_quiz.querySelector("footer .total_questao");
    let totalQuestaoTag = '<span><p>'+ index +'</p>de<p>'+ questoes.length + '</p>Questões</span>';
    contagem_nQuestoes.innerHTML = totalQuestaoTag;
    }
