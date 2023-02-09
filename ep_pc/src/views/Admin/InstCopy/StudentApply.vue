<template>
    <div>
        <h1>学生申请管理</h1>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="note" label="备注" width="180">
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
import { successMsg } from '@/utils/message'
export default {
    props: ['instId'],
    created() {
        this.$http.get(`/inst/applyList/${this.instId}`).then(res => {
            // console.log('applyList', res.data);
            this.tableData = res.data.data
        })
    },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        handlePass(row, isPass) {
            this.$http.post(`/inst/audit/stu/apply/${this.instId}/${row.applyId}/${isPass}`).then(res => {
                if (isPass === 1) {
                    successMsg('已通过')
                } else {
                    successMsg('已打回')
                }
                this.tableData = this.tableData.filter(item => item.id != row.id)
            })
        },
    },

}
</script>

<style>

</style>