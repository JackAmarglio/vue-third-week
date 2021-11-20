<template>
  <div :class="[{scrolltoup : visible}]">
    <button
      v-bind:style="[visible ? { display: inline } : { display: none }]"
      @click="this.scroll"
    >
      <font-awesome-icon icon="chevron-up" />
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faChevronUp);

Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    scroll() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toggleVisible () {
      const scrolled = window.scrollY;
      if (scrolled > 800) {
        this.visible = true;
      } else if (scrolled <= 800) {
        this.visible = false;
      }
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.toggleVisible);
  },
};
</script>

<style lang="scss" scoped>
.scrolltoup {
  position: fixed;
  bottom: 40px;
  right: 40px;
  button {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 10px;
    background-color: transparent;
    border: 1px solid #cccccc;
    transition: all 1s;
    color: #ffffff;
  }
}
</style>