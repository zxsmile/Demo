import React, {Component} from 'react';
import connect from '../store/connect';

import {Tabs} from 'antd';
import img from '../assets/pro-12.png'

const TabPane = Tabs.TabPane;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                <img src={img} style={styles.img} alt=''/>
                <div style={{width: '80%', margin: '0 auto'}}>
                    <div style={{margin: '.2rem auto'}}><h2>企业管理软件</h2></div>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition='left'
                        style={{ height: 420 }}>
                        <TabPane tab="进销存·财务一体化" key="1">Content of tab 1</TabPane>
                        <TabPane tab="ERP管理系统" key="2">Content of tab 2</TabPane>
                        <TabPane tab="财务管理软件" key="3">Content of tab 3</TabPane>
                    </Tabs>
                </div>
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