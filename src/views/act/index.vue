<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style=" height: 60px;background-color: white">
      <span style="line-height: 60px;font-size: 20px;margin-left: 20px">活动管理</span>
      <el-button type="primary" size="mini"  @click="shownewactivefunc()" style="width: 130px;float: right;margin-right: 35px;margin-top: 16px;font-size:14px;"> +  新增活动</el-button>
    </div>
    <div style="margin-left: 20px;margin-top: 20px;background-color: white;height:840px">
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
            prop="aid"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="活动标题"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="hover">
                <div style="width: 200px;height:300px;">{{ scope.row.title}}</div>
                <div slot="reference" class="name-wrapper">{{ scope.row.title}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
          >
              <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="hover">
                <div style="width: 200px;height:300px;">{{ scope.row.content}}</div>
                <div slot="reference" class="name-wrapper">{{ scope.row.content}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="过期时间"
          >
            <div slot-scope="scope">
              {{changefunc(new Date(scope.row.over_time),'yyyy-MM-dd' )}}
            </div>
          </el-table-column>
          <el-table-column

            label="图片"
          >
            <template slot-scope="scope">
              <el-popover>
                  <img :src="scope.row.imgurl" alt="">
                  <div slot="reference" style="height:40px;width:40px;">
                    <img :src="scope.row.imgurl" alt="" style="height:100%;width:100%">
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column

            label="跳转链接"
          >
            <template slot-scope="scope">
              <div slot="reference">
                <a :href="scope.row.adsurl" target="_blank">{{scope.row.adsurl}}</a>
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
                type="primary"
                @click="updateactivefunc(scope.$index,scope.row)" >编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete( scope.row.aid)">删除</el-button> -->
                <div class="operation_list" style="font-size:14px;color:#00C7FF">
                 
                    <span @click="updateactivefunc(scope.$index,scope.row)" style="cursor:pointer">编辑</span>
                    <span style="color:gray">|</span>
                    <span @click="handleDelete( scope.row.aid)" style="cursor:pointer">删除</span>
                 
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


    <el-dialog title="编辑活动" :visible.sync="showupdateactive" width="35%">
      <div class="pwd_box">
        <div class="margin_width_user">
          <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item label="活动名称:">
              <el-input  style="width: 50%" placeholder="请输入活动名称" v-model="updateData.title"></el-input><i class="ico_class">*</i>
            </el-form-item>
              <el-form-item label="内容:">
              <el-input  style="width: 50%"  placeholder="请输入活动内容" v-model="updateData.content"></el-input><i class="ico_class">*</i>
            </el-form-item>
            <el-form-item label="过期时间:">
              <!-- <el-input  style="width: 50%" v-model="upLoadData.over_time"></el-input><i class="ico_class">*</i> -->
              <el-date-picker
                v-model="updateData.over_time"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                style="width:50%">
              </el-date-picker>
              <i style="margin-left:7px;color:red" >*</i>
            </el-form-item>
            <el-form-item label="图片:">
            <el-upload
              name="img"
              class="upload-demo"
              ref="uploads"
              :action="updateData.url"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :limit="1"
              :data="updateData"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> <i class="ico_class">*</i> -->
              <span slot="tip" class="el-upload__tip" style="margin-left:20px;font-size:12px">注:支持jpg、png</span>
            </el-upload>

          </el-form-item>
            <el-form-item label="跳转链接:">
              <el-input style="width: 50%" placeholder="请输入链接" v-model="updateData.adsurl"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showupdateactive = false">取 消</el-button>
        <el-button type="primary" @click="updateAct">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增活动" :visible.sync="shownewactive" width="35%">
      <div class="pwd_box">
        <div class="margin_width_user">
          <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item label="活动名称:">
              <el-input  style="width: 50%" v-model="upLoadData.title" placeholder="请输入活动名称"></el-input><i class="ico_class">*</i>
            </el-form-item>
            <el-form-item label="内容:">
              <el-input  style="width: 50%" v-model="upLoadData.content" placeholder="请输入活动内容"></el-input><i class="ico_class">*</i>
            </el-form-item>
            <el-form-item label="过期时间:">
               <!--<el-input  style="width: 50%" v-model="upLoadData.over_time"></el-input><i class="ico_class">*</i> -->
              <el-date-picker
                v-model="upLoadData.over_time"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
              style="width:50%;">
              </el-date-picker>
              <i style="margin-left:7px;color:red" >*</i>
            </el-form-item>
            <el-form-item label="图片:">
              <el-upload
                name="img"
                class="upload-demo"
                ref="upload"
                :action="upLoadData.url"
                :data="upLoadData"
                :limit="1"
                :on-success="upLoadSuccessResponse"
                :auto-upload="false"
                :beforeUpload="beforeAvatarUpload"
                multiple>
                <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> <i class="ico_class">*</i> -->
                <span slot="tip" class="el-upload__tip" style="margin-left:20px;">注:支持jpg、png</span>
              </el-upload>

            </el-form-item>
            <el-form-item label="跳转链接:">
              <el-input style="width: 50%" v-model="upLoadData.adsurl" placeholder="请输入链接"></el-input>
            </el-form-item>

          </el-form>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="shownewactive = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { getActList, addAct ,editAct,delAct,doSerach} from "@/api/act";
export default {
  data() {
    return {
      fileList: [],
      showupdateactive: false,
      shownewactive: false,
      labelPosition: "right",
      formLabelAlign: "",
      coutPages: 0,
      page: 1,
      tableData: [],
      upLoadData: {
        url: "apis/Activitiesinfo/addActivities",
        title: "",
        adsurl: "",
        content: "",
        over_time: ""
      },
      updateData:{

        aid:"",
        title:"",
        adsurl:"",
        content:"",
        over_time:"",
        url:"apis/Activitiesinfo/editActivities"
      },
      serach:{key:''}
    };
  },
  methods: {
    // 根据参数（页码，每页显示数量，时间区间）进行数据梳理，并及时更新到表格上去
    refresh() {
      // 定义arr模拟接口接受到的数据(进行json数据克隆)
      const arr = JSON.parse(JSON.stringify(this.mockData.data));
      // 因为不是从接口获取数据，所以需要定义一个中间变量进行数据接收，避免数据冲突
      const middleArr = arr.filter((e, index) => {
        // 如果开始时间和结束时间有值
        if (this.userName) {
          // 而且数据时间在开始时间和结束时间的区间内，就返回对象e
          if (e.username.indexOf(this.userName) !== -1) {
            return e;
          }
        } else {
          // 如果开始时间和结束时间没有值就直接返回
          return e;
        }
      });
      // 及时更新获取的数据总条数
      this.total = middleArr.length;
      // 获取最终要显示的数据集
      this.tableData = middleArr.filter((item, index) => {
        // 对数据进行分页
        if (
          index >= (this.page - 1) * this.pageSize &&
          index < this.page * this.pageSize
        ) {
          return item;
        }
      });
    },
    // 时间转换
    // changefunc(value, fmt = 'yyyy-MM-dd') {
    //     // 如果传入的时间不存在或者不是时间格式，返回''
    //     if (!value || typeof fmt !== 'string' || !(value instanceof Date)) {
    //       return ''
    //     }

    //     var unixTimestamp = new Date( value*1000 ) ;
    //     console.log(unixTimestamp);
    //     Date.prototype.toLocaleString = function() {
    //      return  this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()  ;
    //     };
    //   },
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

    // 改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.refresh();
    },
    // 改变页码
    handleCurrentChange(val) {
      this.page = val;
      this.refresh();
    },
    // 获取活动管理列表
    getActListInfo() {
      getActList(0).then(({ code, body, msg }) => {
        if (code === 0) {
          this.tableData = body.data;
          this.coutPages = body.total;
        }
      });
    },
    change(num) {
      getActList(num).then(({ code, body }) => {
        if (code === 0) {
          this.tableData = body.data;
          this.coutPages = body.total;
        }
      });
    },

    // 新增
    beforeAvatarUpload() {},
    upLoadSuccessResponse(response) {
      if (response.code === 0) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getActListInfo();
        this.upLoadData = {};
      } else {
        this.$message({
          message: response.msg,
          type: "error"
        });
      }
    },
    // 上传提交
    submitUpload() {
      // alert(this.upLoadData.over_time);
      if(this.$refs.upload.uploadFiles.length){
        this.$refs.upload.submit();
      }else{
        this.$message({
          message:"上传失败！请添加图片",
          type:"error"
        })
      }
      this.$refs.upload.submit();
      this.uploadStatue = false;
      this.shownewactive = false;
    },
    // 删除
    handleDelete(aid) {
      this.$confirm("确定要删除该活动么?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //alert(1)

          delAct(aid).then(({code})=>{
            if(code === 0){
              this.$message({
                type:"success",
                message:"删除成功"
              });
              this.getActListInfo();
            }else{
              this.$message({
                type:"error",
                message:"删除失败"
              });
            }
          }) .catch(() => {
          this.$message({
            type: "error",
            message: "服务器错误"
          });
        });
        })
    },
    // 编辑
    updateAct(){
      if(this.$refs.uploads.uploadFiles.length){
        this.$refs.uploads.submit();
      }else{
          const title = this.updateData.title
          const adsurl = this.updateData.adsurl
          const content = this.updateData.content
          const over_time = (this.updateData.over_time) / 1000
          // alert(over_time)
          const aid = this.updateData.aid
          // alert(this.updateData.aid)
          editAct(title,adsurl,content,over_time,aid).then(({code})=>{
            if(code === 0){
              this.$message({
                message:"编辑成功",
                type:"success"
              });
              this.showupdateactive = false;
              this.getActListInfo();
            }else{
              this.$message({
                message:"编辑失败",
                type:"error"
              });
            }

          })
      }
    },
    updateactivefunc(index,row) {
      this.updateData.title = row.title
      this.updateData.adsurl = row.adsurl
      this.updateData.content = row.content
      this.updateData.over_time = row.over_time
      this.updateData.aid = row.aid
      this.showupdateactive = true;
    },



    shownewactivefunc() {
      this.shownewactive = true;
    },
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    serachs()
    {
      doSerach(this.serach.key).then(({ code, body, msg }) => {
        if (code == 0) {
           this.tableData = body;
        console.log(this.tableData)
          //this.coutPages = body.total;
        }

      });
    }
  },
  mounted() {
    this.getActListInfo();
  }
};
</script>

<style >
.pwdinput_width {
  width: 50%;
  margin-left: 20px;
}
.ico_class {
  color: red;
  margin-left: 10px;
}
.pwd_box {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 30px 0px;
}
.newadmin_class {
  width: 100px;
  float: right;
  margin-right: 20px;
  margin-top: 16px;
}
.margin_width_user {
  margin-left: 50px;
}
.name-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
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
