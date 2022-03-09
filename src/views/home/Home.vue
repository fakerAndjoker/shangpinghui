<template>
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <floor v-for="item in floorList" :key="item.id" :list="item"></floor>
  </div>
</template>

<script>
import TypeNav from "@/components/typeNav/TypeNav.vue";
import ListContainer from "./childComponent/listContainer/ListContainer.vue";
import Floor from "./childComponent/floor/Floor.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    TypeNav,
    ListContainer,
    Floor,
  },
  async mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>