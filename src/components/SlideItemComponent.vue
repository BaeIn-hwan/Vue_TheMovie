<template>
  <div class="movie-item">
    <template v-if="loading == false">
      <div class="movie-item__wrapper swiper-container skeleton">
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

    <template v-else-if="loading == true">
      <div class="movie-item__wrapper swiper-container" ref="itemSlider">
        <ul class="movie-item__box swiper-wrapper">
          <template v-if="listData && listData.length">
            <li class="movie-item__list swiper-slide" v-for="(list, index) in listData" :key="index">
              <router-link :to="`/ViewDetail/${list.media_type || listType}/${list.id}`" class="movie-item__link">
                <figure class="movie-item__img">
                  <img alt="" :src="`${$store.state.imgURL}/w300_and_h450_face${list.poster_path}`">

                  <template v-if="(list.media_type == 'movie' || listType == 'movie') || (list.media_type == 'tv' || listType == 'tv')">
                    <div class="movie-item__badge">
                      <template v-if="list.media_type == 'movie' || listType == 'movie'">
                        <span class="movie-item__badge__genre movie-item__badge__genre--movie">MOVIE</span>
                      </template>
                      <template v-if="list.media_type == 'tv' || listType == 'tv'">
                        <span class="movie-item__badge__genre movie-item__badge__genre--tv">TV</span>
                      </template>
                    </div>
                  </template>
                </figure>

                <div class="movie-item__info">
                  <span class="movie-item__info__title">{{list.title || list.name}}</span>
                </div>
              </router-link>
            </li>
          </template>

          <template v-else>
            <li>리스트가 없습니다.</li>
          </template>
        </ul>

        <div class="movie-item__controller">
          <button type="button" class="movie-item__controller__btn movie-item__controller__btn--prev" ref="itemNavPrev">
            <span class="blind">이전</span>
          </button>

          <button type="button" class="movie-item__controller__btn movie-item__controller__btn--next" ref="itemNavNext">
            <span class="blind">다음</span>
          </button>
        </div>
      </div>
    </template>

    <template v-else-if="loading == 'error'">
      에러
    </template>
  </div>
</template>

<script>
import common from "@/assets/js/common.js";

export default {
  name: "SlideItemComponent",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    listType: {
      type: String,
      default: "movie",
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      movieSlider: null,
      alert: {
				isOpen: true,
				msg: ""
			}
    }
  },
  mounted() {
  },
  methods: {
    itemSlider() {
      this.movieSlider = new this.Swiper(this.$refs["itemSlider"], {
        slidesPerView: "auto",
        navigation: {
          prevEl: this.$refs["itemNavPrev"],
          nextEl: this.$refs["itemNavNext"]
        }
      });
    },
    imgError(e) {
			common.imgError(e);
		},
  }
}
</script>

<style lang="scss" scoped>
.movie-item {
  &__wrapper {
    margin-top: 30px;

    &:hover {
      .movie-item__controller__btn {
        visibility: visible;
        opacity: 1;
        transform: translate3d(0, -50%, 0);
      }
    }
  }

  &__box {
    font-size: 0;
  }

  &__list {
    display: inline-block;
    width: 236px;
    margin-right: 15px;
    vertical-align: top;

    &:last-child {
      margin-right: 0;
    }
  }

  &__link {
    display: block;
  }

  &__img {
    overflow: hidden;
    position: relative;
    font-size: 0;

    &:before {
      content: '';
      display: block;
      padding-top: 150%;
    }

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      margin: auto;
    }
  }

  &__badge {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    font-size: 0;

    &__genre {
      display: inline-block;
      height: 20px;
      min-width: 60px;
      padding: 0 10px;
      font-size: 12px;
      color: #FFF;
      line-height: 20px;
      letter-spacing: -.025em;
      text-align: center;

      &--movie {
        background: #df8c70;
      }

      &--tv {
        background: #abbce6;
      }
    }
  }

  &__info {
    margin-top: 14px;

    &__title {
      display: block;
      overflow: hidden;
      font: {
        size: 18px;
        weight: 500;
      };
      color: #FFF;
      line-height: 27px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &__controller {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 345px;
    
    &__btn {
      position: absolute;
      z-index: 2;
      top: 50%;
      width: 40px;
      height: 40px;
      transform: translate3d(0, -75%, 0);
      visibility: hidden;
      opacity: 0;
      transition: visibility .35s, opacity .35s, transform .35s;

      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5) url("~@/assets/images/common/ico_comm_controller.png") no-repeat 0 0;
      }

      &.swiper-button-disabled {
        &:before {
          opacity: 0.5;
        }
      }

      &--prev {
        left: 0;
        
      }

      &--next {
        right: 0;

        &:before {
          background-position: -40px 0;
        }
      }
    }
  }

  .skeleton {
    .movie-item {
      &__img {
        background: #DDD;
      }

      &__info__title {
        height: 27px;
        background: #DDD;
      }
    }
  }
}
</style>