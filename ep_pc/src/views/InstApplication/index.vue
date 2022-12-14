<template>
    <div>
        <h1>机构申请管理</h1>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="adminId" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="instName" label="机构名" width="180">
            </el-table-column>
            <el-table-column prop="typeId" label="机构类型" width="180">
            </el-table-column>
            <el-table-column prop="description" label="机构描述" show-overflow-tooltip>
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
    created() {
        this.$http.get('inst/get/apply').then(res => {
            // console.log(res);
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
            this.$http.post(`inst/audit/inst/apply/${row.id}/${isPass}`).then(res => {
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