<template>
  <div>
    <Card>
      <p slot="title">商品添加</p>
      <div slot="content" class="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in categories"
                :key="item.cateName"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
              <!-- <el-option label="特色粥品" value="特色粥品"></el-option>
              <el-option label="热销榜" value="热销榜"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input-number
              v-model="form.price"
              @change="handleChange"
              :min="1"
              :max="50"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片" prop="imgUrl">
            <div class="photo">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.imgUrl" :src="baseImgUrl + form.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { categories as getCateList, goodAdd } from "@/api/goods.js";
export default {
  components: {
    Card,
  },
  async created() {
    const { categories } = await getCateList();
    this.categories = categories;
  },
  data() {
    return {
      categories: [],
      // imageUrl: "",
      accountInfo: {},
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      num: 1,
      form: {
        name: "",
        category: "",
        price: 1,
        imgUrl: "",
        goodsDesc: "",
      },
    };
  },
  methods: {
    //上传图片
    handleAvatarSuccess(res, file) {
      const { code, imgUrl, msg } = res;
      //上传信息
      console.log(123);
      if (code == 0) {
        this.imageUrl = imgUrl;
        this.form.imgUrl = imgUrl;
        this.$message.success(msg);
        console.log(this.form.imgUrl);
      } else {
        this.$message.error(msg);
      }
    },
    async onSubmit() {
      const { code } = await goodAdd(this.form);
      if (code == 0) {
        //重置表单  记得在el-form-item组件上加prop属性
        this.$refs.form.resetFields();
      }
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 400px;
}
/deep/ .photo {
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
</style>
