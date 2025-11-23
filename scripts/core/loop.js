class Loop{

    constructor(scene,renderer){
        this.inputSystem = InputSystem.getInstance();
        this.scene = scene;
        this.renderer = renderer;

        this.running = false;
        this.lastTime = 0;
    }

    start(dt){

        if (this.running) return;
        this.running = true;
        
        requestAnimationFrame(this.tick.bind(this)); 
    }

    stop() {
        this.running = false;
    }

    tick(time) {
        if (!this.running) return;

        // Calculate delta time (in seconds)
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;

        // Game steps
        this.inputSystem.update();
        this.scene.update(dt);
        this.renderer.draw(this.scene.drawList);

        // Schedule next frame
        requestAnimationFrame(this.tick.bind(this));
    }
}