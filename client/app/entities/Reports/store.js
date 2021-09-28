import BaseStore from '_entities/Base/store'
import iface from './interface'

class ReportsStore extends BaseStore{
    constructor(iface) {
        super(iface);
        this.updateFilter(()=>({startDate: new Date()}))
    }
}

export default new ReportsStore(iface)