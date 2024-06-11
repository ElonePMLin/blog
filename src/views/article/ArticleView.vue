<script setup>
import { inject, onMounted } from 'vue';
onMounted(() => {
  allFoldUnfold()
})

// label 用以区分选择分组，当然这里需要所有唯一
import { reactive } from 'vue'
const formData = reactive({
  category: '',  // 单选
  status: '',  // 单选
  tag: '',  // 多选
  search: '',
  date: ''
})

import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 分类（单选）
const categoryItems = ref([
  { label: 'A', name: 'A', icon: 'loading', value: 'A loading 0', selected: false },
  { label: 'B', name: '撒打算打算打算打算的', icon: 'loading', value: '撒打算打算打算打算的 loading 1', selected: false },
  { label: 'C', name: 'C', icon: 'loading', value: 'C loading 2', selected: false },
])
const categoryFilter = ref({})
// 状态（单选）
const statusItems = ref([
  { label: '草稿', name: '草稿', icon: 'loading', value: '草稿 loading 0', selected: false },
  { label: '私密', name: '私密', icon: 'loading', value: '私密 loading 1', selected: false },
  { label: '公开', name: '公开', icon: 'loading', value: '公开 loading 2', selected: false }
])
const statusFilter = ref({})

// 标签（多选）
const tagSearch = ref(null)
const tagItems = ref({
  'label1': [
    { label: 'a', name: 'aasdasdasdas', value: 'label1 aasdasdasdas 0', selected: false },
    { label: 'b', name: 'b', value: 'label1 b 1', selected: false },
    { label: 'c', name: 'c', value: 'label1 c 2', selected: false },
    { label: 'd', name: 'd', value: 'label1 d 3', selected: false },
    { label: 'e', name: 'e', value: 'label1 e 4', selected: false },
    { label: 'f', name: 'f', value: 'label1 f 5', selected: false },
  ],
  'label2': [
    { label: 'aa', name: 'aa', value: 'label2 aa 0', selected: false },
    { label: 'bb', name: 'bb', value: 'label2 bb 1', selected: false }
  ]
})

// const tagFilter = ref([
//   { label: 'label1', value: 'a' }
// ])
const tagFilter = ref([])
const tagSearchItems = ref([])
function handleTagSearch() {
  tagSearchItems.value = []
  for (const key in tagItems.value) {
    const elements = tagItems.value[key];
    for (const idx in elements) { 
      const element = elements[idx];
      if (tagSearch.value && element.name.match(tagSearch.value)) {
        tagSearchItems.value.push(element)
      }
    }
  }
}

import { ArrowDown } from '@element-plus/icons-vue'
const tagFilterDiv = ref(null)
function handleFoldUnfold(idx) {
  // height: 60px; overflow: hidden; 收起
  var h = tagFilterDiv.value[idx].style.height
  if (h && h == '60px') {
    // 展开
    tagFilterDiv.value[idx].style.height = 'auto'
    h = tagFilterDiv.value[idx].clientHeight + 'px'
    tagFilterDiv.value[idx].style.height = h;
  } else {
    tagFilterDiv.value[idx].style.height = '60px'
  }
  tagFilterDiv.value[idx].style.overflow = 'hidden'
}
const isUnfold = ref(true)
const unfoldHeight = ref([])
function allFoldUnfold() {
  const heightList = []
  for (let index = 0; index < tagFilterDiv.value.length; index++) {
    if (!isUnfold.value) {
      // 已全收起，所以要展开
      if (JSON.stringify(unfoldHeight.value) != "[]") {
        var h = unfoldHeight.value[index]
      } else {
        tagFilterDiv.value[index].style.height = 'auto';
        h = tagFilterDiv.value[index].clientHeight + 'px'
        heightList.push(h)
      }
      
      // const h = unfoldHeight.value[index]
      tagFilterDiv.value[index].style.height = h;
      
    } else {
      tagFilterDiv.value[index].style.height = '60px'
    }
  }
  if (JSON.stringify(unfoldHeight.value) == "[]") {
    unfoldHeight.value = heightList
  }
  isUnfold.value = !isUnfold.value
}
// const tagList = ref([])
function handleTagReset() {
  for (const item of tagFilter.value) {
    const it = JSON.parse(item)
    tagItems.value[it.key][it.index].selected = false
  }
  tagFilter.value = []
}
function handleAllReset() {
  closeCategory()
  closeStatus()
  handleTagReset()
  closeDate()
  closeTitleSearch()
  filterData.value = {}
}

