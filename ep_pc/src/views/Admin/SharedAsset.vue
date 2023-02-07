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
                        <el-button type="text" @click="handleConfig(scope.row)">配置</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialog-form">
            <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
                <FileUpload></FileUpload>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import FileUpload from '../Asset/FileUpload.vue'
export default {
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
            assetToAdd: {}
        }
    },
    methods: {
        handleConfig(row) {
            //TODO 共享文件删改
        },
        handleAdd() {
            this.dialogVisible = true
        }
    },

}
</script>

<style>

</style>