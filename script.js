var uI;
var espaco;
var jogadores;
var acoes;
var fimDeJogo;

comeco      = function(){
    config();
    evento();
}
restart  = function(){
    jogadores[0].vencedor=false;
    jogadores[1].vencedor=false;
    espaco =[0,0,0, 0,0,0, 0,0,0];
    for(let parte of uI.partes)
        parte.innerText = "";
    fimDeJogo = false;
}
mudanca		= function(){

    if(temVencedor()){
        console.log(fimDeJogo);
    }
    setMensagem();
}
temVencedor  = function(){
    for(let i = 0 ; i < acoes.length; i++){
        for(let jogador of jogadores){
            if(espaco[acoes[i][0]]  == jogador.id &&
                espaco[acoes[i][1]] == jogador.id &&
                    espaco[acoes[i][2]] == jogador.id){
                
                jogador.vencedor  = true;
                jogador.pontos    += 1;
                fimDeJogo       = true;
                jogador.minhaVez  = true;
                uI.pontos[jogador.id-1].innerText = jogador.pontos;

                if(jogador.id == 1)
                    jogadores[1].minhaVez = false;

                if(jogador.id == 2)
                    jogadores[0].minhaVez = false;

                return true;
            }

        }
    }
    return false;
}

evento = function(){

    let index = 0;
    for(let parte of uI.partes){

        parte.index = index++;
        parte.addEventListener("click",()=>eventoClick(parte));

    }

    uI.btn_restart.addEventListener("click", ()=>restart());

}

eventoClick = function(parte){
    if(!fimDeJogo)
        for(let jogador of jogadores){

            if(jogador.minhaVez && espaco[parte.index] == 0){

                espaco[parte.index] = jogador.id;
                jogador.minhaVez    = false;
                
                if(jogador.id == 1)
                    jogadores[1].minhaVez = true;

                if(jogador.id == 2)
                    jogadores[0].minhaVez = true;

                
                uI.partes[parte.index].innerText = jogador.parte;
                mudanca(parte);
                
                return 0;
            }	
        }

    return 0;
}



config = function(){

    fimDeJogo = false;
    jogadores    = [];
    jogadores[0] = {id:1, name:"X", parte:"X", pontos:0, minhaVez:true, vencedor:false};
    jogadores[1] = {id:2, name:"P O", parte:"O", pontos:0, minhaVez:false, vencedor:false};
    espaco      = [0,0,0, 0,0,0, 0,0,0];
    acoes  = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];
    uI         = {};
    
    setUi();

}

setMensagem = function(){

    for(let jogador of jogadores){

        if(jogador.minhaVez && jogador.vencedor){

            uI.mensagem.innerText = jogador.parte +" Ganhou!!!";
            return 0;

        }

        if(jogador.minhaVez && !jogador.vencedor){

            uI.mensagem.innerText = jogador.parte +" Sua vez";	
            return 0;

        }
        

    }
    /*fimJogo = function(){
        this.fimDeJogo= true;
        uI.mensagem.innerText = jogador.parte +" Velha!!";	
        
    }*/


}

setUi              = function(){
    uI.pontos       = document.getElementsByClassName("pontos");
    uI.partes      = document.getElementsByClassName("parte");
    uI.btn_restart = document.getElementsByClassName("btn_restart")[0];
    uI.mensagem	       = document.querySelector(".mensagem"); 
}	

