import React, {Component} from 'react';
import connect from '../store/connect';

import {Tabs} from 'antd';
import img from '../assets/new-1.jpeg'

const TabPane = Tabs.TabPane;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div style={{width: '80%', margin: '0 auto'}}>
                <img src={img} style={styles.img} alt=''/>
                <div style={{margin: '.2rem auto'}}><h2>新闻中心</h2></div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    style={{ height: 420 }}>
                    <TabPane tab="新浪新闻" key="1">Content of tab 1</TabPane>
                    <TabPane tab="网易新闻" key="2">Content of tab 2</TabPane>
                    <TabPane tab="腾讯新闻" key="3">Content of tab 3</TabPane>
                    <TabPane tab="搜狐新闻" key="4">Content of tab 4</TabPane>
                    <TabPane tab="凤凰资讯" key="5">Content of tab 5</TabPane>
                    <TabPane tab="其他网媒" key="6">Content of tab 6</TabPane>
                    <TabPane tab="168" key="7">Content of tab 7</TabPane>
                </Tabs>
            </div>
        );
    }
};

const styles = {
    img: {
        width: '100%'
    }
}
export default connect(Page);