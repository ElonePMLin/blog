<script>
import { ref } from 'vue';
export default {
  setup() {
    const toastType = ref(null);
    const toastMsg = ref('测试Toast')
    const toastTimer = ref(null)
    const toastDiv = ref(null)
    const toastBgColor = ref(null)
    const timeout = ref(3000)

    return {
      toastType, toastMsg, toastTimer, 
      toastBgColor,
      toastDiv, timeout
    }
  },
  methods: {
    resetToast(timeout=2500) {
      setTimeout(() => {
        this.toastType = null
        this.toastMsg = null
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
      }, timeout + 1)
    },
    warningToast(msg, timeout=2500) {
      this.toastType = 'warning'
      this.toastMsg = msg
      this.toastDiv.style.transform = 'translateY(45px)'
      this.toastBgColor = "var(--el-color-warning)"
      this.timeout = timeout

      this.toastTimer = setTimeout(() => {
        this.toastDiv.style.transform = 'translateY(-100px)'
        this.resetToast(1)
      }, timeout)
    },
    successToast(msg, timeout=2500) {
      this.toastType = 'success'
      this.toastMsg = msg
      this.toastDiv.style.transform = 'translateY(45px)'
      this.toastBgColor = "var(--el-color-primary)"
      this.timeout = timeout

      this.toastTimer = setTimeout(() => {
        this.toastDiv.style.transform = 'translateY(-100px)'
        this.resetToast(1)
      }, timeout)
    },
    errorToast(msg, timeout=2500) {
      this.toastType = 'error'
      this.toastMsg = msg
      this.toastDiv.style.transform = 'translateY(45px)'
      this.toastBgColor = "var(--el-color-danger)"
      this.timeout = timeout

      this.toastTimer = setTimeout(() => {
        this.toastDiv.style.transform = 'translateY(-100px)'
        this.resetToast(1)
      }, timeout)
      
    },
    infoToast(msg, timeout=2500) {
      this.toastType = 'info'
      this.toastMsg = msg
      this.toastDiv.style.transform = 'translateY(45px)'
      this.toastBgColor = "var(--el-color-info)"
      this.timeout = timeout

      this.toastTimer = setTimeout(() => {
        this.toastDiv.style.transform = 'translateY(-100px)'
        this.resetToast(1)
      }, timeout)
      
    },
    handleOverHover() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer)
        this.toastTimer = null
      }
    },
    handleLeaveHover() {
      if (this.toastTimer) return
      this.toastTimer = setTimeout(() => {
        this.toastDiv.style.transform = 'translateY(-100px)'
        this.resetToast(1)
      }, this.timeout - 1000 > 0 ? this.timeout - 1000 : 1000 )
    },
    closeToast() {
      this.toastTimer = null
      this.toastDiv.style.transform = 'translateY(-100px)'
      this.resetToast(1)
    }
  }

}
</script>


<template>
  <div ref="toastDiv" class="toast-wrapper">
    <div class="toast-box"
      @mouseover="handleOverHover" @mouseout="handleLeaveHover"
      :style="{backgroundColor: toastBgColor}"
    >
      <div class="toast-type">
        <SvgIcon v-if="toastType" class="svg" :svgName="toastType" />
      </div>
      <div class="toast-text">{{ toastMsg }}</div>
      <div class="taost-close" @click="closeToast">
        <SvgIcon class="close-svg svg" svgName="close"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-wrapper {
  position: absolute;
  /* top: 45px; */
  top: 0px;
  transition: 1s ease;
  color: var(--text-color);
  transform: translateY(-100px);

  @media (min-width: 1119px) {
    left: calc((100% - 200px) / 2 + 200px - 70px);
  }
  @media (max-width: 1118px) {
    left: calc(50% - 70px);
  }
  

  .toast-box {
    z-index: 9999999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 50px;
    border-radius: 5px;
    /* background-color: var(--bg-color); */
    box-shadow: 0px 0px 10px 1px var(--text-color1);
    margin-bottom: 10px;

    &:hover {
      .close-svg {
        cursor: pointer;
        opacity: 1;
      }
    }

    .svg {
      vertical-align: -3px;
      width: 1.2rem;
      height: 1.2rem;
      transition: 1s ease;
    }
    .toast-type {
      margin-right: 5px;
    }
    .toast-text {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
    .taost-close {
      margin-left: 5px;
    }
    .close-svg {
      opacity: 0;
    }
  }
}
</style>
