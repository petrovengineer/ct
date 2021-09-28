import BaseStore from '_entities/Base/store'
import iface from './interface'
import {daysBefore} from "_app/time";

class KeysStore extends BaseStore{
    constructor(iface) {
        super(iface);
        this.updateFilter(()=>({limit: 99999999}))

    }
}

export default new KeysStore(iface)