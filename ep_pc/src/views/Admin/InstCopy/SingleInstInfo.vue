<template>
    <div>
        <h1>机构信息管理</h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="机构名称">
                <el-col :span="8">
                    <el-input v-model="model.instName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="机构头像">
                <el-upload class="avatar-uploader" :action="`http://localhost:8081/inst/upload/icon/${this.instId}`"
                    :show-file-list="false" :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="机构类型">
                <el-select v-model="model.typeId" placeholder="机构类型">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="机构简介">
                <el-col :span="8">
                    <el-input v-model="model.description" type="textarea"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { successMsg } from '@/utils/message';
export default {
    props: ['instId'],
    created() {
        // 获取机构类别列表
        this.$http.get('/inst/type/listAll').then(res => {
            this.typeList = res.data.data
        })
        // 获取当前机构信息
        this.$http.get(`/inst/${this.instId}`).then(res => {
            this.model = res.data.data
            console.log('model', this.model);
        })
        // 提前获取机构头像
        this.$http.get(`/inst/icon/${this.instId}`).then(res => {
            this.model.icon = 'data:image/gif;base64,' + res.data.data
        })
    },
    data() {
        return {
            typeList: [],
            model: {},
        }
    },
    methods: {
        getAuthHeaders() {
            return getToken()
        },
        async afterUpload(res, file) {
            this.model.icon = URL.createObjectURL(file.raw);
            // console.log('头像上传', res);
            // const iconRes = await this.$http.get(`/inst/icon/${this.instId}`)
            // console.log('iconRes', iconRes);
            // this.$set(this.model, 'icon', "data:image/gif;base64," + iconRes.data.data)

            // this.model.icon = res.url
            // 对象类型，无法做到响应
            // this.$set(this.model, 'icon', res.url)
        },
        async save() {
            const res = await this.$http.post('/inst/update',
                {
                    id: this.model.id,
                    description: this.model.description,
                    instName: this.model.instName,
                    typeId: this.model.typeId
                }
            )
            successMsg('保存成功！')
        },
    }
}
</script>

<style>

</style>