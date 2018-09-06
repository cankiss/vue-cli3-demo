<template>
  <div class="book-cover-box" v-if="isShow" v-overflow @click="destroy">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{
    isShow:{
      default:false,
      type:Boolean
    }
  },
  methods:{
    destroy() {
      this.$emit('destroy')
    }
  }
}
</script>
<style lang="less" scoped>
  .book-cover-box {
    width: 100%;
    height: 100%;
    z-index: 99;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
