<template>
  <div class="my">
    <div class="my-banner">
      <div class="my-header">
        <img :src="avatarUrl" alt="">
      </div>
      <p class="my-name">{{nickName}}</p>
      <div class="my-gift">
        <div class="my-gift-left">
          <img src="~assets/images/my/my-num.png" alt="">
          <p>我的积分：{{points}}</p>
        </div>
        <div class="my-gift-line"></div>
        <div class="my-gift-right">
          <img src="~assets/images/my/my-gift.png" alt="">
          <p>热门兑换推荐 ></p>
        </div>
      </div>
    </div>
    <div class="my-task-title">
        做任务赚积分
    </div>
    <div class="my-card-day">
      <img src="~assets/images/my/my-card.png" alt="">
      <ul>
        <li class="my-card-title">每日打卡</li>
        <li>今日已完成<span class="my-card-title">+5</span>积分</li>
        <li>完成每日打开领5积分</li>
      </ul>
      <button v-if="!todayAttendance" class="my-button-card" @click="$jumper('/signIn')">签到</button>
      <button disabled="false" v-else>已完成</button>
      <div class="my-card-line"></div>
    </div>
    <div class="my-share">
      <img src="~assets/images/my/my-people.png" alt="">
      <ul>
        <li class="my-share-title">乐于分享</li>
        <li>已邀请<span class="my-share-title">{{invitationNum}}</span>人加入</li>
        <li>每邀请1位小伙伴一起学习领100积分</li>
      </ul>
      <button v-if="true" @click="goToShare" class="my-button-share">去分享</button>
      <button v-else>已完成</button>
    </div>
  </div>
</template>
<script>
import qs from "qs"
import { myPageMsg, posterShare, wechatConfig } from "@/utils/interface"
import { wxCloseWindow } from "@/utils/wxsdk"
import { local } from "@/utils/storage"
import { Toast, Indicator } from "mint-ui"
export default {
  data() {
    return {
      avatarUrl: "",
      nickName: "",
      points: "",
      todayAttendance: false,
      invitationNum: ""
    }
  },
  created() {
    document.title = "我的"
    wechatConfig().then(({ data }) => {
      wxCloseWindow(data)
    })
    myPageMsg().then(({ data }) => {
      console.log(data, process.env.VUE_APP_ASSETSROOT)
      this.avatarUrl = process.env.VUE_APP_ASSETSROOT + "/" + data.avatarUrl
      this.nickName = data.nickName
      this.points = data.points
      this.todayAttendance = data.todayAttendance
      this.invitationNum = data.invitationNum
      if (this.$route.query.signIn && data.todayAttendance) {
        Toast("完成打卡，获得5积分！")
      }
    })
  },
  methods: {
    goToShare() {
      Indicator.open({
        spinnerType: "fading-circle"
      })
      posterShare().then(() => {
        wx.closeWindow()
      })
    }
  }
}
</script>
<style lang="less">
.my-banner {
  width: 100%;
  height: 448px;
  background: url("~assets/images/my/my-banner.png") no-repeat center top;
  overflow: hidden;
  background-size: cover;
}
.my-header {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 4px solid #fff;
  margin: 60px auto 20px;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.my-name {
  text-align: center;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
}
.my-gift {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 50px;
}
.my-gift-left,
.my-gift-right {
  width: 373px;
  float: left;
  img {
    width: 52px;
    height: 52px;
    margin: 0 auto;
    display: block;
  }
  p {
    font-size: 28px;
    color: #fff;
    text-align: center;
  }
}
.my-gift-line {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -10px 0 0 -2px;
  border-left: 2px solid #fff;
  width: 1px;
  height: 40px;
}
.my-task-title {
  color: #4a4a4a;
  font-size: 36px;
  line-height: 110px;
  padding-left: 42px;
  width: 100%;
  font-weight: 600;
}
.my-card-day,
.my-share {
  width: 690px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  img {
    width: 80px;
    height: 80px;
    display: inline-block;
    margin-top: 60px;
  }
  ul {
    width: 410px;
    display: inline-block;
    margin-left: 40px;
    li {
      margin: 5px 0;
    }
    li:nth-of-type(1) {
      font-size: 32px;
      font-weight: 500;
    }
    li:nth-of-type(2) {
      font-size: 28px;
      color: #4a4a4a;
      font-weight: 500;
    }
    li:nth-of-type(3) {
      font-size: 24px;
      color: #9b9b9b;
    }
  }
  button {
    width: 160px;
    height: 62px;
    color: #fff;
    border-radius: 30px;
    border: 0;
    text-align: center;
    line-height: 62px;
    position: relative;
    display: inline-block;
    top: -26px;
    font-weight: 500;
    font-size: 24px;
  }
  .my-button-share {
    border: 2px solid #fd5e02;
    color: #fd5e02;
    background: none;
  }
  .my-button-card {
    border: 2px solid #4a90e2;
    color: #4a90e2;
    background: none;
  }
}
.my-card-line {
  width: 100%;
  height: 1px;
  background: svg(line param(--color #9e9e9e));
  position: absolute;
  bottom: 0;
}
.my-card-title {
  color: #4a90e2;
}
.my-share-title {
  color: #6ed9c1;
}
</style>
