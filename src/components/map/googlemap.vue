<template>
  <div class="roadmap">
    <div class="responsive-map">
      <div style="width: 100">
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%20GAMLE OSLO,%20OSLO&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ><a href="http://www.gps.ie/"
        /></iframe>
      </div>
    </div>
    <div class="map-title">
      <div class="images-section-title">
        We work with over 30 top-tier brands and industry leaders. But we could
        also work with you!
      </div>
      <div class="email">pearce@qode.com</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.roadmap {
  padding: 100px 0;
  margin-right: 0 !important;
  margin-left: 0 !important;
  padding-top: 200px;
}
.map-title {
  padding-left: 150px;
  padding-top: 200px;
  padding-right: 120px;
  @media (max-width: 1024px) {
    padding-left: 100px;
    padding-top: 150px;
  }

  @media (max-width: 768px) {
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 100px;
  }
  @media (max-width: 425px) {
    padding-left: 30px;
    padding-right: 30px;
  }
}
.images-section-title {
  font-size: 40px;
  color: white;
  font-weight: 700 !important;
  line-height: 1.143em;
  font-family: Roboto, sans-serif;
  @media (max-width: 1024px) {
    font-size: 37px;
  }
  @media (max-width: 768px) {
    font-size: 33px;
  }

  @media (max-width: 375px) {
    font-size: 30px;
  }
}

.email {
  font-size: 40px;
  color: white;
  font-weight: 700;
  line-height: 1.143em;
  font-family: Roboto, sans-serif;
  padding-top: 30px;
  text-decoration: underline;
  @media (max-width: 1024px) {
    font-size: 37px;
  }
  @media (max-width: 768px) {
    font-size: 33px;
  }

  @media (max-width: 375px) {
    font-size: 30px;
  }
  &::after {
    position: absolute;
    bottom: 0;
    -webkit-transform: scaleX(1) translateY(-50%);
    -ms-transform: scaleX(1) translateY(-50%);
    transform: scaleX(1) translateY(-50%);
    -webkit-transform-origin: 100% 50%;
    -ms-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
  }
  &:hover::after {
    -webkit-animation: email 1s cubic-bezier(0.85, 0.26, 0.17, 1) forwards;
    cursor: pointer;
    animation: email 1s cubic-bezier(0.85, 0.26, 0.17, 1) forwards;
  }
}
</style>