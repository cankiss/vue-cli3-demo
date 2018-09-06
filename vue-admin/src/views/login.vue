<template>

</template>
<script>
import qs from 'qs';
import { weChatLogin } from '@/utils/interface'
import { local } from "@/utils/storage";
import { Indicator,Toast } from "mint-ui";
export default {
  data(){
    return {
      params:{
        appid: process.env.VUE_APP_APPID,
        redirect_uri:process.env.VUE_APP_LOGIN,
        response_type:'code',
        scope:'snsapi_base',
        state:1
      }
    }
  },
  created() {
    let url_params = qs.parse(location.search.slice(1))
    if(url_params.hasOwnProperty('redirect')) {
      this.params.state = url_params.redirect;
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + qs.stringify(this.params) + '#wechat_redirect'
    }

    if(url_params.hasOwnProperty('code')) {
      Indicator.open({
        text: '登录中...',
        spinnerType: 'fading-circle'
      })
      weChatLogin(url_params.code).then(({data}) => {
        local.set('_token',data.Token)
        console.log(data.Token)
        Indicator.close()
        location.href = location.origin + url_params.state
      }).catch(({code}) => {
        Indicator.close()
        code === 4404 && Toast('您还未关注公众号，请关注！')
      })
    }

    this.$setTitle('微信登录')

  }
}
</script>
