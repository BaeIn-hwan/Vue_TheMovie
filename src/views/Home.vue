<template>
  <div class="main">
    <!-- 트랜딩 -->
    <section class="main__section movie__section">
      <div class="movie__header">
        <h2 class="movie__title">
          <span>TODAY TRENDING</span>
        </h2>

        <div class="movie__filter">
          <ul class="movie__filter__box">
            <li class="movie__filter__list">
              <label class="movie__filter__label">
                <input type="radio" name="trand-filter" class="blind" value="all" v-model="trandType">
                <span>ALL</span>
              </label>
            </li>

            <li class="movie__filter__list">
              <label class="movie__filter__label">
                <input type="radio" name="trand-filter" class="blind" value="movie" v-model="trandType">
                <span>MOVIE</span>
              </label>
            </li>

            <li class="movie__filter__list">
              <label class="movie__filter__label">
                <input type="radio" name="trand-filter" class="blind" value="tv" v-model="trandType">
                <span>TV</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <SlideItemComponent :listData="trendList" :loading="loading.trendLoad" ref="trendComponent" />
    </section>

    <!-- 인기 -->
    <section class="main__section movie__section">
      <div class="movie__header">
        <h2 class="movie__title">
          <span>POPULAR</span>
        </h2>

        <div class="movie__filter">
          <ul class="movie__filter__box">
            <li class="movie__filter__list">
              <label class="movie__filter__label">
                <input type="radio" name="popular-filter" class="blind" value="movie" v-model="popularType">
                <span>MOVIE</span>
              </label>
            </li>

            <li class="movie__filter__list">
              <label class="movie__filter__label">
                <input type="radio" name="popular-filter" class="blind" value="tv" v-model="popularType">
                <span>TV</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <SlideItemComponent :listType="popularType" :listData="popularList" :loading="loading.popularLoad" ref="popularComponent" />
    </section>

    <!-- 최신 예고편 -->
    <section class="main__section movie__section">
      <div class="movie__header">
        <h2 class="movie__title">
          <span>UPCOMING</span>
        </h2>
      </div>

      <SlideItemComponent :listType="'movie'" :listData="upcomingList" :loading="loading.upcomingLoad" ref="upcomingComponent" />
    </section>
  </div>
</template>

<script>
import SlideItemComponent from "@/components/SlideItemComponent.vue";

export default {
  name: 'Home',
  components: {
    SlideItemComponent,
  },
  data() {
    return {
      loading: {
        trendLoad: false,
        popularLoad: false,
        upcomingLoad: false,
      },
      parameters: {
        trendPrams: {
          page: 1,
          language: "ko"
        },
        popularPrams: {
          page: 1,
          language: "ko"
        },
        upcomingPrams: {
          page: 1,
          language: "ko"
        }
      },
      trendList: [],
      trandType: "all",
      popularList: [],
      popularType: "movie",
      upcomingList: [],
      upcomingType: "movie",
    }
  },
  mounted() {
    this.getTrendItem();
    this.getPopularItem();
    this.getUpcomingItem();
  },
  watch: {
    "trandType": {
      handler(newValue, oldValue) {
        this.loading.trendLoad = false;
         this.$refs.trendComponent.movieSlider.destroy();
        this.getTrendItem();
      }
    },
    "popularType": {
      handler(newValue, oldValue) {
        this.loading.popularLoad = false;
        this.$refs.popularComponent.movieSlider.destroy();
        this.getPopularItem();
      }
    }
  },
  methods: {
    async getTrendItem() {
      try {
        const response = await this.$store.dispatch("requestMethod", {
          method: "GET",
          url: `/trending/${this.trandType}/day`,
          data: this.parameters.trendPrams
        });

        if (response.data && response.data.results && response.data.results.length) {
          this.loading.trendLoad = true;
          this.trendList = response.data.results;

          this.$nextTick(function() {
            this.$refs.trendComponent.itemSlider();
          });
        }
        else {
          this.trendList = [];
        }
      }
      catch(e) {
        this.loading.trendLoad = "error";
				console.error("error", e);
      }
    },

    async getPopularItem() {
      try {
        const response = await this.$store.dispatch("requestMethod", {
          method: "GET",
          url: `/${this.popularType}/popular`,
          data: this.parameters.popularPrams
        });

        if (response.data && response.data.results && response.data.results.length) {
          this.loading.popularLoad = true;
          this.popularList = response.data.results;

          this.$nextTick(function() {
            this.$refs.popularComponent.itemSlider();
          });
        }
        else {
          this.popularList = [];
        }
      }
      catch(e) {
        this.loading.popularLoad = "error";
				console.error("error", e);
      }
    },

    async getUpcomingItem() {
      try {
        const response = await this.$store.dispatch("requestMethod", {
          method: "GET",
          url: `/movie/upcoming`,
          data: this.parameters.upcomingPrams
        });

        if (response.data && response.data.results && response.data.results.length) {
          this.loading.upcomingLoad = true;
          this.upcomingList = response.data.results;

          this.$nextTick(function() {
            this.$refs.upcomingComponent.itemSlider();
          });
        }
        else {
          this.upcomingList = [];
        }
      }
      catch(e) {
        this.loading.upcomingLoad = "error";
				console.error("error", e);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  &__section {
    margin-top: 80px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>