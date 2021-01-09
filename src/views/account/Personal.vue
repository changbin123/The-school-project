<template>
  <div>
    <Card>
      <span slot="title">管理员信息</span>
      <div slot="content" class="content">
        <div>
          管理员ID: <span>{{ accountInfo.id }}</span>
        </div>
        <el-divider></el-divider>
        <div>
          账号: <span>{{ accountInfo.account }}</span>
        </div>
        <el-divider></el-divider>
        <div>
          用户组: <span>{{ accountInfo.userGroup }}</span>
        </div>
        <el-divider></el-divider>
        <div>
          创建时间: <span>{{ accountInfo.ctime }}</span>
        </div>
        <div class="upPhoto">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="baseImgUrl + imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import local from "@/utils/local.js";
import { avataredit, accountinfo } from "@/api/account.js";
import moment from "moment";
export default {
  created() {
    this.accountInfo = local.get("accountInfo");
    this.accountInfo.ctime = moment(this.accountInfo.ctime).format("YYYY-MM-DD hh:mm:ss");
  },
  components: {
    Card,
  },

  data() {
    return {
      imageUrl: "",
      accountInfo: {},
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
    };
  },
  methods: {
    //上传图片
    handleAvatarSuccess(res, file) {
      const { code, imgUrl, msg } = res;
      //上传信息
      if (code == 0) {
        this.imageUrl = imgUrl;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },

    async save() {
      const { code } = await avataredit({ imgUrl: this.imageUrl });
      if (code == 0) {
        //保存成功，通知头部组件重新获取数据
        this.$bus.$emit("avataredit");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  /deep/ .upPhoto {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
