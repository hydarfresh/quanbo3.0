<template>
  <div style="">
    <div style="background-color: white;height: 60px;"><span style="line-height: 60px;margin-left: 20px;font-size:20px;color:black">数据</span></div>
    <div style="margin-top: 25px;background-color: white;margin-left: 40px;height:840px;" >
      <div style="padding-top: 25px;padding-left: 25px">
        <el-date-picker v-model="serachs.starttime" placeholder="开始时间" value-format="timestamp" size="small"></el-date-picker>
        <el-date-picker v-model="serachs.overtime" style="margin-left: 40px" value-format="timestamp"  placeholder="结束时间" size="small"></el-date-picker>
        <el-button type="primary" size="small" v-on:click="serachdash" class="choose">筛选</el-button>
        <!-- <button v-on:click="serachdash" class="choose" style="">筛选</button> -->
      </div>
      <div style="margin-top: 40px;padding-left: 25px">
        <el-table style="width: 100%;background-color:#FAFAFA;" stripe
                  :data="tableData"
        >
          <el-table-column label="日期" prop="daytime" style="font-weight:bold"></el-table-column>
          <el-table-column label="注册用户" prop="countregister" ></el-table-column>
          <el-table-column label="新增注册" prop="newregister" ></el-table-column>
          <el-table-column label="今日启动" prop="todaystart" ></el-table-column>
          <el-table-column label="连接盒子的用户数" prop="todayconnect" ></el-table-column>
          <el-table-column label="次日留存率" prop="loginrate" ></el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="coutPages"
          @current-change="change"
        >
        </el-pagination>
      </div>
      </div>


  </div>
</template>

<script>
import {getDashboardList,doSerach} from '@/api/dashboard'
export default {
  name: 'dashboard',
  data() {
    return {
      tableData: [],
      mockData: {
        data: [],
        total: 20
      }, // 模拟后端返回数据
      date: {
        begin: '',
        finish: ''
      },
      coutPages:0,
      page: 1,
      pageSize: 10,
      total: 10,
      serachs:{
        starttime:'',
        overtime:''
      },
    }
  },
  // mounted() {
  //   for (let i = 0; i < 20; i++) {
  //     this.mockData.data.push({
  //       date: '2018.6.' + i,
  //       usercount: '5000000',
  //       newusercount: '500000',
  //       daycount: '6000',
  //       linkcount: '2342',
  //       staycount: '3552'
  //     })
  //   }
  //   this.refresh()
  // },
  methods: {
    // 根据参数（页码，每页显示数量，时间区间）进行数据梳理，并及时更新到表格上去
    refresh() {
      // 定义arr模拟接口接受到的数据(进行json数据克隆)
      const arr = JSON.parse(JSON.stringify(this.mockData.data))
      // 因为不是从接口获取数据，所以需要定义一个中间变量进行数据接收，避免数据冲突
      const middleArr = arr.filter((e, index) => {
        // 将开始时间，结束时间，和每条数据中的时间转换成毫秒数
        const startTime = new Date(this.date.begin).getTime()
        const endTime = new Date(this.date.finish).getTime()
        const eTime = new Date(e.date).getTime()
        // 如果开始时间和结束时间有值
        if (this.date.begin && this.date.finish) {
          // 而且数据时间在开始时间和结束时间的区间内，就返回对象e
          if (+eTime >= +startTime && +eTime <= +endTime) {
            return e
          }
        } else { // 如果开始时间和结束时间没有值就直接返回
          return e
        }
      })
      // 及时更新获取的数据总条数
      this.total = middleArr.length
      // 获取最终要显示的数据集
      this.tableData = middleArr.filter((item, index) => {
        // 对数据进行分页
        if (index >= (this.page - 1) * this.pageSize && index < this.page * this.pageSize) {
          return item
        }
      })
    },
    // 获取列表
    getDashboardListInfo(){
      getDashboardList().then(({code,body,img})=>{
        if(code === 0){
          this.tableData = body.data
          this.coutPages = body.total
        }
      })
    },
    change(num){
      getDashboardList(num).then(({code,body})=>{
        if(code === 0){
          this.tableData = body.data
          this.coutPages = body.total
        }
      })
    },
    // 改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.refresh()
    },
    // 改变页码
    handleCurrentChange(val) {
      this.page = val
      this.refresh()
    },
    // 筛选
    serachdash(){

      doSerach(this.serachs.starttime,this.serachs.overtime).then(({code,body,msg})=>{
        if(code == 0){

          this.tableData = body;
        }
      }).catch(function(err){
        console.log("test")
      });
    }
  },
  mounted() {
    this.getDashboardListInfo(0)
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" >
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
.el-table th>.cell{
  color:black;
}
// .choose{
//   background-color:#00C7FF;
// }
.el-button--primary {
  color: #fff;
  background-color: #00C7FF;
  border-color: #00C7FF;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #00C7FF;
  color: #fff;
}
.el-button--primary:hover {
  background: #00C7FF;
  border-color: #00C7FF;
  color: #fff;
}



</style>
