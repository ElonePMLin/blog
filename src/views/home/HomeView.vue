<script setup>
// 文章数数据
import { ref } from 'vue';
const articleCount = ref(0)

import { inject } from 'vue'
const echarts = inject('echarts')
// 分类 echart
var category = ref(null)
const categoryOption = ref({
  title: {
    text: '分类',
    left: 'center',
    top: 'center',
    textStyle: {
      fontFamily: 'text-font',
      // color: 'black'
    },
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '测试',
          label: {
            fontFamily: 'text-font'
          }
        },
        {
          value: 234,
          name: 'B',
          label: {
            fontFamily: 'text-font'
          }
        },
        {
          value: 1548,
          name: 'C',
          label: {
            fontFamily: 'text-font'
          }
        }
      ],
      radius: ['40%', '70%'],
    }
  ]
})
function initCategory() {
  statisLoading.value = true

  // 从服务器获取数据

  // 初始化echarts
  category.value = echarts.init(document.getElementById('category'), null, { renderer: 'canvas' });
  // 生产echarts
  category.value.setOption(categoryOption.value);
  // 模拟获取数据
  // setTimeout(() => {
  //   statisLoading.value = false
    
  //   category.value.clear()
  //   category.value.resize({
  //     width: 'auto', height: 'auto'
  //   })
  //   category.value.setOption(categoryOption);
  // }, 1000)
}

// 标签 echart
var tag = ref(null)
const tagOption = ref({
  title: {
    text: '标签',
    left: 'center',
    top: 'center',
    textStyle: {
      fontFamily: 'text-font',
      // color: 'black'
    },
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'A',
          label: {
            fontFamily: 'text-font'
          }
        },
        {
          value: 234,
          name: 'B',
          label: {
            fontFamily: 'text-font'
          }
        },
        {
          value: 1548,
          name: 'C',
          label: {
            fontFamily: 'text-font'
          }
        }
      ],
      radius: ['40%', '70%']
    }
  ]
})
function initTag() {
  statisLoading.value = true
  // 从服务器获取数据
  // 初始化echarts
  tag.value = echarts.init(document.getElementById('tag'), null, { renderer: 'canvas' });
  tag.value.setOption(tagOption.value);
  // 模拟获取数据
  // setTimeout(() => {
  //   statisLoading.value = false
    
  //   tag.value.clear()
  //   tag.value.resize({
  //     width: 'auto', height: 'auto'
  //   })
  //   tag.value.setOption(tagOption);
  // }, 1000)
}

// contribute echart
var dateDate = new Date()
const currYear = ref(dateDate.getFullYear())
const yearsList = ref([currYear.value, currYear.value - 1, currYear.value - 2])
const yearDiv = ref(null)
const activatedYear = ref(0)
function activeYear(idx) {
  if (idx == -1) {
    // resize使用的
    return initContribute(yearsList.value[activatedYear.value])
  }
  const year = yearsList.value[idx]
  yearDiv.value[activatedYear.value].classList.remove('active-year')
  yearDiv.value[idx].classList.add('active-year')
  
  contribute.value.dispose()
  contribute.value = null
  initContribute(year);
  activatedYear.value = idx

  if (idx == 0) {
    latestActivity.value = month.value[dateDate.getMonth()] + " " + dateDate.getFullYear()
  } else {
    latestActivity.value = month.value[11] + " " + year
  }

  contribLoading.value = true
  contributionActivity.value = {}
  // 模拟获取数据
  setTimeout(() => {
    contributionActivity.value[latestActivity.value] = []
    contribLoading.value = false
  }, 1000)
  
  
}
const selectYear = ref(currYear.value);
function getVirtualData(year) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}
var contribute = ref(null)
function initContribute(year) {
  const contributeOption = {
    title: {
      top: 30,
      left: 'center',
      text: 'Contribute Count',
      show: false
    },
    tooltip: {
      formatter: function(params) {
        const contributions = params.data[1]
        if (contributions == 0) {
          return ''
        }
        const data = new Date(params.data[0])
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = data.getDate() + ' ' + month[data.getMonth()] + ' ' + week[data.getDay()]
        return contributions + ' 贡献 on  ' + date;
      },
      textStyle: {
        fontFamily: 'text-font',
        fontSize: '10',
        fontWeight: 'lighter'
      }
    },
    visualMap: {
      min: 0,
      max: 10000,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      inRange: {
        color: ['#adcaff49', '#5291FF']
      },
      show: false,
    },
    calendar: {
      // top: 120,
      left: 50,
      right: 30,
      cellSize: ['auto', 13],
      range: `${year}`,
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false },
      dayLabel: {
        nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
        fontFamily: 'text-font',
        color: 'rgb(70, 70, 70)'
      },
      monthLabel: {
        nameMap: ['Jan', '', 'Mar', '', 'May', '', 'Jul', '', 'Sep', '', 'Nov', ''],
        fontFamily: 'text-font',
        color: 'rgb(70, 70, 70)'
      }
    },
    // yAxis: {

    // },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData(`${year}`)
    }
  }
  if (!contribute.value) {
    contribute.value = echarts.init(document.getElementById('contribute'), null, { renderer: 'svg' });
  }
  // contribute.value = echarts.init(document.getElementById('contribute'), null, { renderer: 'svg' });
  contribute.value.setOption(contributeOption)
}

