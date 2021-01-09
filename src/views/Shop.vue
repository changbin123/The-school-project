<template>
  <div>
    <Card>
      <p slot="title">店铺管理</p>
      <div slot="content">
        <div class="content">
          <el-form :disabled="textIn" label-width="80px" :model="form">
            <el-form-item label="店铺名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店铺公告">
              <el-input type="textarea" v-model="form.bulletin"></el-input>
            </el-form-item>
            <el-form-item label="店铺头像">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/shop/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.avatar" :src="baseImgUrl1 + form.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="店铺图片">
              <el-upload
                :file-list="fileList"
                action="http://127.0.0.1:5000/shop/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlePicsSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- 放大图像 -->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="配送费">
              <el-input v-model="form.deliveryPrice"></el-input>
            </el-form-item>
            <el-form-item label="配送时间">
              <el-input v-model="form.deliveryTime"></el-input>
            </el-form-item>
            <el-form-item label="配送描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="店铺评分">
              <el-input v-model="form.score"></el-input>
            </el-form-item>
            <el-form-item label="销量">
              <el-input v-model="form.sellCount"></el-input>
            </el-form-item>
            <el-form-item label="活动">
              <el-checkbox-group v-model="form.supports">
                <el-checkbox
                  label="单人精彩套餐"
                  name="supports"
                  value="单人精彩套餐"
                ></el-checkbox>
                <el-checkbox
                  label="VC无限橙果汁全场8折"
                  name="supports"
                  value="VC无限橙果汁全场8折"
                ></el-checkbox>
                <el-checkbox
                  label="在线支付满28减5"
                  name="supports"
                  value="在线支付满28减5"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="营业时间">
              <el-time-picker
                value-format="HH:mm:ss"
                is-range
                v-model="form.date"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
            </el-form-item>
          </el-form>
        </div>
        <el-button v-if="textIn" type="primary" @click="textIn = false">编辑</el-button>
        <el-button v-else type="primary" @click="save">保存</el-button>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { shopInfo, shopEdit } from "@/api/shop.js";

export default {
  created() {
    this.shopInfo();
  },
  components: {
    Card,
  },
  data() {
    return {
      textIn: true,
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      baseImgUrl1: "http://127.0.0.1:5000/upload/shop/",
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [], //店铺图片列表
      form: {
        avatar: "", //店铺头像
        supports: [],
        date: [],
        pics: [], //存最新的图片列表数据
      },
    };
  },
  methods: {
    async shopInfo() {
      const { data } = await shopInfo();
      //注意fileList的格式    [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
      //后端返回照片名字赋值给照片墙
      this.fileList = data.pics.map((v) => ({
        name: v.name,
        url: v.url,
      }));
      console.log(this.fileList);
      this.form = data;
    },
    //店铺头像上传
    handleAvatarSuccess(res, file) {
      const { code, imgUrl, msg } = res;
      //上传信息
      if (code == 0) {
        // this.imageUrl = imgUrl;
        this.form.avatar = imgUrl;
        this.$message.success(msg);
        console.log(this.form.avatar);
      } else {
        this.$message.error(msg);
      }
    },
    // handleAvatarSuccess({ code, imgUrl, msg }) {
    //   if (code == 0) {
    //     this.form.avatar = imgUrl;
    //   }
    // },
    //店铺图片列表上传 更新pics
    handlePicsSuccess(res, file, fileList) {
      //[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
      console.log(res);
      this.form.pics.push({
        name: `${file.name}`,
        url: `http://127.0.0.1:5000/upload/shop/${res.imgUrl}`,
      });
      // console.log(file);
      // console.log(fileList);
      // this.form.pics = fileList;
    },
    //店铺图片列表删除 更新pics
    handleRemove(file, fileList) {
      // this.form.pics.pop({
      //   name: `${file.name}`,
      //   url: `http://127.0.0.1:5000/shop/upload/shop/${res.imgUrl}`,
      // });

      this.form.pics = fileList;
    },
    //点击文件列表中已上传的文件时的钩子
    //查看放大图像
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async save() {
      const pics = this.form.pics;
      const params = {
        id: this.form.id,
        name: this.form.name,
        bulletin: this.form.bulletin,
        avatar: this.form.avatar,
        deliveryPrice: this.form.deliveryPrice,
        deliveryTime: this.form.deliveryTime,
        description: this.form.description,
        score: this.form.score,
        sellCount: this.form.sellCount,
        date: JSON.stringify(this.form.date),
        pics: JSON.stringify(pics),
        supports: JSON.stringify(this.form.supports),
      };
      await shopEdit(params);
      this.textIn = true;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .content {
  width: 500px;
  img {
    width: 146px;
    height: 146px;
  }
  .el-dialog {
    width: 600px;
    height: 600px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
