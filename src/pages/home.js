import React, { Component } from 'react';
import moment from 'moment';
import '../assets/css/home.css';
import http from '../utils/http';
import { DatePicker,Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;

class Home extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.option = {
            xAxis: {
                type: 'category',
                nameLocation:"start",
                boundaryGap:false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line'
            }]
        }
        this.state={
            loading:true
        }
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
                    <div className="mask">
                        <Spin spinning={this.state.loading} delay={500} wrapperClassName="graph"></Spin>
                        <div id="main" ref="main"></div>
                    </div>
                </div>
            </div>
        </div>
    }
    componentDidMount() {
        let myChart = echarts.init(this.refs.main);
        this.myChart = myChart;
        this.setDate([moment().subtract(7, 'days').format("YYYY/MM/DD"),moment().format("YYYY/MM/DD")]);
        window.onresize = function () {
            myChart.resize();
        }
    }
    onChange(date,dateString){
        this.setDate(dateString);
    }
    setDate(date){
        let d = moment.duration(moment(date[1])-moment(date[0])).asDays();
        let arr = [];
        for (let i = 0; i <= d; i++) {
            arr.unshift(moment(date[1]).subtract(i, 'days').format("YYYY/MM/DD"));
        }
        this.setState({
            loading:true
        })
        let option = this.option;
        http.post('/dsp-report/index',{count:d+1}).then(res=>{
            option.xAxis.data = arr;
            option.series[0].data = res.data.dataY1;
            this.myChart.setOption(option);
            this.setState({
                loading:false
            })
        })
    }
}

export default Home