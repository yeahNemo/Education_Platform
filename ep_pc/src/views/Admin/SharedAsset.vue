<template>
    <div>
        <h1>共享文件配置</h1>
        <div>
            <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
            <el-table :data="sharedDocList">
                <el-table-column prop="filename" label="文件名" width="180">
                </el-table-column>
                <el-table-column prop="description" label="文件描述" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialog-form">
            <el-dialog title="文件" :visible.sync="dialogVisible" width="30%">
                <FileUpload ref="fileUpload" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import FileUpload from '../Asset/FileUpload.vue'
export default {
    inject: ['reload'],
    async mounted() {
        const res = await this.$http.get('/file/shareDoc')
        this.sharedDocList = res.data.data
    },
    components: {
        FileUpload
    },
    data() {
        return {
            dialogVisible: false,
            sharedDocList: [],
        }
    },
    methods: {
        handleEdit(row) {
            this.editObj = row
            this.dialogVisible = true
            this.$nextTick(function () {
                this.$refs.fileUpload.handleEdit(row)
            })
        },
        async handleDel(row) {
            const res = await this.$http.post(`/file/delete/${row.storeName}`)
            successMsg('删除成功')
            this.reload()

        },
        handleAdd() {
            this.dialogVisible = true
            this.$nextTick(function () {
                this.$refs.fileUpload.handleAdd()
            })
        }
    },

}
</script>

<style>

</style>