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
                    <el-button type="text" @click="handleMore(scope.row)">更多</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    created() {
        this.$http.get(`inst/${this.userInfo.instId}/stu`).then(res => {
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
        handleMore(row) {
            // 更多按钮
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>