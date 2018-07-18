const http = require('http');
const querystring = require('querystring')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const Mock = require('mockjs')

//token验证
function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,"1601E",function(err,decoded){
            if(err){
                reject(err)
            }else{
                resolve(decoded)
            }
        })
    })    
}
// const _ = require('lodash')
// const multer = require('multer')
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         console.log(file)
//         let filename = file.originalname.split('.')
//         cb(null, filename[0] + '-' + Date.now()+'.'+filename[1])
//     }
// })
   
// var upload = multer({ storage: storage })



function queryApi(url,methods,params){
    return new Promise((resolve,reject)=>{
        let data = ''
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
    
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if(methods.toLowerCase()=='post'){
            request.write(querystring.stringify(params))
        }
        
        request.end()
    })
    

}
// var ejs = require('ejs'),
//     people = ['geddy', 'neil', 'alex'];

module.exports = function (app) {
    // //login api
    app.post('/dsp-admin/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', { encoding: "utf-8" });
        user = JSON.parse(user);
        let login = req.body;
        
        let resInfo = {
            info: "login failed",
            user:'登录信息有误',
            success: 1
      
      }
        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 0;
                resInfo.info = "login success";
                resInfo.user ={
                    name:usr.username,
                    time:new Date().toLocaleTimeString(),
                    nickName:usr.username
                }
            }
        });

        if (resInfo.success == 0) {
            resInfo.token = jwt.sign(login, "1601E", {
                expiresIn: 60*60
            })
        }

        res.end(JSON.stringify(resInfo))

    })
    //home graph
    app.post('/dsp-report/index',function(req,res){
        console.log(verifyToken(req.headers.authrization))
        let {startTime,endTime,dimLeft,dimRight,count} = req.body;
        let Random = Mock.Random;
        console.log(count)
        let mockData = Mock.mock({
            "status": 0,
            "data": {
                exposeNum: 10000, //曝光量
                clickNum: 1000, // 点击量
                clickRate: 100,  // 点击率
                clickPrice: 10000, // 点击均价
                cpmPrice: 200000, // 千次展示均价
                consumed: 1000, // 时间段消耗(单位分)
                [`dataY1|${count || 5}`]:[()=>Random.natural(1,99999)],
                dataY2:[1100, 1382, 1325, 1600, 1600]
            }
        })
        res.send(mockData)
    })

    let Random = Mock.Random;
    app.post('/dsp-advert/campaigns/list',(req,res)=>{
        let data = Mock.mock({
            "data":{
                ["list|300"]:[{
                    "key":()=>Random.increment(0),
                    "name":"计划",
                    "promotionType": 1, // 推广目的
                    "status":1,//计划状态 (1:投放中；2:下线-达到日预算；3:下线-达到账户预算； 4:暂停；999:删除)
                    "dayBudget": ()=>Random.integer(1000,100000), // 计划日预算(单位分)
                    "exposeNum": ()=>Random.integer(1000,100000),//曝光量
                    "clickNum": ()=>Random.integer(100,10000),//点击量
                    "clickRate": ()=>Random.integer(100,10000),//点击率
                    "clickPrice": ()=>Random.integer(100,10000),//点击均价；  单位是分 消费/点击量
                    "cpmPrice": ()=>Random.integer(100,1000),//千次展示均价；  单位是分 消费/曝光量
                    "consumed": ()=>Random.integer(1000,100000), //总消耗
                    "modifyTime": ()=>Random.date(),
                    "createTime": ()=>Random.date(),
                    "operatorId":1,//操作人Id
                    "operatorName": ()=>Random.cname() //创建人姓名
                }] ,
                "total": ()=>Random.integer(1000,100000)
            },
            "status":0
        })
        res.json(data)
    })
    //删除计划列表
    app.get('/dsp-advert/campaigns/delete/:id',(req,res)=>{
        console.log(req.params)
        setTimeout(()=>{
            res.json({
                status:0
            })
        },1000)
    })

    //upload 上传接口
    // app.post('/dsp-creative/creative/upload',upload.single('file'),function(req,res){
        
    //     res.send({
    //         "data": {
    //                    "size":req.file.size,
    //                    "value":req.file.path,
    //                    "key":"2A36B67C6"
    //             },
    //         "status":0
    //       }
    //     )
    // })
}

