<template>
  <div class="effect-image">
    <div class="row">
      <div class="left-side">
        <div class="content" v-for="(item, i) in data" :key="i">
          <img
            :src="'img/' + item.left_src"
            alt=""
            :height="item.left_height"
            width="100%"
          />
          <div class="image-title1">{{ item.left_title }}</div>
          <div class="image-title2">{{ item.title }}</div>
        </div>
      </div>
      <div class="right-side">
        <div class="content" v-for="(item, i) in data" :key="i">
          <v-img
            :src="'img/' + item.right_src"
            alt=""
            :height="item.right_height"
            width="573px"
          />
          <div class="image-title1">{{ item.right_title }}</div>
          <div class="image-title2">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
};
</script>

<style lang="scss">
.content {
  padding-top: 100px;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 680px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.effect-image {
  background: #050505;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 100px;
  @media (max-width: 1024px) {
    padding-left: 70px;
    padding-right: 70px;
  }
  @media (max-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
  }
}
.left-side {
  display: flex;
  width: 50%;
  padding-top: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  @media (max-width: 680px) {
    width: 100%;
  }
}
.right-side {
  display: flex;
  width: 50%;
  padding-top: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.image-title1 {
  padding-top: 30px;
  font-size: 19px;
  color: white;
  font-weight: 600;
}

.image-title2 {
  color: white;
}
</style>