import React, { Component } from 'react';
import http from '@/utils/http';
import { Table, Modal ,message} from 'antd';
import {connect} from 'react-redux';
import '@/assets/css/plan.css';

class Plan extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            visible: false,
            delItem: null
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        let that = this;
        let columns = [
            {
                title: "计划ID",
                dataIndex: "key"
            },
            {
                title: "计划名称",
                dataIndex: "name"
            },
            {
                title: "投放目的",
                dataIndex: "promotionType"
            },
            {
                title: "日预算",
                dataIndex: "dayBudget"
            },
            {
                title: "今日消耗",
                dataIndex: "clickPrice"
            },
            {
                title: "总消耗",
                dataIndex: "consumed"
            },
            {
                title: "曝光量",
                dataIndex: "exposeNum"
            },
            {
                title: "点击率",
                dataIndex: "clickRate"
            },
            {
                title: "状态",
                dataIndex: "status"
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => {
                    function del(record) {
                        that.setState({
                            visible: true,
                            delItem: record
                        })
                    }
                    return (
                        <span>
                            <a onClick={() => { del(record) }} href="javascript:;">x</a>
                        </span>
                    )
                }
            }
        ]

        return <div className="plan">
            <div className="plan-top">
                <h3>伊利王兆辉</h3>
                <span>￥126,560.00</span><span>￥560.00</span>
            </div>
            <div className="plan-input">
                <span><b>计划名称</b><input type="text" placeholder="请选择" /></span>
                <span>推广目的<input type="text" placeholder="请选择" /></span>
                <span>状态<input type="text" placeholder="请选择" /></span>
                <button>查询</button>
            </div>
            <div className="plan-main">
                <button>+新建计划</button>
                <Modal
                    title="警告"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>您确定要删除{this.state.delItem && this.state.delItem.name}吗？</p>
                </Modal>
                <Table dataSource={this.state.dataSource} columns={columns}></Table>
            </div>

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
                dataSource: res.data.list
            })
        })
    }
    handleOk() {
        this.setState({
            visible: false,
        });
        http.get(`/dsp-advert/campaigns/delete/${this.state.delItem.key}`).then(res => {
            console.log(res.status)
            if(res.status==0){
                message.success('删除成功')
            }
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Plan)