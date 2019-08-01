<template>
    <div id="main">
        <div class="main-outer">
            <Carousel
                    v-model="value3"
                    :autoplay="setting.autoplay"
                    :autoplay-speed="setting.autoplaySpeed"
                    :dots="setting.dots"
                    :radius-dot="setting.radiusDot"
                    :trigger="setting.trigger"
                    :arrow="setting.arrow">
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../assets/loop-4.jpg"/></div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../assets/loop-3.jpg"/></div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../assets/loop-2.jpg"/></div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel"><img src="../../assets/loop-1.jpg"/></div>
                </CarouselItem>
            </Carousel>
            <div class="main-label">
                <div class="span-1">优质的服务流程</div>
                <div class="span-2">· QUALITY OF SERVICE PROCESSES ·</div>
            </div>
            <div class="main-circle">
                <div>
                    <div class="one"><Icon type="stats-bars"></Icon></div>
                    <div class="two">需求沟通</div>
                </div>
                <div>
                    <div class="one"><Icon type="eye-disabled"></Icon></div>
                    <div class="two">测试反馈</div>
                </div>
                <div>
                    <div class="one"><Icon type="ios-heart"></Icon></div>
                    <div class="two">蓝图设计</div>
                </div>
                <div>
                    <div class="one"><Icon type="social-vimeo"></Icon></div>
                    <div class="two">系统实现</div>
                </div>
                <div>
                    <div class="one"><Icon type="social-dropbox"></Icon></div>
                    <div class="two">上线支持</div>
                </div>
            </div>
            <div class="img-main">
                <img src="../../assets/honor.jpg" class="img-honor">
            </div>
        </div>
    </div>
</template>
<script>
import cTable from "../../components/table";
export default {
    name: 'main',
    components: {
        cTable
    },
    data() {
        return {
            value3: 0,
            setting: {
                autoplay: true,
                autoplaySpeed: 4000,
                dots: 'inside',
                radiusDot: false,
                trigger: 'click',
                arrow: 'hover'
            }
        }
    },
    created(){

    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
    .main-outer {
        width: 100%;
        .demo-carousel {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .img-main {
        width: 100%;
        height: auto;
        .img-honor {
            width: 100%;
            margin-bottom: -5px;
        }
    }
    .main-label {
        width: 100%;
        text-align: center;
        >.span-1 {
            font-size: 35px;
            margin: .2rem auto auto .05rem;
            font-weight: bold;
        }
        >.span-2 {
            font-size: 18px;
        }
    }
    .main-circle {
        height: 3rem;
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        >div {
            height: 4rem;
            margin-top: 1.5rem;
            >div.one {
                width: 1.5rem;
                height: 1.5rem;
                border: 1px solid darkgray;
                border-radius: 50%;
                >i {
                    padding: .25rem .25rem .25rem .3rem;
                    font-size: 1rem;
                    color: dodgerblue;
                }
                &:hover {
                    background-color: deepskyblue;
                    border: 1px solid deepskyblue;
                    >i {
                        font-size: 1rem;
                        color: white;
                    }
                }
            }
            >div.two {
                font-size: 18px;
                margin-top: .2rem;
                text-align: center;
            }
        }
    }
    @media screen and (max-width: 600px) {
        .main-circle {
            height: 3rem;
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            >div {
                height: 2rem;
                margin-top: 1.5rem;
                >div.one {
                    width: .7rem;
                    height: .7rem;
                    border: 1px solid darkgray;
                    border-radius: 50%;
                    >i {
                        padding: .1rem .15rem .15rem .14rem;
                        font-size: .5rem;
                        color: dodgerblue;
                    }
                    &:hover {
                        background-color: deepskyblue;
                        border: 1px solid deepskyblue;
                        >i {
                            font-size: 1rem;
                            color: white;
                        }
                    }
                }
                >div.two {
                    font-size: 18px;
                    margin-top: .2rem;
                    text-align: center;
                }
            }
        }
    }
</style>