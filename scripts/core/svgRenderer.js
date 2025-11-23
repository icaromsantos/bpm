class SvgRenderer {
    constructor(svgElement) {
        this.svg = svgElement;

        this.selectLayer = svgElement.querySelector("#select");
        this.nodesLayer = svgElement.querySelector("#nodes");
        this.edgesLayer = svgElement.querySelector("#edges");
        this.tokensLayer = svgElement.querySelector("#tokens");

        this.elements = {}; 

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

    draw() {
        
        this.clearElements();
        for (const item of svgManagement.drawList) {
            this.updateElement(this.createElement(item), item);
        }
    }

    clearElements() {
        this.selectLayer.childNodes.forEach(e => e.remove());
        this.nodesLayer.childNodes.forEach(e => e.remove());
        this.edgesLayer.childNodes.forEach(e => e.remove());
        this.tokensLayer.childNodes.forEach(e => e.remove());
    }

    createElement(item) {
        let el;
        if (item.type === "select") {
            el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.selectLayer.appendChild(el);
        } 
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
        var itemSelected = false;
        var svgSelected =  SvgSelected.getInstance().get();

        if(svgSelected && svgSelected.__gameObjectId  == item.id) itemSelected = true;
            
            
        if(itemSelected){
            var inputSystem =  InputSystem.getInstance();
            item.x = inputSystem.mouse.x;
            item.y = inputSystem.mouse.y;
        }

       

        if (item.type === "node") {
            el.setAttribute("x", item.x);
            el.setAttribute("y", item.y);
            el.setAttribute("width", item.width);
            el.setAttribute("height", item.height);
            el.setAttribute("rx", 8);
            el.setAttribute("ry", 8);
            el.setAttribute("fill", item.color || "#fff");
            el.setAttribute("stroke", "#000000ff");
        }

        if (item.type === "edge") {
            el.setAttribute("x1", item.x1);
            el.setAttribute("y1", item.y1);
            el.setAttribute("x2", item.x2);
            el.setAttribute("y2", item.y2);
            el.setAttribute("stroke", "#000000ff");
        }
        if (item.type === "text") {
            el.textContent = item.text;
            el.setAttribute("x", item.x);
            el.setAttribute("y", item.y);
            el.setAttribute("font-size", 14);
            el.setAttribute("fill", "#000");
        }

        if (item.select) {
            var selectItem = this.createElement({type:"select"})
            selectItem.setAttribute("x", item.x-20);
            selectItem.setAttribute("y", item.y-20);
            selectItem.setAttribute("width", item.width+40);
            selectItem.setAttribute("height", item.height+40);
            selectItem.setAttribute("rx", 8);
            selectItem.setAttribute("ry", 8);
            selectItem.setAttribute("fill", "transparent");
            selectItem.setAttribute("stroke", "#1f9affff");
            selectItem.__gameObjectId = item.id+"Selected";
        }

        el.__gameObjectId = item.id;
    }
}
