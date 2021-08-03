class Entry extends Data{
    static countEntry = 0;

    constructor(description, value){
        super(description, value);
        this._id = ++Entry.countEntry;
    }
    get id(){
        return this._id;
    }
}