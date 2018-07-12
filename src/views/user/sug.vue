<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style=" height: 60px;background-color: white">
      <span style="line-height: 60px;font-size: 20px;margin-left: 20px">意见反馈</span>

    </div>
    <div style="margin-left: 20px;margin-top: 20px;background-color: white;height:840px;">
      <div style="padding-left: 20px;padding-top: 20px">
        搜索 :  <el-input placeholder="请输入关键字" style="width: 300px;margin-left: -18px;padding-left: 20px;" size="small" v-model="serach.key" @keyup.enter.native="serachs">
        <i slot="suffix" class="el-input_icon el-icon-search" style="line-height:32px;width: 30px " v-on:click="serachs"></i>
      </el-input>
      </div>
      <div style="margin-left: 20px;margin-top:30px;">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="排序号"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="内容"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="hover">
                <div style="width: 200px;word-wrap:break-word;white-space:pre-wrap;">{{ scope.row.content}}</div>
                <div slot="reference" class="name-wrapper">{{ scope.row.content}}</div>
              </el-popover>
            </template>

          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系方式"
          >
          </el-table-column>
          <el-table-column
            label="时间"
          >
            <div slot-scope="scope">
              {{changefunc(new Date(scope.row.create_time),'yyyy-MM-dd' )}}
            </div>

          </el-table-column>


          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <!-- <el-button
              size="mini"
              type="primary"
              @click="shoedetialfunc(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete(scope.$index, scope.row.id)">删除</el-button> -->
                <div class="operation_list" style="font-size:14px">
               
                    <span @click="shoedetialfunc(scope.$index, scope.row)" style="cursor:pointer;color:#00C7FF">详情</span>
                    <span style="gray">|</span>
                    <span @click="handleDelete(scope.$index, scope.row.id)" style="cursor:pointer;color:#00C7FF">删除</span>
             
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


    <el-dialog title="反馈详情" :visible.sync="showdetial" width="30%">
      <div class="pwd_box">
        <div class="margin_width_user">
          <el-form :label-position="labelPosition" label-width="80px" :model="detailData">
            <el-form-item label="联系方式:">
              <span>{{detailData.contact}}</span>
            </el-form-item>
            <el-form-item label="时间:">
              <span>{{detailData.create_time}}</span>
            </el-form-item>
            <el-form-item label="反馈内容:">
              <span style="word-wrap:break-word;white-space:pre-wrap;">{{detailData.content}}</span>
            </el-form-item>
          </el-form>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="showNewadmin = false">取 消</el-button>-->
        <el-button type="primary" @click="showdetial = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getSugList,delSug,doSerach} from "@/api/sug";

  export default {
    data() {
      return {
        labelPosition: 'right',
        showdetial: false,
        tableData: [],
        mockData: {
          data: [],
          total: 20
        }, // 模拟后端返回数据
        date: {
          begin: '',
          finish: ''
        },
        serach:{key:''},
        coutPages:0,
        page:1,
        total: 10,
        keyWord: '',
        detailData: {}
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
          if (this.keyWord) {
            // 而且数据时间在开始时间和结束时间的区间内，就返回对象e
            if (e.user_name.indexOf(this.keyWord) !== -1) {
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
      // 用户建议列表
      getSugListInfo(){
        getSugList().then(({code,body,msg})=>{
          if(code === 0){
            this.tableData = body.data
            this.coutPages = body.total
          }
        })
      },
      change(num){
        getSugList(num).then(({code,body})=>{
          // alert(num)
          if(code ===0){
            this.tableData = body.data
            this.coutPages = body.total
          }
        })
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

      handleDelete(index, row) {
        this.$confirm('确定要删除该用户反馈吗?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSug(row).then(({code})=>{
            if(code ===0){
              this.$message({
                type:'success',
                message:'删除成功'
              });
              this.getSugListInfo()
            }else{
              this.$message({
                type:'error',
                message:'删除失败'
              });
            }
          }).catch(()=>{
            this.$message({
              type:'error',
              message:'服务器错误'
            })
          })
        })
      },
      shoedetialfunc(index, row) {
        this.detailData = row
        this.$set(this.detailData, 'i', index)
        this.showdetial = true
      },
      serachs()
        {
          doSerach(this.serach.key).then(({ code, body, msg }) => {
            if (code == 0) {
              this.tableData = body;
              this.coutPages = 0
            console.log(this.tableData)
              //this.coutPages = body.total;
            }

          });
        }
    },
    mounted() {
      this.getSugListInfo(0)
    }

  }
</script>

<style >
  .margin_width_user{margin-left: 50px;}
  .name-wrapper{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:200px
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
