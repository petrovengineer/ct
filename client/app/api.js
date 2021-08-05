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
    const url = process.env.API;
    return new Promise((done, fail)=>{
        axios.post(url ,{"query":query, "variables":variables})
        .then((response)=>{
            if(Array.isArray(response.data.errors) && response.data.errors.length>0){
                return fail(response.data.errors[0].message);
            }
            done(response.data.data);
        })
        .catch((e)=>{
            console.log("ERROR: ", e)
            if(e.response && e.response.data && Array.isArray(e.response.data.errors)){
                console.log("ERROR ",e.response.data.errors[0].message);
            }
            fail('Server Error!');
        })
    })
}

function upload(file, oid){
    return new Promise((done, fail)=>{
            var formData = new FormData();
            formData.append("file", file);
            formData.append("oid", oid);
            console.log("FORM DATA ",oid)
            axios.post(`${url}/upload`, formData, 
                {headers: {'Content-Type': 'multipart/form-data'}
            }).then((res)=>{
                done(res);
            }).catch((e)=>{fail(); console.log("ERROR ", e);})
        })}

export {upload}