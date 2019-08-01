import React, {Component} from 'react';
import connect from '../store/connect';

import {Tabs} from 'antd';
import img from '../assets/lun-1.jpg'

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
                <div style={{margin: '.2rem auto'}}><h2>行业应用案例</h2></div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    style={{ height: 420 }}>
                    <TabPane tab="电脑" key="1">Content of tab 1</TabPane>
                    <TabPane tab="分销" key="2">Content of tab 2</TabPane>
                    <TabPane tab="管理" key="3">Content of tab 3</TabPane>
                    <TabPane tab="完善" key="4">Content of tab 4</TabPane>
                    <TabPane tab="速达" key="5">Content of tab 5</TabPane>
                    <TabPane tab="软件" key="6">Content of tab 6</TabPane>
                    <TabPane tab="功能" key="7">Content of tab 7</TabPane>
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