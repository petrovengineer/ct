import BaseIface from '_entities/Base/interface'
import queries from './queries'

class NAMEIface extends BaseIface{
    constructor(queries) {
        super(queries);
    }
}

export default new NAMEIface(queries)