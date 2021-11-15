<template>
  <div class="carousel-text">
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      :touchless="true"
      :show-arrows="false"
      :progress="false"
    >
      <v-carousel-item v-for="(title, i) in titles" :key="i">
        <v-row
          class="fill-height"
          align="center"
          style="
            padding-left: 100px;
            font-size: 38px;
            width: 60%;
            font-family: Roboto, sans-serif;
            font-style: italic;
          "
        >
          <div class="text">{{ title }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        "Consectet nei ad icing onsectetur adipiscing elit, sed do eiusmod tempor inc ididunt ut labore et dolore.",
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eius mod tempor inc ididunt ut labore.",
      ],
    };
  },
};
</script>

<style>
.carousel-text {
  background: #050505;
  color: white;
  padding-top: 50px;
  padding-bottom: 100px;
}
</style>