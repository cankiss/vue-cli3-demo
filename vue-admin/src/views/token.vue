<template>
  <div>
    <div class="container">
      <textarea class="margin" rows="20" cols="40" placeholder="please copy token here!"></textarea>
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    created() {
      this.$setTitle('Token injected')
      window.addEventListener("paste", function(e) {
        var clipboardData, pastedData;
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('text/plain').replace(/(\r\n|\r|\n|\\)/g,'')
        localStorage.setItem('_token',pastedData)
        Toast('Token injected localStorage successful!')
      })
    },
    destroyed(){
      window.removeEventListener("paste",null)
    }
  }
</script>

<style lang="less" scoped>
  .container {
    padding: 20px;
    textarea {
      width: 600px;
      height: 300px;
      display: block;
      border: 1px solid blue;
    }
  }

</style>
