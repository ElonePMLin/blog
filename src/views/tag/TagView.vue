<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, inject } from 'vue'
const toast = inject('toast')

const tagSearch = ref(null)
const tagItems = ref([
  { label: '类别1', name: '二分查找',  }
])
const dialogVisible = ref(false)
const dialogTitle = ref('标题')

function addTagItem() {
  dialogVisible.value = true
  dialogTitle.value = '添加标签'
  tagType.value = null
  tagName.value = null
}

const multipleSelection = ref([])
function handleSelectionChange(val) {
  multipleSelection.value = val
}

function editTagItem(item) {
  dialogVisible.value = true
  dialogTitle.value = '修改标签'
  tagType.value = item.label
  tagName.value = item.name
}

function closeDialog() {
  dialogVisible.value = false
  dialogTitle.value = '标题'
  tagType.value = null
  tagName.value = null
}

function saveTagItem() {
  dialogVisible.value = false
  dialogTitle.value = '标题'
  toast.successToast('成功保存')
  tagType.value = null
  tagName.value = null
}
const tagType = ref(null)
const tagName = ref(null)
</script>

<template>
  <div class="tag-wrapper box-wrapper">
    <div class="del-edit-search">
      <div class="delete"><el-button type="danger" size="small">删除</el-button></div>
      <!-- <div class="add"><el-button type="warning" size="small" >修改</el-button></div> -->
      <div class="search">
        <el-input class="search-input form"
          v-model="tagSearch"
          style="width: 200px; height: 26px;"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <div class="tags-body">
      <el-table :data="tagItems" style="width: 100%" max-height="620"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="30" />
        <el-table-column prop="label" label="类别" width="" />
        <el-table-column prop="name" label="名称" width="" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="warning" size="small" @click="editTagItem(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 100%; margin-top: 10px;" type="primary" @click="addTagItem">添 加</el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="auto"
      align-center
    >
      <div class="type" style="margin-bottom: 10px;">
        <span>类 别：</span>
        <el-input size="small"
          v-model="tagType"
          style="display: inline;"
        />
      </div>
      <div class="name">
        <span>标 签：</span>
        <el-input size="small"
          v-model="tagName"
          style="display: inline;"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="saveTagItem">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.tag-wrapper {
  padding: 10px;

  .del-edit-search {
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;

    div {
      padding-right: 20px;
      line-height: 32px;
    }
  }
}
:deep(.el-input__inner) {
  font-family: 'text-font';
}
</style>
