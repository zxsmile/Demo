import React, {Component} from 'react';
import connect from '../store/connect';

import {Tabs} from 'antd';
import img from '../assets/lun-3.jpg'

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
                <div style={{margin: '.2rem auto'}}><h2>培训视频</h2></div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    style={{ height: 420 }}>
                    <TabPane tab="出纳系统操作演示" key="1">Content of tab 1</TabPane>
                    <TabPane tab="往来帐操作演示" key="2">Content of tab 2</TabPane>
                    <TabPane tab="售后管理操作演示" key="3">Content of tab 3</TabPane>
                    <TabPane tab="委托加工管理操作" key="4">Content of tab 4</TabPane>
                    <TabPane tab="生产模块操作演示" key="5">Content of tab 5</TabPane>
                    <TabPane tab="工序管理操作演示" key="6">Content of tab 6</TabPane>
                    <TabPane tab="日常费用资金操作演示" key="57">Content of tab 7</TabPane>
                    <TabPane tab="销售模块操作演示" key="7">Content of tab 7</TabPane>
                    <TabPane tab="仓库模块操作演示" key="8">Content of tab 7</TabPane>
                    <TabPane tab="采购模块操作演示" key="9">Content of tab 7</TabPane>
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