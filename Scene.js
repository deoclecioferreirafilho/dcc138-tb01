function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        image: [],
        cargaDeImage: [],
        ctx: null,
        w: 0,
        h: 0,
        cargaImg: 0,
        carregando: 0,
        estado: this.pausa, //this.carregando,
        inicio: 1,
        pausa: 2,
        fim: 3
    }
    Object.assign(this, exemplo, params);
}
Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.estadoDoJogo = function () {
    switch (this.estado) {
        case this.carregando:
            console.log(this.estado + ' Carregando...');
            break;
        case this.inicio:
            console.log(this.estado + ' Iniciar');
            this.atualizar();
            break;
        default:
            break;
    }
}

Scene.prototype.adicionar = function (sprite) {
    this.sprites.push(sprite);
    sprite.Scene = this;
}
 
Scene.prototype.adicionarImg = function (image) {
    this.image.push(image);
    image.Scene = this;
}

Scene.prototype.carregaImagem = function () {
    this.cargaImg++;
    if (this.cargaImg === this.adicionarImg.length) {
        removeEventListener('load', this.carregaImagem, false);
        this.estado = this.pausa;
        console.log(this.estado);
    }

    var t = 10;
    this.ctx.fillStyle = "white";
    this.ctx.fillText('Estado do jogo: ' + this.estado
        + ' - ' + t, 10, 10);
}


Scene.prototype.desenhar = function () {
    for (var i = 0; i < this.sprites.length; i++)
        this.sprites[i].desenhar(this.ctx);
}

Scene.prototype.atualizar = function () {


}

Scene.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++)
        this.sprites[i].mover(dt);

}



Scene.prototype.comportar = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].comportar) {
            this.sprites[i].comportar();
        }
    }
}

Scene.prototype.limpar = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Scene.prototype.checaColisao = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        for (var j = i + 1; j < this.sprites.length; j++) {
            if (this.sprites[i].colidiuCom(this.sprites[j])) {
                if (this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "npc") {
                    this.toRemove.push(this.sprites[j]);
                }
                else
                    if (this.sprites[i].props.tipo === "npc" && this.sprites[j].props.tipo === "tiro") {
                        if (this.sprites[i].props.tipo === "npc") {
                            this.sprites[i].props.tipo = "expc"
                            this.sprites[i].origemX = 80;
                            this.sprites[i].w = 56;
                            this.sprites[i].h = 56;
                            this.explosaoSom();

                            console.log("explosão: ", i);


                        }
                        this.toRemove.push(this.sprites[j]);
                    }
            }
        }
    }

    setTimeout(() => {
        this.excluiExp();
    }, 1000);

}

Scene.prototype.explosaoSom = function(){
    var som = document.createElement("audio");
    som.src = "sons/explosion.ogg";
    som.addEventListener("canplaythrough",function(){
        som.play();
    })
}

Scene.prototype.excluiExp = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].props.tipo === "expc"){  
               this.toRemove.push(this.sprites[i]);
        }
    }

}



Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if (idx >= 0) {
            this.sprites.splice(idx, 1);
        }
    }
    this.toRemove = [];
}



Scene.prototype.passo = function (dt) {
    this.limpar();
    this.estadoDoJogo();
    this.comportar();
    this.mover(dt);
    this.desenhar();
    this.checaColisao(dt);
    this.removeSprites();
}


function newFunction() {
    return "fillStyle = #dfe";
}
