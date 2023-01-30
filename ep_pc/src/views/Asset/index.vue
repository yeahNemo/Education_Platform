<template>
    <div>
        <h1>资源管理</h1>
        <el-tabs type="border-card">
            <el-tab-pane label="文档资源">文档资源

            </el-tab-pane>
            <el-tab-pane label="视频资源">
                <h1>视频资源</h1>
                <assetVideo></assetVideo>
            </el-tab-pane>
            <el-tab-pane label="试题资源">是否在此处配置试题资源？</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import assetVideo from './video.vue'
export default {
    components: { assetVideo },
}
</script>

<style>

</style>