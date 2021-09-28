import BaseIface from '_entities/Base/interface'
import queries from './queries'
import api from "_app/api";

class ObservationsIface extends BaseIface{
    constructor(queries) {
        super(queries);
    }
    deleteImage = async ({link, oid}) => {
        const response = await api(this.queries.deleteImage, {link, oid})
        console.log("INTERFACE ", response[this.queries.selectors.deleteImage])
        return response[this.queries.selectors.deleteImage]
    }
}

export default new ObservationsIface(queries)