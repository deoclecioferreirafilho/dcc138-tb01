function Sprite(params = {}) {
    var exemplo = {
        x: 10,
        y: 100,
        h: 20,
        w: 10,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        a: 0,
        vm: 0,
        am: 0,
        props: {},
        cooldown: 0,
        va: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
        scene: undefined,
        comportar: undefined
    }
    Object.assign(this, exemplo, params);
}

Sprite.prototype = new Sprite({});
Sprite.prototype.constructor = Sprite;