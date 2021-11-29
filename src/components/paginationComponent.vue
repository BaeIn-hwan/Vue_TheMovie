<template>
  <div>
    <template v-if="loading == false">
      test
    </template>
    <template v-else-if="loading == true">
      <div class="movie-pagination">
        <button
          type="button"
          class="movie-pagination__btn movie-pagination__btn--first"
          v-if="pagination.rowCount < pageArray.length"
          :style="pageGroupNum == 1 ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.rowCount * (pageGroupNum - 1));"
        >
          <span class="blind">첫 페이지</span>
        </button>

        <button
          type="button"
          class="movie-pagination__btn movie-pagination__btn--prev"
          :style="pagination.current == 1 ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.current - 1);"
        >
          <span class="blind">이전 페이지</span>
        </button>

        <ul class="movie-pagination__box">
          <li class="movie-pagination__list" v-for="(idx, index) in pageViewArray" :key="index">
            <a
              href="#"
              class="movie-pagination__btn movie-pagination__btn--number"
              :class="pagination.current == idx ? 'on' : ''"
              @click.prevent="pageMove($event, idx);"
            >
              <span>{{idx}}</span>
            </a>
          </li>      
        </ul>

        <button
          type="button"
          class="movie-pagination__btn movie-pagination__btn--next"
          :style="pagination.current == pageArray[pageArray.length - 1] ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.current + 1);"
        >
          <span class="blind">다음 페이지</span>
        </button>

        <button
          type="button"
          class="movie-pagination__btn movie-pagination__btn--last"
          v-if="pagination.rowCount < pageArray.length"
          :style="pageArray.length / pagination.rowCount == pageGroupNum ? 'visibility: hidden' : ''"
          @click.prevent="pageMove($event, pagination.rowCount * pageGroupNum + 1);"
        >
          <span class="blind">마지막 페이지</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "paginationComponent",

  props: {
    "pagination":  {
      type: Object,
      default: () => {
        return {
          id: null,
          current: 1,
          rowCount: 5,
          listLength: 20,
          total: 0,
        }
      },
      required: true
    },
    "loading": {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      pageGroupNum: 1,
      pageArray: [],
      pageViewArray: [],
    }
  },

  methods: {
    pageInit() {
      this.pageArray = [];
      const pageCount = Math.ceil(this.pagination.total / this.pagination.listLength);
      const _current = this.pagination.current;

      for (let i = 1; i <= pageCount; i++) {
        this.pageArray.push(i);
      }

      this.pageDraw(_current);
    },
    pageDraw(_current) {
      const rowCount = this.pagination.rowCount;
      const pageDivision = Math.ceil(this.pageArray.length / rowCount);
      let firstPage = 1;
      let lastPage = rowCount;

      for (let i = 0; i < pageDivision; i++) {
        if (firstPage + rowCount * i <= _current && _current <= lastPage + rowCount * i) {
          this.pageGroupNum = i + 1;
          this.pageViewArray = this.pageArray.slice((firstPage + rowCount * i) - 1, lastPage + rowCount * i);
        }
      }
    },
    pageMove(e, pageNumber) {
      this.$emit("movePage", {
        e,
        id: this.pagination.id,
        pageNumber,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-pagination {
  margin-top: 50px;
  font-size: 0;
  text-align: center;

  &__btn {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    vertical-align: top;

    &--first {
      margin-right: 10px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat 0 0;
    }

    &--prev {
      margin-right: 10px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -30px 0;
    }

    &--number {
      display: block;
      font-size: 0;
      color: #BBB;

      span {
        display: inline-block;
        position: relative;
        padding: 0 3px;
        font-size: 16px;
        vertical-align: middle;
      }

      &.on {
        color: #FFF;

        span {
          &:before {
            content: '';
            position: absolute;
            bottom: -7px;
            left: 0; 
            width: 100%;
            height: 2px;
            background: #FFF;
          }
        }
      }
    }

    &--next {
      margin-left: 10px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -60px 0;
    }

    &--last {
      margin-left: 10px;
      background: url("~@/assets/images/common/ico_comm_paging-arrow.png") no-repeat -90px 0;
    }
  }

  &__box {
    display: inline-block;
    margin: 0 -5px;
    font-size: 0;
    vertical-align: top;
  }

  &__list {
    display: inline-block;
    margin: 0 5px;
    vertical-align: top;
  }
}
</style>