import BaseStore from '_entities/Base/store'
import iface from './interface'

class NAMEStore extends BaseStore{
    constructor(iface) {
        super(iface);
    }
}

export default new NAMEStore(iface)