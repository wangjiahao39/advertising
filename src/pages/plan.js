import React,{Component} from 'react'
import http from '../utils/http'

class Plan extends Component{
    render(){
        console.log('routes',this.props.routes)
        return <h1>this is Plan</h1>
    }
    componentDidMount(){
        http.get('/dsp-report/index').then(res=>{
            console.log(res)
        })
    }
}

export default Plan