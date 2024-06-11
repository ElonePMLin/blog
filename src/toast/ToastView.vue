<script>
import { ref } from 'vue';
export default {
  setup() {
    const toastDiv = ref(null)
    const toastBox = ref([
      // {toastType: 'warning', backgroundColor: "var(--el-color-warning)", toastMsg: '测试1'},  // 30
      // {toastType: 'warning', backgroundColor: "var(--el-color-warning)", toastMsg: '测试2'},  // 90
      // {toastType: 'warning', backgroundColor: "var(--el-color-warning)", toastMsg: '测试3'},  // 150
    ])
    // const toastBox = ref({30: {}})
    const lastBox = ref(0)
    const toastTimeout = ref(3000)
    const autoLeaveIndex = ref(0)
    const delayTimeout = ref(0)

    return {
      toastDiv, toastBox, lastBox,
      toastTimeout, autoLeaveIndex, delayTimeout
    }
  },
  methods: {
    closeToast(index) {
      this.toastDiv[index].style.transform = 'translate(-50%, -100px)'
      this.toastDiv[index].style.opacity = '0'
      for (let i = index + 1; i < this.toastBox.length; i++) {
        this.toastDiv[i].style.top = this.toastDiv[i].style.top.split('px')[0] - 60 + 'px';
      }
      clearTimeout(this.toastBox[index].toastTimeout)
      this.autoLeaveIndex = this.autoLeaveIndex > index ? this.autoLeaveIndex - 1 : this.autoLeaveIndex
      this.lastBox -= 1
      setTimeout(() => {
        // console.log(this.toastBox.slice(0, index).concat(this.toastBox.slice(index + 1)));
        var tmp = new Array()
        for (let i = 0; i < this.toastBox.length; i++) {
          if (i == index) continue
          tmp.push(this.toastBox[i])
        }
        this.toastBox = tmp
        this.delayTimeout = tmp.length == 0 ? 0 : this.delayTimeout
        // this.toastBox = this.toastBox.slice(0, index).concat(this.toastBox.slice(index + 1));
        
      }, 300)
      
    },
    warningToast(msg) {
      // const index = this.lastBox
      const toastTimeout = setTimeout(() => {
        // console.log(index);
        this.closeToast(this.autoLeaveIndex)
      }, this.toastTimeout)
      // this.toastBox[this.lastBox]
      this.toastBox.push({
        toastType: 'warning',
        backgroundColor: "var(--el-color-warning)",
        toastMsg: msg,
        toastTimeout: toastTimeout
      })
      this.lastBox += 1
      setTimeout(() => {
        const length = this.toastDiv.length
        this.toastDiv[length - 1].style.top = 30 + (length - 1) * 60 + 'px'
      }, 10)
    },
    successToast(msg) {
      // const index = this.lastBox
      const toastTimeout = setTimeout(() => {
        this.closeToast(this.autoLeaveIndex)
        // this.toastBox.shift()
      }, this.toastTimeout)
      // this.toastBox[this.lastBox] = 
      this.toastBox.push({
        toastType: 'success',
        backgroundColor: "var(--el-color-primary)",
        toastMsg: msg,
        toastTimeout: toastTimeout
      })
      this.lastBox += 1
      setTimeout(() => {
        const length = this.toastDiv.length
        this.toastDiv[length - 1].style.top = 30 + (length - 1) * 60 + 'px'
      }, 10)
    },
    errorToast(msg) {
      // const index = this.lastBox
      const toastTimeout = setTimeout(() => {
        this.closeToast(this.autoLeaveIndex)
        // this.toastBox.shift()
      }, this.toastTimeout)
      // this.toastBox[this.lastBox] = 
      this.toastBox.push({
        toastType: 'error',
        backgroundColor: "var(--el-color-danger)",
        toastMsg: msg,
        toastTimeout: toastTimeout
      })
      this.lastBox += 1
      setTimeout(() => {
        const length = this.toastDiv.length
        this.toastDiv[length - 1].style.top = 30 + (length - 1) * 60 + 'px'
      }, 10)
    },
    infoToast(msg) {
      // const index = this.lastBox
      const toastTimeout = setTimeout(() => {
        this.closeToast(this.autoLeaveIndex)
        // this.toastBox.shift()
      }, this.toastTimeout)
      // this.toastBox[this.lastBox] = 
      this.toastBox.push({
        toastType: 'info',
        backgroundColor: "var(--el-color-info)",
        toastMsg: msg,
        toastTimeout: toastTimeout
      })
      this.lastBox += 1
      setTimeout(() => {
        const length = this.toastDiv.length
        this.toastDiv[length - 1].style.top = 30 + (length - 1) * 60 + 'px'
      }, 10)
    },
    handleOverHover(index) {
      clearTimeout(this.toastBox[index].toastTimeout)
      this.delayTimeout += 1
      // this.autoLeaveIndex = Math.max(index + 1, this.autoLeaveIndex)
    },
    handleLeaveHover(index, $el) {
      // console.log($el.target);
      const toastTimeout = setTimeout(() => {
        var idx = this.toastDiv.indexOf($el.target)
        if (idx == -1) { idx = 0 }
        this.closeToast(idx, $el)
        // this.toastBox.shift()
      }, this.toastTimeout + 500 * this.delayTimeout)
      this.toastBox[index].toastTimeout = toastTimeout
    }
  }
}
</script>

<template>
  <div class="toast-wrapper">
    <div ref="toastDiv" class="toast-box" @mouseenter="handleOverHover(idx)" @mouseleave="handleLeaveHover(idx, $event)"
      :style="{backgroundColor: item.backgroundColor ? item.backgroundColor: ''}"
      v-for="item, idx in toastBox" :key="item"
    >
      <div class="toast-type toast-item">
        <SvgIcon :svgName="item.toastType"/>
      </div>
      <div class="toast-msg toast-item">
        <span>{{ item.toastMsg }}</span>
      </div>
      <div @click="closeToast(idx, $event)" class="toast-close toast-item">
        <SvgIcon svgName="close"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-wrapper {

  .toastEnter {
    animation: toastAnimation 1s ease;
  }

  .toastLeave {
    animation: toastAnimation 1s ease reverse !important;
  }

  .toast-box {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);

    z-index: 99999999999;
    height: 50px;

    width: fit-content;
    border-radius: 6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px 0px 10px;
    margin-bottom: 10px;
    transition: 1s ease;

    .toast-item {
      margin: 8px;
      color: var(--text-color);
      font-size: 15px;
    }

    svg {
      vertical-align: middle;
      width: 1.2rem;
      height: 1.2rem;
    }

    .toast-close {
      cursor: pointer;
    }
  }
}
@keyframes toastAnimation {
  from {
    transform: translateY(-1000px);
  } to {
    transform: translateY(0px);
  }
}
</style>
