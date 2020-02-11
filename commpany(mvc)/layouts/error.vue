<template>
  <div id="mother">
    <div id="errorBox">
      <div id="errorText">
        <p>wah-oh！！</p>
        <h1>{{ error.statusCode }}</h1>
        <h1>{{ error.message }}</h1>
        <nuxt-link to="/admin"><h1>返回『管理后台』首页</h1></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error']
};
</script>

<style scoped>
  div#mother{ margin:0 auto; width:943px; height:572px; position:relative; }
  div#errorBox{ background: url(./images/error.jpg) no-repeat top left; width:943px; height:572px; margin:auto; }
  div#errorText{ color:#39351e; padding:146px 0 0 446px }
  div#errorText p{ width:303px; font-size:14px; line-height:26px; }
  div.link{ /*background:#f90;*/ height:50px; width:145px; float:left; }
  div#home{ margin:20px 0 0 444px;}
  div#contact{ margin:20px 0 0 25px;}
  h1{ font-size:40px; margin-bottom:35px; }
</style>