// 控制贡献内容
// 默认显示一个月的数据先
// 初始化贡献内容（最初显示最新的一个月）
// const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
const latestActivity = ref(month.value[dateDate.getMonth()] + " " + dateDate.getFullYear())
var contributionActivity = ref({})
// contributionActivity.value[latestActivity.value] = []
// contributionActivity.value[latestActivity] = [{action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'}]
// contributionActivity.value[latestActivity.value] = [
//   {action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'},
//   {action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'},
//   {action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'},
//   {action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'},
//   {action: '创建标签', content: 'Vue', details: '', date: 'Mar 20'},
// ]
// contributionActivity.value["February 2024"] = []

import { onMounted } from 'vue'
onMounted(() => {
  // 在dom生产后，初始化echarts
  initCategory();
  initTag();

  setTimeout(() => {
    const wid = document.getElementsByClassName('statistics-items')[0].clientWidth
    tag.value.resize({
      width: wid / 3 + 'px', height: '150px'
    })
    tag.value.clear()
    tag.value.setOption(tagOption.value)
    
    
    category.value.resize({
      width: wid / 3 + 'px', height: '150px'
    })
    category.value.clear()
    category.value.setOption(categoryOption.value);

    statisLoading.value = false
  }, 1000)

  initContribute(selectYear.value);
  activeYear(0);

  // contribute resize
  window.addEventListener('resize', () => {
    contribute.value.resize({
      width: 'auto', height: 'auto'
    })
    // 清除旧实例，为了重新渲染，否则无法上色（即颜色全部一致）
    contribute.value.clear()

    tag.value.resize({
      width: 'auto', height: '150px'
    })
    tag.value.clear()
    tag.value.setOption(tagOption.value)
    
    
    category.value.resize({
      width: 'auto', height: '150px'
    })
    category.value.clear()
    category.value.setOption(categoryOption.value);

    activeYear(-1);
  });
})

// 加载贡献
function loadingPage() {
  contribLoading.value = true
  
  const mon = latestActivity.value.split(' ')[0]
  var year = latestActivity.value.split(' ')[1]
  var idx = month.value.indexOf(mon) - 1
  if (idx == -1) {
    year = year - 1
    idx = 11
  }
  const newMonth = month.value[idx]
  latestActivity.value = newMonth + ' ' + year
  
  // 模拟获取数据
  setTimeout(() => {
    contributionActivity.value[latestActivity.value] = []
    contribLoading.value = false
  }, 1000)
  
}

import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia'
const main = useMainStore();
const { isMobile } = storeToRefs(main);

const statisLoading = ref(false)
const contribLoading = ref(false)
</script>

