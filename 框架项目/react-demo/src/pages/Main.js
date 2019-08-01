import React, {Component} from 'react';
import connect from '../store/connect';

import {Carousel, Row, Col} from 'antd';
import img from '../assets/img-1.png'
import img2 from '../assets/img-2.png'
import img3 from '../assets/img-3.png'
import lun1 from '../assets/lun-1.jpg'
import lun2 from '../assets/lun-2.jpg'
import lun3 from '../assets/lun-3.jpg'
import pro11 from '../assets/pro-11.jpg'
import pro12 from '../assets/pro-12.png'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = () => {}
    componentWillMount() {}

    render() {
        return (
            <div>
                <Carousel afterChange={this.onChange} autoplay style={styles.outer}>
                    <div><img style={styles.lunImg} src={lun1} alt=''/></div>
                    <div><img style={styles.lunImg} src={lun2} alt=''/></div>
                    <div><img style={styles.lunImg} src={lun3} alt=''/></div>
                </Carousel>
                <div style={{width: '80%', margin: '0 auto'}}>
                    <Row type="flex" justify="center">
                        <Col xs={24} md={8}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="ih-item square effect13 right_to_left"><a href="#" style={styles.href}>
                                        <div className="img" style={styles.height}><img src={img} alt=""/></div>
                                        <div className="info">
                                            <h3>速达S3+.Cloud 商业版</h3>
                                            <p>价格：6860元/套/(5用户=1User+2SaaS+2app)</p>
                                        </div>
                                    </a></div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="ih-item square effect13 right_to_left"><a href="#" style={styles.href}>
                                        <div className="img" style={styles.height}><img src={img2} alt=""/></div>
                                        <div className="info">
                                            <h3>速达3000-BAS</h3>
                                            <p>价格：1980元/套/(2用户=1User+1全局应用)</p>
                                        </div>
                                    </a></div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="ih-item square effect13 right_to_left"><a href="#" style={styles.href}>
                                        <div className="img" style={styles.height}><img src={img3} alt=""/></div>
                                        <div className="info">
                                            <h3>速达V3.net-PRO-商业版</h3>
                                            <p>价格：3980元/套/(3用户=1User+2全局应用)</p>
                                        </div>
                                    </a></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div style={{textAlign: 'center'}}>
                        <h2 style={{margin: '.2rem auto'}}>速达3000-BAS</h2>
                        <p style={{margin: '.2rem auto'}}>《速达3000BAS》集进销存、POS、财务为一体的中小企业管理软件系统。系统采用导航式界面，易学易用、功能强大，是帮助中小企业规范经营管理、财务管理的有效工具。 系统支持局域网/互联网多用户应用，实现异地多机构、多店面、多仓库等远程应用，支持Androld移 动终端应用，数据实时同步，安全、稳定、高效、易维护，特别适合中小企业使用。</p>
                        <img src={pro11} alt='' style={styles.pro}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <h2 style={{margin: '.2rem auto'}}>速达V5.net-PRO-商业版</h2>
                        <p style={{margin: '.2rem auto'}}>《速达V5.net-PRO 商业版》作为速达V系列管理软件，创造性的将B/S & C/S &  Android结构融为一体。软件将企业进销存管理、POS管理、财务管理、客户关系管理集成于一体并科学的结合“云”技术，高度满足桌面应用、浏览器方式应用、安卓应用需求。真正满足企业管理的个性化需求，全面提升企业管理的能力</p>
                        <img src={pro12} alt='' style={styles.pro}/>
                    </div>
                </div>
            </div>

        );
    }
};

const styles = {
    outer: {
        textAlign: 'center',
        overflow: 'hidden'
    },
    height: {
        height: '100%',
        width: '100%'
    },
    href: {
        display: 'inline-block',
        width: '100%',
        height: '100%'
    },
    lunImg: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%'
    },
    pro: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%'
    }
}
export default connect(Main);