<!--<template>-->
    <!--<div>版本管理</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->

    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->



<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div style="height:60px;background-color:white;">
            <span style="line-height:60px;font-size:20px;margin-left:20px">版本管理</span>
            <el-button type="primary" size="mini" style="width:130px;float:right;margin-right:35px;margin-top:16px;font-size:14px;" @click="shownewversionfunc"> +  上传新版本</el-button>
        </div>
        <div style="margin-left:20px;margin-top:20px;background-color:white;">
            <div style="padding-left:20px;padding-top:20px;">
                搜索 :
                <el-input placeholder="请输入版本号" style="width:300px;margin-left:-18px;padding-left:20px;" size="small" v-model="serach.key" @keyup.enter.native="serachs">
                    <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width:30px;" v-on:click="serachs"></i>
                </el-input>
            </div>
            <div style="margin-left:20px;margin-top:30px;">
                <el-table :data="tableData" style="width:100%">
                    <el-table-column prop="aid" label="版本ID"></el-table-column>
                    <el-table-column prop="appversion" label="版本号"></el-table-column>
                    <el-table-column prop="updateurl" label="更新地址"></el-table-column>
                    <el-table-column prop="isnew" label="是否推送更新">
                        <template slot-scope="scope">
                            <el-switch on-text="" off-text="" @change="isnewChange(scope.row)" v-model="scope.row.isnewStatus">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isupdate" label="是否强制更新">
                        <template slot-scope="scope">
                          <el-switch on-text="" off-text="" @change="isupdateChange(scope.row)" v-model="scope.row.isupdateStatus">
                          </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updatelog" label="更新日志"></el-table-column>

                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" @click="updateversionfunc(scope.$index,scope.row)" class="edit" type="primary">
                                编辑
                            </el-button>
                            <el-button size="mini" @click="handleDelete(scope.$index,scope.row.aid)" class="delete" type="primary">
                                删除
                            </el-button> -->
                            <div calss="operation_list" style="fonr-size:14px;color:#00C7FF">
                              
                                <span @click="updateversionfunc(scope.$index,scope.row)" style="cursor:pointer">编辑</span>
                                <span style="color:gray">|</span>
                                <span @click="handleDelete(scope.$index,scope.row.aid)" style="cursor:pointer">删除</span>
                             
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
        <el-dialog title="上传新版本" :visible.sync="updatenewversion" width="35%">
            <div class="version_box">
                <div class="margin_width_version">
                    <el-form :label-position="labelPosition" label-width="80px;">
                        <el-form-item label="选择安装包:">
                            <el-upload
                                name="apk"
                                class="upload"
                                ref="upload"
                                :action="upLoadData.url"
                                :data="upLoadData"
                                :on-success="upLoadSuccessResponse"
                                :beforeUpload="beforeAvatarUpload"
                                :auto-upload="false"
                                :limit="1"
                                multiple>
                                <el-button slot="trigger" size="small" class="choose" style="margin-right:18px;">上传文件</el-button>
                                <span slot="tip" class="el-upload_tip" >注：apk格式安装包</span>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="版本号:" style="margin-left:28px;">
                            <el-input style="width:50%;position:relative;right:26px" placeholder="请输入版本号" class="version_id" v-model="upLoadData.appversion" ></el-input>
                        </el-form-item>
                        <el-form-item label="更新日志:" style="margin-left:13px">
                            <el-input type="textarea" style="width:65%;position:relative;right:11px" placeholder="请输入至少五个字符" class="update_daily" v-model="upLoadData.updatelog"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatenewversion=false">取消</el-button>
                <el-button type="primary" @click="addversion">确定</el-button>
            </div>
        </el-dialog>

      <el-dialog title="编辑" :visible.sync="bjnewversion" width="35%">
        <div class="version_box">
          <div class="margin_width_version">
            <el-form :label-position="labelPosition" label-width="80px;" :model="updateData">
              <el-form-item label="选择安装包:">
                <el-upload
                  name="apk"
                  class="upload"
                  ref="uploads"
                  action="apis/appversion/editAppversion"

                  :file-list="fileList"
                  :limit="1"
                  :data="updateData"
                  :auto-upload="false"
                  multiple
                  >
                  <el-button slot="trigger" size="small" class="choose" style="margin-right:18px;">上传文件</el-button>
                  <span slot="tip" class="el-upload_tip">注：apk格式安装包</span>
                </el-upload>
              </el-form-item>
              <el-form-item label="版本号:" style="margin-left:28px;">
                <el-input style="width:50%;position:relative;right:26px" placeholder="请输入版本号" class="version_id" v-model="updateData.appversion"></el-input>
              </el-form-item>
              <el-form-item label="更新日志:" style="margin-left:13px">
                <el-input type="textarea" style="width:65%;position:relative;right:11px" placeholder="请输入至少五个字符" class="update_daily" v-model="updateData.updatelog"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bjnewversion = false">取消</el-button>
          <el-button type="primary" @click="updateVersion">确定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    import { getVersionList, delVersionList, addVersion, editVersion, doSerach, isnews, isupdates } from '@/api/version'
    export default{
      data() {
        return {
          delivery_one: false,
          delivery_two: false,
          fileList: [],
          updatenewversion: false,
          bjnewversion: false,
          labelPosition: 'right',
          formLabelAlign: '',
          tableData: [],
          upLoadData: {
            url: 'apis/appversion/addnewapp',
            file: '',
            updatelog: '',
            appversion: ''
          },
          updateData: {
            file: '',
            aid: '',
            updatelog: '',
            appversion: '',
            url: 'apis/appversion/editAppversion'
          },
          addData: {
            version: '',
            time: new Date(),
            update: '',
            file: ''
          },
          mockData: {
            data: [],
            total: 20
          }, // 模拟后端返回数据
          date: {
            begin: '',
            finish: ''
          },
          serach: { key: '' },
          coutPages: 0,
          page: 1,
          pageSize: 10,
          total: 10,
          version: '',
          updateData: {}
        }
      },

      methods: {

        // 根据参数（页码，每页显示数量，时间区间）进行数据梳理，并及时更新到表格上去
        refresh() {
          // 定义arr模拟接口接受到的数据(进行json数据克隆)
          const arr = JSON.parse(JSON.stringify(this.mockData.data))
          // 因为不是从接口获取数据，所以需要定义一个中间变量进行数据接收，避免数据冲突
          const middleArr = arr.filter((e, index) => {
            if (this.version) {
              if (e.version.indexOf(this.version) !== -1) {
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
        // 获取版本列表
        getVersionListInfo() {
          getVersionList().then(({ code, body, msg }) => {
            if (code === 0) {
              this.setNewAndUpdateStatus(body.data)
              this.coutPages = body.total
            }
          })
        },
        change(num) {
          getVersionList(num).then(({ code, body }) => {
            if (code === 0) {
              this.setNewAndUpdateStatus(body.data)
              this.coutPages = body.total
            }
          })
        },
        /*
        * 设置isnew isupdate状态标志位
        */
        setNewAndUpdateStatus(data) {
          data.forEach(element => {
            if (!element.isnew || element.isnew === 0) {
              element.isnewStatus = false
            } else {
              element.isnewStatus = true
            }
            if (!element.isupdate || element.isupdate === 0) {
              element.isupdateStatus = false
            } else {
              element.isupdateStatus = true
            }
          })
          this.tableData = data
          console.log(this.tableData)
        },
        // 删除
        handleDelete(index, row) {
          this.$confirm('确定要删除该版本吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delVersionList(row).then(({ code }) => {
              if (code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getVersionListInfo()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '服务器错误'
              })
            })
          })
    },

        // 上传
        upLoadSuccessResponse(response) {
          if (response.code === 0) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.getVersionListInfo()
            this.upLoadData = {}
          } else {
            this.$message({
              message: response.msg,
              type: 'error'
            })
          }
        },
        addversion() {
          if(this.$refs.upload.uploadFiles.length){
              this.$refs.upload.submit();
            }else{
              this.$message({
                message:"上传失败！请添加安装包",
                type:"error"
              })
           }
          console.log(this.updateData)
          this.$refs.upload.submit()
          this.uploadStatue = false
          this.updatenewversion = false
        },
        beforeAvatarUpload() {
          this.upLoadData.url = 'apis/appversion/addnewapp'
        },

        // 编辑
        updateVersion() {
          // console.log()
          if (this.$refs.uploads.uploadFiles.length) {
            console.log('test')
            this.$refs.uploads.submit()
          } else {
            console.log('test11')
            const updatelog = this.updateData.title
            const appversion = this.updateData.appversion
            const aid = this.updateData.aid
            editVersion(updatelog, appversion, aid).then(({ code }) => {
              if (code === 0) {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.bjnewversion = false
                this.getVersionListInfo()
              } else {
                this.$message({
                  message: '编辑失败',
                  type: 'error'
                })
              }
            })
          }
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
        onSuccess(res, file, fileList) {
          this.updateData.file = file.name
          this.addData.file = file.name
        },
        shownewversionfunc() {
          this.updatenewversion = true
        },

        updateversionfunc(index, row) {
          this.updateData = row
          console.log(this.updateData.aid)
          // this.update.aid = row.aid
          this.bjnewversion = true
        }, /*
        updateVersion() {
          console.log(111)
          this.mockData.data.splice(this.updateData.i, 1, this.updateData)
          this.refresh()
          this.bjnewversion = false
        }*/
        serachs() {
          doSerach(this.serach.key).then(({ code, body, msg }) => {
            if (code == 0) {
              this.tableData = body
              console.log(this.tableData)
              // this.coutPages = body.total;
            }
          })
        },
        /*
        * isnew 是否推送更新，
        * params value为当前行数据信息
        */
                // isnewChange(value) {
                //   console.log(value)
                //   isnews(value.aid).then(({ code, body, msg }) => {
                //     console.log(code, body, msg)
                //     // 重新拉取数据
                //     this.getVersionListInfo()
                //   })
                // },
        isnewChange(value){
          this.$confirm('确定要打开该版本的更新吗？','提示',{
            confirmButtonText:'确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(()=>{
            isnews(value.aid).then(({code,body,msg})=>{
              if(code === 0){
                this.$message({
                  type:"success",
                  message:"成功打开"
                });
                this.getVersionListInfo()
              }else{
                this.$message({
                  type:"error",
                  message:"打开失败"
                });
              }
            }).catch(()=>{
              this.$message({
                type:"error",
                message:"服务器错误"
              })
            })
          }).catch(()=>{
            this.$message({
              type:"info",
              message:'已取消打开'
            });
            this.getVersionListInfo()
          })
        },
        /*
        * isupdate 是否强制更新，
        * params value为当前行数据信息
        */
        isupdateChange(value) {
          console.log(value)
          isupdates(value.aid).then(({ code, body, msg }) => {
            console.log(code, body, msg)
            // 重新拉取数据
            this.getVersionListInfo()
          })
        }
      },
      mounted() {
        console.log(this.upLoadData.url)
        this.getVersionListInfo(0)
  }
    }
</script>

<style >
    .version_box{
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;
        padding:30px 0px;
    }
    .margin_width_version{
        margin-left:50px;
    }
    .el-upload_tip{
        margin-left:27px;
    }
    .version_id{
        margin-left:27px;
    }
    .update_daily{
        margin-left:12px;
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
    .el-dialog__body{
      padding:10px 20px
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
    .el-switch.is-checked .el-switch__core {
      border-color: #00C7FF;
      background-color: #00C7FF;
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





























