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

  const url = process.env.API;

export default (query, variables)=>{
    return new Promise((done, fail)=>{
        console.log("QUERY ", query, "VARIABLES ", variables)
        axios.post(url ,{"query":query, "variables":variables})
        .then((response)=>{
            if(Array.isArray(response.data.errors) && response.data.errors.length>0){
                return fail(response.data.errors[0].message);
            }
            console.log("AXIOS", response)
            done(response.data.data);
        })
        .catch((e)=>{
            if(e.response && e.response.data && Array.isArray(e.response.data.errors)){
                console.log("GQL ERRORS ",e.response.data.errors.map(e=>e.message).join(' '));
                fail(`GQL Error: ${e.response.data.errors.map(e=>e.message).join(' ')}`);
                return;
            }
            console.log("SERVER ERROR ",e.message);
            fail(e.message);
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