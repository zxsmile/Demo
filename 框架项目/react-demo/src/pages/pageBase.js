import React, {Component} from 'react';
import connect from '../store/connect';

import {Tabs} from 'antd';
import img from '../assets/lun-2.jpg'

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
                <div style={{margin: '.2rem auto'}}><h2>基础应用培训</h2></div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    style={{ height: 'auto', minHeight: 420 }}>
                    <TabPane tab="进销存系统应用说明" key="1">
                        <h2>1.采购系统</h2>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>采购系统是企业生产经营过程不可缺少的环节，主要核算企业采购货品的业务过程，您首先可以根据企业的经营规划制定相应的采购计划，然后与供应商签订采购协议，在收到货品时根据订单来编制收货单，并将货品办理入库手续，如果收到货品时未收到发货方的发票等单据，则可以在月末结账前将货品办理暂估入库，待下月收到发票账单时再将原暂估入库数冲回重新办理入库手续。采购货款则可以通过应收应付系统进行处理。 </p>
                        <h3>1.1采购计划</h3>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>采购计划是企业结合当前生产、市场销售及库存情况，对分支机构、部门、业务员制定的某个计划区间（可以是年度、季度、月份或任意期间）某批产品的购买计划。 </p>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>系统提供了三种计划类型：分支机构、部门、业务员，因而企业可以根据分支机构、单个部门或业务员来编制采购计划，并制定相应计划区间，完全满足不同企业的个性化需求。 </p>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>系统提供了三种计划类型：分支机构、部门、业务员，因而企业可以根据分支机构、单个部门或业务员来编制采购计划，并制定相应计划区间，完全满足不同企业的个性化需求。 </p>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>单击「业务」→「采购业务」→「采购计划」，或者单击"采购系统"导航图中的【采购计划】图标进入相应操作界面。 </p>
                        <h3>1.2采购订单</h3>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>采购订单是企业进行采购业务时，预先向供应商发出的用来列明采购货品名称、规格、数量、价格、交货日期、地点等信息的业务单据，表明企业与供应商间的购销契约关系，因而也可以视同企业的订货合同书。企业应根据生产、销售、资金、库存等情况，合理制定采购数量、安排交货日期。 </p>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>单击「业务」→「采购业务」→「采购订单」，或者单击"采购系统"导航图中的【采购订单】图标进入相应操作界面。 </p>
                        <h3>1.3采购开单</h3>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>采购开单是企业确认采购收货的依据，用户可实现现款采购、赊购及采购退货业务（[采购收货单]的红字即为采购退货），在实际处理时您可以将其视同采购发票，该单据将跟踪整个采购业务过程，比如采购结算情况、采购退货情况、采购入仓情况及应付账款重组情况等。 </p>
                        <p style={{textIndent: '.2rem', margin: '.1rem'}}>单击「业务」→「采购业务」→「采购开单」，或者单击"采购系统"导航图中的【采购开单】图标进入相应操作界面。 </p>
                    </TabPane>
                    <TabPane tab="生产系统管理介绍" key="2">Content of tab 2</TabPane>
                    <TabPane tab="售后服务讲解" key="3">Content of tab 3</TabPane>
                    <TabPane tab="资金系统模块解说" key="4">Content of tab 4</TabPane>
                    <TabPane tab="帐务系统应用说明" key="5">Content of tab 5</TabPane>
                    <TabPane tab="出纳系统日常运用" key="6">Content of tab 6</TabPane>
                    <TabPane tab="固定资产使用导航" key="7">Content of tab 7</TabPane>
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