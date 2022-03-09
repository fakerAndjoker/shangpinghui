<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" class="banner-img"  />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: {
    list: {
      type: Array,
    },
  },
  //监听数据的变化
  watch: {
    list: {
      handler(newValue, oldValue) {
        //nextTick:在下次dom更新 循环结束之后 执行延迟回调。 在修改数据之后立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          let mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              //   el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>

</style>