<script setup>
import { ref, onMounted, inject } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
const toast = inject('toast')
const main = useMainStore();
const { navBar } = storeToRefs(main);

onMounted(() => {
  initEditPage()
  if (navBar.value.length <= 1) {
    if (title.value) {
      navBar.value = ['文章', title.value]  
    } else {
      navBar.value = ['文章', '新增']
    }
  }
})

import { Check, Delete } from '@element-plus/icons-vue'

const status = ref("草稿")
const statusItems = ref(['公开', '私密', '草稿'])
// const statusItems = ref([
//   { label: '草稿', name: '草稿', icon: 'loading', value: '草稿 loading 0', selected: false },
//   { label: '私密', name: '私密', icon: 'loading', value: '私密 loading 1', selected: false },
//   { label: '公开', name: '公开', icon: 'loading', value: '公开 loading 2', selected: false }
// ])
const picture = ref(null)
const title = ref("")
const category = ref([])
const categoryItems = ref([
  { label: 'A', name: 'A', icon: 'loading', value: 'A loading 0', selected: false },
  { label: '撒打算打算打算打算的', name: '撒打算打算打算打算的', icon: 'loading', value: '撒打算打算打算打算的 loading 1', selected: false },
  { label: 'C', name: 'C', icon: 'loading', value: 'C loading 2', selected: false },
])
const resource = ref(['原创'])
const resourceItems = ref([
  { label: '原创', name: '原创', icon: 'loading', value: '原创 loading 0', selected: false },
])
const tags = ref([])
// const tagItems = ref([])
const tagItems = ref({
  'label1': [
    { label: 'aasdasdasdas', name: 'aasdasdasdas', value: 'label1 aasdasdasdas 0', selected: false },
    { label: 'b', name: 'b', value: 'label1 b 1', selected: false },
    { label: 'c', name: 'c', value: 'label1 c 2', selected: false },
    { label: 'd', name: 'd', value: 'label1 d 3', selected: false },
    { label: 'e', name: 'e', value: 'label1 e 4', selected: false },
    { label: 'f', name: 'f', value: 'label1 f 5', selected: false },
  ],
  'label2': [
    { label: 'aa2', name: 'aa2', value: 'label2 aa2 0', selected: false },
    { label: 'bb2', name: 'bb2', value: 'label2 bb2 1', selected: false }
  ],
  'label3': [
    { label: 'aa3', name: 'aa3', value: 'label2 aa3 0', selected: false },
    { label: 'bb3', name: 'bb3', value: 'label2 bb3 1', selected: false }
  ],
  'label4': [
    { label: 'aa4', name: 'aa4', value: 'label2 aa4 0', selected: false },
    { label: 'bb4', name: 'bb4', value: 'label2 bb4 1', selected: false }
  ],
  'label5': [
    { label: 'aa5', name: 'aa5', value: 'label2 aa5 0', selected: false },
    { label: 'bb5', name: 'bb5', value: 'label2 bb5 1', selected: false }
  ],
  'label6': [
    { label: 'aa6', name: 'aa6', value: 'label2 aa6 0', selected: false },
    { label: 'bb6', name: 'bb6', value: 'label2 bb6 1', selected: false }
  ]
})
const value = ref('')

const toData = ref({})
function initEditPage() {
  if (JSON.stringify(route.query) == '{}') {
    // 访问网络
    if (!route.params.id) {
      // 新增页面
    } else {
      const id = route.params.id
      console.log(id);
      toast.errorToast('网络异常')
    }
    return
  }
  toData.value = route.query
  status.value = toData.value.status ? toData.value.status : ""
  picture.value = toData.value.img ? toData.value.img : ""
  title.value = toData.value.title ? toData.value.title : ""
  category.value = toData.value.category ? [toData.value.category] : ""
  resource.value = toData.value.resource ? [toData.value.resource] : ""
  tags.value = toData.value.tag ? toData.value.tag : ""
  value.value = toData.value.content ? toData.value.content : ""
}

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const isEdited = ref(false)
function cancelEdit() {
  if (isEdited.value) {
    // 执行存为草稿操作
  }
  router.push({
    path: '/article'
  })
}

