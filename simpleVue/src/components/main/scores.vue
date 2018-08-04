<template>
    <section class="card">
        <h1>나의 운전 점수<a href="javascript:" class="infoBtn"></a></h1>
        <div class="totalScore">
            <ul>
                <li>
                    <div id='prev_score_noti'></div>
                    <vue-circle
                        :progress="50"
                        :size="100"
                        :reverse="false"
                        line-cap="round"
                        :fill="fill"
                        empty-fill="rgba(0, 0, 0, .1)"
                        :animation-start-value="0.0"
                        :start-angle="0"
                        insert-mode="append"
                        :thickness="5"
                        :show-percent="true"
                        @vue-circle-progress="progress"
                        @vue-circle-end="progress_end">
                        <p>Slot!</p>
                    </vue-circle>
                    <div class="circleGragh">
                        <b class="num ">48</b>
                        <!-- <div class="myPosition">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <span class="swiper-slide"></span>
                                    <span class="swiper-slide">5 등</span>	
                                </div>
                            </div>
                        </div> -->
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
export default {
    components: {
      VueCircle
    },
    data(){
        return{
            fill : { gradient: ["red", "green", "blue"] },
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
    .totalScore ul li:first-child{margin-right: 10px; width: 126px; display: flex; justify-content:center; position: relative;}
    .totalScore ul li:nth-child(2) {text-align: left;}
    .totalScore ul li:nth-child(4) {text-align: right;}
    .totalScore ul li:first-child .upDown {left:84px; margin-left: auto;}

    .totalScore .circleGragh {width:126px;display: block; position: relative;}
    .totalScore .circleGragh strong {font-size: 0.8rem; line-height: 1rem;}
    .totalScore .circleGragh b {font-size:5.2rem; text-align: center; letter-spacing: -0.07rem; display: block; height: 70px;}
    .totalScore .circleGragh b:after {position:relative;bottom:2px;font-size:2.5rem; content:'점';font-family:'AppleSDGothicNeo-Regular', 'nanumBarunGothic-regular'; margin-left: 3px; }
    .totalScore .circleGragh b.data:after {display: inline}
</style>