// title, date, tag, category, status
const filterData = ref({})
const dateFilter = ref(null)
function handleDateFilter() {
  if (!formData.date) {
    dateFilter.value = ""
    delete filterData.value['date']
  } else {
    const date = new Date(formData.date)
    dateFilter.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    filterData.value['date'] = dateFilter.value
  }
}
const titleSearch = ref(null)
function handleTitleSearch() {
  if (titleSearch.value) {
    filterData.value['title'] = dateFilter.value
  } else {
    delete filterData.value['title']
  }
}
function handleTagFilter(value) {
  const key = value[0].split(' ')[0]
  const name = value[0].split(' ')[1]
  const idx = value[0].split(' ')[2]
  const val = JSON.stringify({ key: key, name: name, index: idx })
  for (const item of tagSearchItems.value) {
    if (item.value == value[0]) {
      item.selected = true
    }
  }
  if (tagFilter.value.includes(val)) {
    const index = tagFilter.value.indexOf(val)
    tagItems.value[key][idx].selected = false
    tagFilter.value = tagFilter.value.slice(0, index).concat(tagFilter.value.slice(index+1))
  } else {
    tagItems.value[key][idx].selected = true
    tagFilter.value.push(val)
  }
  if (JSON.stringify(tagFilter.value) != '[]') {
    filterData.value['tag'] = tagFilter.value
  } else {
    delete filterData.value['tag']
  }
}
function handleCategoryFilter(value) {
  const ex = categoryFilter.value.index
  if (JSON.stringify(categoryFilter.value) != '{}') {
    categoryItems.value[ex].selected = false
    categoryFilter.value = {}
  }
  const name = value.split(' ')[0]
  const icon = value.split(' ')[1]
  const idx = value.split(' ') [2]
  if (ex == idx) {
    delete filterData.value['category']
    return 
  }
  categoryItems.value[idx].selected = true
  categoryFilter.value = { name: name, icon: icon, index: idx }
  filterData.value['category'] = categoryFilter.value
}
function handleStatusFilter(value) {
  const ex = statusFilter.value.index
  if (JSON.stringify(statusFilter.value) != '{}') {
    statusItems.value[ex].selected = false
    statusFilter.value = {}
  }
  const name = value.split(' ')[0]
  const icon = value.split(' ')[1]
  const idx = value.split(' ') [2]
  if (ex == idx) {
    delete filterData.value['status']
    return 
  }
  statusItems.value[idx].selected = true
  statusFilter.value = { name: name, icon: icon, index: idx }
  filterData.value['status'] = statusFilter.value
}

// // 监听函数
// import { watch } from 'vue';
// watch()
 
const showSource = ref(false)
const showTag = ref(false)
const showCategory = ref(false)

