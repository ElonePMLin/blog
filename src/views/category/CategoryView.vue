<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, inject } from 'vue';
const categorySearch = ref(null)

const uploadFileDiv = ref(null)
function uploadImg() {
  uploadFileDiv.value.click()
}

const toast = inject('toast')
const iconSvg = ref(null)
const categoryName = ref(null)

function showImg(e) {
  // console.log(e.target.files[0].type);
  if (e.target.files[0] && e.target.files[0].type.split('/')[1] == 'svg+xml') {
    var reader = new FileReader();
    // reader.readAsText(e.target.files[0])  // 读取html文本
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function() {
      // console.log(this.result);
        window.oldPicture = this.result
        iconSvg.value = this.result
        // toast.successToast('上传成功')
        toast.warningToast('上传成功')
    }
  } else {
    toast.errorToast('上传失败')
  }
}

const editAddDiv = ref(null)
function cancelEdit() {
  if (isEditing.value) {
    categoryNameDiv.value[editIndex.value].offsetParent.children[0].style.border = ''
    categoryNameDiv.value[editIndex.value].offsetParent.children[0].style.filter = ''
    categoryNameDiv.value[editIndex.value].offsetParent.children[1].style.opacity = 0
    categoryNameDiv.value[editIndex.value].offsetParent.children[2].style.opacity = 0
    categoryNameDiv.value[editIndex.value].offsetParent.children[3].style.opacity = 0
    categoryNameDiv.value[editIndex.value].style.transform = 'translateY(0px)'
  }
  isEditing.value = false

  iconSvg.value = null
  categoryName.value = null
  editAddDiv.value.style.transform = 'scaleY(0)'
  editAddDiv.value.style.height = '0px'
  editAddDiv.value.style.padding = '0px'
  categoryItemsDiv.value.style.maxHeight = 'calc(100vh - 70px - 120px)'
}
function newCategory() {
  editAddDiv.value.style.transform = 'scaleY(1)'
  editAddDiv.value.style.height = '200px'
  editAddDiv.value.style.padding = '20px'
  categoryItemsDiv.value.style.maxHeight = 'calc(100vh - 70px - 120px - 200px)'
}
function editCategory(item, index) {
  categoryNameDiv.value[index].offsetParent.children[0].style.filter = 'blur(1.5px)'
  editAddDiv.value.style.transform = 'scaleY(1)'
  editAddDiv.value.style.height = '200px'
  editAddDiv.value.style.padding = '20px'
  categoryItemsDiv.value.style.maxHeight = 'calc(100vh - 70px - 120px - 200px)'

  if (editIndex.value >= 0 && editIndex.value !== index) {
    categoryNameDiv.value[editIndex.value].offsetParent.children[0].style.border = ''
    categoryNameDiv.value[editIndex.value].offsetParent.children[1].style.opacity = 0
    categoryNameDiv.value[editIndex.value].offsetParent.children[2].style.opacity = 0
    categoryNameDiv.value[editIndex.value].offsetParent.children[3].style.opacity = 0
    categoryNameDiv.value[editIndex.value].style.transform = 'translateY(0px)'
  } 

  isEditing.value = true
  editIndex.value = index

  iconSvg.value = 'src/icons/svg/' + item.icon + '.svg'
  // console.log(item);
  categoryName.value = item.name
  
}

