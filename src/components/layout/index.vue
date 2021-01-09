<template>
  <div class="wrapper">
    <LeftMenu></LeftMenu>
    <div class="right">
      <RightHeader></RightHeader>
      <div class="rightBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "./LeftMenu";
import RightHeader from "./RightHeader";
export default {
  components: {
    LeftMenu,
    RightHeader,
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
  .right {
    flex: 1;
    background-color: #f0f2f5;
    .rightBox {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
}
</style>
