import BaseStore from '_entities/Base/store'
import iface from './interface'

class AccessesStore extends BaseStore{
    constructor(iface) {
        super(iface);
    }
}

export default new AccessesStore(iface)