const categoryItems = ref([
  { name: 'Vue', icon: 'loading', articleCnt: '3' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
  { name: 'Python', icon: 'loading', articleCnt: '30' },
])
const categoryItemsDiv = ref(null)
const categoryNameDiv = ref(null)
const isEditing = ref(false)
const editIndex = ref(-1)

function categoryHover(index) {
  categoryNameDiv.value[index].offsetParent.children[1].style.opacity = 1
  categoryNameDiv.value[index].offsetParent.children[2].style.opacity = 1
  categoryNameDiv.value[index].offsetParent.children[3].style.opacity = 1
  categoryNameDiv.value[index].style.transform = 'translateY(-110px)'
}
function categoryLeave(item, index) {
  if (isEditing.value && editIndex.value == index) return
  if (!selectedCategor.value.has(item)) {
    categoryNameDiv.value[index].offsetParent.children[0].style.filter = ''
    categoryNameDiv.value[index].offsetParent.children[1].style.opacity = 0
    categoryNameDiv.value[index].offsetParent.children[2].style.opacity = 0
    categoryNameDiv.value[index].offsetParent.children[3].style.opacity = 0
    categoryNameDiv.value[index].style.transform = 'translateY(0px)'
  }
}
const selectedCategor = ref(new Set())
function selectedItem(item, index) {
  categoryNameDiv.value[index].offsetParent.children[0].style.filter = 'blur(1.5px)'
  categoryNameDiv.value[index].offsetParent.children[1].style.opacity = 1
  categoryNameDiv.value[index].offsetParent.children[2].style.opacity = 1
  categoryNameDiv.value[index].offsetParent.children[3].style.opacity = 1
  categoryNameDiv.value[index].style.transform = 'translateY(-110px)'
  if (editIndex.value == index) {
    categoryNameDiv.value[index].offsetParent.children[0].style.border = '1px solid var(--el-color-primary)'
  } else {
    if (!selectedCategor.value.has(item)) {
      selectedCategor.value.add(item)
      categoryNameDiv.value[index].offsetParent.children[0].style.border = '1px solid var(--el-color-primary)'
    } else {
      selectedCategor.value.delete(item)
      categoryNameDiv.value[index].offsetParent.children[0].style.border = ''
    }
  }
}

const categoryWrapperDiv = ref(null)
const columnsNum = ref(0)
import { onMounted } from 'vue';
onMounted(() => {
  columnsNum.value = Math.floor(categoryWrapperDiv.value.clientWidth / 170);
  window.addEventListener('resize', () => {
    columnsNum.value = Math.floor(categoryWrapperDiv.value.clientWidth / 170);
  })
})
</script>

<template>
  <div ref="categoryWrapperDiv" class="category-wrapper box-wrapper">
    <div class="action-search">
      <div class="select-all"><el-button size="small">全选</el-button></div>
      <div class="delete"><el-button type="danger" size="small">删除</el-button></div>
      <div class="add"><el-button type="primary" size="small" @click="newCategory">新增</el-button></div>
      <div class="search">
        <el-input class="search-input form"
          v-model="categorySearch"
          style="width: 200px; height: 26px;"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <div class="edit_add" ref="editAddDiv">
      <div class="edit-info">
        <div class="name">
          <span>分类名：</span>
          <el-input size="small"
            v-model="categoryName"
            style="display: inline;"
          />
        </div>
        <div class="icon">
          <span>图 标：</span>
          <div class="icon-img" @click="uploadImg">
            <input v-on:change="showImg" ref="uploadFileDiv" type="file" style="display: none;">
            <el-image style="width: 100%; height: 100%;" :src="iconSvg" fit="cover" />
          </div>
        </div>
      </div>
      <div class="control">
        <div class="confirm"><el-button type="success" size="small">确认</el-button></div>
        <div class="cancel"><el-button size="small" @click="cancelEdit">取消</el-button></div>
      </div>
    </div>
    <div class="categoryItemsBox" ref="categoryItemsDiv">
      <ul class="items" :style="{ 'grid-template-columns': 'repeat('+ columnsNum +', 1fr)'}">
        <li @click="selectedItem(item, idx)" v-for="item, idx in categoryItems" :key="idx" @mouseleave="categoryLeave(item, idx)">
          <div class="iconBox" @mouseenter="categoryHover(idx)">
            <SvgIcon :svgName="item.icon" />
          </div>
          <SvgIcon @click="editCategory(item, idx)" class="svg-edit svg-show" svgName="edit" />
          <SvgIcon class="svg-del svg-show" svgName="delete" />
          <div class="cnt">{{ item.articleCnt }}</div>
          <div class="name" ref="categoryNameDiv">{{ item.name }}</div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.category-wrapper {
  padding: 10px;

  .action-search {
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;

    div {
      padding-right: 20px;
      line-height: 32px;
    }
  }

  .edit_add {
    /* padding: 20px; */
    margin: 10px 10px;
    height: 0px;
    box-shadow: 0px 0px 10px -4px;
    border-radius: 10px;
    display: flex;
    flex-wrap: nowrap;
    transform-origin: top;
    transition: .5s ease;
    transform: scaleY(0);

    @media (max-width: 1118px) {
      justify-content: space-around;
    }

    .edit-info {
      @media (min-width: 1119px) {
        margin-right: 20px;
      }
      
      
      .name {
        padding-bottom: 20px;
      }

      .icon {
        padding-bottom: 20px;

        span {
          padding-right: 10px;
        }

        .icon-img {
          display:inline-block;
          width: 140px;
          height: 100px;
          cursor: pointer;
        }
      }

    }

    .control {
      
      div {
        padding-bottom: 20px;
      }
    }
  }

  .categoryItemsBox {
    max-height: calc(100vh - 70px - 120px);
    overflow: hidden scroll;

    .items {
      list-style: none;
      padding: 0px;
      grid-template-columns: repeat(8, 1fr);
      display: grid;

      li {
        position: relative;
        text-align: center;
        padding: 10px 10px;

        .svg-edit {
          top: 80px;
          left: 50px;
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
        }
        .svg-del {
          top: 80px;
          right: 50px;
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
        }
        .svg-show {
          transition: .5s ease;
          opacity: 0;
          cursor: pointer;
        }
        .cnt {
          top: 110px;
          left: 80px;
          font-size: 12px;
          position: absolute;
          opacity: 0;
          transition: .5s ease;
        }

        .iconBox {
          line-height: 151px;
          height: 151px;
          box-shadow: 0px 0px 10px -4px var(--text-color1);
          border-radius: 10px;
          transition: .5s ease;

          &:hover {
            filter: blur(1.5px);
          }


          svg {
            width: 3rem;
            height: 3rem;
            vertical-align: middle;
          }
        }
        .name {
          padding: 10px 0px;
          font-size: 14px;
          transition: .5s ease;
        }
      }
    }
  }
}
:deep(.el-input__inner) {
  font-family: 'text-font';
}
</style>
