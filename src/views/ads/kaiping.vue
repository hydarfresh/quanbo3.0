




<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div style="height:60px;background-color:white">
            <span style="line-height:60px;font-size:20px;margin-left:20px;">开屏广告管理</span>
            <el-button type="primary" size="mini" style="width:130px;float:right;margin-right:35px;margin-top:16px;font-size:14px" @click="shownewggfunc()"> +  新增广告位</el-button>
        </div>
        <div style="margin-left:20px;margin-top:20px;background-color: white;height:840px;">
            <div style="padding-left:20px;padding-top:20px;">
                搜索 : <el-input placeholder="请输入广告标题" style="width:300px;margin-left:-18px;padding-left:20px;" size="small" v-model="serach.key" @keyup.enter.native="serachs">
                <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width:30px" v-on:click="serachs"></i>
                </el-input>
            </div>
            <div style="margin-left:20px;margin-top:30px;">
                <el-table :data="tableData" style="width:100%">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="adsname" label="广告名称"></el-table-column>
                    <el-table-column label="添加时间">
                      <div slot-scope="scope">
                        {{changefunc(new Date(scope.row.create_time),'yyyy-MM-dd' )}}
                      </div>
                    </el-table-column>
                    <el-table-column label="图片">
                      <template slot-scope="scope">
                          <el-popover>
                            <img :src="scope.row.imgurl" alt="">
                            <div slot="reference" style="height:40px;width:40px;">
                              <img :src="scope.row.imgurl" alt="" style="height:100%;width:100%">
                            </div>
                          </el-popover>
                      </template>

                    </el-table-column>
                    <el-table-column prop="adurl" label="跳转链接">
                      <template slot-scope="scope">
                        <div slot="reference">
                            <a :href="scope.row.adurl" target="_blank">{{scope.row.adurl}}</a>
                        </div>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="isappear" label="是否显示">
                      <template slot-scope="scope">
                        {{scope.row.isappear ===0?'否':'是'}}
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">

                            <!-- <el-button size="mini" @click="updateggfunc(scope.row)" class="edit" type="primary">
                                编辑
                            </el-button>
                            <el-button size="mini" @click="handleDelete(scope.$index,scope.row.id)" class="delete" type="primary">
                                删除
                            </el-button> -->
                            <div class="operation_list" style="font-size:14px;color:#00C7FF;">
                                <span @click="updateggfunc(scope.row)" style="cursor:pointer">编辑</span>
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

        <el-dialog title="新增广告位" :visible.sync="showupdategg" width="30%">
            <div class="gg_box">
                <div class="margin_width_gg">
                    <el-form :label-position="labelPosition" label-width="80px;" >
                        <el-form-item label="广告名称:">
                            <el-input style="width:50%" placeholder="请输入广告名称" v-model="upLoadData.adsname"></el-input>
                            <i class="xinghao">*</i>
                        </el-form-item>
                        <el-form-item label="图片:" style="margin-left:27px;">
                            <el-upload
                                name="img"
                                class="upload"
                                ref="upload"
                                :data = "upLoadData"
                                :action="upLoadData.url"
                                :limit="1"
                                :on-success="upLoadSuccessResponse"
                                :auto-upload="false"
                                :beforeUpload="beforeAvatarUpload"
                                multiple>
                                <el-button slot="trigger" size="small" type="primary" class="choose" style="position:relative;right:26px;">上传文件</el-button>
                                <span slot="tip" class="el-upload_tip" style="position:relative;right:28px;">注:支持jpg、png</span>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="跳转链接:">
                            <el-input style="width:50%" v-model="upLoadData.adurl" placeholder="请输入链接"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showupdategg=false">取消</el-button>
                <el-button type="primary" @click="submitUpload">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑广告位" :visible.sync="bjgg" width="30%">
            <div class="gg_box">
                <div class="margin_width_gg">
                    <el-form :label-position="labelPosition" label-width="80px;">
                        <el-form-item label="广告名称:">
                            <el-input style="width:50%" placeholder="请输入广告名称" v-model="updateData.adsname"></el-input>
                            <i class="xinghao">*</i>
                        </el-form-item>
                        <el-form-item label="图片:" style="margin-left:27px;">
                            <el-upload
                                name="img"
                                class="upload-demo"
                                ref="uploads"
                                :action="updateData.url"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :limit ="1"
                                :data="updateData"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary" class="choose" style="position:relative;right:26px;">上传文件</el-button>
                                <span slot="tip" class="el-upload_tip" style="position:relative;right:28px;">注:支持jpg、png</span>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="跳转链接:">
                            <el-input style="width:50%"  v-model="updateData.adurl" placeholder="请输入链接"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bjgg=false">取消</el-button>
                <el-button type="primary" @click="updateGg">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
  getkaipingList,
  editkaiping,
  delkaiping,
  doSerach
} from "@/api/kaiping";
export default {
  data() {
    return {
      ruleData: {
        id: "",
        comments: "",
        addtime: new Date(),
        adurl: ""
      },
      isSuperImg: false, //控制开关放大图片弹框
      pic: "", //图片地址
      upLoadData: {
        url: "apis/adscontent/addads",
        adsname: "",
        adurl: ""
      },
      updateData: {
        id:'',
        adurl:'',
        adsname:'',
        url:'apis/adscontent/editAds'
      },
      serach:{
        key:''
      },
      coutPages: 0,
      fileList: [],
      showupdategg: false,
      bjgg: false,
      labelPosition: "right",
      formLabelAlign: "",
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 10,
      userName: "",
      updateData: {},
      ggname: "",
      mockData: {
        data: [],
        total: 20
      } // 模拟后端返回数据
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
        if (this.ggname) {
          // 而且数据时间在开始时间和结束时间的区间内，就返回对象e
          if (e.ggname.indexOf(this.ggname) !== -1) {
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
    // 改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.refresh();
    },
    beforeAvatarUpload() {},
    // 改变页码
    handleCurrentChange(val) {
      this.page = val;
      this.refresh();
    },
    // 点击触发大弹框
    // superImg(img){
    //   console.log(img)
    //   this.pic = img
    //   this.isSuperImg =true
    // },
    // 点击添加管理员的确定按钮
    /*addGg() {
      // this.showupdategg = false
      // this.ruleData.id = this.mockData.data.length
      // console.log(this.ruleData)
      // this.mockData.data.push(this.ruleData)
      // this.refresh()
      console.log(this.ruleData);
      // const _res=insertBanner(this.ruleData)
      // console.log('insert-banner',_res)
      // alert(this.ruleData.comments)

      addBanner(this.ruleData.adsurl, this.ruleData.comments)
        .then(({ code }) => {
          console.log("code", code);
          if (code === 0) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.getBannerListInfo();
          } else {
            this.$message({
              type: "error",
              message: "未知错误"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "添加失败"
          });
        });
      this.ruleData = {};
    },*/
    upLoadSuccessResponse(response) {
      if (response.code === 0) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getkaipingInfo();
        this.upLoadData = {};
      } else {
        this.$message({
          message: response.msg,
          type: "error"
        });
      }
    },
    /**
      上传提交
       */
    submitUpload() {
      //console.log(this.upLoadData)
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
      this.showupdategg = false;

    },
    // 编辑
    updateGg() {
      if(this.$refs.uploads.uploadFiles.length){
        this.$refs.uploads.submit();
        // alert(1)
      }else{
            if(this.$refs.uploads && this.$refs.uploads.uploadFiles.length){
              this.$refs.uploads.forEach(item=>{
                item.clearFiles();
              });
              this.$refs.uploads.submit();
            }
            
            const adsname = this.updateData.adsname
            const adurl = this.updateData.adurl
            const id = this.updateData.id
            //alert(id)
            editkaiping(adsname,adurl,id).then(({code})=>{
            if(code ==0)
            {
              this.$message({
                message:"编辑成功",
                type:"success"
              });
              this.bjgg = false;
              this.getkaipingInfo();

            }else{
              this.$message({
                message:"编辑失败",
                type:"error"
              });
            }
          })
        }
    },
    updateggfunc( row) {
      this.updateData.id = row.id;
      this.updateData.adsname = row.adsname
      this.updateData.adurl = row.adurl
      this.updateData.url = "apis/adscontent/editAds"
      //console.log(this.updateData.id)
      //console.log(row)
      this.bjgg = true;
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
    handleDelete(index, row) {
      // alert(row)
      this.$confirm("确定要删除该广告吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delkaiping(row)
            .then(({ code }) => {
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getkaipingInfo();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "服务器错误"
              });
            });
        })
    },

    //列表
    getkaipingInfo() {
      getkaipingList().then(({ code, body, msg }) => {
        if (code === 0) {
          this.tableData = body.data;
          this.coutPages = body.total;
          console.log("test");
          // console.log(this,tableData)
        }
      });
    },
    change(num) {
      getBannerList(num).then(({ code, body }) => {
        if (code === 0) {
          this.tableData = body.data;
          this.coutPages = body.total;
        }
      });
    },

    shownewggfunc() {
      this.showupdategg = true;
    },
    onSuccess(res, file, fileList) {
      this.ruleData.picurl = file.url;
      this.ruleData.pic = file.name;
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
          // alert(this.tableData)
        }
      });
    }

  },
  mounted() {
    this.getkaipingInfo(0);
    console.log(1);
  }
};
</script>

<style >
.xinghao {
  color: red;
  margin-left: 10px;
}
.gg_box {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 30px 0px;
}
.margin_width_gg {
  margin-left: 50px;
}
.choose,
.el-upload_tip {
  margin-left: 27px;
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
