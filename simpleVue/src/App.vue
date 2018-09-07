<template>
  <div id="app">
    <header-cmp></header-cmp>
    <div class="wrap hasBanner">
      <topbanner-cmp></topbanner-cmp>
      <scores-cmp></scores-cmp>
      <lately-cmp></lately-cmp>
    </div>
  </div>
</template>

<script>
import headerCmp from './components/header.vue';
import topbannerCmp from './components/main/topBanner.vue';
import scoresCmp from './components/main/scores.vue';
import driveChart from './components/main/driveChart.vue'
import latelyMap from './components/main/latelyMap.vue'

export default {
  name: 'app',
  components:{
    'header-cmp':headerCmp,
    'topbanner-cmp':topbannerCmp,
    'scores-cmp': scoresCmp,
    'lately-cmp': latelyMap
  }
}
</script>

<style>
</style>