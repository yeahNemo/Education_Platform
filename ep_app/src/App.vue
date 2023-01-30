<template>
  <div id="app">
    <keep-alive exclude="instHome">
      <router-view />
    </keep-alive>
  </div>
</template>
<style scoped>
#app {
  height: 100%;
}
</style>
