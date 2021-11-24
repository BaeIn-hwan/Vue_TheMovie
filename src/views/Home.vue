<template>
  <div class="main">
    <!-- 트랜딩 -->
    <section class="movie-section">
      <div class="movie-header">
        <h2 class="movie-title">
          <span>TODAY TRENDING</span>
        </h2>

        <div class="movie-filter">
          <ul class="movie-filter__box">
            <li class="movie-filter__list">
              <label class="movie-filter__label">
                <input type="radio" name="trand-filter" class="blind" value="all" v-model="trandType">
                <span>ALL</span>
              </label>
            </li>

            <li class="movie-filter__list">
              <label class="movie-filter__label">
                <input type="radio" name="trand-filter" class="blind" value="movie" v-model="trandType">
                <span>MOVIE</span>
              </label>
            </li>

            <li class="movie-filter__list">
              <label class="movie-filter__label">
                <input type="radio" name="trand-filter" class="blind" value="tv" v-model="trandType">
                <span>TV</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <template v-if="loading.trendLoad == false">
        <div class="movie-item swiper-container skeleton">
          <ul class="movie-item__box swiper-wrapper">
            <li class="movie-item__list swiper-slide" v-for="index in 5" :key="index">
              <a href="#" class="movie-item__link" @click.prevent>
                <figure class="movie-item__img"></figure>

                <div class="movie-item__info">
                  <span class="movie-item__info__title"></span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </template>

      <template v-else-if="loading.trendLoad == true">
          <div class="movie-item carousel swiper-container" ref="trendSlider">
            <ul class="movie-item__box swiper-wrapper">
              <template v-if="trendList && trendList.length">
                <li class="movie-item__list swiper-slide" v-for="(list, index) in trendList" :key="index">
                  <a href="#" class="movie-item__link" :data-id="list.id">
                    <figure class="movie-item__img">
                      <img :src="$store.state.imgURL +'/w300_and_h450_face'+ list.poster_path" alt="">

                      <template v-if="list.media_type == 'movie' || list.media_type == 'tv'">
                        <div class="movie-item__badge">
                          <template v-if="list.media_type == 'movie'">
                            <span class="movie-item__badge__genre movie-item__badge__genre--movie">MOVIE</span>
                          </template>
                          <template v-if="list.media_type == 'tv'">
                            <span class="movie-item__badge__genre movie-item__badge__genre--tv">TV</span>
                          </template>
                        </div>
                      </template>
                    </figure>

                    <div class="movie-item__info">
                      <span class="movie-item__info__title">{{list.title || list.name}}</span>
                    </div>
                  </a>
                </li>
              </template>

              <template v-else>
                <li>리스트가 없습니다.</li>
              </template>
            </ul>

            <div class="carousel__controller">
              <button type="button" class="carousel__controller__btn carousel__controller__btn--prev" ref="trendNavPrev">
                <span class="blind">이전</span>
              </button>

              <button type="button" class="carousel__controller__btn carousel__controller__btn--next" ref="trendNavNext">
                <span class="blind">다음</span>
              </button>
            </div>
          </div>
      </template>

      <template v-else-if="loading.trendLoad == 'error'">
        에러
      </template>
    </section>

    <!-- 인기 -->
    <section class="movie-section">
      <div class="movie-header">
        <h2 class="movie-title">
          <span>POPULAR</span>
        </h2>

        <div class="movie-filter">
          <ul class="movie-filter__box">
            <li class="movie-filter__list">
              <label class="movie-filter__label">
                <input type="radio" name="popular-filter" class="blind" value="movie" v-model="popularType">
                <span>MOVIE</span>
              </label>
            </li>

            <li class="movie-filter__list">
              <label class="movie-filter__label">
                <input type="radio" name="popular-filter" class="blind" value="tv" v-model="popularType">
                <span>TV</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <template v-if="loading.popularLoad == false">
        <div class="movie-item swiper-container skeleton">
          <ul class="movie-item__box swiper-wrapper">
            <li class="movie-item__list swiper-slide" v-for="index in 5" :key="index">
              <a href="#" class="movie-item__link" @click.prevent>
                <figure class="movie-item__img"></figure>

                <div class="movie-item__info">
                  <span class="movie-item__info__title"></span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </template>

      <template v-else-if="loading.popularLoad == true">
          <div class="movie-item carousel swiper-container" ref="popularSlider">
            <ul class="movie-item__box swiper-wrapper">
              <template v-if="popularList && popularList.length">
                <li class="movie-item__list swiper-slide" v-for="(list, index) in popularList" :key="index">
                  <a href="#" class="movie-item__link" :data-id="list.id">
                    <figure class="movie-item__img">
                      <img :src="$store.state.imgURL +'/w300_and_h450_face'+ list.poster_path" alt="">

                      <template v-if="list.media_type == 'movie' || list.media_type == 'tv'">
                        <div class="movie-item__badge">
                          <template v-if="list.media_type == 'movie'">
                            <span class="movie-item__badge__genre movie-item__badge__genre--movie">MOVIE</span>
                          </template>
                          <template v-if="list.media_type == 'tv'">
                            <span class="movie-item__badge__genre movie-item__badge__genre--tv">TV</span>
                          </template>
                        </div>
                      </template>
                    </figure>

                    <div class="movie-item__info">
                      <span class="movie-item__info__title">{{list.title || list.name}}</span>
                    </div>
                  </a>
                </li>
              </template>

              <template v-else>
                <li>리스트가 없습니다.</li>
              </template>
            </ul>

            <div class="carousel__controller">
              <button type="button" class="carousel__controller__btn carousel__controller__btn--prev" ref="popularNavPrev">
                <span class="blind">이전</span>
              </button>

              <button type="button" class="carousel__controller__btn carousel__controller__btn--next" ref="popularNavNext">
                <span class="blind">다음</span>
              </button>
            </div>
          </div>
      </template>

      <template v-else-if="loading.popularLoad == 'error'">
        에러
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loading: {
        trendLoad: false,
        popularLoad: false,
      },
      parameters: {
        trend: {
          page: 1,
          language: "ko"
        },
        popular: {
          page: 1,
          language: "ko"
        },
      },
      trendList: [],
      trandType: "all",
      popularList: [],
      popularType: "movie",
    }
  },
  mounted() {
    this.getTrendItem();
    this.getPopularItem();
  },
  watch: {
    "trandType": {
      handler(newValue, oldValue) {        
        this.loading.trendLoad = false;
        this.getTrendItem();
      }
    },
    "popularType": {
      handler(newValue, oldValue) {
        this.loading.popularLoad = false;
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
          data: this.parameters.trend
        });

        if (response.data && response.data.results && response.data.results.length) {
          this.loading.trendLoad = true;
          this.trendList = response.data.results;

          this.$nextTick(() => {
            this.trendSlider();
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
          data: this.parameters.popular
        });

        if (response.data && response.data.results && response.data.results.length) {
          this.loading.popularLoad = true;
          this.popularList = response.data.results;

          this.$nextTick(() => {
            this.popularSlider();
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

    trendSlider() {
      new this.Swiper(this.$refs["trendSlider"], {
        slidesPerView: "auto",
        navigation: {
          prevEl: this.$refs["trendNavPrev"],
          nextEl: this.$refs["trendNavNext"]
        }
      });
    },

    popularSlider() {
      new this.Swiper(this.$refs["popularSlider"], {
        slidesPerView: "auto",
        navigation: {
          prevEl: this.$refs["popularNavPrev"],
          nextEl: this.$refs["popularNavNext"]
        }
      });
    }
  }
}
</script>
