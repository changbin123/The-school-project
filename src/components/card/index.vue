<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