function handleHTMLCode(isShowHTMLCode, htmlCode) {
  console.log(isShowHTMLCode);
  console.log(htmlCode);
}
const html = ref("")
function handleEditing(text, htmlCode) {
  html.value = htmlCode
}

const articleImgDiv = ref(null)
const uploadFileDiv = ref(null)
function uploadImg() {
  uploadFileDiv.value.click()
}
function showImg(e) {
  if (e.target.files[0] && e.target.files[0].type.split('/')[0] == 'image') {
    var reader = new FileReader();
    // reader.readAsText(e.target.files[0])  // 读取html文本
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function() {
      // console.log(this.result);
        window.oldPicture = this.result
        picture.value = this.result
        // toast.successToast('上传成功')
        toast.warningToast('上传成功')
    }
  } else {
    toast.errorToast('上传失败')
  }
}
</script>

<template>
  <div class="edit-article-wrapper box-wrapper">
    <div class="control-nav-screen-mode">
      <div class="control-svg">
        <SvgIcon class="nav-svg" svgName="loading"></SvgIcon>
        <SvgIcon class="nav-svg" svgName="loading"></SvgIcon>
        <SvgIcon class="nav-svg" svgName="loading"></SvgIcon>
      </div>
      <div class="control-save-cancel">
        <div class="control item">
          <el-select
            v-model="status"
            size="small"
            suffix-icon=""
          >
            <el-option
              v-for="item, idx in statusItems" :key="idx"
              :value="item"
            />
          </el-select>
        </div>
        <div class="save item">
          <el-button size="small" type="success" :icon="Check" circle />
        </div>
        <div class="cancel item">
          <el-button @click="cancelEdit" size="small" type="danger" :icon="Delete" circle />
        </div>
      </div>
      <div class="control-svg">
        <SvgIcon class="screen-svg" svgName="loading"></SvgIcon>
        <SvgIcon class="screen-svg" svgName="loading"></SvgIcon>
        <SvgIcon class="screen-svg" svgName="loading"></SvgIcon>
      </div>
    </div>
    <div class="nav-screen">
      <div ref="articleImgDiv" @click="uploadImg" class="img">
        <input v-on:change="showImg" type="file" ref="uploadFileDiv" style="display: none;">
        <el-image style="width: 100%; height: 100%;" :src=picture fit="cover" />
      </div>
      <div class="title">
        <el-input v-model="title" style="width: 240px" placeholder="标题" clearable/>
      </div>
      <div class="category-resource">
        <div class="category">
          <el-select
            multiple
            v-model="category"
            filterable
            allow-create
            placeholder="文章分类"
            :reserve-keyword="false"
            :multiple-limit=1
          >
            <el-option
              style="width: auto;"
              ref="categoryOptionDiv"
              v-for="item in categoryItems"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            >
              <span style="float: left; vertical-align: middle;">
                <SvgIcon style=" vertical-align: middle;" :svgName="item.icon"/>
              </span>
              
              <span style="font-size: 13px;">{{ item.name }}</span>

              <span style="float: right; right: 0px;" v-if="item.selected">
                <SvgIcon style=" vertical-align: middle;" svgName="selected" />
              </span>
            </el-option>
          </el-select>
        </div>
        <span class="dot"><SvgIcon svgName="ball"></SvgIcon></span>
        <div class="resource">
          <el-select
            multiple
            v-model="resource"
            filterable
            allow-create
            placeholder="文章来源"
            :reserve-keyword="false"
            :multiple-limit=1
          >
            <el-option
              style="width: auto;"
              ref="categoryOptionDiv"
              v-for="item in resourceItems"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            >
              <span style="float: left; vertical-align: middle;">
                <SvgIcon style=" vertical-align: middle;" :svgName="item.icon"/>
              </span>
              
              <span style="font-size: 13px;">{{ item.name }}</span>

              <span style="float: right; right: 0px;" v-if="item.selected">
                <SvgIcon style=" vertical-align: middle;" svgName="selected" />
              </span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tags">
        <el-select
          multiple
          v-model="tags"
          filterable
          allow-create
          placeholder="文章标签"
          :reserve-keyword="false"
          clearable
        >
          <div class="tag-label-wrapper" 
            style="display: inline-flex; flex-wrap: wrap; padding: 0px 10px 0px 10px; height: 260px; overflow: auto;"
          >
            <div class="tag-label"
            style="box-shadow: 0px 0px 10px -6px; margin: 6px; border-radius: 6px; height: 200px; overflow: auto; position: relative;"
              v-for="value, key in tagItems" :key="key"
            >
              <div style="z-index: 999;background-color: whitesmoke;position: sticky; top: 0px; line-height: 40px; text-align: center; font-size: 14px; border-bottom: .1px solid;" class="tag-title">
                <span>{{ key }}</span>
              </div>
              <el-option class="tag-item"
                v-for="item, idx in value" :key="idx"
                :label="item.label"
                :value="item.name"
              >
                <span>{{ item.name }}</span>
              </el-option>

            </div>
          </div>
        </el-select>
      </div>
      <div id="mavon" class="screen-positon">
        <mavon-editor 
          @change="handleEditing"
          @htmlCode="handleHTMLCode"
          style="height: 100%;" v-model="value"
        />
      </div>
    </div>
    <!-- <div v-html="html"></div> -->
    <!-- <el-button type="info" @click="test = html">点击</el-button> -->
  </div>
