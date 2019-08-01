<template>
    <div id="type">
        <div class="body">
            <div class="img-main">
                <img src="../../assets/product.jpg" class="img-honor">
            </div>
            <div class="main-label">
                <div class="span-1">持续为客户创造价值 是誉宏科技存在的价值</div>
                <div class="span-2">·  CONTINUE TO CREATE VALUES ·</div>
            </div>
            <div class="img-main">
                <img src="../../assets/product-2.jpg" class="img-honor">
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
export default {
    name: 'type',
    data() {
        return {}
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
    .img-main {
        width: 100%;
        height: auto;
        .img-honor {
            width: 100%;
            margin-bottom: -8px;
        }
    }
    .main-label {
        width: 100%;
        text-align: center;
        >.span-1 {
            font-size: 30px;
            margin: .2rem auto .2rem .05rem;
            font-weight: bold;
        }
        >.span-2 {
            font-size: 18px;
            margin-bottom: .2rem;
        }
    }
</style>