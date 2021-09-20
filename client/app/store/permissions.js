import api from '_interfaces/permissions'
import Base from '_store/base'

class Permissions extends Base{
    constructor(api){
        super(api)
    }
    update = async (_id, payload)=>{
        const result = await api.update(_id, payload)
    }
}

export default new Permissions(api)