class SvgSelected{
    static _instance = null;

    _currentSvgSelected = null;

    set(el){

        if(this._currentSvgSelected) this.remove(this._currentSvgSelected);

        this._currentSvgSelected = el;
        
        var item = svgManagement.drawList.find( e => e.id == this._currentSvgSelected.__gameObjectId);
        if(item) item.select = true;
    }

    remove(el){ 
        var item = svgManagement.drawList.find( e => e.id == this._currentSvgSelected.__gameObjectId);
        if(item) item.select = false;
        this._currentSvgSelected = null;
    }

    get(el){
        return this._currentSvgSelected;
    }



     static getInstance() {
        if (!SvgSelected._instance) {
            SvgSelected._instance = new SvgSelected();
        }
        return SvgSelected._instance;
    }
}