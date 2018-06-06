<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style=" height: 60px;background-color: white">
      <span style="line-height: 60px;font-size: 20px;margin-left: 20px">消息管理</span>
      <el-button type="primary" size="mini" style="width: 100px;float: right;margin-right: 20px;margin-top: 16px"> +  新增管理员</el-button>
    </div>
    <div style="margin-left: 20px;margin-top: 20px;background-color: white">
      <div style="padding-left: 20px;padding-top: 20px">
        搜索 :  <el-input placeholder="请输入活动标题" style="width: 300px;margin-left: 20px;padding-left: 20px;" size="small" >
        <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width: 30px " onclick="alert(11)"></i>
      </el-input>
      </div>
      <div style="margin-left: 20px;margin-top: 30px">
        <el-table

          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="消息标题"
          >
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="消息描述"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="图片"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="跳转链接"
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
