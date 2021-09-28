import BaseIface from '_entities/Base/interface'
import queries from './queries'

class ReportsIface extends BaseIface{
    constructor(queries) {
        super(queries);
    }
}

export default new ReportsIface(queries)