// 表格
const articleTableDiv = ref(null)
const multipleSelection = ref([])
function handleSelectionChange(val) {
  multipleSelection.value = val
}
//  加 '来源': '' 列; '分类': '' 列; 标签放在标题下方
const articelData = ref([
  {'id': 1, 'img': '', 'status': '草稿', 'title': 'Title1', 'read': '10', 'like': '12', 'favorite': '12', 'content': '', 'contentME': '', 'category': 'A', 'tag': ['b','b','b','b','b','b','b','b','b','b'], 'date': '2024-3-23', 'resource': 'CSDN'},
  {'id': 2, 'img': '', 'status': '私密', 'title': 'Title2', 'read': '11', 'like': '12', 'favorite': '12', 'content': '', 'contentME': '', 'category': 'C', 'tag': ['c'], 'date': '2024-3-21', 'resource': '原创'},
  {'id': 3, 'img': '', 'status': '公开', 'title': 'Title3Title3Title3Title3Title3Title3Title3', 'read': '12', 'like': '12', 'favorite': '12', 'content': '撒打算擦拭擦拭为佛你没问佛慰问否我，撒打算擦拭擦拭为佛你没问佛1慰问否我，撒打算擦拭擦拭为佛2你没问佛慰问否我，撒打算擦拭擦拭为佛你没问佛慰问否我，撒打算擦拭擦拭为佛你没问佛慰问否我，撒打算擦拭擦拭为佛你3没问佛慰问否我，撒打算擦拭擦拭为佛你没问佛慰问否我，撒打算擦拭擦拭为佛你没4问佛慰问否我，', 'contentME': '',  'category': null, 'tag': ['d'], 'date': '2024-3-20', 'resource': '知乎'},
])
const resourceList = ref([])
const resourceSet = new Set()
function articleResource() {
  for (const data of articelData.value) {
    if (!resourceSet.has(data.resource)) {
      resourceSet.add(data.resource)
      resourceList.value.push({
        text: data.resource, value: data.resource
      })
    }
  }
  return resourceList.value
}

function closeCategory() {
  if (JSON.stringify(categoryFilter.value) == '{}') return
  categoryItems.value[categoryFilter.value.index].selected = false
  categoryFilter.value = {}
  delete filterData.value['category']
}
function closeStatus() {
  if (JSON.stringify(statusFilter.value) == '{}') return
  statusItems.value[statusFilter.value.index].selected = false
  statusFilter.value = {}
  delete filterData.value['status']
}
function closeTag(item) {
  tagItems.value[item.key][item.index].selected = false
  const it = JSON.stringify(item)
  if (tagFilter.value.includes(it)) {
    const index = tagFilter.value.indexOf(it)
    tagFilter.value = tagFilter.value.slice(0, index).concat(tagFilter.value.slice(index+1))
  }
  if (JSON.stringify(tagFilter.value) == '[]') {
    delete filterData.value['tag']
  }
}
function closeTitleSearch() {
  titleSearch.value = ''
  delete filterData.value['title']
}
function closeDate() {
  formData.date = ''
  dateFilter.value = ''
  delete filterData.value['date']
}

const filterTag = (value, row) => {
  return row.resource === value
}

import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const main = useMainStore();
const { navBar } = storeToRefs(main);
function handleNewArticle() {
  navBar.value.push('新增')
  router.push({
    name: 'edit-article',
    params: { id: '' }
  })
}

function handleRowClick(row, column) {
  // console.log(row, column)  // 数据
  if (column.label == "标题") {
    // console.log(row)  // 数据
    navBar.value.push(row.title)
    
    router.push({
      name: 'edit-article',
      params: { id: row.id },
      query: row
    })
  }
}
router.beforeEach((to) => {
  if (to.name == 'edit-article') {
    to.fullPath = to.path
  }
})
const toast = inject('toast')
toast
</script>

