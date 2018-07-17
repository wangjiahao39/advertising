import React,{Component} from 'react';
import Router from '../router/router';
import {Link} from 'react-router-dom';
import '../assets/css/tools.css'

class Tools extends Component{
    constructor(){
        super()
        this.goAccount = this.goAccount.bind(this)
    }
    render(){
        //console.log(this.props)
        return <div className="tools">
            <div className="tools-content">
                <h1>工具箱</h1>
                <Link to="/account">
                    <dl>
                        <dt>
                            <span className="iconfont icon-qianbao-SVG"></span>
                        </dt>
                        <dd>
                            <h3>账户管理</h3>
                            <p>在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。</p>
                        </dd>
                    </dl>
                </Link>
                <Link to="/customer">
                    <dl>
                        <dt>
                            <span className="iconfont icon-qianbao-SVG"></span>
                        </dt>
                        <dd>
                            <h3>客户管理</h3>
                            <p>在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。</p>
                        </dd>
                    </dl>
                </Link>
            </div>
            {/* <p>
                <Link to="/tools/account">账户管理</Link>
                <Link to="/tools/customer">客户管理</Link>
                <button onClick={this.goAccount}>账户管理</button>
            </p>
            <Router routes={this.props.routes}/> */}
        </div>
    }
    goAccount(){
        this.props.history.push('/tools/account')
    }
}

export default Tools