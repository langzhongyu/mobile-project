<template>
  <div class="layout-container">
      <keep-alive>
        <!-- 子路由出口 -->
        <router-view />
      </keep-alive>
      <!-- 底部导航栏 -->
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
