<template>
    <section class="card record">
        <a href="/publishing/drivingHabit/driving.html" class="link"></a>
        <div class="mapInfo">
          <h1>주행 이력 <span>2017.8.13 / 13:30</span></h1>
          <dl>
            <dt>파인애비뉴 주차장</dt>
            <dd>38km <span>|</span> 46분</dd>
          </dl>          
        </div>
        <div class="mapWrap">
          <!--img src="images/samples/driving.jpg" alt="" class="sample"-->
          <div id="map_div"></div>
        </div>
      </section>
</template>

<script>
export default {
}
</script>

<style>
    h1 span {position: absolute; color:#808080; right: 0px; font-size: 1.5rem;}

    .mapInfo,
    .mapWrap {position: relative;}
    .mapWrap { padding:0 0.75rem;}
    .mapInfo a,
    .mapWrap a {z-index: 1009;}
    .mapWrap .sample {border: 1px solid #ccc; border-radius: 3px;}
    .mapInfo .score {position: absolute;bottom:-7px; right: 15px; z-index: 1009; color:#000; text-align: right; font-size: 3rem; }
    .mapInfo .score:after { vertical-align:top;content:'점'; font-size: 1.7rem; display: inline-block; margin-left: 1px; margin-top: 3px;}
    .mapInfo dl {margin:8px 1.6rem;}
    .mapInfo dl dt {color:#010101; font-size: 2rem;}
    .mapInfo dl dd {color:#666; font-size: 1.5rem; margin-top: 7px;}
    _::-webkit-full-page-media, _:future, :root .mapInfo dl dd {font-size:1.7rem;}
    .mapInfo dl dd span {font-size: inherit; color: #ccc}
    #map_div {height: 121px; margin:0 7px; border: 1px solid #ccc; border-radius: 3px;}
</style>
