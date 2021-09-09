import api from '_api/permissions'
import Base from '_store/base'

class Permissions extends Base{
    constructor(api){
        super(api)
    }
    update = async (_id, payload)=>{
        const result = await api.update(_id, payload)
        console.log("RESULT", result)
    }
}

export default new Permissions(api)