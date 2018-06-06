<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style=" height: 60px;background-color: white">
      <span style="line-height: 60px;font-size: 30px;margin-left: 20px">意见反馈</span>

    </div>
    <div style="margin-left: 20px;margin-top: 20px;background-color: white">
      <div style="padding-left: 20px;padding-top: 20px">
        搜索 :  <el-input placeholder="请输入关键字" style="width: 300px;margin-left: 20px;padding-left: 20px;" size="small" >
        <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width: 30px " onclick="alert(11)"></i>
      </el-input>
      </div>
      <div style="margin-left: 20px">
        <el-table

          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="用户id"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
          >
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="登陆方式"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="最近登陆时间"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="性别"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    }
  }
</script>

<style scoped>

</style>
