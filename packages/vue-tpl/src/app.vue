<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
// const api = require("../mock/api.js");
import api from "../mock/api.js";
export default {
  async created () {
    let res = await axios.get(api.getUserInfo);
    console.log(res);
  }
};
</script>
<style scoped lang="scss">
$color: rgb(95, 64, 64);
.wrapper {
  h2 {
    color: $color;
  }
}
</style>