<template>
  <div class="article-wrapper box-wrapper">
    <div class="select-search">
      <el-form class="select-search-form" :model="formData" label-width="auto" style="width: 100%; display: flex; justify-content: left;">
        <el-select class="category-select form-ele form"
          collapse-tags
          clearable
          placeholder="分类"
          :max-collapse-tags="1"
          @change="handleCategoryFilter"
        >
          <el-option
            style="width: 170px;"
            ref="categoryOptionDiv"
            v-for="item in categoryItems"
            :key="item.name"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left; vertical-align: middle;">
              <SvgIcon style=" vertical-align: middle;" :svgName="item.icon"/>
            </span>
            
            <span class="text-ellipsis" style="font-size: 13px;">{{ item.name }}</span>

            <span style="float: right; right: 0px;" v-if="item.selected">
              <SvgIcon style=" vertical-align: middle;" svgName="selected" />
            </span>
          </el-option>
        </el-select>

        <el-select class="status-select form-ele form"
          collapse-tags
          clearable
          placeholder="状态"
          :max-collapse-tags="1"
          @change="handleStatusFilter"
        >
          <el-option
            ref="statusOptionDiv"
            v-for="item in statusItems"
            :key="item.name"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left; vertical-align: middle;">
              <SvgIcon style=" vertical-align: middle;" :svgName="item.icon"/>
            </span>
            
            <span class="text-ellipsis" style="font-size: 13px;">{{ item.name }}</span>

            <span style="float: right;" v-if="item.selected">
              <SvgIcon style=" vertical-align: middle;" svgName="selected" />
            </span>
          </el-option>
        </el-select>

        <el-select class="tag-select form-ele form"
          multiple
          collapse-tags
          clearable
          placeholder="标签"
          :max-collapse-tags="1"
          @change="handleTagFilter"
        >
          <template #header>
            <el-input
              @input="handleTagSearch"
              v-model="tagSearch"
              style="width: 240px"
              placeholder="筛选标签"
              :prefix-icon="Search"
            />
          </template>

          <el-option class="tag-capsule"
            v-for="item, idx in tagSearchItems"
            :key="idx"
            :label="item.label"  
            :value="item.value"
            :style="item.selected ? 'background-color: var(--capsule-selected-color);' : 'background-color: var(--capsule-color);'"
          >
            <span style="padding: 0 10px 0 10px;" :style="{  }">{{ item.name }}</span>
          </el-option>

          <div class="tag-filter-wrapper" style="width: 260px">
            <div ref="tagFilterDiv" v-for="value, key, idx in tagItems" :key="key" style="width: 260px; overflow: hidden; transition: .5s height ease; height: auto;">
              <div style="padding: 0px 10px 0px 8px;">
                <span>{{ key }}</span>
                <span @click="handleFoldUnfold(idx)" style="float: right; width: 1rem; height: 1rem; cursor: pointer;"><arrow-down /></span>
              </div>
              <el-option class="tag-capsule"
                v-for="item, idx in value" 
                :style="item.selected ? 'background-color: var(--capsule-selected-color);' : 'background-color: var(--capsule-color);'"
                :key="idx" :label="item.label" :value="item.value"
              >
                <span style="padding: 0 10px 0 10px;">{{ item.name }}</span>
              </el-option>
            </div>
          </div>

          <template #footer>
            <span style="cursor: pointer;" v-if="!isUnfold" @click="allFoldUnfold">展开全部</span>
            <span style="cursor: pointer;" v-else @click="allFoldUnfold">全部收起</span>
            <span style="float: right; cursor: pointer;" @click="handleTagReset">重置</span>
          </template>
        </el-select>

        <el-date-picker class="date-picker form"
          :editable=false
          v-model="formData.date"
          type="date"
          placeholder="日期"
          @change="handleDateFilter"
          style="width: 150px; margin-right: 20px;"
        />

        <el-input class="search-input form"
          @input="handleTitleSearch"
          v-model="titleSearch"
          style="width: 200px; margin-right: 20px;"
          placeholder="搜索题目、内容"
          :prefix-icon="Search"
        />

        <el-popover class="config-button form"
          placement="bottom"
          :width="100"
          trigger="click"
        >
          <template #reference>
            <el-button class="m-2"><SvgIcon svgName="config1" /></el-button>
          </template>
          <template #default>
            <div class="cb-items">
              <div class="checkbox-item">
                <el-checkbox v-model="showCategory" label="显示分类" />
              </div>
              <div class="checkbox-item">
                <el-checkbox v-model="showTag" label="显示标签" />
              </div>
              <div class="checkbox-item">
                <!-- // 暂时，需要放在获取文章列表中 -->
                <el-checkbox v-model="showSource" label="显示来源" @click="articleResource"/>
              </div>
            </div>
          </template>
        </el-popover>
      </el-form>
    </div>
    <div class="filter-box" v-if="JSON.stringify(filterData) != '{}'">
      <div v-if="dateFilter" class="date-filter filter-capsule">
        <span style="font-size: 13px;">{{ dateFilter }}</span>
        <span @click="closeDate" class="capsule-close">
          <SvgIcon svgName="close" />
        </span>
      </div>
      <div v-if="categoryFilter.name" class="category-filter filter-capsule">
        <span>
          <SvgIcon style="vertical-align: -2px;" v-if="categoryFilter.icon" :svgName="categoryFilter.icon"/>
        </span>
        <span style="font-size: 13px;">{{ categoryFilter.name }}</span>
        <span @click="closeCategory" class="capsule-close">
          <SvgIcon svgName="close" />
        </span>
      </div>
      <div v-if="statusFilter.icon" class="status-filter filter-capsule">
        <span>
          <SvgIcon style="vertical-align: -2px;" v-if="statusFilter.icon" :svgName="statusFilter.icon"/>
        </span>
        <span style="font-size: 13px;">{{ statusFilter.name }}</span>
        <span @click="closeStatus" class="capsule-close">
          <SvgIcon svgName="close" />
        </span>
      </div>
      <div class="tags-filter" v-for="item, idx in tagFilter" :key="idx">
        <div class="filter-capsule">
          <span>{{ JSON.parse(item).name }}</span>
          <span @click="closeTag(JSON.parse(item))" class="capsule-close">
            <SvgIcon svgName="close" />
          </span>
        </div>
      </div>
      <div v-if="titleSearch" class="search-filter filter-capsule">
        <span>{{ titleSearch }}</span>
        <span @click="closeTitleSearch" class="capsule-close">
            <SvgIcon svgName="close" />
          </span>
      </div>
      <div @click="handleAllReset"
        style="color: var(--text-color1); position: absolute; right: 14px; top: 4px; font-size: 13px; cursor: pointer;"
      >
        重置
      </div>
    </div>
    <div class="article-table">
      <el-table
        stripe
        ref="articleTableDiv"
        :data="articelData"
        style="width: 100%"
        max-height="620"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="30" />
        <el-table-column type="expand" width="30">
          <template #default="props">
            <div class="table-row-wrapper">
              <div class="img-info">
                <div class="img">
                  <el-image style="width: 100%; height: 100%" />
                </div>
                <div class="info">
                  <div class="title-tag">
                    <span class="title">{{ props.row.title }}</span>
                    <span class="tag" v-for="item, idx in props.row.tag" :key="idx">{{ item }}</span>
                  </div>
                  <div class="date">{{ props.row.date }}</div>
                  <div class="category-resource">
                    <span v-if="props.row.category" class="category">{{ props.row.category }}</span>
                    <span class="resource">{{ props.row.resource }}</span>
                  </div>
                </div>
              </div>
              <div v-html="props.row.contentME" class="content"></div>
              <!-- <div v-html="test" class="content"></div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column property="status" label="状态" width="80"></el-table-column>
        <el-table-column v-if="showCategory" property="category" label="分类" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column property="title" label="标题" width="auto" show-overflow-tooltip >
          <template #default="scope">
            <span style="cursor: pointer;">{{ scope.row.title }}</span>
            <div v-if="showTag" style="display: flex; align-items: center; flex-wrap: nowrap;">          
              <span class="tag-in-title" v-for="item, idx in scope.row.tag" :key="idx">{{ item }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="showSource" 
          :filters="resourceList"
          :filter-method="filterTag"
          property="resource" label="来源" width="80" 
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column property="read" label="阅读" sortable width="80" />
        <el-table-column property="like" label="点赞" sortable width="80" />
        <el-table-column property="favorite" label="收藏" sortable width="80" />
      </el-table>
    </div>
    <div class="action-buttons-paginate">
      <div class="buttons">
        <el-button size="small" type="warning">公开</el-button>
        <el-button size="small" type="info">私密</el-button>
        <el-button size="small" type="danger">删除</el-button>
        <el-button size="small" type="primary" @click="handleNewArticle">新增</el-button>
      </div>
      <div class="paginate">
        <!-- <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="true"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-wrapper {
  overflow: hidden scroll;
  padding: 10px;
  text-align: center;

  .select-search {
    padding: 20px 10px 20px 10px;

    .form-ele {
      width: 130px;
      margin-right: 30px;
    }
  }

  .filter-box {
    position: relative;
    width: 100%;
    padding: 0px 10px 0px 10px;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: start;

    .filter-capsule {
      margin-bottom: 10px;
      margin-right: 10px;
      position: relative;
      padding: 0px 24px 0px 6px;
      height: 24px;
      line-height: 24px;
      color: var(--text-color);
      border-radius: 5px;
      width: auto;
      background-color: var(--capsule-color);
      font-size: 13px;

      .capsule-close {
        opacity: 0;
        position: absolute;
        right: 5px;
        top: 3px;
        cursor: pointer;
        transition: .5s ease-out;
        font-weight: 900;
      }
      &:hover {
        .capsule-close {
          opacity: 1;
        }
      }
    }
    .date-filter {
      background-color: rgba(255, 166, 0, 0.5);
    }
    .category-filter {
      background-color: rgba(0, 128, 0, 0.5);
    }
    .status-filter {
      background-color: rgb(0, 255, 255, 0.5);
    }
    .tags-filter {
      display: inline-flex;

      .filter-capsule {
        border-radius: 9999px;
        padding-left: 12px;
        font-size: 13px;
        background-color: rgb(0, 0, 255, 0.5);
      }
    }
    
  }

  .article-table {
    padding: 20px 10px 0px 10px;
  }

  .action-buttons-paginate {
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 20px;
    padding: 20px 5px 0px 15px;

    .buttons {
      /* float: left; */
      display: inline-flex;
      padding-bottom: 20px;
    }

    /* .paginate {
      float: right;
    } */
  }
  
}

.text-ellipsis {
  float: left;
  text-overflow: ellipsis;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
}

.tag-capsule {
  padding: 0px;
  display: inline-flex;
  width: auto;
  height: 25px;
  font-size: 12px;
  border-radius: 9999px;
  line-height: 25px;
  margin: 5px;
  color: var(--text-color);
}

/* table extend内容 */
.table-row-wrapper {
  /* color: var(--text-color); */
  height: 300px;
  padding: 10px 20px 0px 20px;
  overflow: hidden scroll;
  transform-origin: top;
  animation: tr-extend-short .5s ease;
  

  .img-info {
    display: inline-flex;
    /* flex-wrap: wrap; */
    width: 100%;
    height: 250px;

    .img {
      text-align: center;
      width: 30%;
      /* padding: 0px 20px 0px 20px; */
    }

    .info {
      padding-left: 20px;
      width: 70%;

      .title-tag {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;

        .title {
          width: auto;
          height: auto;
          line-height: 42px;
          font-size: 40px;
          word-break: break-all;
        }
        .tag {
          margin-top: 10px;
          line-height: 20px;
          height: 20px;
          margin-left: 10px;
          border-radius: 9999px;
          padding: 1px 10px 1px 10px;
          background-color: rgb(0, 0, 255, 0.5);
         }
      }
      .date {
        color: var(--text-color2);
        padding: 8px 0px 8px 0px;
        font-style: italic;
      }
      .category-resource {
        padding: 10px 0px 10px 0px;

        .category {
          margin-right: 20px;
        }
        .resource {
          padding: 1px 10px 1px 10px;
          border-radius: 2px;
          background-color: rgba(29, 200, 242, 0.5);
        }
      }
      
    }
  }

  .content {
    font-size: 16px;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* -webkit-line-clamp: 3; */
    -webkit-box-orient: vertical;
    padding-top: 20px;
    width: 100%;
    overflow: hidden;
  }
}
.tag-in-title {
  margin: 2px 0px 0px 0px;
  line-height: 14px;
  font-size: 12px;
  height: 14px;
  margin-right: 2px;
  border-radius: 9999px;
  padding: 1px 10px 1px 10px;
  background-color: rgb(0, 0, 255, 0.5);
}

@keyframes tr-extend-short {
  from {
    transform: scaleY(0);
  } 
  to {
    transform: scaleY(1);
  }
}

@media (min-width: 1119px) {
  .select-search-form {
    flex-wrap: nowrap;
  }
}
@media (max-width: 1118px) {
  .select-search-form {
    flex-wrap: wrap;

  }
}
</style>
