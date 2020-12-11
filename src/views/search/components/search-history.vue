<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史">
        <van-icon
         v-if="!isDelete"
         name="delete"
         @click="isDelete = true"/>
         <div v-else>
           <span @click="$emit('clearHistory', [])">全部删除</span>
           &nbsp;&nbsp;
           <span @click="isDelete = false">完成</span>
         </div>
      </van-cell>
      <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history,index)">
        <van-icon name="close" v-show="isDelete"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    onDelete (history, index) {
      if (this.isDelete) {
        this.searchHistories.splice(index, 1)
        return
      }
      this.$emit('search', history)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
