<template>
    <div>
        <h1>文档上传</h1>
        <div>
            <el-form :model="model" label-width="5rem">
                <el-form-item label="文件名" prop="filename">
                    <el-input v-model="model.filename"></el-input>
                </el-form-item>
                <el-form-item label="介绍" prop="description">
                    <el-input v-model="model.description"></el-input>
                </el-form-item>
                <el-form-item label="上传">
                    <el-upload class="upload-demo" action="http://120.79.171.132:8081/file/uploadFile"
                        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                        :limit="1" :on-exceed="handleExceed" :file-list="fileList" accept="doc,pdf,mp4"
                        :on-success="handleSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item style="display: flex; justify-content: start;">
                    <el-button @click="submitForm" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';

export default {
    inject: ['reload'],
    mounted() {
        if (this.userRole.id === 1) {
            this.model.type = 0
        } else {
            this.model.type = this.userInfo.instId
        }
    },
    data() {
        return {
            model: {
                type: '',
                filename: '',
                description: '',
                storeName: ''
            },
            fileList: [],
            isEdit: false
        }
    },
    methods: {
        // 父组件在调用这俩方法
        handleEdit(editObj) {
            this.isEdit = true
            this.model = editObj
        },
        handleAdd() {
            this.isEdit = false
            this.model = this.$options.data().model
        },
        handleSuccess(res) {
            // console.log(res);
            this.model.storeName = res.data
        },
        handleChange(file, fileList) {
            console.log('handleChange');
            this.fileToUpload = file
        },
        async submitForm() {
            if (this.userRole.id === 1) {
                this.model.type = 0
            } else {
                this.model.type = this.userInfo.instId
            }
            if (this.isEdit) {
                const res = await this.$http.post('/file/update', this.model)
                console.log(res)
                successMsg('修改成功')
                this.reload()
            } else {
                const res = await this.$http.post('/file/uploadDoc', this.model)
                console.log(res)
                successMsg('上传成功')
                this.reload()
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    },
    computed: {
        ...mapState(['userRole', 'userInfo'])
    }
}
</script>

<style>

</style>