<template>
  <v-app>
    <div class="app">
      <div
        :class="'navigation-bar' + sticky ? 'sticky-top' : ''"
        id="top-navbar"
      >
        <nav class="navbar">
          <a href="/" class="nav-logo">
            <img class="logo" src="/img/logo.jpg" />
          </a>
          <ul class="nav-menu">
            <li class="nav-item">
              <a class="nav-link" href="#home"> Home </a>
              <ul class="nav-content">
                <li>Main Home</li>
                <li>Horizontal Portfolio</li>
                <li>Designer Portfolio</li>
                <li>Fixed Project Slider</li>
                <li>Portfolio Columns</li>
                <li>Tooltip Project Showcase</li>
                <li>Interactive Showcase</li>
                <li>Portfolio Gallery</li>
                <li>Project Category Filter</li>
                <li>Vertical Projects</li>
                <li>Project Spotlight Slider</li>
                <li>Horizontal Project Slider</li>
                <li>Landing</li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Pages"> Pages </a>
              <ul class="nav-content">
                <li>About Me</li>
                <li>About Us</li>
                <li>Our Team</li>
                <li>Contact Us</li>
                <li>Get In Touch</li>
                <li>Coming Soon</li>
                <li>404 Error Page</li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Portfolio"> Portfolio </a>
              <ul class="nav-content">
                <div style="display: flex">
                  <li>
                    Portfolio Types
                    <ul class="has-child">
                      <li>Standard List</li>
                      <li>Gallery List</li>
                      <li>Masonry List</li>
                      <li>Pinterest List</li>
                      <li>Project Slider Text Overlay</li>
                      <li>Project Slider Col. Carousel</li>
                      <li>Project Slider Carousel</li>
                      <li>Horizontal Slider</li>
                      <li>Switch Images List</li>
                      <li>Centered Info List</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
                <div style="display: flex">
                  <li>
                    Portfolio Hover
                    <ul class="has-child">
                      <li>Info Below</li>
                      <li>Info Follow</li>
                      <li>Blur Effect</li>
                      <li>Switch Images</li>
                      <li>Centered Info</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
                <div style="display: flex">
                  <li>
                    Portfolio Layout
                    <ul class="has-child">
                      <li>Two Columns</li>
                      <li>Three Columns</li>
                      <li>Three Columns Wide</li>
                      <li>Four Columns</li>
                      <li>Four Columns Wide</li>
                      <li>Five Columns Wide</li>
                      <li>Six Columns Wide</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
                <div style="display: flex">
                  <li>
                    Portfolio Single
                    <ul class="has-child">
                      <li>Small Images</li>
                      <li>Small Slider</li>
                      <li>Large Images</li>
                      <li>Large Slider</li>
                      <li>Masonry</li>
                      <li>Video Portfolio</li>
                      <li>Custom 2</li>
                      <li>Custom 1</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Blog"> Blog </a>
              <ul class="nav-content">
                <li>Blog Standard</li>
                <li>Blog Left Sidebar</li>
                <li>Blog No Sidebar</li>
                <div style="display: flex">
                  <li>
                    Post Types
                    <ul class="has-child">
                      <li>Standard</li>
                      <li>Gallery</li>
                      <li>Quote</li>
                      <li>Link</li>
                      <li>Video</li>
                      <li>Audio</li>
                      <li>No Sidebar</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#Shop"> Shop </a>
              <ul class="nav-content">
                <li>Product List</li>
                <li>Product Single</li>
                <div style="display: flex">
                  <li>
                    Shop Layouts
                    <ul class="has-child">
                      <li>Shop Three Columns</li>
                      <li>Shop Four Columns</li>
                      <li>Shop Full Width</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
                <div style="display: flex">
                  <li>
                    Shop Pages
                    <ul class="has-child">
                      <li>Cart</li>
                      <li>My Account</li>
                      <li>Checkout</li>
                    </ul>
                  </li>
                  <i
                    class="fa fa-chevron-right"
                    style="
                      margin-left: auto;
                      margin-right: 50px;
                      margin-top: 5px;
                    "
                  ></i>
                </div>
              </ul>
            </li>
          </ul>
          <div class="textwidget">
            <span style="font-size: 16px; margin: 0 30px">
              <a
                href="portfolio-item/photography/index.html"
                style="color: white; text-decoration: none"
              >
                What&#8217;s new?
              </a>
            </span>
            <router-link :to="{ name: 'register' }" class="nav-link">
              <v-icon large color="white">
                mdi-arrow-up-bold-box-outline
              </v-icon>
            </router-link>
          </div>
        </nav>
      </div>
      <v-carousel cycle height="400" hide-delimiter-background>
        <v-carousel-item v-for="(src, i) in srcs" :key="i">
          <v-row class="fill-height" align="center" justify="center">
            <img class="carousel-image" :src="src" alt="" />
            <div>{titles[i]}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <div class="carousel-section-title">
        We are an award-winning creative agency with more than 300 projects. We
        approach every project with same passion and dedication and this has
        always been one of the linchpins of our work.
      </div>
      <EffectImages :data="effectimages" />
      <CarouselText />
      <v-img src="img/portfolio-custom-background-img-1.jpg" alt="" />
      <div class="images-titles">
        <div class="images-section-title1">
          Boundless creativity and dedication paired with a bold approach to
          problem-solving have always been the modus operandi of our team of
          creatives.
        </div>
        <div class="images-section-title2">
          Want to join the team? Sparkling minds wanted
        </div>
        <div class="images-section-title-apply">Apply now!</div>
      </div>
      <Introduction :people="peoples" />
      <div class="progress-content">
        <div class="left-title">
          We develop creative solutions for small and big brands alike, build
          authentic product identities and much more.
        </div>
        <div class="progress-titles">
          <div style="display: flex">
            <div class="progress-title1">Concept</div>
            <div class="progress-title2">75%</div>
          </div>
          <div class="progressbar">
            <div class="progress-quality1"></div>
            <div style="display: flex; padding-top: 50px">
              <div class="progress-title1">Pre-production</div>
              <div class="progress-title2">62%</div>
            </div>
            <div class="progressbar">
              <div class="progress-quality2"></div>
            </div>
            <div style="display: flex; padding-top: 50px">
              <div class="progress-title1">Production</div>
              <div class="progress-title2">82%</div>
            </div>
            <div class="progressbar">
              <div class="progress-quality3"></div>
            </div>
          </div>
        </div>
      </div>
      <GoogleMap />
      <PeopleImages :image="peopleimages" />
      <Footer />
      <ScrollToUp />
    </div>
  </v-app>
