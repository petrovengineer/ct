import api from '_api/access'
import Base from '_store/base'

class Access extends Base{
    constructor(api){
        super(api)
        this.filter.endDate = new Date()
        this.filter.startDate = new Date(this.filter.endDate.getTime()-5*24*60*60*1000)
        this.filter.startDate.setHours(0)
        this.filter.startDate.setMinutes(0)
    }

}

export default new Access(api)