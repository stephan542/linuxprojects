class Enigma {
    keybAlph = 'qwertyuiopasdfghjklzxcvbnm';

    constructor(numRot, canvas = null) {
        this.rotaters = [];
        this.gui = { canvas: canvas, pen: null, keyMap: new Map(), fg: "black" };
        this.numRot = numRot;
        this.plugboard = new Map();
        this.setupRotaters(numRot);

    }

    encrypt(letter){

    }

    setPlugboard(plugboard=null){
            this.plugboard = plugboard;
    }

    generateRotator() {
        let tempAlph = this.keybAlph.split('');
        let rotater = [];
        let r = 0;
        for (let i = 0; i < 26; i++) {
            r = Math.floor(Math.random() * (tempAlph.length));
            rotater.push(tempAlph[r]);
            tempAlph.splice(r, 1);
        }
        return rotater;
    }

    setupRotaters(numRot) {
        for (let i = 0; i < numRot; i++) {
            this.rotaters[i] = { values: this.generateRotator(), index: 24, rotPos: new Map() };
        }
    }

    getRotaters() {
        return this.rotaters;
    }

    encodeLetter(letter, gui = { fg: this.gui.fg }) {
        if (this.keybAlph.includes(letter)) {
            this.flipRotator(this.numRot - 1);
            this.encrypt(this.usePlugboard(letter));
            this.changeKeyColor(letter, gui.fg);
        }
    }

    usePlugboard(letter){

    }

    flipRotator(rotater){
        if(rotater>=0){
            this.moveRotator(rotater, 1);
            if (this.rotaters[rotater].index == 0) {
                return this.flipRotator(rotater-1)
            }
        }
    }

    moveRotator(serial, dir) {
        let x, y = 0;
        if (dir == 1) {
            this.rotaters[serial].index = this.rotaters[serial].index + 1 > this.rotaters[serial].values.length - 1 ? 0 : this.rotaters[serial].index + 1;
        } else {
            this.rotaters[serial].index = this.rotaters[serial].index - 1 < 0 ? this.rotaters[serial].values.length - 1 : this.rotaters[serial].index - 1;
        }

        let pos = this.rotaters[serial].index;
        let bpos = (pos - 1) < 0 ? this.rotaters[serial].values.length - 1 : this.rotaters[serial].index - 1;
        let apos = (pos + 1) > this.rotaters[serial].values.length - 1 ? 0 : this.rotaters[serial].index + 1;


        this.drawRotatersText(this.rotaters[serial].values[bpos], this.rotaters[serial].rotPos.get(0).x, this.rotaters[serial].rotPos.get(0).y);
        this.drawRotatersText(this.rotaters[serial].values[pos], this.rotaters[serial].rotPos.get(1).x, this.rotaters[serial].rotPos.get(1).y);
        this.drawRotatersText(this.rotaters[serial].values[apos], this.rotaters[serial].rotPos.get(2).x, this.rotaters[serial].rotPos.get(2).y);
    }

    draw(canvas = this.gui.canvas, fg = this.gui.fg, buttons = null) {
        if (canvas == null) {
            console.log('ERR No Canvas')
        } else {
            this.gui.fontSize = Math.floor(canvas.clientWidth * 0.03)
            this.gui.pen = new Pen(canvas);
            this.gui.pen.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            this.drawRotaters(canvas, this.gui.fontSize, buttons);
            this.drawKeys(canvas, this.gui.fontSize, fg);
            this.drawPlugboard(canvas, Math.floor(canvas.clientWidth * 0.02), "blue");
        }
    }

    changeKeyColor(key, fg = this.gui.fg, fontSize = this.gui.fontSize) {
        if (this.gui.pen != null) {
            if (this.keybAlph.includes(key)) {
                let k = this.gui.keyMap.get(key);
                this.gui.pen.clearRect(k.x, k.y - fontSize, fontSize, fontSize + 20);
                this.gui.pen.drawText(key, k.x, k.y, fg, fontSize);
            }
        }
    }

    drawRotatersText(text, x, y, fontSize = this.gui.fontSize, color = "green") {
        this.gui.pen.clearRect(x - fontSize * 0.1, y - fontSize * 0.9, fontSize * 0.9, fontSize * 1.2)
        this.gui.pen.drawText(text, x, y, color, fontSize);
    }

    drawRotaters(canvas, fontSize = this.gui.fontSize, buttons = null) {
        let rStart = Math.floor(canvas.clientWidth / 2 - ((this.numRot / 2) * (fontSize + 30)))
        let pos, bpos, apos = 0;
        let x, y, w, h = 0;
        for (let i = 0; i < this.numRot; i++) {
            x = rStart + (i * fontSize * 2.1);
            y = Math.floor(canvas.clientHeight * 0.08);
            w = fontSize * 1.2;
            h = Math.floor(canvas.clientHeight * 0.25);

            this.gui.pen.drawRect(x, y, w, h);
            this.gui.pen.drawRect(x, y + Math.floor(h / 3), w, h - Math.floor(h * 2 / 3));

            pos = this.rotaters[i].index;
            bpos = (pos - 1) < 0 ? this.rotaters[i].values.length - 1 : this.rotaters[i].index - 1;
            apos = (pos + 1) > this.rotaters[i].values.length - 1 ? 0 : this.rotaters[i].index + 1;

            this.rotaters[i].rotPos.set(0, { x: (x + fontSize * 0.2), y: (y + fontSize) });
            this.rotaters[i].rotPos.set(1, { x: (x + fontSize * 0.2), y: (y + Math.floor(h / 3) + fontSize) });
            this.rotaters[i].rotPos.set(2, { x: (x + fontSize * 0.2), y: (y + h * 0.9) });

            this.drawRotatersText(this.rotaters[i].values[bpos], x + fontSize * 0.2, y + fontSize);
            this.drawRotatersText(this.rotaters[i].values[pos], x + fontSize * 0.2, y + Math.floor(h / 3) + fontSize);
            this.drawRotatersText(this.rotaters[i].values[apos], x + fontSize * 0.2, y + h * 0.9);

            if (buttons != null && buttons[i + i] && buttons[i + i + 1]) {
                buttons[i + i].style.left = (x + fontSize * 0.2) + "px";
                buttons[i + i].style.top = (y - fontSize) + "px";
                buttons[i + i].onclick = () => { this.moveRotator(i, 1) }

                buttons[i + i + 1].style.left = (x + fontSize * 0.2) + "px";
                buttons[i + i + 1].style.top = (Math.floor(canvas.clientHeight * 0.30) + fontSize) + "px";
                buttons[i + i + 1].onclick = () => { this.moveRotator(i, -1) }
            }
        }


    }

    drawKeys(canvas, fontSize = this.gui.fontSize, fg = this.gui.fg) {
        let h = canvas.clientHeight / 2 + fontSize;
        let w = canvas.clientWidth * 0.09;
        let level = 1;
        for (let i = 0; i < this.keybAlph.length; i++) {
            this.gui.keyMap.set(this.keybAlph[i], { letter: this.keybAlph[i], x: w, y: h });
            this.gui.pen.drawText(this.keybAlph[i], w, h, fg, fontSize);
            w += canvas.clientWidth * 0.09;
            if (w > canvas.clientWidth - canvas.clientWidth * 0.09) {
                h += fontSize * 2;
                w = (level + 1) * canvas.clientWidth * 0.07;
                level++;
            }
        }
    }

    drawPlugboard(canvas, fontSize = this.gui.fontSize, fg = this.gui.fg){
        let h = canvas.clientHeight * 0.80 + fontSize;
        let w = canvas.clientWidth * 0.12;
        for (let i = 0; i < this.keybAlph.length; i++) {
            this.plugboard.set(key,{value:key,w,h});
            this.gui.pen.drawText(this.keybAlph[i], w, h, fg, fontSize);
            this.gui.pen.drawText(this.keybAlph[i], w, h+fontSize*2.5, "red", fontSize);
            w += canvas.clientWidth * 0.03;
        }
    }
}