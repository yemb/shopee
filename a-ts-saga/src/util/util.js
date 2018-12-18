import axios from 'axios'

const fetch = (config) => {
    const token = sessionStorage.getItem('token')
    const headers ={
        'Content-Type': 'application/json',        
    }
    if(config.url !== '/auth/token') {
        if(!token) {
            alert('请先登录！！') // 后面用函数式 toast 代替
            window.open ('/login','_top');
        }
        Object.assign(headers,{
            'X-BLACKCAT-TOKEN': token
        })
    }
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: '/api',
            headers 
        })
        instance(config).then(res =>{
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}



export default fetch