</template>

<script>
import EffectImages from "./components/effectimages/effectImage";
import CarouselText from "./components/carouselText/carouseltexts";
import Introduction from "./components/images/people";
import GoogleMap from "./components/map/googlemap";
import PeopleImages from "./components/people/image";
import Footer from "./components/footer/footer";
import ScrollToUp from "./components/scrollup/toup";

import "./styles/bootstrap.min.css";
import "./styles/font-awesome.min.css";

export default {
  components: {
    EffectImages,
    CarouselText,
    Introduction,
    GoogleMap,
    PeopleImages,
    Footer,
    ScrollToUp,
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      isOpen: false,
      sticky: false,
      srcs: [
        "img/main-portfolio1-img-1.jpg",
        "img/main-portfolio1-img-2.jpg",
        "img/main-portfolio1-img-3.jpg",
      ],
      effectimages: [
        {
          left_src: "main-portfolio-img-1.jpg",
          left_title: "Photography",
          title: "Design",
          left_height: "714px",
          right_src: "main-portfolio-img-2.jpg",
          right_title: "Simple Design",
          right_height: "498px",
        },
        {
          left_src: "main-portfolio-img-3.jpg",
          left_title: "Collage",
          title: "Design",
          left_height: "544px",
          right_src: "main-portfolio-img-4.jpg",
          right_title: "Simple Design",
          right_height: "411px",
        },
        {
          left_src: "main-portfolio-img-5.jpg",
          left_title: "Responsive",
          title: "Design",
          left_height: "387px",
          right_src: "main-portfolio-img-6.jpg",
          right_title: "Photoshooting",
          right_height: "735px",
        },
      ],
      peopleimages: [
        {
          src: "Blog-list-main-img-1.jpg",
          title1: "Visualization as a mean of modern communication",
          title2: "January 20, 2020 / Inspiration",
        },
        {
          src: "Blog-list-main-img-2.jpg",
          title1: "Understanding the drive behind your inspiration",
          title2: "January 20, 2020 / Inspiration",
        },
        {
          src: "Blog-list-main-img-3.jpg",
          title1: "How to become an industry leader and inspire others",
          title2: "January 20, 2020 / Inspiration",
        },
      ],
      peoples: [
        {
          src: "main-team-img-1.jpg",
          name: "Michael Simenson",
          job: "Web Developer",
        },
        {
          src: "main-team-img-2.jpg",
          name: "Jeanis Green",
          job: "Photographer",
        },
        {
          src: "main-team-img-3.jpg",
          name: "Oleg Johanson",
          job: "Web Developer",
        },
        {
          src: "main-team-img-4.jpg",
          name: "Isidora Rutta",
          job: "Designer",
        },
        {
          src: "main-team-img-5.jpg",
          name: "John the dog",
          job: "Official Calmer",
        },
      ],
      titles: ["Generative", "Creative", "Wilderness"],
    };
  },
  methods: {
    handleScroll() {
      const scrolled = window.scrollY;
      if (scrolled > 50) {
        this.sticky = true;
      } else if (scrolled <= 50) {
        this.sticky = false;
      }
    },
  },
  created: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
