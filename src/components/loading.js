import React,{Component} from 'react'
import loadimg from './rings.svg'
import './loading.css'

class Loading extends Component{
    constructor(){
        super()
        this.state={
            cls:'loading'
        }
    }
    render(){
        let {spining} = this.props;
        if(spining){
           return <div className={this.state.cls}>
                <img src={loadimg} alt=""/>
            </div> 
        }else{
            return <div></div>
        }
    }
    componentDidMount(){
        this.setState({
            cls:'loading active'
        })
    }
    componentWillUnmount(){
        this.setState({
            cls:'loading'
        })
    }
}

export default Loading