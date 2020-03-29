<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style scoped lang="less">
@color: rgb(95, 64, 64);
.wrapper {
  h2 {
    color: @color;
  }
}
</style>