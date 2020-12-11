<template>
  <div id="app">
    <!-- 给组件添加缓存，声明周期不再触发 -->
    <keep-alive :include="cachepages">
      <!-- 动态组件 -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachepages'])
  }
}
</script>

<style lang="less">
h1{font-size: 30px;}
</style>
