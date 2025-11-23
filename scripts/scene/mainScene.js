class MainScene extends Scene{
     constructor() {
        super();
        this.time = 0;
        this.drawList = [];

        // Example BPM diagram
        this.nodeA = { id:"A", x:100, y:100 };
        this.nodeB = { id:"B", x:300, y:100 };

        this.token = {
            id:"T1",
            x:100,
            y:100,
            progress: 0
        };
    }

    init() {
        this.buildDrawList();
    }

    update(dt) {
        this.time += dt;

        
    }

    buildDrawList() {
        this.drawList = [
            // Node A
            {
                id: "A",
                type: "node",
                x: this.nodeA.x,
                y: this.nodeA.y,
                width: 120,
                height: 60
            },
            // Node B
            {
                id: "B",
                type: "node",
                x: this.nodeB.x,
                y: this.nodeB.y,
                width: 120,
                height: 60
            },
            // Edge
            {
                id: "edgeAB",
                type: "edge",
                x1: this.nodeA.x + 120,
                y1: this.nodeA.y + 30,
                x2: this.nodeB.x,
                y2: this.nodeB.y + 30
            },
        ];
    }
}