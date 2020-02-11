<template>
  <div>
    名称：{{product.title}} <br />
    价格：{{product.price}} <br />
    图片：
      <div v-for="imgUrl in product.images">
        <img :src="baseUrl + imgUrl" />
      </div>
    简介：<div v-html="product.intro"></div> <br />
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default {
    head() {
      return {
        title: '三人行网络信息科技'
      };
    },
    data () {
      return {
        baseUrl: 'http://localhost:5000/upImages'
      };
    },
    methods: {
    },
    async mounted() { // 显示产品列表
      await this.$store.dispatch('getProduct', '5c172079c56ecc05a05fb983');
    },
    computed: {
      ...mapState({
        'product': (state) => state.modProduct.currentProduct
      })
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
