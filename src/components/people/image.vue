<template>
  <div class="blog">
    <div class="blog-image1" v-for="(man, i) in image" :key="i">
      <img :src="'img/' + man.src" alt="" width="100%" />
      <div class="blog-title1">{{ man.title1 }}</div>
      <div class="blog-title2">{{ man.title2 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: Array,
  },
};
</script>

<style lang="scss" scoped>
.blog {
  display: flex;
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  padding-bottom: 135px;
  flex-wrap: wrap;
}
.blog-image1 {
  padding-left: 20px;
  padding-right: 20px;
  width: 33%;
  @media (max-width: 680px) {
    width: 100%;
    padding-top: 50px;
  }
}
.blog-title1 {
  font-size: 27px;
  color: white;
  font-family: Roboto, sans-serif;
  padding-top: 20px;
  font-weight: 600;
}

.blog-title2 {
  color: white;
  font-family: Roboto, sans-serif;
  padding-top: 20px;
}
</style>