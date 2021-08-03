class Exit extends Data{
    static countExit = 0;

    constructor(description, value){
        super(description, value);
        this._id = ++Exit.countExit;
    }
    get id(){
        return this._id;
    }
}