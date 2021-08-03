class Data{
    constructor(description, value){
        this._description = description;
        this._value = value;
    }

    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }
    get value(){
        return this._value;
    }
    set value(value){
        this._value = value;
    }
    
}