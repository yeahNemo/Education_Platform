<template>
    <div class="main">
        <el-container>
            <el-header>
                <el-menu default-active="1" mode="horizontal">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-button type="primary" style="position: absolute; right: 0; top: 6px;">登录</el-button>
                    <el-menu-item index="2">合作</el-menu-item>
                </el-menu>
            </el-header>
        </el-container>
        <el-carousel height="27.5rem" style="margin-top: 1rem;">
            <el-carousel-item>
                <img style="object-fit: none;" src="~@/assets/Home/img.png" />
            </el-carousel-item>
        </el-carousel>
        <el-divider></el-divider>
        <h3>交运通：在线学习平台</h3>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main {
    font-weight: bold;
}
</style>