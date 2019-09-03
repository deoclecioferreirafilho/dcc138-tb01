// Variáveis
var canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 600;
canvas.style = "border: 1px solid";
var ctx = canvas.getContext("2d");

var teclas = {
    espaco: 0,
    esquerda: 0,
    cima: 0,
    direita: 0,
    baixo: 0
}

//Funções





//Configura controles
addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 32:
            teclas.espaco = 1;
            break;
        case 37:
            teclas.esquerda = 1;
            break;
        case 38:
            teclas.cima = 1;
            break;
        case 39:
            teclas.direita = 1;
            break;
        case 40:
            teclas.baixo = 1;
            break;
        default:
            break;
    }
});

addEventListener("keyup", function (e) {
    switch (e.keyCode) {

        case 32:
            teclas.espaco = 0;
            break;
        case 37:
            teclas.esquerda = 0;
            break;
        case 38:
            teclas.cima = 0;
            break;
        case 39:
            teclas.direita = 0;
            break;
        case 40:
            teclas.baixo = 0;
            break;
        default:
            break;
    }

});
   
