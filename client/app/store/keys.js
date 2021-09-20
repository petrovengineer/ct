import api from '_interfaces/keys'
import Base from '_store/base'

class Keys extends Base{
    constructor(api){
        super(api)
    }
}

export default new Keys(api)