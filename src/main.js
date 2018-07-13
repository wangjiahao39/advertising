import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './assets/icon/iconfont.css';
import 'antd/dist/antd.css';
import './assets/css/app.css';
import {Provider} from 'react-redux';
import store from '@/store/store'

ReactDOM.render(<Provider store={store}><App/></Provider>,document.querySelector('#app'))