<template>
  <div class="footer">
    <div class="qode">
      <p class="qode-title1">Pearce</p>
      <p class="qode-title2">© QodeInteractive 2020</p>
    </div>
    <div class="contact1">
      <p class="footer-title1">pearce@qode.com</p>
      <p class="footer-title2">+44 20 7240 9319</p>
    </div>
    <div class="contact2">
      <p class="footer-title1">Neal St, London WC2H 9PU,</p>
      <p class="footer-title2">United Kingdom</p>
    </div>
    <div class="contact3">
      <p class="footer-title1">You can follow us:</p>
      <div class="social-site">
        <font-awesome-icon icon="basketball-ball" />
        <v-icon style="color: white">mdi-instagram</v-icon>
        <v-icon style="color: white">mdi-twitter</v-icon>
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
export default {};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  color: white;
  flex-wrap: wrap;
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  padding-bottom: 200px;
  background-image: url("http://localhost:3000/assets/images/footer-img.jpg");
  margin: 0 auto;
}
.qode {
  width: 25%;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 100px;
  @media (max-width: 1024px) {
    width: 50%;
    padding-top: 150px;
  }
  @media (max-width: 520px) {
    width: 100%;
    text-align: center;
  }
}
.qode-title1 {
  font-size: 33px;
  font-weight: 700;
  font-family: Roboto, sans-serif;
}

.qode-title2 {
  font-size: 18px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
}
.contact1 {
  width: 25%;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  padding-top: 100px;
  line-height: 30px;
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 1024px) {
    width: 50%;
    padding-top: 150px;
  }
  @media (max-width: 520px) {
    width: 100%;
    text-align: center;
  }
}

.contact2 {
  width: 25%;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  padding-top: 100px;
  line-height: 30px;
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 520px) {
    width: 100%;
    text-align: center;
  }
}

.contact3 {
  width: 25%;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  padding-top: 100px;
  line-height: 30px;
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 520px) {
    width: 100%;
    text-align: center;
  }
}
.footer-title1 {
  font-size: 18px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
}
</style>