<template>
    <div>
        <h1>学员列表</h1>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="300">
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
import { successMsg } from '@/utils/message';

export default {
    inject: ['reload'],
    props: ['instId'],
    created() {
        this.$http.get(`inst/${this.instId}/stu`).then(res => {
            console.log(res);
            this.tableData = res.data.data
        })
    },
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        async handleDel(row) {
            const res = await this.$http.post(`/inst/delete-stu/${this.instId}/${row.id}`)
            successMsg('删除成功')
            this.reload()
        }
    },
}
</script>

<style>

</style>