

class InputSystem{
    static _instance = null;

    mouse = {
      x: 0,
      y: 0  
    }

    constructor(){

         if (InputSystem.instance) {
            return InputSystem.instance; // always return the same instance
        }

        this.keysDown = new Set();

        window.addEventListener("keydown", e => {
            this.keysDown.add(e.code);
        });

        window.addEventListener("keyup", e => {
            this.keysDown.delete(e.code);
        });

        window.addEventListener("mousedown", (event) => {
            var mouseKey = this.MouseEvent(event);
            this.keysDown.add(mouseKey);
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        window.addEventListener("mouseup", (event) => {
            var mouseKey = this.MouseEvent(event);
            this.keysDown.delete(mouseKey);
        });

        window.addEventListener("mousemove", (event) => {
            if(this.keysDown.has(KeyMouseLeft)){
                this.mouse.x = event.clientX;
                this.mouse.y = event.clientY;
            }
        });
    }

    MouseEvent(event) {
        var mouseKey = "";
        switch (event.button) {
            case 0:
                mouseKey = KeyMouseLeft;
                break;
            case 1:
                mouseKey = KeyMouseMiddle;
                break;
            case 2:
                mouseKey = KeyMouseRight;
                break;
        }
        return mouseKey;
    }

    update(){
         //- calculates "just pressed"
         //- calculates "just released"
         //- finalizes mouse/touch info
    }

    static getInstance() {
        if (!InputSystem._instance) {
            InputSystem._instance = new InputSystem();
        }
        return InputSystem._instance;
    }
}