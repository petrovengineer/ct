import axios from 'axios'

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = 'Bearer '+ token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default (query, variables)=>{
    return new Promise((done, fail)=>{
        axios.post('http://localhost:3000',{"query":query, "variables":variables})
        .then((response)=>{
            done(response.data.data)
            console.log("RESP", response)
        })
        .catch((e)=>{
            console.log("ERR", e)

            if(e.response && e.response.data && Array.isArray(e.response.data.errors)){
                console.log("ERROR ",e.response.data.errors[0].message);
            }
            fail('Server Error!');
        })
    })
}