<template>
  <div class="modal-layer">
    <div class="modal-layer__wrapper" :style="`${width ? 'width: ' + width + 'px;' : ''}${height ? 'height: ' + height + 'px;' : ''}`">
      <div class="modal-layer__header">
        <strong class="modal-layer__title">{{title}}</strong>
        <button type="button" class="modal-layer__btn--close" @click="modalClose($event);">
          <span class="blind" @click="modalClose($event);">모달 닫기</span>
        </button>
      </div>

      <div class="modal-layer__cont">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: ""
    },
    height: {
      type: Number,
      default: ""
    }
  },

  methods: {
    modalClose(e) {
      this.$emit("modal-close", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-layer {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 300px;
    max-width: 700px;
    max-height: 700px;
    background: #FFF;
    transform: translate(-50%, -50%);
  }

  &__header {
    position: relative;
    width: 90%;
    height: 62px;
    margin: 0 auto;
    border-bottom: 2px solid #000;
    line-height: 60px;
  }

  &__title {
    font: {
      size: 20px;
      weight: 600;
    };
  }

  &__cont {
    overflow: hidden;
    overflow-y: auto;
    min-height: 100px;
    max-height: 638px;
  }

  &__btn {
    &--close {
      position: absolute;
      top: 50%;
      right: 0;
      width: 24px;
      height: 24px;
      transform: rotate(45deg) translate3d(0, -50%, 0);
      transform-origin: 50% 0;
      
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 2px;
        background: #000;
        transform: translate3d(-50%, -50%, 0);
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 100%;
        background: #000;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
}
</style>