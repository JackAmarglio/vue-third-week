<template>
  <div class="introduce">
    <div :class="'people' + (i + 1)" v-for="(man, i) in people" :key="i">
      <img width="100%" height="auto" :src="'img/' + man.src" alt="" />
      <div class="name">{{ man.name }}</div>
      <div class="job">{{ man.job }}</div>
      <div class="icons">
        <div class="behance">
          <i class="fa fa-behance"></i>
        </div>
        <div><font-awesome-icon icon="basketball-ball" /></div>
        <v-icon style="color: white">mdi-instagram</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faBasketballBall);

Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {
  props: {
    people: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.introduce {
  background: #050505;
  color: white;
  display: flex;
  width: 100%;
  padding-top: 100px;
  flex-wrap: wrap;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 680px) {
    padding-left: 0;
    padding-right: 0;
  }
}
.people1 {
  padding-left: 30px;
  padding-right: 30px;
  width: 33%;
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
}

.people4 {
  padding-left: 30px;
  width: 33%;
  padding-right: 30px;
  padding-top: 150px;
  @media (max-width: 768px) {
    width: 50%;
    padding-top: 50px;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
}
.people2 {
  padding-left: 30px;
  width: 33%;
  padding-right: 30px;
  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 680px) {
    width: 100%;
    padding-top: 50px;
  }
}

.people3 {
  padding-left: 30px;
  width: 33%;
  padding-right: 30px;
  @media (max-width: 768px) {
    width: 50%;
    padding-top: 50px;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
}
.people5 {
  padding-left: 30px;
  width: 33%;
  padding-right: 30px;
  padding-top: 150px;
  @media (max-width: 768px) {
    width: 50%;
    padding-top: 50px;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
}
.name {
  font-size: 20px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  color: white;
  padding-top: 30px;
}
.job {
  font-family: Roboto, sans-serif;
  color: white;
}
.icons {
  display: flex;
}
</style>