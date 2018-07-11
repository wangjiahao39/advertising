import React, { Component } from 'react';
//let echarts = require('echarts/lib/echarts');
import moment from 'moment';
import '../assets/css/home.css';
import http from '../utils/http'

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

class Home extends Component {
    constructor(){
        super()
        this.onChange = this.onChange.bind(this);
    }
    render() {
        return <div className="home">
            <div className="home-header">
                <span className="iconfont icon-jin"></span>
                <span className="iconfont icon-tishi"></span>
                <span>
                    wangjiahao
                    账户ID:6875759
                </span>
            </div>
            <div className="home-main">
                <div className="home-list">
                    <dl>
                        <dt>
                            <span className="iconfont icon-qianbao-SVG"></span>
                        </dt>
                        <dd>
                            <p>现金账户</p>
                            <h2>￥126,560.00</h2>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span className="iconfont icon-qianbao-SVG"></span>
                        </dt>
                        <dd>
                            <p>今日消耗</p>
                            <h2>￥5,400</h2>
                        </dd>
                    </dl>
                </div>
                <div className="home-section">
                    <div className="home-up">
                        <b>整体情况</b>
                        <p>
                            <span>近7天</span>
                            <span>近30天</span>
                        </p>
                        <div>
                            <RangePicker onChange={this.onChange} format={'YYYY/MM/DD'} />
                        </div>
                    </div>
                    <div id="main" ref="main"></div>
                </div>
            </div>
        </div>
    }
    componentDidMount() {
        let myChart = echarts.init(this.refs.main);
        let date = new Date();
        // console.log(moment().month(date.getMonth()).format("YYYY-MM-DD"))
        // console.log(moment().add(1, 'days').format("YYYY/MM/DD"))
        let arr = []
        for (let i = 1; i <= 7; i++) {
            arr.unshift(moment().subtract(i, 'days').format("YYYY/MM/DD"))
        }
        let option = {
            xAxis: {
                type: 'category',
                data: arr
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [600, 930, 800, 1200, 1290, 1400, 1300],
                type: 'line'
            }]
        };
        myChart.setOption(option)
        window.onresize = function () {
            myChart.resize()
        }

        http.post('/dsp-report/index',{count:10}).then(res=>{
            console.log(res)
            option.series[0].data = res.data.dataY1;
            setTimeout(()=>{
                myChart.setOption(option)
            },2000)
        })
    }
    onChange(date,dateString){
        console.log(dateString);
        this.setDate(dateString[0],dateString[1])
    }
    setDate(start,end){
        let startDate = new Date(start);
        let endDate = new Date(end);
        let m1 = moment(start);
        let m2 = moment(end);
        console.log(moment(moment(endDate)-moment(startDate)).format("D"));
        let arr = [];
        for (let i = 1; i <= 7; i++) {
            arr.unshift(moment().subtract(i, 'days').format("YYYY/MM/DD"));
        }
    }
}

export default Home