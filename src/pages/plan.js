import React, { Component } from 'react';
import http from '../utils/http';
import {Table} from 'antd';

class Plan extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[]
        }
    }
    render() {
        /*
            "id":()=>Random.increment(),
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
        */
        let columns = [
            {
                dataIndex:"name",
                key:"姓名"
            },
            {
                dataIndex:"name",
                key:"姓名"
            }
        ]
        return <div>
            <h1>this is Plan</h1>
            <Table dataSource={this.state.dataSource} columns={}></Table>
        </div>
    }
    componentDidMount() {
        http.post('/dsp-advert/campaigns/list', {
            "queryType": 1,
            "queryContent": "AD-JXS-201612-00104",
            "pageNum": 1,
            "pageSize": 50,//如果为空 默认是50,大于100 按照100处理
            "statusList": [1, 2, 3],  //计划状态
            "startTime": 12345678,//计划列表中统计数据的起始时间
            "endTime": 12345679876543,//默认T-7
        }).then(res => {
            console.log(res)
            this.setState({
                dataSource:res.data.list
            })
        })
    }
}

export default Plan