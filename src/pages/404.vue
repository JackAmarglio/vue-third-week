<template>
  <v-app>
    <div class="error-text-layout">
      <h1>
        Страница не найдена
      </h1>
      <a style="text-decoration:none;color:#F16C4D" href="/">
        назад
      </a>
    </div>
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>
.error-text-layout{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    text-align: center;
}
.error-text-layout h1 {
  font-size: 50pt;
}
.error-text-layout a {
  font-size: 30pt;
}
</style>
