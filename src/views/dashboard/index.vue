<template>
  <div style="">
    <div style="background-color: white;height: 60px;"><span style="line-height: 60px;margin-left: 20px">数据</span></div>
    <div style="margin-top: 25px;background-color: white;margin-left: 40px">
      <div style="padding-top: 25px;padding-left: 25px">
        <el-date-picker v-model="date.begin" type="date" placeholder="开始时间" size="small" value-format="Date"></el-date-picker>
        <el-date-picker v-model="date.finish" style="margin-left: 40px" type="date" placeholder="结束时间" size="small"></el-date-picker>
        <el-button type="primary" size="small">筛选</el-button>
      </div>
      <div style="margin-top: 40px;padding-left: 25px">
        <el-table style="width: 100%" stripe>
          <el-table-column label="日期" prop="" ></el-table-column>
          <el-table-column label="注册用户" prop="" ></el-table-column>
          <el-table-column label="新增用户" prop="" ></el-table-column>
          <el-table-column label="今日启动" prop="" ></el-table-column>
          <el-table-column label="连接盒子的用户数" prop="" ></el-table-column>
          <el-table-column label="次日留存率" prop="" ></el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="10">
        </el-pagination>
      </div>
      </div>


  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data() {
    return {
      date: {
        begin: '',
        finish: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
