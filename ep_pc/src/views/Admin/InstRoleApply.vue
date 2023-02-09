<template>
    <div>
        <h1>机构配角申请</h1>
        <el-table :data="roleApplyList" stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名" width="180">
            </el-table-column>
            <el-table-column prop="instName" label="机构名" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handlePass(scope.row, 1)">通过</el-button>
                    <el-button size="mini" type="danger" @click="handlePass(scope.row, 0)">打回</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    inject: ['reload'],
    async mounted() {
        const res = await this.$http.get('/role/applyList')
        this.roleApplyList = res.data.data
    },
    data() {
        return {
            roleApplyList: []
        }
    },
    methods: {
        async handlePass(row, isPass) {
            const res = await this.$http.post(`/role/audit/${row.id}/${isPass}`)
            successMsg('操作成功')
        },
    },
}
</script>

<style>

</style>