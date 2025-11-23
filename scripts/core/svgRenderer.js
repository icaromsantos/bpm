class SvgRenderer {
    constructor(svgElement) {
        this.svg = svgElement;

        this.nodesLayer = svgElement.querySelector("#nodes");
        this.edgesLayer = svgElement.querySelector("#edges");
        this.tokensLayer = svgElement.querySelector("#tokens");

        this.elements = {}; // cache

        this.svg.addEventListener("mousedown", (event) => {
            const target = event.target;

            var svgSelected = SvgSelected.getInstance();
            if (target.__gameObjectId) {
                console.log("You clicked:", target.__gameObjectId);
                svgSelected.set(target);
            }else{
                console.log("You clicked: out");
                svgSelected.remove(target);
            }
        });
    }

    draw(drawList) {
        for (const item of drawList) {
            if (!this.elements[item.id]) {
                this.elements[item.id] = this.createElement(item);
            }
            this.updateElement(this.elements[item.id], item);
        }
    }

    createElement(item) {
        let el;
        if (item.type === "node") {
            el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.nodesLayer.appendChild(el);
        } 
        else if (item.type === "edge") {
            el = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.edgesLayer.appendChild(el);
        }
        else if (item.type === "token") {
            el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this.tokensLayer.appendChild(el);
        }
        else if (item.type === "text") {
            el = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.nodesLayer.appendChild(el);
        }

        return el;
    }

    updateElement(el, item) {
        
        var svgSelected =  SvgSelected.getInstance().get();

        if(svgSelected){

            if(svgSelected.__gameObjectId  == item.id){

                var inputSystem =  InputSystem.getInstance();

                item.x = inputSystem.mouse.x;
                item.y = inputSystem.mouse.y;

            }
        }

        if (item.type === "node") {
            el.setAttribute("x", item.x);
            el.setAttribute("y", item.y);
            el.setAttribute("width", item.width);
            el.setAttribute("height", item.height);
            el.setAttribute("rx", 8);
            el.setAttribute("ry", 8);
            el.setAttribute("fill", item.color || "#fff");
            el.setAttribute("stroke", "#333");
        }

        if (item.type === "edge") {
            el.setAttribute("x1", item.x1);
            el.setAttribute("y1", item.y1);
            el.setAttribute("x2", item.x2);
            el.setAttribute("y2", item.y2);
            el.setAttribute("stroke", "#555");
        }

        if (item.type === "token") {
            el.setAttribute("cx", item.x);
            el.setAttribute("cy", item.y);
            el.setAttribute("r", item.radius || 6);
            el.setAttribute("fill", item.color || "red");
        }

        if (item.type === "text") {
            el.textContent = item.text;
            el.setAttribute("x", item.x);
            el.setAttribute("y", item.y);
            el.setAttribute("font-size", 14);
            el.setAttribute("fill", "#000");
        }

        el.__gameObjectId = item.id;
    }
}
