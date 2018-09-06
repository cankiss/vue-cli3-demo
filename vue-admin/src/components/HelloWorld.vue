<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br> check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
    </ul>
    <p style="padding:30px">1px svg</p>
    <div class="line margin"></div>
    <p style="padding:30px">1px solid</p>
    <div class="line-1px margin"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
</script>

<style>
  /* @svg 1px-border {
      height: 2px;
      @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
      }
    } */
  .line-1px {
    width: 300px;
    border-top: 1px solid green;
  }
  .line {
    width: 300px;
    height: 1px;
  }
</style>


<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .line {
    width: 300px;
    height: 1px;
    background: svg(line param(--color #386ad8));
  }
</style>
