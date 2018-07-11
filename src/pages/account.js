import React, { Component } from 'react'
import '../assets/css/account.css'
import { Table, Button } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
class Account extends Component {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        };
    }
    start(){
        this.setState({ 
            loading: true
        });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false
            });
        }, 1000);
    }

    onSelectChange (selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return <div className="account">
            <div className="account-header">
                <span className="iconfont icon-jin"></span>
                <span className="iconfont icon-tishi"></span>
                <span>
                    wangjiahao
                    账户ID:6875759
                </span>
            </div>
            <div className="account-main">
                <h1>账号管理</h1>
                <button className="addnum">+ 新建账号</button>
            </div>
            <div className="account-input">
                <p><span>账号名称</span><input type="text" placeholder="请输入关键字查询" /></p>
                <button>查询</button>
            </div>
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        </div>
    }
}

export default Account