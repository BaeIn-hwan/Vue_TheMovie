<template>
  <div class="movie-item">
    <template v-if="loading == false">
      <div class="movie-item__wrapper skeleton">
        <ul class="movie-item__box">
          <li class="movie-item__list" v-for="index in 20" :key="index">
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
      <div class="movie-item__wrapper">
        <ul class="movie-item__box">
          
          <template v-if="itemData && itemData.length">
            <li class="movie-item__list swiper-slide" v-for="(list, index) in itemData" :key="index">
              <router-link :to="`/ViewDetail/${listType}/${list.id}`" class="movie-item__link">
                <figure class="movie-item__img">
                  <img :alt="list.title || list.name" v-lazy="`${$store.state.imgURL}/w300_and_h450_face${list.poster_path}`">
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
      </div>
    </template>

    <template v-else-if="loading == 'error'">
      에러
    </template>
  </div>
</template>

<script>
export default {
  name: "ListItemComponent",
  props: {
    listType: {
      type: String,
      default: 'movie',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    itemData: {
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
  }
}
</script>

<style lang="scss" scoped>
.movie-item {
  &__wrapper {
    margin-top: 30px;
  }

  &__box {
    font-size: 0;
  }

  &__list {
    display: inline-block;
    width: 236px;
    margin: 50px 0 0 15px;
    vertical-align: top;

    &:nth-child(-n + 5) {
      margin-top: 0;
    }

    &:nth-child(5n + 1) {
      margin-left: 0;
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

      &[lazy="loading"] {
        width: 64px;
        height: 64px;
      }
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