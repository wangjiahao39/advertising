import React, { Component } from 'react'
import './login.css'
import http from '@/utils/http'
import {setCookie} from '@/utils/utils'
import {connect} from 'react-redux'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            verifycode: "",
            info: "",
            high: '',
            code:1531268506783
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this)
    }
    render() {
        return (
            <div className="login">
                <div className="login-name">
                    <h1>作业帮.只能营销平台</h1>
                </div>
                <div className="login-main">
                    <div className="login-title">
                        <i className="iconbg"></i>
                    </div>
                    <div id='login-box'>
                        <div className={this.state.high}>
                            <h3>账户登录</h3>
                            <p className="error-info">{this.state.info}</p>
                            <ul>
                                <li><input type="text" name="username" placeholder="用户名" value={this.state.username} onChange={this.changeHandler} /></li>
                                <li><input type="password" name="password" placeholder="密码" value={this.state.password} onChange={this.changeHandler} /></li>
                                <li>
                                    <input type="text" name="verifycode" placeholder="验证码" value={this.state.verifycode} onChange={this.changeHandler} />
                                    <img onClick={()=>{this.setState({code:++this.state.code})}} src={`https://e.zuoyebang.com/dsp-admin/captcha.jpg?${this.state.code}`} alt="" />
                                </li>
                            </ul>
                            <button onClick={this.login}>登录</button>
                            <a href="#">忘记密码</a>
                            <b>©2018 小船出海教育科技（北京）有限公司 作业帮</b>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    login() {
        if (!this.state.username) {
            this.setState({
                high: 'high',
                info: "请输入用户名"
            })
            return
        }
        if (!this.state.password) {
            this.setState({
                high: 'high',
                info: "请输入密码"
            })
            return
        }
        if (!this.state.verifycode) {
            this.setState({
                high: 'high',
                info: "请输入验证码"
            })
            return
        }
        //验证通过
        this.setState({
            high: '',
            info: ""
        })

        //对接口
        let { username, password, verifycode } = this.state;
        http.post('/dsp-admin/user/login', {
            username,
            password,
            verifycode
        }).then((res) => {
            console.log(this.props)
            if(res.success==0){
                setCookie('token',res.token)
                this.props.dispatch({
                    type:'update_user',
                    payload:res.user.name
                })
            }else{
                alert(res.info)
            }
        })
    }
    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default connect()(Login)