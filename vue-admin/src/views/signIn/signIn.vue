<template>
  <div class="sign-in-container">
    <div class="user-top">
      <div class="avatar" :style="{backgroundImage:`url(${avatarUrl})`}"></div>
      <div class="word">
        我在「绘本妈咪」 <br>
        <span>听绘本音乐故事</span>
      </div>
    </div>
    <div class="which-day margin t-center">
      <p class="day">DAY {{attendaceDays}}</p>
      <p class="line"></p>
      <p class="word">
        让信念坚持下去<br>
        梦想就会实现
      </p>
    </div>
    <div class="free-and-qrcode margin" v-if="qrCodeUrl">
      <div class="info">
        <h2>限时免费</h2>
        <p>长按识别二维码关注「绘本妈咪」<br> 一起听有趣的音乐绘本故事</p>
      </div>
      <img :src="qrCodeUrl" alt="">
    </div>
    <dialog-wrapper :isShow="isShow" @destroy="isShow = false">
      <div class="share-pic">
        <img src="~assets/images/signIn/image2@2x.png" alt="">
      </div>
    </dialog-wrapper>
  </div>
</template>


<script>
import { getUserInfoAndQrcode,wechatConfig,signInRecord } from "@/utils/interface";
import { wxShare } from "@/utils/wxsdk";
import DialogWrapper from "@/components/DialogWrapper";
import qs from 'qs';
export default {
  data() {
    return {
      qrCodeUrl:'',
      attendaceDays:0,
      avatarUrl:'',
      isShow:true,
      url_params:qs.parse(location.search.slice(1))
    }
  },
  methods:{
    shareSuccess() {
      signInRecord().then(() => {
        if(!("p" in this.url_params)) {
          this.$jumper('/my?signIn=1')
        }
      })
    }
  },
  components:{
    DialogWrapper
  },
  created() {
    if ('p' in this.url_params) {
      let params = qs.parse(window.atob(this.url_params['p']))
      this.isShow = false
      this.attendaceDays = params.attendaceDays
      this.qrCodeUrl = "https://" + params.qrCodeUrl
      this.avatarUrl = "https://" + params.avatarUrl
      wechatConfig().then(({data}) => {
        wxShare(data,{
          title:"我在绘本妈咪听音乐故事",
          desc:`精彩音乐故事第${params.attendaceDays}天，快来加入我一起学习吧~`,
          imgUrl: "https://" + params.avatarUrl
        })
      })
      this.$setTitle('绘本妈咪')
      return;
    }

    getUserInfoAndQrcode().then(({data}) => {
      this.qrCodeUrl = data.qrCodeUrl
      this.attendaceDays = data.attendaceDays
      this.avatarUrl = process.env.VUE_APP_ASSETSROOT + '/' + data.avatarUrl
      return Promise.resolve({
        attendaceDays:this.attendaceDays,
        avatarUrl:this.avatarUrl,
        qrCodeUrl:this.qrCodeUrl
      })
    }).then(({attendaceDays,avatarUrl,qrCodeUrl}) => {

      let shareLink = window.btoa(qs.stringify({
        attendaceDays,
        avatarUrl:avatarUrl.replace(/^http(s)?:\/\//,''),
        qrCodeUrl:qrCodeUrl.replace(/^http(s)?:\/\//,'')
      })).replace(/\=+$/, '')

      wechatConfig().then(({data}) => {
        wxShare(data,{
          title:"我在绘本妈咪听音乐故事",
          desc:`精彩音乐故事第${attendaceDays}天，快来加入我一起学习吧~`,
          imgUrl:avatarUrl,
          link:location.href + '?p=' + shareLink
        },this.shareSuccess)
      })
    })

    this.$setTitle('打卡')

  }
}
</script>


<style>
  html,
  body {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="less" scoped>
  .sign-in-container {
    width: 100%;
    height: 100%;
    background: url('~assets/images/signIn/bg1@2x.png') no-repeat center;
    background-size: 100% 100%;
    .user-top {
      padding: 54px 0 0 30px;
      display: flex;
      align-items: center;
      .avatar {
        width: 120px;
        height: 120px;
        border: 4px solid #fff;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .word {
        font-weight: bolder;
        font-size: 36px;
        color: #fff;
        line-height: 52px;
        margin-left: 30px;
        span {
          font-size: 28px;
        }
      }
    }
    .which-day {
      margin-top: 224px;
      width: 300px;
      height: 300px;
      border: 2px solid #fff;
      padding: 40px 30px;
      color: #fff;
      font-weight: bolder;
      font-size: 30px;
      .day {
        font-size: 60px;
      }
      .line {
        width: 100%;
        height: 1px;
        background: #fff;
        margin: 30px 0;
      }
      .word {
        line-height: 44px;
      }
    }
    .free-and-qrcode {
      width: 690px;
      height: 260px;
      background: rgba(255, 255, 255, .8);
      border-radius: 6px;
      margin-top: 226px;
      padding: 36px 40px 0 40px;
      display: flex;
      justify-content: space-between;
      .info {
        h2 {
          color: #FD5E02;
          font-size: 60px;
        }
        p {
          margin-top: 10px;
          line-height: 40px;
          font-size: 28px;
        }
      }
      img {
        display: block;
        width: 155px;
        height: 155px;
      }
    }
    .share-pic {
      img {
        width: 212px;
        height: 192px;
        float: right;
      }
    }
  }
</style>
