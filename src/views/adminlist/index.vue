<template xmlns="http://www.w3.org/1999/html">
    <div>
      <div style=" height: 60px;background-color: white">
        <span style="line-height: 60px;font-size: 20px;margin-left: 20px">管理员列表</span>
        <el-button type="primary" size="mini" @click="whownewadminfun()" class="newadmin_class" > +  新增管理员</el-button>
      </div>
      <div style="margin-left: 20px;margin-top: 20px;background-color: white;height:840px;">
        <div style="padding-left: 20px;padding-top: 20px">
          搜索 :  <el-input placeholder="请输入用户名或者真实姓名" style="width: 300px;margin-left: -18px;padding-left: 20px;" size="small" v-model="serach.key" @keyup.enter.native="serachs">
          <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width: 30px;" v-on:click="serachs"></i>
        </el-input>
        </div>
        <div style="margin-left: 20px;margin-top:30px;">
        <el-table
          :data="tableData"
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
            label="真实姓名"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
          >
            <template slot-scope="scope">
                <div slot="reference">
                  <span v-if="scope.row.state == 1" > <li style="color:red"><span style="color: rgba(191,191,191,1);" @click="changeStatue(scope.row.state,scope.row.id)">已停用</span></li></span>
                  <span v-if="scope.row.state== 0" > <li style="color: #52C41A;"><span style="color: black;" @click="changeStatue(scope.row.state,scope.row.id)">已启用</span></li></span>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                @click="resetPwdfun(scope.row.id)" type="primary">重置密码</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete(scope.$index,scope.row.id)">删除</el-button> -->
                <div class="operation_list" style="font-size:14px;color:#00C7FF;">
                 
                    <span @click="resetPwdfun(scope.row.id)" style="cursor:pointer;margin:0 auto;">重置密码</span>
                    <span style="color:gray">|</span>
                    <span @click="handleDelete(scope.$index,scope.row.id)" style="cursor:pointer">删除</span>
                 
                </div>
            </template>


          </el-table-column>
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


      <el-dialog title="重置密码" :visible.sync="showPwdBox" class="showPedBox">
        <div class="pwd_box">

          <div class="margin_width">
            密码:<el-input type="password" v-model="rectpwdValue.password"  class="pwdinput_width" auto-complete="off" placeholder="请输入密码"></el-input><i class="ico_class">*</i>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="showPwdBox = false">取 消</el-button>
          <el-button type="primary" @click="resetPwd">确定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="新增管理员" :visible.sync="showNewadmin"  class="showNewadmin">
        <div class="pwd_box">
          <div class="margin_width_user">
            <el-form :label-position="labelPosition" label-width="80px" :model="ruleData">
              <el-form-item label="用户名:">
                <el-input style="width: 50%" placeholder="请输入用户名" v-model="ruleData.username"></el-input><i class="ico_class">*</i>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input style="width: 50%" placeholder="请输入密码"
                v-model="ruleData.password" type="password"></el-input><i class="ico_class">*</i>
              </el-form-item>
              <el-form-item label="真实姓名:">
                <el-input style="width: 50%" placeholder="请输入真实姓名"
                v-model="ruleData.nickname"></el-input><i class="ico_class">*</i>
              </el-form-item>
            </el-form>
          </div>

        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="showNewadmin = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import {getAdminList,delAdmin,addAdmin,oppenAdmin,updatePwd,doSerach} from "@/api/admin";

  export default {
      data() {
        // var validatePass = (rule, value, callback) => {
        //   if (value === '') {
        //     callback(new Error('请输入密码'))
        //   } else {
        //     if (this.ruleForm2.checkPass !== '') {
        //       this.$refs.ruleForm2.validateField('checkPass')
        //     }
        //     callback()
        //   }
        // }

        return {
          ruleData: {
            id: '12987122',
            username: '',
            password: '',
            nickname: '',
            state: '234',
            operation: '3.2'
          },
          coutPages:0,
          labelPosition: 'right',
          showNewadmin: false,
          rectpwdValue: {
            password:'',
            id:''
          },
          showPwdBox: false,
          tableData: [],
          page: 1,
          pageSize: 10,
          total: 10,
          userName: '',
          updateData: {},
          mockData: {
            data: [],
            total: 20
          }, // 模拟后端返回数据
          serach:{key:''}
        }
      },
      methods: {
        // 根据参数（页码，每页显示数量，时间区间）进行数据梳理，并及时更新到表格上去
        refresh() {
          // 定义arr模拟接口接受到的数据(进行json数据克隆)
          const arr = JSON.parse(JSON.stringify(this.mockData.data))
          // 因为不是从接口获取数据，所以需要定义一个中间变量进行数据接收，避免数据冲突
          const middleArr = arr.filter((e, index) => {
            // 如果开始时间和结束时间有值
            if (this.userName) {
              // 而且数据时间在开始时间和结束时间的区间内，就返回对象e
              if (e.username.indexOf(this.userName) !== -1 || e.nickname.indexOf(this.userName) !== -1) {
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
        // 点击添加管理员的确定按钮
        addUser() {
          // this.showNewadmin = false
          // this.ruleData.id = 1000 + this.mockData.data.length
          // this.mockData.data.push(this.ruleData)
          // this.refresh()
          //  console.log(this.ruleData.password)
          addAdmin(this.ruleData.username,this.ruleData.password,this.ruleData.nickname).then(({code})=>{
            if(code===0){
              this.$message({
                type:'success',
                message:'添加成功'
              })
              this.getAdminListInfo()
              this.showNewadmin = false
            }else{
              this.$message({
                type:'error',
                message:'未知错误'
              })
            }
          }).catch(()=>{
            this.$message({
              type:'info',
              message:'添加失败'
            });
          });
          this.ruleData = {}
        },
        // 禁用启用管理员
        changeStatue(type,id){
            let stausMsg
            let tsMsg
            // console.log(type)
            // alert(id)
            if(type ===0){
              stausMsg = '是否停用该用户'
              tsMsg = '停用成功'
            }else{
              stausMsg = '是否开启该用户'
              tsMsg = '开启成功'
            }
            this.$confirm(stausMsg,'提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              oppenAdmin(type,id).then(({code})=>{
                if(code===0){
                  this.$message({
                    type:'success',
                    message:tsMsg
                  });
                    this.getAdminListInfo()
                }else{
                  this.$message({
                    type:'info',
                    message:'失败'
                  });
                }
              }).catch(()=>{

              })
            }).catch(()=>{
              this.$message({
                type:'info',
                message:'已取消操作'
              });
            })
        },

        // 修改密码
        resetPwd() {
          // this.showPwdBox = false
          // this.updateData.password = this.rectpwdValue
          // this.mockData.data.splice(this.mockData.i, 1, this.updateData)
          // this.refresh()
          // console.log(this.mockData.data)

          console.log(this.rectpwdValue.password)
          // alert(this.rectpwdValue.id)
          updatePwd(this.rectpwdValue.id,this.rectpwdValue.password).then(({code})=>{
            if(code ===0){
              this.$message({
                type:'success',
                message:'修改成功'
              })
              this.showPwdBox=false
              this.rectpwdValue = {}
            }else {
              this.$message({
                type:'error',
                message:'未知错误'
              })
            }
          }).catch(()=>{
            if(code ==2){
              this.$message({
                type:'error',
                message:'不是超级管理员不能进行操作'
              })
            }
            
          })
          this.rectpwdValue = {}
        },
        resetPwdfun(index, row) {
          // console.log(index, row)
          this.$set(this.updateData, 'i', index)
          this.rectpwdValue.id = index
          this.showPwdBox = true
        },

        whownewadminfun() {
          this.showNewadmin = true;
        },

        // 删除
        handleDelete(index,row) {
          // alert(row)
          this.$confirm('确定要删除该账户吗？删除之后将会丢失该账户的全部权限信息。', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delAdmin(row).then(({code})=>{
              //alert(row.id)
              if(code ===0)
              {
                this.$message({
                  type:"success",
                  message:"删除成功"
                });
                this.getAdminListInfo()
              }else {
                this.$message({
                  type:'error',
                  message:'删除失败'
                });
              }
              }).catch(()=>{
                this.$message({
                  type:'error',
                  message:"删除失败 只有超级 管理员才能删除"
                })
          })
            })
              // this.refresh()

        },
        // 管理员列表
        getAdminListInfo()
        {
          getAdminList().then(({code,body,msg})=>{
            if(code ===0)
            {
              //列表数据
              this.tableData = body.data
              this.coutPages = body.total
              console.log('test')
              console.log(this.tableData)
              //总页数
            }
          })
        },
        change(num){
          //alert(num)
          getAdminList(num).then(({code ,body }) => {
            if(code === 0 ) {
              this.tableData = body.data
              this.coutPages = body.total
            }
          })

        },
        serachs(){
          doSerach(this.serach.key).then(({code,body,msg})=>{
            if(code === 0){
              this.tableData = body;
              // alert(this.tableData)
            }
          })

        }
      },
    mounted(){
        this.getAdminListInfo(0)
        console.log(this.tableData)

    }
    }
</script>

<style >
  .margin_width{
    margin-left: 78px;}
  .el-dialog__body{padding: 0 !important;}
    .pwdinput_width{width:50%;margin-left: 20px;}
    .ico_class{color: red;margin-left: 10px}
  .pwd_box{border-top: 1px solid #eee;border-bottom: 1px solid #eee;padding: 30px 0px;}
  .newadmin_class{width: 130px;float: right;margin-right: 35px;margin-top: 16px;font-size:14px;}
  .margin_width_user{margin-left: 50px;}
  .showNewadmin{
    width:55%;
    margin:0 auto;
  }
  .el-dialog__title{
    font-size:17px;
    color:#666 ;
    font-weight:500;

  }
  .el-form-item__label{
    font-size:14px;
    color:#666;
  }
  label {
    font-weight:300;
  }
  .showPedBox{
    width:55%;
    margin:0 auto;
  }
  .el-dialog__body{
    color:#666;
    font-weight:300;
  }
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
  .el-table th>.cell{
  color:black;
}
  
</style>
