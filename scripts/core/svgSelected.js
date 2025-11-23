class SvgSelected{
    static _instance = null;

    _currentSvgSelected = null;

    set(el){
        this._currentSvgSelected = el;
    }

    remove(el){
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