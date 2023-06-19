<template>
  <div class="login">
    <img class="pic" :src="getImg('loginregisterPic.png')" alt="登录">
    <div class="username">
      <input type="text" class="username-input" name="username" placeholder="昵称、手机号、邮箱" v-model="username" />
    </div>
    <div class="psw">
      <input type="text" class="psw-input" name="psw" placeholder="密码" v-model="psw" />
    </div>
    <div class="loginbtn" @click="login">登录</div>
  </div>
</template>

<script setup lang="ts">
import getImg from '../../utils/imgUtil'
import UserInfo from './service/index'
const { username, psw, login } = UserInfo
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  .pic {
    width: 1.22rem;
    object-fit: contain;
  }
  .username, .psw {
    width: 4.23rem;
    height: 0.94rem;
    line-height: 0.94rem;
    background-color: #f6f6f6;
    border-radius: 1rem;
    &-input {
      margin-left: 0.3rem;
      width: 85%;
      height: 60%;
      background: none;
      border: none;
      outline: none;
    }
  }
  .loginbtn {
    background-color: #f31313;
    border-radius: 1rem;
    width: 4.23rem;
    height: 0.94rem;
    line-height: 0.94rem;
    text-align: center;
    color: #fff;
    font-size: 0.25rem;
    box-shadow: 0rem 0rem 0.1rem #f31313;
  }
}
</style>