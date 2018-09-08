<template>
  <div class="container">
    <h1>hello demo</h1>
    <div class="box margin"></div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  created() {
    Toast({
      message:'hello',
      duration:0
    })
  }
}
</script>
<style lang="less">
 html,body {
   width: 100%;
   height: 100%;
 }
</style>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url('~assets/images/signIn/bg1@2x.png');
    background-size: 100% 100%;
    h1 {
      font-size: 24px;
    }
    .box {
      width:375px;
      height: 400px;
    }
  }
</style>
