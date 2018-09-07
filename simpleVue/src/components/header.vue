<template>
    <header>
        <a href="javascript:;" class="back"></a>
        <a href="javascript:;" class="txt">운전습관</a>
        <a href="javascript:;" class="rightBtn settingBtn"></a>
    </header>
</template>

<script>
export default {

}
</script>

<style>
    header {height:50px; background:#fff; position:fixed; left: 0;right: 0;top:0;padding:0 1.5rem;text-align: center; z-index:100;}
    header a {display: inline-block; color:#000;position:absolute; line-height: 53px; font-size:1.8rem; }
    header .back {width:13px; height: 23px; background: url("http://mdev.tmap.co.kr/static/drivingHabit/images/common/backBtn.png") 0 0 no-repeat; left: 16px; top:13px; background-size: 100% auto;}
    header .txt {position:static; white-space: nowrap}
    header .rightBtn {width:25px; height:25px; right:15px;top:12px;}
    header .settingBtn{background:url("../assets/images/settingBtn.png") 0 0 no-repeat; background-size:100% auto;}
</style>
