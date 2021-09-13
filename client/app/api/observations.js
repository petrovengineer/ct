const { default: axios } = require("axios");
const { default: BaseApi } = require("_api/base");
import queries from '_queries/observations'
import api from '_app/api'

class Observations extends BaseApi{
    constructor(queries){
        super(queries)
    }
    extractData = (response)=>{
        const {observations:{observations, count}} = response;
        return {data: observations, count}
    }
    extractCreate = (response) => {
        const {createObservation} = response;
        return createObservation
    }
    extractImageUpdated = (response) => {
        const {deletePhoto} = response;
        return deletePhoto;
    }
    deleteImage = async ({link, oid}) => {
        const response = await api(queries.deleteImage, {link, oid})
        return response
    }
}

export default new Observations(queries)