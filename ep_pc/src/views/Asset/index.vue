<template>
    <div>
        <h1>资源管理</h1>
        <el-table :data="assetList" stripe style="width: 100%">
            <el-table-column prop="filename" label="文件名" width="180">
            </el-table-column>
            <el-table-column prop="description" label="介绍" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    async mounted() {
        const res = await this.$http.get(`/file/list/${this.userInfo.instId}`)
        this.assetList = res.data.data
    },
    data() {
        return {
            assetList: []
        }
    },
    methods: {
        async handleDel(row) {
            const res = await this.$http.post(`/file/delete/${row.storeName}`)
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>