</template>

<style scoped>
.edit-article-wrapper {
  position: relative;
  padding: 20px 15px 10px 15px;
  overflow: auto;

  .control-nav-screen-mode {
    z-index: 9999;
    position: sticky;
    top: 0px;
    /* position: fixed; */
    display: inline-flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    border-bottom: .1px solid var(--text-color1);
    padding-bottom: 5px;
    box-shadow: 0px 10px 10px -10px var(--text-color1);
    background-color: var(--bg-color);

    .control-svg {
      text-wrap: nowrap;
    }

    @media (max-width: 600px) {
      .nav-svg {
        margin-right: 0px !important;
      }
      .screen-svg {
        margin-left: 0px !important;
      }  
    }
    .nav-svg {
      transition: 1s ease;
      margin-right: 20px;
    }
    .screen-svg {
      transition: 1s ease;
      margin-left: 20px;
    }
    
  }
  .control-save-cancel {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content:center;
    /* width: 50%; */

    .control {
      width: 60px;
    }
    .item {
      margin: 0px 5px 0px 5px;
    }
  }
  .nav-screen {
    margin-top: 10px;
    /* height: calc(100% - 30px); */
    height: 100%;

    .img {
      width: 100%;
      height: 250px;
      margin-bottom: 20px;
      cursor: pointer;
      /* filter: blur(6px); */
    }
    .title {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;

      :deep(.el-input__inner) {
        text-align: center;
        font-family: 'text-font';
      }
    }
    .category-resource {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .category {
        width: 40%;
      }
      .dot {
        width: 20px;
        height: 20px;
        text-align: center;
      }
      .resource {
        width: 40%;
      }
    }
    .tags {
      margin-bottom: 20px;
    }
    :deep(.el-tag--info) {
      max-width: 1000px !important;
    }

    .nav-position {
      border: .1px solid black;
      float: left;
      width: 20%;
      height: 100%;
    }
    .screen-positon {
      float: right;
      width: 100%;
      height: 100%;
    }
  }
  :deep(.el-select__selection) {
    justify-content: center;
  }
  :deep(.el-select__placeholder) {
    text-align: center; 
  }

}
</style>
