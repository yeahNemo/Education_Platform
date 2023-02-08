<template>
    <div>
        <h1>资源管理</h1>
        <div>
            <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
            <el-table :data="assetList" stripe style="width: 100%">
                <el-table-column prop="filename" label="文件名" width="180">
                </el-table-column>
                <el-table-column prop="description" label="介绍" width="180">
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
import { mapState } from 'vuex'
import { successMsg } from '@/utils/message'
import FileUpload from '../Asset/FileUpload.vue'
export default {
    components: {
        FileUpload
    },
    inject: ['reload'],
    async mounted() {
        const res = await this.$http.get(`/file/list/${this.userInfo.instId}`)
        let allAsset = res.data.data
        // 只查机构单独的
        this.assetList = allAsset.filter(item => item.type !== 0)
    },
    data() {
        return {
            assetList: [],
            dialogVisible: false
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
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>