.navigation-bar {
  background: transparent;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  transition: all 0.4s;
  display: table;
  align-items: center;
}
.navbar {
  vertical-align: middle;
  height: 100px;
  width: 100%;
  padding: 0;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 0 !important;
  -ms-flex-pack: justify;
  .nav-menu {
    .nav-item {
      position: relative;
      &:hover {
        .nav-content {
          display: block;
        }
      }
      .nav-content {
        position: absolute;
        display: none;
        top: 100px;
        background-color: #111;
        left: 0;
        width: 270px;
        padding-left: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
        color: white;
        font-size: 15px;
        li {
          padding-bottom: 15px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
            ul {
              display: block;
              position: absolute;
              left: 250px;
              top: 0;
              width: 270px;
              padding-top: 20px;
              padding-left: 50px;
              background: #111;
            }
          }
          ul {
            display: none;
          }
        }
      }
    }
  }
}
.logo {
  height: 100px;
}
.app {
  background: #050505;
  color: white;
  height: 100%;
}
.nav-link {
  font-size: 16px;
  margin-left: 20px;
  font-weight: bold;
  color: white !important;
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
.nav-menu {
  display: flex;
  list-style: none;
  align-items: center;
}

.textwidget {
  display: flex;
  margin-left: auto;
  align-items: center;
  margin-right: 20px;
}

.carousel-section-title {
  font-family: Roboto, sans-serif;
  padding-left: 100px;
  padding-top: 100px;
  padding-right: 198px;
  font-weight: 700;
  font-size: 42px;
  display: grid;
  @media (max-width: 1024px) {
    padding-left: 100px;
    font-size: 37px;
  }
  @media (max-width: 768px) {
    padding-left: 70px;
    padding-right: 70px;
    font-size: 33px;
  }
  @media (max-width: 425px) {
    padding-left: 50px;
    padding-right: 50px;
    font-size: 30px;
  }
}
.images-section-title1 {
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
.images-section-title-apply {
  font-size: 40px;
  color: white;
  font-weight: 700 !important;
  line-height: 1.143em;
  font-family: Roboto, sans-serif;
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
}
.images-section-title2 {
  font-size: 40px;
  color: white;
  font-weight: 700 !important;
  line-height: 1.143em;
  font-family: Roboto, sans-serif;
  padding-top: 40px;
  padding-bottom: 10px;
  @media (max-width: 1024px) {
    font-size: 37px;
  }
  @media (max-width: 768px) {
    font-size: 33px;
  }
  @media (max-width: 425px) {
    font-size: 30px;
  }
}
.progress-content {
  display: flex;
  width: 100%;
  padding-left: 50px;
  padding-right: 100px;
  padding-top: 200px;
  flex-wrap: wrap;
  background: #050505;
  @media (max-width: 426px) {
    padding-left: 0;
    padding-right: 0;
  }
}
.left-title {
  width: 58%;
  color: white;
  font-size: 40px;
  padding-bottom: 10px;
  font-weight: 700;
  padding-left: 100px;
  font-family: Roboto, sans-serif;
  line-height: 1.143em;
  @media (max-width: 1024px) {
    font-size: 37px;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 33px;
  }
  @media (max-width: 426px) {
    font-size: 31px;
    padding-left: 30px;
    padding-right: 30px;
  }
}
.progress-titles {
  color: white;
  font-size: 20px;
  width: 40%;
  padding-left: 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    padding-top: 50px;
  }
  @media (max-width: 426px) {
    padding-left: 30px;
    padding-right: 50px;
  }
}
.progress-title2 {
  margin-left: auto;
  font-weight: 700;
  font-family: Roboto, sans-serif;
}

.progress-title1 {
  font-family: Roboto, sans-serif;
  font-weight: 700;
}
.progressbar {
  background-color: rgb(46, 47, 48);
  border-radius: 0px;
  height: 2px;
  width: 100%;
}
.progress-quality3 {
  background-color: rgb(255, 255, 255);
  height: 2px;
  border-radius: 0px;
  width: 82%;
}
.progress-quality2 {
  background-color: rgb(255, 255, 255);
  height: 2px;
  border-radius: 0px;
  width: 62%;
}
.progress-quality1 {
  background-color: rgb(255, 255, 255);
  height: 2px;
  border-radius: 0px;
  width: 75%;
}
.images-titles {
  padding-left: 150px;
  padding-top: 100px;
  padding-right: 100px;
  @media (max-width: 1024px) {
    padding-left: 100px;
  }
  @media (max-width: 768px) {
    padding-left: 70px;
    padding-right: 70px;
  }
  @media (max-width: 425px) {
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>
