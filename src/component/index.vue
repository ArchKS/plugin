<template>
  <transition name="toast">
    <div
      :style="{ width: `${width}px`, height: `${height}px` }"
      :class="[`toast-content`, `toast-text-${type}`, position]"
      v-if="ifShow"
    >
      <span :class="[`icon`, `${getIconClass}`, `iconfont`]"></span>
      <span class="text">{{ text }}</span>
      <span class="close iconfont icon-cancel1" @click="closeToast"> </span>
    </div>
  </transition>
</template>
<script>
export default {
  /* 文本     text
   * 位置     position
   * 宽度     width
   * 高度     height
   * 类型     type
   * 持续时间 time
   * 自动关闭 autoClose
   * 回调函数 callback
   * */
  name: "v-toast",
  props: {
    text: {
      type: String,
      default: "温馨提示",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 60,
    },
    position: {
      type: String,
      default: "topRight",
      validator: (v) =>
        ["topLeft", "topRight", "center", "bottomLeft", "bottomRight"].indexOf(
          v
        ) !== -1,
    },
    type: {
      type: String,
      default: 'warning',
      validator: (v) =>
        ["success", "error", "warning", "info"].indexOf(v) !== -1,
    },
    time: {
      type: Number,
      default: 3000,
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    callback: {
      type: Function,
    },
  },
  computed: {
    getIconClass() {
      switch (this.type) {
        case "success":
          return "icon-chenggong";
        case "info":
          return "icon-info";
        case "warning":
          return "icon-warning";
        case "error":
          return "icon-error";
      }
    },
  },
  data() {
    return {
      ifShow: false,
    };
  },
  methods: {
    closeToast() {
      this.ifShow = false;
      this.callback && this.callback();
    },
    showToast() {
      this.ifShow = true;
    },
    autoClosed() {
      if (this.autoClose === true) {
        console.log("执行了autoclose");
        setTimeout(() => {
          this.closeToast();
        }, this.time);
      }
    },
  },
  mounted() {
    console.log(this.$props);
    this.showToast();
    this.autoClosed();
  },
};
</script>
<style lang='scss'>
@import url(//at.alicdn.com/t/font_2374998_qeits9akfx.css);
html,
body {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}

@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.toast-content {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.14);
  @include center;

  .icon {
    font-size: 36px;
    position: absolute;
    top: calc(50%-20px);
    left: 15px;
  }
  .text {
    font-size: 16px;
    margin-left: 30px;
  }
  .close {
    position: absolute;
    top: 0px;
    right: 5px;
    padding: 3px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: red !important;
    }
  }
}

/* 位置 */
.topLeft {
  left: 0;
  top: 10px;
}
.topRight {
  right: 0;
  top: 10px;
}
.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bottomLeft {
  left: 0;
  bottom: 50px;
}
.bottomRight {
  right: 0;
  bottom: 50px;
}

/* 主题 */
.toast-text-info {
  color: #000;
  background-color: #fff;
}
.toast-text-success {
  color: #fff;
  background-color: #0c8829;
  .text {
    color: #fff;
  }
}
.toast-text-warning {
  background: #f5cf87;
  color: #000;
}
.toast-text-error {
  background: #ff5252;
  color: #fff;
}

/* 动画效果 */
.toast-enter-to,
.toast-leave {
  opacity: 1;
}

.toast-leave-to,
.toast-enter {
  opacity: 0;
}

.toast-leave-active,
.toast-enter-active {
  transition: all 0.3s ease-in-out;
}
</style>