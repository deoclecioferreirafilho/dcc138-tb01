(function () {
    // Canvas
    var canvas = document.querySelector("canvas");
    canvas.width = 400;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");

    // Variáveis

    var teclas = {
        espaco: 0,
        esquerda: 0,
        cima: 0,
        direita: 0,
        baixo: 0
    }

    //var img = new Image({ src: "imagens/img.png" }); 
    // addEventListener('load', this.carregaImagem, false);


    var cena1 = new Scene({ ctx: ctx, w: canvas.width, h: canvas.height });
    var pc = new Sprite({ x: canvas.width / 2 - 15, y: canvas.height - 55, comportar: porTeclasDirecionais(teclas), props: { tipo: "pc" } }); //
    var fundo = new Sprite({ origemX: 0, origemY: 56, w: canvas.width, h: canvas.height, x: 0, y: 0 })
    cena1.carregaImagem(img);
    cena1.adicionar(fundo);
    cena1.adicionar(pc);



    /*
        cena1.adicionar(new Sprite({
            origemX: 31, origemY: 0, x: 150, y: 50, w: 50, h: 50, va: 30, vm: 100, 
            comportar: persegue2(pc), props: { tipo: "npc", Spawn: 10 }
        }));
        
            cena1.adicionar(new Sprite({
                origemX: 31, origemY: 0, x: 300, y: 50, w: 50, h: 50, va: 30, vm: 100, 
                comportar: persegue2(pc), props: { tipo: "npc" }
            }));
            /*
            cena1.adicionar(new Sprite({
                x: canvas.width / 3-25, y: 20, h: 10, w: 50, vm: 80, color: "blue",
                comportar: persegue(pc), props: { tipo: "npc" }
            }));
        
            //Funções
        */
    var navFreq = 100;
    var navTime = 0;

    function validaNav() {
        navTime++;
        if (navTime === navFreq) {
            criaNav();
            navTime = 0;
            if (navFreq > 2) {
                navFreq--;
            }
        }
        // console.log(navTime, " == ", navFreq)
    }

    function criaNav() {
        cena1.adicionar(new Sprite({
            origemX: 31,
            x: (Math.floor(Math.random() * 8)) * 50,
            //x: canvas.width * Math.random(),
            y: -60,
            w: 50,
            h: 50,
           // va: 4 * Math.random(),
          //  vm: 200 * Math.random(),
          vy: 300,
            comportar: persegue2(pc),
            props: { tipo: "npc" }
        }));

    }
    // for (var k = 0; k < nav; k++) {




    /*
        function persegue(alvo) {
            return function () {
                //  this.vx = 50 * Math.sign(alvo.x - this.x);
                this.vy = 50 * Math.sign(alvo.y - this.y);
            }
        }
    */
    function persegue2(alvo) {
        return function () {
            var dx = alvo.x - this.x;
            var dy = alvo.y - this.y;
            var adj = 1.5;
            var da = Math.sqrt(dx * dx + dy * dy);
            var prod = (dx / da) * Math.cos(this.a + adj) + (dy / da) * Math.sin(this.a + adj)

            this.va = 30 * (prod - 0);
            this.vy = 30;
        }
    }

    function persegueSpawn(alvo) {
        return function () {
            var dx = alvo.x - this.x;
            var dy = alvo.y - this.y;
            var adj = 1.5;
            var da = Math.sqrt(dx * dx + dy * dy);
            var prod = (dx / da) * Math.cos(this.a + adj) +
                (dy / da) * Math.sin(this.a + adj)
            this.va = 2 * (prod - 0);
            this.props.Spawn -= (1 / 60);
            if (this.props.Spawn <= 0) {
                this.props.Spawn = 3;
                var novo = new Sprite({
                    x: this.x, y: this.y,
                    vm: 100 * Math.random(),
                    props: { tipo: "npc" },
                    comportar: persegue2(alvo)
                });
                this.Scene.adicionar(novo);
            }
            //this.vm = 30;
        }
    }



    function porTeclasDirecionais(teclas) {
        return function () {
            if (teclas.esquerda && !teclas.direita) {
                this.vx = -400;
            }
            if (teclas.direita && !teclas.esquerda) {
                this.vx = +400;
            }
            if (!teclas.direita && !teclas.esquerda) {
                this.vx = 0;
            }

            this.x = Math.max(this.w / 2, Math.min(cena1.w - this.w, this.x + this.va));

            if (teclas.espaco && this.cooldown <= 0) {
                var tiro = new Sprite({
                    origemX: 136, origemY: 12, x: this.x + 11, y: this.y - 12, a: this.a - 0.1 + 0 * Math.random(),
                    w: 8, h: 13, comportar: vtiro(), props: { tipo: "tiro" }, vy: -1000, vx: 0
                });
                this.Scene.adicionar(tiro);
                this.cooldown = 0.2;
            }
        }
    }

    function vtiro() {

        this.y = this.y + this.vy * dt;
    }

    function passo(t) {
        dt = (t - anterior) / 1000;
        cena1.passo(dt);
        anterior = t;
        validaNav();

        requestAnimationFrame(passo);
    }
    var dt, anterior = 0;

    requestAnimationFrame(passo);

    //Configura controles
    addEventListener("keydown", function (e) {

        switch (e.keyCode) {
            case 37:
                teclas.esquerda = 1;
                break;
            case 39:
                teclas.direita = 1;
                break;
            case 32:
                teclas.espaco = 1;
                break;
            default:
                break;
        }
    });

    addEventListener("keyup", function (e) {
        switch (e.keyCode) {

            case 37:
                teclas.esquerda = 0;
                break;
            case 39:
                teclas.direita = 0;
                break;
            case 32:
                teclas.espaco = 0;
                break;
            case 13: //enter
                if (cena1.estado !== cena1.inicio)
                    cena1.estado = cena1.inicio;
                else
                    cena1.estado = cena1.pausa;
            default:
                break;
        }

    });

}());