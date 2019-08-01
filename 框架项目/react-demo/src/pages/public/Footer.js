import React, {Component} from 'react';
import connect from '../../store/connect';

import {Menu, Icon} from 'antd';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentWillMount() {

    }

    render() {
        return (
            <div style={styles.outer}>
                Copyright © 2011-2017 速达软件技术（广州）有限公司 版权所有 | 粤ICP备05083597号-13
            </div>
        );
    }

};

let styles = {
    outer: {
        backgroundColor: '#024e29',
        color: 'white',
        width: "100%",
        display: "flex",
        height: "1rem",
        lineHeight: '1rem',
        justifyContent: "center"
    }
}

export default connect(Main);