<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="nav-btn"
    />
    <van-form
    :show-error="false"
    :show-error-message="false"
    @submit="onLogin"
    @failed="onFailed"
    ref="login-form"
    validate-first
    >
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
        class="iconfont icon-shouji"
        center
      />
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
        class="iconfont icon-yanzhengma" >
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          :time="60 * 1000"
           format="ss s"
           @finish="countDownFinish"
           />
          <van-button
          class="code-btn"
          v-else
          :loading="isSendCode"
          size="mini"
          round
          @click.prevent="onSendCode"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
        block
        type="info"
        native-type="submit"
        class="login-btn">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, sendCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17090086870',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号！' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isCountDownShow: false,
      isSendCode: false
    }
  },
  methods: {
    // userLogin(this.user).then(res => {
    //   console.log('登录成功', res)
    // }).catch(err => {
    //   console.log('登录失败！', err)
    // })
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      try {
        const { data } = await userLogin(this.user)
        console.log('登录成功', data)
        this.$toast.success('登录成功！')
        // 将后端返回的用户登录状态（token等数据）放到vuex容器中
        this.$store.commit('setUser', data.data)
        this.$router.push(this.$route.query.redirect || '/') // this.$route.query.redirecr路由重定向
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败！')
        }
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendCode () {
      try {
        // 验证单个表单项，即验证手机号码，返回promise结果
        await this.$refs['login-form'].validate('mobile') // 返回underfind
        this.isSendCode = true
        await sendCode(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后再试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请稍后再试'
        }
        this.$toast({
          message,
          position: top
        })
      }
      this.isSendCode = false
    },
    countDownFinish () {
      this.isCountDownShow = false
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    .login-btn {
      background: #6db4fb;
      border: 1px solid #6db4fb;
    }
    .nav-btn{
      background: #3296fa;
    }
    .code-btn{
      width: 86px;
    }
  }
</style>
