import React,{Component} from 'react'
import './login.css'

class Login extends Component{
    constructor(){
        super()
        this.state={
            user:{
                username:"",
                password:"",
                verifycode:""
            }
        }
        this.changeHandler=this.changeHandler.bind(this)
    }
    render(){
        let {user} = this.state
        return (
            <div className="login">
                <div className="login-name">
                    <h1>作业帮.只能营销平台</h1>
                </div>
                <div className="login-main">
                    <div className="login-box">
                        <h3>账户登录</h3>
                        <ul>
                            <li><input type="text" placeholder="用户名" value={user.username} onChange={this.changeHandler}/></li>
                            <li><input type="text" placeholder="密码" value={user.password} onChange={this.changeHandler}/></li>
                            <li>
                                <input type="text" placeholder="验证码" value={user.verifycode} onChange={this.changeHandler}/>
                                <img src="https://e.zuoyebang.com/dsp-admin/captcha.jpg" alt=""/>
                            </li>
                        </ul>
                        <button>登录</button>
                        <a href="#">忘记密码</a>
                        <p>©2018 小船出海教育科技（北京）有限公司 作业帮</p>
                    </div>
                </div>
            </div>
        )
    }
    changeHandler(e){
        this.setState({
            user:{
                username:e.target.value
            }
        })
    }
}

export default Login