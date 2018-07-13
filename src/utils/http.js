import { resolve } from "url";
/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
var getCookie = function (name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
};

/**
 * 设置cookie
 * @param name cookie的名称
 * @param value cookie的值
 * @param day cookie的过期时间
 */
var setCookie = function (name, value, day) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(new Date() + expires);
        document.cookie = name + "=" + decodeURI(value) + ";expires=" + date.toUTCString();
    } else {
        document.cookie = name + "=" + decodeURI(value);
    }
};
let querystring={
    stringify(obj){
        let str = ''
        for(let i in obj){
            str += i+'='+obj[i]+'&'
        }
        return str.slice(0,-1)
    },
    parse(str){
        let arr = str.split('&');
        let o = {};
        for(let i=0;i<arr.length;i++){
            let t = arr[i].split('=')
            o[t[0]] = t[1]
        }
        return o
    }
}
console.log(process.env)
let domin = 'http://localhost:9000'

export default {
    get(url,params){
        let s = querystring.stringify(params);
        if(url.indexOf('?')>-1){
            url=url+'&'+s
        }else{
            url=url+'?'+s
        }
        return new Promise((resolve,reject)=>{
            fetch(domin+url,{
                headers:{
                    "Content-Type":"application/json",
                    "Token":getCookie('token')
                }
            })
        })
        .then(body=>body.json())
        .then(res=>{
            resolve(res)
        })
    },
    post(url,params){
        return new Promise((resolve,reject)=>{
            fetch(domin+url,{
                method:'post',
                headers:{
                    "Content-Type":"application/json",
                    "Authrization":getCookie('token')//封装
                },
                body:JSON.stringify(params)
            })
            .then(body=>body.json())
            .then(res=>{
                resolve(res)
            })
        })
    }
}