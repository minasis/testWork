<template>
    <section class="card">
        <h1>나의 운전 점수<a href="javascript:" class="infoBtn"></a></h1>
        <div class="totalScore">
            <ul>
                <li>
                    <div id='prev_score_noti'></div>
                    <b class="num ">48</b>
                    <div class="myPosition">
                        <swiper :options="swiperOption" rel="mySwiper" >
                            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">{{slide}}</swiper-slide>
                        </swiper>
                    </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </section>
</template>

<script>
import VueCircle from 'vue2-circle-progress'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
      VueCircle,
      swiper,
      swiperSlide
    },
    data(){
        return{
            fill : { gradient: ["red", "green", "blue"] },
            swiperSlides:['등수 없음'],
            swiperOption: {
                loop: true,
				allowTouchMove:false,
				speed:800
            },
            
        }
    },
    created: function(){
        var obj = this;
        var autoPlay = {
            delay: 1500,
			disableOnInteraction: false,
        }
        if(obj.swiperSlides.length > 1){
            obj.swiperOption.autoplay = autoPlay
        }
    },
    methods:{
        progress(event,progress,stepValue){
            console.log(stepValue);
        },
        progress_end(event){
            console.log("Circle progress end");
        }
    }
}
</script>

<style>
    h1 .infoBtn {position: absolute; top:50%; margin-top:-12px; right: 0px; width:24px; height:24px;background:url("http://mdev.tmap.co.kr/static/drivingHabit/images/index/info.png") 0 0 no-repeat; background-size: 24px 48px;}
    h1 .infoBtn.touch {background-position:0 bottom;}

    .totalScore {padding: 30px 0px; border-bottom: 1px solid #e5e5e5; margin-bottom: 12px; position: relative;}
    .totalScore ul {font-size: 0px; line-height: 0px; display: inline-block; margin-right: 4px; width:100%;display: flex; align-items:center}
    .totalScore ul li {display: inline-block;position: relative; width:calc((100% - 152px) / 3); text-align: center;}
    .totalScore ul li:first-child{margin-right: 10px; width: 126px; position: relative;}
    .totalScore ul li:nth-child(2) {text-align: left;}
    .totalScore ul li:nth-child(4) {text-align: right;}
    .totalScore ul li:first-child .upDown {left:84px; margin-left: auto;}

    .totalScore li:first-child b {font-size:5.2rem; width:100%; text-align: center; letter-spacing: -0.07rem; display: block; height: 70px;}
    .totalScore li:first-child b:after {position:relative;bottom:2px;font-size:2.5rem; content:'점';font-family:'AppleSDGothicNeo-Regular', 'nanumBarunGothic-regular'; margin-left: 3px; }
    .totalScore li:first-child b.data:after {display: inline}

    .myPosition {height: 27px; border-radius: 17px; background: #f7f7f7; display: inline-block; margin-top: -1rem; width: 82px; text-align: center;font-size: 1.4rem; color:#666; line-height: 29px; }
    .myPosition .swiper-slide {text-align: center; font-size: 1.4rem; color:#666; line-height: 29px; padding:0 12px; height: 27px; white-space: nowrap}
</style>
