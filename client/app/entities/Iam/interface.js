import queries from './queries'
import api from "_app/api";

class IamIface{
    constructor(queries) {
        this.queries = queries;
    }
    get(){
        return new Promise(async (resolve, reject)=>{
            try {
                const data = await api(this.queries.get)
                resolve(data[this.queries.selectors.get])
            }
            catch(err){
                reject("Interface get error: " + err)
            }
        })
    }
    login(email, password){
        return new Promise(async (resolve, reject)=>{
            try{
                const data = await api(this.queries.login, {email, password})
                resolve(data[queries.selectors.login])
            }
            catch(err){
                reject("Interface login error: " + err)
            }
        })
    }
    // reg = ({name = "Новый", email, password})=>{
    //     this.isLoading = true;
    //     const query = "mutation reg($name: String, $email: String!, $password: String){reg(name: $name, email: $email, password: $password) {accessToken}}";
    //     const variables = {name, email, password}
    //     api(query, variables)
    //         .then(action((data)=>{
    //             if(data.reg.accessToken){
    //                 localStorage.setItem('token', data.reg.accessToken)
    //                 this.whoAmI()
    //             }
    //         }))
    //         .catch((e)=>{})
    //         .finally(action(()=>{this.isLoading = false}))
    // }

}

export default new IamIface(queries)