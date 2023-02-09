<template>
    <div>
        <h1>
            角色管理
        </h1>
        <div>
            <el-table :data="roleUserList" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180">
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button> -->
                        <el-select v-model="scope.row.roleId" placeholder="选择角色" @change="handleChange(scope.row)">
                            <el-option label="管理员" :value="2"></el-option>
                            <el-option label="审核员" :value="3"></el-option>
                            <el-option label="发布员" :value="4"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'

export default {
    props: ['instId'],
    async mounted() {
        const res = await this.$http.get(`/inst/get-inst-admin/${this.instId}`)
        this.roleUserList = res.data.data
    },
    data() {
        return {
            roleUserList: []
        }
    },
    methods: {
        async handleChange(row) {
            const res = await this.$http.post(`/role/alloc/${row.id}/${row.roleId}`)
            successMsg('切换用户角色成功')
        }
    },
}
</script>

<style>

</style>