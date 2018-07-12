<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style=" height: 60px;background-color: white">
      <span style="line-height: 60px;font-size: 20px;margin-left: 20px">消息管理</span>
      <el-button type="primary" size="mini" @click="shownewactivefunc()" style="width: 130px;float: right;margin-right: 35px;margin-top: 16px;font-size:14px;"> +  新增消息</el-button>
    </div>
    <div style="margin-left: 20px;margin-top: 20px;background-color: white">
      <div style="padding-left: 20px;padding-top: 20px">
        搜索 :  <el-input placeholder="请输入活动标题" style="width: 300px;margin-left: -18px;padding-left: 20px;" size="small" v-model="serach.key" @keyup.enter.native="serachs">
        <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width: 30px " v-on:click="serachs"></i>
      </el-input>
      </div>
      <div style="margin-left: 20px;margin-top: 30px">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="消息标题"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="消息描述"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="hover">
                <div style="width: 200px;break-word;white-space:pre-wrap;">{{ scope.row.content}}</div>
                <div slot="reference" class="name-wrapper">{{ scope.row.content}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column

            label="创建时间"
          >
              <div slot-scope="scope">
                {{scope.row.create_time ? changefunc(new Date(scope.row.create_time),'yyyy-MM-dd' ) : '暂无'}}
              </div>
          </el-table-column>
          <el-table-column
            prop=""
            label="图片"
          >
            <template slot-scope="scope">
              <el-popover>
                <img :src="scope.row.img_url" alt="">
                <div slot="reference" style="height:40px;width:40px;">
                  <img :src="scope.row.img_url" alt="" style="height:100%;width:100%">
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop=""
            label="跳转链接"
          > -->
            <!-- <template slot-scope="scope">
              <div slot="reference">
                <a :href="scope.row.img_url" target="_blank">{{scope.row.img_url}}</a>
              </div>
            </template> -->
          <!-- </el-table-column> -->
          <el-table-column
            prop="operation"
            label="操作"
          >

            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="primary"
                @click="updateactivefunc(scope.$index,scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete( scope.row.id)">删除</el-button> -->
                <div class="operation_list" style="font-size:14px;color:#00C7FF">
           
                    <span @click="updateactivefunc(scope.$index,scope.row)" style="cursor:pointer">编辑</span>
                    <span style="color:gray">|</span>
                    <span @click="handleDelete( scope.row.id)" style="cursor:pointer">删除</span>
             
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

    <el-dialog title="新增消息" :visible.sync="showupdateactive" width="30%">
      <div class="pwd_box">
        <div class="margin_width_user">
          <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item label="消息标题:">
              <el-input  style="width: 50%" placeholder="请输入消息标题" v-model="upLoadData.title"></el-input><i class="ico_class">*</i>
            </el-form-item>
            <el-form-item label="图片:">
              <el-upload
                name="img"
                class="upload"
                ref="upload"
                :data="upLoadData"
                :action="upLoadData.url"
                :limit="1"
                :on-success="upLoadSuccessResponse"
                :auto-upload="false"
                :beforeUpload="beforeAvatarUpload"
                multiple>
                <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                <span slot="tip" class="el-upload__tip" style="margin-left:26px;">注:支持jpg、png</span>
              </el-upload>
            </el-form-item>

              <el-form-item label="消息描述:">
                <el-input type="textarea" style="width: 80%" placeholder="请输入描述" v-model="upLoadData.content"></el-input>
              </el-form-item>
          </el-form>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showupdateactive =false">取 消</el-button>
        <el-button type="primary" @click="showNewadmin">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑消息" :visible.sync="shownewactive" width="30%">
      <div class="pwd_box">
        <div class="margin_width_user">
          <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item label="消息标题:">
              <el-input  style="width: 50%" placeholder="请输入消息标题" v-model="updateData.title"></el-input><i class="ico_class">*</i>
            </el-form-item>
            <el-form-item label="图片:">
              <el-upload
                name="img"
                class="upload"
                ref="uploads"
                :action="updateData.url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="1"
                :data="updateData"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                <span slot="tip" class="el-upload__tip" style="margin-left:26px;">注:支持上传jpg/png文件</span>
              </el-upload>

            </el-form-item>

            <el-form-item label="消息描述:">
              <el-input type="textarea" style="width: 80%" placeholder="请输入消息描述" v-model="updateData.content"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="shownewactive = false">取 消</el-button>
        <el-button type="primary" @click="updateMsg">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getMsgList,addMsg,delMsg,editMsg,doSerach} from "@/api/msg";
  export default {
    data() {
      return {
        fileList: [],
        showupdateactive:false,
        shownewactive:false,
        labelPosition:'right',
        formLabelAlign:'',
        coutPages:0,
        tableData: [],
        upLoadData:{
          url:"apis/msginfo/addmsginfo",
          title:"",
          content:""
        },
        updateData:{
          title:"",
          content:"",
          id:"",
          url:"apis/msginfo/editMsgInfo"
        },
        serach:{
          key:''
        }
      }
    },
    methods :{
      // 获取消息列表
      getMsgListInfo(){
        getMsgList().then(({code,body,msg})=>{
          if(code === 0){
            this.tableData = body.data
            this.coutPages = body.total
          }
        });
      },
      change(num){
        getMsgList(num).then(({code,body})=>{
          if(code === 0){
            this.tableData = body.data
            this.coutPages = body.total
          }
        });
      },
      // 新增
      upLoadSuccessResponse(response){
        if(response.code === 0){
          this.$message({
            message:"上传成功",
            type:"success"
          });
          this.getMsgListInfo();
          this.showupdateactive=false;
        }else{
          this.$message({
            message:response.msg,
            type:"error"
          });
        }
        this.upLoadData = {}
      },
      // 上传提交
      showNewadmin(){
       //alert(1)
       //console.log()
        if(this.$refs.upload.uploadFiles.length){
          this.$refs.upload.submit();
        }else{

         

          const title = this.upLoadData.title
          const content = this.upLoadData.content
        //  alert(content)
          addMsg(title,content).then(({code})=>{
            if(code === 0){
              this.$message({
                message:"上传成功",
                type:"success"
              });
              this.getMsgListInfo();
              this.showupdateactive=false;
            }else{
              this.$message({
                message:"上传失败",
                type:"error"
              });
            }
          })
        }
        // this.$refs.upload.submit();
        this.uploadStatue = false;
        this.upLoadData = {}
        // this.showupdateactive = false;
      },
      beforeAvatarUpload() {},



      // 编辑
      updateMsg(){
        if(this.$refs.uploads.uploadFiles.length){
          this.$refs.uploads.submit();
        }else{
          const title = this.updateData.title
          const content = this.updateData.content
          const id = this.updateData.id
          editMsg(title,content,id).then(({code})=>{
            if(code === 0){
              this.$message({
                message:"编辑成功",
                type:"success"
              });
              this.getMsgListInfo();
              this.shownewactive=false;
            }else{
              this.$message({
                message:"编辑失败",
                type:"error"
              });
            }
          })
        }
      },
      updateactivefunc(index,row){
        this.updateData.title = row.title
        this.updateData.content = row.content
        this.updateData.id = row.id
        this.shownewactive = true　
      },
      // 时间转换
      changefunc(value, fmt = 'yyyy-MM-dd') {
              var _time = new Date(value * 1000)
              _time = _time.toLocaleDateString().replace(/\d+/g,function (_air,_bea) {
                if(_air.length == 1){
                  var _air =  '0'+_air
                }
                return _air
              });
              console.log(_time.replace(/\//g,'-'))
              return _time.replace(/\//g,'-')
       },
      // 删除
      handleDelete(id){
        this.$confirm('确定要删除该消息吗?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          delMsg(id).then(({code})=>{
            if(code === 0){
              this.$message({
                type:"success",
                message:"删除成功"
              });
              this.getMsgListInfo();
            }else{
              this.$message({
                type:"error",
                message:"删除失败"
              });
            }
          }).catch(() => {
          this.$message({
            type: 'error',
            message: '服务器错误'
          });
        });
        })
      },
      shownewactivefunc(){
        this.showupdateactive=true;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      serachs(){
        doSerach(this.serach.key).then(({code,body,msg})=>{
          if(code === 0){
            this.tableData = body;
          }
        });
      }
    },
    mounted(){
      this.getMsgListInfo(0)
    }
  }
</script>

<style >
  .pwdinput_width{width:50%;margin-left: 20px;}
  .ico_class{color: red;margin-left: 10px}
  .pwd_box{border-top: 1px solid #eee;border-bottom: 1px solid #eee;padding: 30px 0px;}
  .newadmin_class{width: 100px;float: right;margin-right: 20px;margin-top: 16px}
  .margin_width_user{margin-left: 50px;}
  .name-wrapper{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:200px
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
  .el-button--primary:hover {
    background: #00C7FF;
    border-color: #00C7FF;
    color: #fff;
  }
  .el-table th>.cell{
  color:black;
}
 
</style>
