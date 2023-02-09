<template>
    <div>
        <h1>学员列表</h1>
        <el-button type="primary" size="small" @click="handleExport">导出</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="300">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleCheck(scope.row)">查看</el-button>
                    <el-button type="text" @click="handleDel(scope.row)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" title="学生信息">
            <el-form :model="stuModel">
                <el-form-item label="用户名" prop="username" label-width="120">
                    <el-input disabled v-model="stuModel.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input disabled v-model="stuModel.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input disabled v-model="stuModel.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上次登录" prop="loginTime" label-width="120">
                    <el-input disabled v-model="stuModel.loginTime" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    inject: ['reload'],
    created() {
        this.$http.get(`inst/${this.userInfo.instId}/stu`).then(res => {
            console.log(res);
            this.tableData = res.data.data
        })
    },
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            stuModel: {}
        }
    },
    methods: {
        handleExport() {
            window.open(`http://localhost:8081/inst/export-excel/${this.userInfo.instId}`)
        },
        async handleDel(row) {
            const res = await this.$http.post(`/inst/delete-stu/${this.userInfo.instId}/${row.id}`)
            successMsg('删除成功')
            this.reload()
        },
        handleCheck(row) {
            this.stuModel = row
            this.dialogVisible = true
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>