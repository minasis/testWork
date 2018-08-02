<template>
    <a href="javascript:;" class="banner light"  :style="{height:styles[0].height, color:styles[0].color, background: 'url(' + styles[0].bgImg + ') 0 0 repeat-x', backgroundSize:'1px 100%'}">
        <span v-html="bannerTxt"></span>
        <span class="bannerBg" :style="{backgroundImage:'url(' + styles[0].bannerBg + ')', backgroundSize:'auto 100%'}"></span>
    </a>
</template>

<script>
export default {
    data:function(){
        return {
            styles:[{
                height:"137px",
                bgImg : "http://mdev.tmap.co.kr/static/drivingHabit/images/samples/banner4_1.jpg",
                color:"#fff",
                bannerBg : "http://mdev.tmap.co.kr/static/drivingHabit/images/samples/banner4.jpg?ver01"
            }],
            bannerTxt : "어? 내가 어떻게 운전했지?<br><b>가장 궁금해하던 것을 보여드립니다!</b>"
        }
    }
}
</script>

<style>
.banner {display: block; width: 100%; color:#1a2027; font-size: 1.5rem; padding:22px 0 0px calc(4.5% + 15px); position: absolute; top:50px; left: 0; right: 0px; line-height: 150%;}
.banner span {font-size: inherit; position: relative;z-index: 1; color: inherit; letter-spacing: 0rem;}
.banner b {font-size: 1.6rem; color:inherit; letter-spacing: inherit;}
.banner b.underLine {border-bottom: 1px solid #282c31}
.banner .bannerBg {position: absolute; right:0px; left: 0; height: 100%; background-repeat: no-repeat; background-position: right 0; top:0px; z-index: 0;}
.banner .mCount {height:25px; border:1px solid #fff; border-radius: 18px; position: absolute; top:10px; right:10px; line-height: 26px; font-size: 1.4rem; padding:0 9px; opacity:0.9}
_::-webkit-full-page-media, _:future, :root .banner .mCount {line-height:25px;}

</style>
