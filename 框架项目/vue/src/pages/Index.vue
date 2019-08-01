<template>
    <div id="index">
        <header class="flex-space-between">
            <div class="header-img">
                <img src="../assets/co-logo.png">
                <Icon v-if="winWidth < 600" type="android-menu" @click="doCheck"
                      style="float: right;margin: .4rem .4rem 0 0;font-size: 25px"></Icon>
            </div>
            <nav class="wrap index-inline" id="fadeList" v-show="winWidth > 600">
                <ul class="header-bar" :class="{'it-active': itActive === i}" v-for="(it, i) in list" :key="i"
                    @click="doActive(i, it)" @mouseover="doMouseOver" @mouseout="doMouseOut" >
                    <li>
                        <span><Icon type="android-add" v-if="it.children"></Icon>&nbsp;{{it.name}}</span>
                    </li>
                    <div v-if="itActive === i && it.children && it.children.length && winWidth > 600" class="inner-ul nav-item-sub sl-shadow"
                         :class="{'inner-ul-show': innerUlShow === 'show','inner-ul-none': innerUlShow === 'none'}">
                        <table class="nav-item-table">
                            <thead style="line-height: .5rem">
                            <tr>
                                <th>金蝶产品系列</th>
                                <th>金功自主产品</th>
                                <th class="last">战略合作产品</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><a href="#/product1" target="_blank">金蝶EAS</a></td>
                                <td><a target="_blank">金功云商数字营销云平台</a></td>
                                <td class="last"><a target="_blank">腾讯云全产品</a></td>
                            </tr>
                            <tr>
                                <td><a target="_blank">金蝶K/3CLOUD</a></td>
                                <td><a target="_blank">金功健康产业电商O2O</a></td>
                                <td class="last"><a target="_blank">K/3运营魔方</a></td>
                            </tr>
                            <tr>
                                <td><a target="_blank">金蝶K/3WISE </a></td>
                                <td class="last"></td>
                            </tr>
                            <tr>
                                <td><a target="_blank">金蝶KIS旗舰版</a></td>
                                <td class="last"></td>
                            </tr>
                            <tr>
                                <td><a target="_blank">金蝶KIS专业版</a></td>
                                <td class="last"></td>
                            </tr>
                            <tr>
                                <td><a target="_blank">金蝶KIS标准版</a></td>
                                <td class="last"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </ul>
            </nav>
        </header>
        <div class="main">
            <div class="content">
                <section class="content-section">
                    <router-view></router-view>
                </section>
            </div>
        </div>
        <div class="layout footer">
            <div class="container">
                <div class="foot-about"> <strong>我们是谁</strong> <img src="../assets/icon_main1.png"> <br>
                    <br>
                    <p>西安誉宏电子科技有限公司是一家致力于中小企业信息化建设的高科技公司，专业为中小企业提供各种管理解决方案的咨询、企业管理软件、软件开发、实施及各类服务。<br>
                        <br>
                    </p>
                    <br>
                </div>
                <div class="foot-case"> <strong>合作案例</strong>
                    <ul class="foot-img">
                        <li class="opacity"><a ><img src="../assets/cooper-1.jpg" width="125" height="98"></a></li>
                        <li class="opacity"><a><img src="../assets/cooper-2.jpg" width="125" height="98"></a></li>
                        <li class="opacity"><a><img src="../assets/cooper-3.jpg" width="125" height="98"></a></li>
                        <li class="opacity"><a><img src="../assets/cooper-4.jpg" width="125" height="98"></a></li>
                    </ul>
                    <br>
                </div>
                <div class="foot-contact"> <strong>联系我们</strong>
                    <h4>西安誉宏电子科技有限公司</h4>
                    <br>
                    <br>
                    <p><span><Icon type="location"></Icon></span> 西安市建工路6号一单元B幢2201室</p>
                    <p><span><Icon type="ios-telephone"></Icon></span> 400-029-8921</p>
                    <p><span><Icon type="email"></Icon></span> yuhong_feng@xakingdee.com</p>
                    <br>
                </div>
                <div class="foot-follow"> <strong>关注我们</strong>
                    <p> <img src="../assets/WechatIMG2.jpeg" width="119" height="119"> </p>
                    <p> 微信扫一扫<br>
                        更多关注“誉宏科技” </p>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            itActive: 0,
            list: [{
                name: '首页',
                url: '/main'
            },{
                name: '产品',
                url: '/product',
                children: [{}]
            },{
                name: '案例',
                url: 'case'
            },{
                name: '关于',
                url: 'about'
            }],

            winWidth: 0,
            innerUlShow: 'none'
        }
    },
    created() {
        const that = this
        that.winWidth = $(window).width()
        window.onresize = () => {//当浏览器大小变化时
             return (() => {
                 that.winWidth = $(window).width()
             })()
        }
        let url = this.$route.path
        switch (url) {
            case '/product':
                this.itActive = 1
                break;
            case '/product1':
                this.itActive = 1
                break;
            case '/main':
                this.itActive = 0
                break;
            default:
                this.itActive = 0
                break;
        }
        console.log(url)
    },
    methods: {
        doActive(i, item) {
            this.itActive = i
            this.$router.push(item.url)
        },
        doCheck() {
            $('#fadeList').fadeToggle()
        },
        doMouseOver() {
            console.log(555)
            this.innerUlShow = 'show'
        },
        doMouseOut() {
            this.innerUlShow = 'none'
        }
    },
    watch: {

    }
}
</script>
<style lang="less" scoped>
    .index-inline {
        display: flex;
        flex-wrap: wrap;
        z-index: 99;
    }
    .header-bar {
        padding: 0 .4rem;
        font-size: 18px;
        height: 1rem;
        line-height: 1rem;
        cursor: pointer;
        position: relative;
    }
    .it-active {
        background: #0080e3;
        color: white;
    }
    .small-display {
        display: none;
    }
    .inner-ul-show {
        display: block;
    }
    .inner-ul-none {
        display: none;
    }
    .inner-ul {
        background: white;
        position: absolute;
        line-height: .3rem;
        top: 1rem;
        left: 0;
        color: black;
        z-index: 99;
        -moz-box-shadow: 0 0 4px #999;
        -o-box-shadow: 0 0 4px #999;
        -webkit-box-shadow: 0 0 4px #999;
        box-shadow: 0 0 4px #999;


    }
    .nav-item-table{background:none repeat scroll 0 0 #fff;white-space:nowrap}
    .nav-item-table td,.nav-item-table th{border-right:1px solid #e7e7e7;padding:3px 10px;white-space:nowrap}
    .nav-item-table th{font-weight:700;padding:0 14px 3px 17px;border-collapse:separate;white-space:nowrap}
    .nav-item-table th.last,.nav-item-table td.last{border-right:0}
    .nav-item-table a{color:#a0a0a0;display:block;padding-left:3px;position:relative;vertical-align:middle}
    .nav-item-table a:hover{background-color:#aaa;border-radius:2px 2px 2px 2px;color:#fff;text-decoration:none;vertical-align:middle}

    .footer {
        background:#2f4052;
        padding:50px 0 35px 0;
        color:#a3b1bf;
        padding-left:10px;
        padding-right:10px;
        min-height: 5rem;
    }
    .footer strong {
        color:#fff;
        display:block;
        margin-bottom:15px;
        font-size:16px;
    }
    .footer a {
        color:#a3b1bf;
    }
    .footer a:hover {
        color:#fff;
    }
    .footer .foot-img {
        list-style:none;
        width:280px;
    }
    .footer .foot-img li {
        display:inline-block;
        margin:0 5px 5px 0;
    }
    .footer .foot-contact p {
        min-height:30px;
        margin-bottom:5px;
    }
    .footer .foot-contact span {
        float:left;
        width:20px;
        height:30px;
    }
    .layout {
        width:100%;
    }
    @media (min-width:760px) {
        .footer {
            vertical-align: top;
            padding-left: 0px;
            padding-right: 0px;
        }

        .footer .foot-about {
            float: left;
            width: 30%;
            padding-right: 60px;
            padding-left: 10%;
        }

        .footer .foot-case {
            float: left;
            width: 330px;
        }

        .footer .foot-contact {
            float: left;
            width: 330px;
            padding-right: 60px;
        }

        .footer .foot-follow {
            float: left;
            text-align: center;
        }
    }
    @media screen and (max-width: 600px) {
        header {
            display: block !important;
            padding: 0;
        }
        .index-inline {
            display: block;
            position: absolute;
            width: 100%;
            background-color: white;
            .header-bar {
                height: .6rem;
                line-height: .6rem;
                font-size: 14px
            }
        }
        header .header-img > img {
            width: 1.5rem;
            height: .45rem;
            margin-left: .2rem;
        }
        .footer {
            padding-left: .5rem;
        }
    }
</style>
