import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import { Menu, Icon, Button, Dropdown } from 'antd';
import Routers from '@/router/router';
import Img from '../../assets/images/logo.gif';
import { connect } from 'react-redux';
import {delCookie} from '@/utils/utils';
const SubMenu = Menu.SubMenu;
console.log(delCookie)
function Signout(props){
    return (
        <Menu onClick={(e)=>{if(e.key==2){delCookie('token');props.history.replace('/login')}}}>
            <Menu.Item key="1">
                欢迎
            </Menu.Item>
            <Menu.Item key="2">
                退出
            </Menu.Item>
        </Menu>
    )
}

class Index extends Component {
    constructor() {
        super()
        this.state = {
            collapsed: false,
            user: ''
        }
    }
    render() {
        return (
            <div className="app">
                <div className="aside" style={{ width: 240 }}>
                    <img src={Img} alt="" className="logo" />
                    <div className="add">
                        <b>+</b>
                        <span>新建广告</span>
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="1">
                            <Link to="/index/home">
                                <Icon type="pie-chart" />
                                <span>首页概览</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>广告管理</span></span>}>
                            <Menu.Item key="4"><Link to="/index/plan">广告计划</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/index/unit">广告单元</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/index/idea">广告创意</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="8">
                            <Icon type="desktop" />
                            <span>数据中心</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/index/tools">
                                <Icon type="appstore" />
                                <span>工具箱</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="content">
                    <div className="header">
                        <span className="iconfont icon-jin"></span>
                        <span className="iconfont icon-tishi"></span>
                        <span>
                            <Dropdown overlay={<Signout history={this.props.history}/>}>
                                <div>{this.state.user}<br/>&nbsp;&nbsp;账户ID:6875759</div>
                            </Dropdown>
                        </span>
                    </div>
                    <Routers routes={this.props.routes} />
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.setState({ user: localStorage.getItem('username') })
    }
}
function mapStateToProps(state) {
    console.log(state)
    return {
        user: state
    }
}
export default connect(mapStateToProps)(Index)