<template>
  <div class="home-wrapper box-wrapper">
    <div class="home-left">
      <div class="statistics-box box">
        <div class="box-title">统计</div>
        <div class="statistics-items">
          <LoadingScreen :isLoading="statisLoading" />
          <div class="article-count item" v-show="!statisLoading">
            <span class="article-num" title="文章数">{{ articleCount }}</span>
          </div>
          <div class="category-chart item" v-show="!statisLoading">
            <div id="category" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="tag-chart item" v-show="!statisLoading">
            <div id="tag" style="width: 100%; height: 100%;"></div>
          </div>
        </div>
      </div>
      <div class="contribute-box box">
        <div class="box-title">贡献</div>
        <div class="contribute-items">
          <div class="contirb-item">
            <div id="contribute" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="contirb-years">
            <div class="years" ref="yearDiv" @click="activeYear(idx)"
            v-for="year, idx in yearsList" :key="idx">
              {{ year }}
            </div>
          </div>
        </div>
        <div class="contribute-activity"><span>贡献内容</span></div>
        <div class="activity-items">
          <div class="one-month" v-for="values, key in contributionActivity" :key="key" >
            <div class="month-year-content">
              <div class="month-year">{{ key }}</div>
              <div class="split-line"></div>
            </div>
            <div class="activity-content" v-for="item, idx in values" :key="idx">
              <div class="action-icon"></div>
              <div class="action-details">
                <div class="action">
                  <span class="action-name">{{ item.action }}</span>
                  <span class="extend-short">icon</span>
                </div>
                <div class="action-contont">
                  <div class="contont-title">
                    <span class="title">{{ item.content }}</span>
                    <span class="date">{{ item.date }}</span>
                  </div>
                  <div class="content-details">{{ item.details }}</div>
                </div>
              </div>
            </div>
            <div class="none-content" v-if="JSON.stringify(values) == '[]'">
              <span>期间没有内容</span>
            </div>
          </div>
          <div v-show="!contribLoading" class="loading-more">
            <PaginatorLoading @loadMore="loadingPage" />
          </div>
        </div>
        <LoadingScreen :isLoading="contribLoading" />
      </div>
    </div>
    <div class="home-right" v-if="!isMobile">
      <div class="avatar">
        <el-avatar v-loading="true" shape="square" :size="150" src="" />
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.box {
  padding: 5px;
  transition: .5s linear;
  border-radius: 10px;
  box-shadow: 0px 0px 5px .1px var(--text-color1);
  &:hover {
    box-shadow: 0px 0px 10px .1px var(--text-color1);
  }
}
.home-wrapper {
  padding: 10px;

  /* @media (min-width: 1119px) { */
    .home-left {
      float: left;
      height: 100%;
      width: 80%;
      padding: 3px 10px 3px 3px;

      .box-title {
        color: var(--text-color);
        font-size: 30px;
        border-bottom: 4px double var(--text-color1);
      }

      .statistics-box {
        margin-bottom: 30px;

        .statistics-items {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          height: 150px;

          .item {
            width: calc(100% / 3);
            height: 150px;
            text-align: center;
          }
          .article-count {
            transform: skew(-20deg, 0deg);

            .article-num {
              line-height: 150px;
              font-size: 50px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .contribute-box {
        position: relative;
        overflow: hidden scroll;
        height: calc(100% - 250px);
        margin-bottom: 10px;

        .contribute-items {
          display: flex;
          flex-direction: row;
          height: 200px;
          justify-content: space-between;

          .contirb-item {
            width: 90%;
            height: 200px;
          }
          .contirb-years {
            /* position: sticky; */
            /* top: 0px; */
            /* right: 0px; */
            width: 10%;
            height: 200px;
            padding-top: 15px;

            .years {
              margin: 5px 10px 10px 0px ;
              text-align: center;
              cursor: pointer;
              border-radius: 5px;

              &:hover {
                background-color: var(--text-color2);
              }
            }
            .active-year {
              /* border: 1px solid var(--text-color1); */
              background-color: var(--text-color1);
            }
          }
        }
        .contribute-activity {

          span {
            font-size: 18px;
            border-bottom: 1px solid var(--text-color1);
          }
        }
        .activity-items {
          padding: 10px;

          .one-month {
            padding-bottom: 20px;

            .month-year-content {
              display: flex;
              flex-direction: row;
              width: 100%;
              align-items: center;
              padding-bottom: 10px;

              .month-year {
                width: auto;
                font-size: 14px;
              }
              .split-line {
                margin-left: 20px;
                width: 74.5%;
                height: 1px;
                border: 1px solid var(--text-color1);
              }
            }
          .none-content {
              padding: 30px 0px 0px 0px;
              height: 80px;
              text-align: center !important;
              color: var(--text-color1);
            }
          }
          .activity-content {
            position: relative;
            margin: 0px 0px 0px 10px;
            /* padding: 20px 0px 20px 30px; */

            &:before {
              position: absolute;
              display: block;
              top: 0px;
              left: 0px;
              bottom: 0px;
              content: '';
              width: 1px;
              border: 1px solid var(--text-color1);
            }
            .action-details {
              padding: 20px 0px 20px 30px;

              .action {
                height: 30px;
                width: 88%;

                .action-name {
                  float: left;
                  font-size: 20px;
                  cursor: pointer;
                }
                .extend-short {
                  float: right;
                  font-size: 10px;
                  cursor: pointer;
                }
              }
              .action-contont {
                width: 88%;
                .contont-title {
                  font-size: 14px;
                  color: var(--text-color1);
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  cursor: pointer;
                }
                /* .content-details {
                  
                } */
              }
            }
          }
        }
      }
    }
    .home-right {
      float: left;
      height: 100%;
      width: 20%;
      border-left: 3px dashed var(--text-color1);
      padding: 3px;

      .avatar {
        text-align: center;
        height: 193px;
        cursor: pointer;
      }
    }
  /* } */

  @media (max-width: 1118px) {
    .home-left {
      float: left;
      height: 100%;
      width: 100%;
      padding: 3px 10px 3px 3px;
    }
    
  }
}
</style>
