import React, {Component} from 'react';
import connect from '../../store/connect';
import imgLogo from '../../assets/logo.png'

import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: 'main'
        };
    }

    handleClick = (e) => {
        let url = e.key
        this.setState({
            path: url
        })
        this.props.history.push(url)
    }

    componentWillMount() {
        let path = this.props.history.location.pathname.split('/')[1]
        this.setState({
            path: path || 'main'
        })
    }

    render() {
        const menus = [{
            name: '首页',
            icon: 'home',
            url: 'main'
        },{
            name: '软件产品',
            icon: 'profile',
            url: 'ser',
            child: [{
                name: '企业管理软件',
                url: 'soft1'
            },{
                name: '办公管理软件',
                url: 'soft2'
            },{
                name: '项目管理软件',
                url: 'soft3'
            }]
        },{
            name: '应用服务',
            icon: 'customer-service',
            url: 'pa',
            child: [{
                name: '基础应用培训',
                url: 'pageBase'
            },{
                name: '培训视频',
                url: 'pageVideo'
            },{
                name: '行业应用案例',
                url: 'pageCase'
            },{
                name: '下载中心',
                url: 'pageDown'
            }]
        },{
            name: '新闻中心',
            icon: 'line-chart',
            url: 'page'
        }]
        return (
            <div style={styles.outer}>
                <div style={styles.logo}>
                    <img src={imgLogo}/>
                </div>
                <div style={styles.menu}>
                    <Menu style={{borderBottom: 0}}
                          onClick={this.handleClick}
                          selectedKeys={[this.state.path]}
                          mode="horizontal">
                        {
                            menus.map((item, i) => {
                                return (
                                    item.child ?
                                        <SubMenu title={<span key={'span'+i}><Icon type={item.icon} key={'icon'+i}/>{item.name}</span>} key={item.url}>
                                            {
                                                item.child.map((it) => {
                                                    return (
                                                        <Menu.Item key={it.url}>{it.name}</Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                        :
                                        <Menu.Item key={item.url} onTitleClick={this.handleClick}>
                                            <Icon type={item.icon}/>{item.name}
                                        </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </div>
            </div>
        );
    }

};

let styles = {
    outer: {
        width: "80%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between"
    },
    logo: {
        width: '2rem',
        height: '1rem',
        lineHeight: '1rem'
    },
    menu: {
        display: "flex",
        alignItems: 'center'
    }
}

export default connect(Main);