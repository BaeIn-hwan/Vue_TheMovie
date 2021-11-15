<template>
  <div class="alert-layer">
    <div class="alert-layer__wrapper">
      <p class="alert-layer__txt" v-html="message"></p>
      <button type="button" class="alert-layer__btn--close" @click="alertClose($event);">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    }
  },

  methods: {
    alertClose(e) {
      this.$emit("alert-close", e);
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-layer {
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
    max-width: 500px;
    background: #FFF;
    transform: translate(-50%, -50%);
  }

  &__txt {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    overflow-y: auto;
    min-height: 100px;
    padding: 25px;
    font-size: 16px;
    line-height: 24px;
  }

  &__btn {
    &--close {
      width: 100%;
      height: 40px;
      background: #000;
      font-size: 14px;
      color: #FFF;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>