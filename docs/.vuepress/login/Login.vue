<template>
    <div class="login-form">
        <div class="form-header">用户名</div>
        <div>
            <input type="text" class="form-control" v-model="username" />
        </div>
        <div class="form-header">密码</div>
        <div>
            <input type="password" class="form-control" v-model="password" />
        </div>

        <div class="btn-row">
            <button class="btn" @click="login">OK</button>
        </div>
    </div>
</template>

<script>
import {STORAGE_KEY, name, pwd} from './helper'
import md5 from 'js-md5';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.username && this.password) {
                if (this.username != name || md5(md5(this.password)) != pwd) {
                    this.$dlg.alert('用户名或密码错误', {
                        messageType: 'warning'
                    })
                    return;
                }
                const data = JSON.stringify({
                    name: this.username,
                    pwd: pwd,
                    time: new Date().getTime()
                })
                // 登录成功后的逻辑处理，这里将数据保存在 localStorage 中仅作为功能演示
                window.sessionStorage.setItem(STORAGE_KEY, data)
                // 关闭窗口
                this.$emit('close', true)
            } else {
                this.$dlg.alert('Please complete the content', {
                    messageType: 'warning'
                })
            }
        }
    }
}
</script>

<style lang="stylus">
.login-form
  padding: 1rem
  display flex
  flex-direction column
  box-sizing border-box
  .btn-row
    margin-top 1rem
  .btn
    padding 0.6rem 2rem
    outline none
    background-color #60C084
    color white
    border 0
  .form-header
    color #666
    margin-bottom 0.5rem
  .form-control
    padding 0.6rem
    border 2px solid #ddd
    width 100%
    margin-bottom 0.5rem
    box-sizing border-box
    outline none
    transition border 0.2s ease
    &:focus
      border 2px solid #aaa
</style>
