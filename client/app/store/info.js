import {makeAutoObservable} from 'mobx'

class Info{
    list = []
    constructor() {
        makeAutoObservable(this)
    }
    addMessage({message, type = 'error'}){
        this.list.push({message, type});
    }
    removeMessage = (index)=>{
        this.list.splice(index, 1);
    }
}

const InfoStore = new Info();

export default InfoStore;