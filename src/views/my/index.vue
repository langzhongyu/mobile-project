<template>
    <div class="my-container">
        <van-cell-group class="my-header" v-if="user">
          <van-cell
            title="单元格"
            value="内容"
            :border="false"
            class="head-info"
            center>
            <van-image
             width="50"
             height="50"
             :src="currentUser.photo"
             slot="icon"
             round
             class="photoShow"
             fit="cover"/>
             <div
              slot="title"
              class="name">{{ currentUser.name }}</div>
             <van-button
             size="small"
             round
             >编辑资料</van-button>
          </van-cell>
          <van-grid
           class="nav-info"
           :border="false"
           >
            <van-grid-item
             class="nav-box">
              <div slot="text">
                <div class="count">{{ currentUser.art_count }}</div>
                <div class="text">头条</div>
              </div>
            </van-grid-item>
            <van-grid-item class="nav-box">
              <div slot="text">
                <div class="count">{{ currentUser.follow_count }}</div>
                <div class="text">关注</div>
              </div>
            </van-grid-item>
            <van-grid-item class="nav-box">
              <div slot="text">
                <div class="count">{{ currentUser.fans_count }}</div>
                <div class="text">粉丝</div>
              </div>
            </van-grid-item>
            <van-grid-item class="nav-box">
              <div slot="text">
                <div class="count">{{ currentUser.like_count }}</div>
                <div class="text">获赞</div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-cell-group>
        <div class="not-login" v-else>
          <div @click="$router.push({
            path: 'login',
            query: {
              redirect: '/my'
            }
          })">
            <img src="./手机.png" class="mobile" alt="">
            <div class="mobile-text">登录/注册</div>
          </div>
        </div>
        <van-grid
         :column-num="2"
         :border="false"
         class="nav-sort">
          <van-grid-item
           icon="star-o"
           text="收藏"
           class="collect-icon"/>
          <van-grid-item
           icon="clock-o"
           text="历史"
           class="history-icon"/>
        </van-grid>
        <van-cell-group class="my-list">
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </van-cell-group>
        <van-cell
         title="退出登录"
         class="loginBtn"
         @click="onLogout"
         v-if="user"
         />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {} // 当前用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadCurrentUser () {
      const { data } = await getUserInfo()
      this.currentUser = data.data
      // console.log(JSON.stringify(this.currentUser))
    }
  }
}
</script>

<style lang="less" scoped>
  .my-container {
    .my-header {
      background: url(./banner.png) no-repeat;
      background-size: cover;
      height: 180px;
      .head-info {
        background: none;
        padding-top: 30px;
        .photoShow {
          margin-right: 10px;
        }
        .name {
          color: #FFF;
        }
      }
    }
    .not-login {
      background: url(./banner.png) no-repeat;
      text-align: center;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      .mobile {
        width: 70px;
      }
      .mobile-text {
        font-size: 20px;
        color: #fff;
      }
    }
    .nav-sort {
      background: #fff;
    }
    .nav-info {
      .nav-box {
        .count {
          font-size: 18px;
          text-align: center;
          color: #fff;
        }
        .text {
          font-size: 16px;
          color: #fff;
          margin-top: 4px;
        }
      }
    }
    .nav-sort {
      .collect-icon {
        color: #eb5253;
      }
      .history-icon {
        color: #ff9d1d;
      }
    }
    .my-list {
      border-top: 5px solid #f5f7f9;
      border-bottom: 5px solid #f5f7f9;
    }
    .loginBtn {
      font-size: 18px;
      color: #d86262;
      text-align: center;
    }
  }
</style>
