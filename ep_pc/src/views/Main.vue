<template>
    <div style="height:100vh">
        <el-container style="height:100%">
            <el-header style="display: flex; align-items: center; font-size: 1rem;" height="4rem">
                <el-row type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <h1 style="color:azure">交运通后台管理系统</h1>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" style="margin-left: 35rem"
                            @click="dialogFormVisible = true">激活</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="15rem" style="background-color: rgb(238, 241, 246)">
                    <el-menu router unique-opene :default-active="$route.path">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>机构管理</template>
                            <el-menu-item-group>
                                <template slot="title">机构管理</template>
                                <el-menu-item index="/main/application">机构申请审核</el-menu-item>
                                <el-menu-item index="/main/inst">机构账号管理</el-menu-item>
                                <el-menu-item index="/main/inst-type">机构类别管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-message"></i>资源管理</template>
                            <el-menu-item-group>
                                <template slot="title">学习资源</template>
                                <el-menu-item index="/main/video">视频资源</el-menu-item>
                                <el-menu-item index="/assest/doc">文档资源</el-menu-item>
                                <el-menu-item index="/assest/exam">试题资源</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
            <el-form ref="applyForm" :model="model" :rules="rules">
                <div style="padding-right:3rem">
                    <el-form-item label="机构名称" prop="instName" :label-width="formLabelWidth">
                        <el-input v-model="model.instName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="机构类型" prop="typeId" :label-width="formLabelWidth">
                        <el-select v-model="model.typeId" placeholder="选择机构类型">
                            <el-option v-for="item in instTypeList" :key="item.id" :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机构简介" prop="description" :label-width="formLabelWidth">
                        <el-input type="textarea" autosize v-model="model.description" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { successMsg } from '@/utils/message'
export default {
    created() {
        this.$http.get('inst/type/get').then(res => {
            this.instTypeList = res.data.data
        })
    },
    data() {
        return {
            rules: {
                instName: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                typeId: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ]
            },
            instTypeList: [],
            model: {
                instName: '',
                typeId: '',
                description: '',
                adminId: '10'
            },
            dialogFormVisible: false,
            formLabelWidth: '5rem'
        }
    },
    methods: {
        submit() {
            this.$refs['applyForm'].validate(async (result) => {
                if (result) {
                    this.model.adminId = '10'
                    await this.$http.post('inst/register', this.model).then(res => {
                        console.log(res);
                        successMsg('已提交')
                        this.dialogFormVisible = false
                    })
                } else {
                    errorMsg('检查填写！')
                    return
                }

            });
        },
    },
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>