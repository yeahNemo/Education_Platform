<template>
    <div style="height:100vh">
        <el-container style="height:100%">
            <el-header style="display: flex; align-items: center; font-size: 1rem;" height="4rem">
                <el-row type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <h1 style="color:azure">交运通后台管理系统</h1>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" style="margin-left: 33rem" @click="dialogFormVisible = true"
                            :disabled="userInfo.status === 1">{{ userInfo.status === 1 ? '已激活' : '激活' }}</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="15rem" style="background-color: rgb(238, 241, 246)">
                    <el-menu router unique-opene :default-active="$route.path">
                        <el-submenu :index="'' + item.id" v-for="item in getFatherRightList()" :key="item.id">
                            <template slot="title"><i class="el-icon-message"></i>{{ item.rightName }}</template>
                            <el-menu-item index="/main/stu-apply" v-for="subItem in getChildrenRightList(item.id)"
                                :key="subItem.id">{{ subItem.rightName }}</el-menu-item>
                        </el-submenu>


                        <!-- <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>机构管理</template>
                            <el-menu-item-group>
                                <template slot="title">admin机构管理</template>
                                <el-menu-item index="/main/application">机构申请审核</el-menu-item>
                                <el-menu-item index="/main/inst">机构账号管理</el-menu-item>
                                <el-menu-item index="/main/inst-type">机构类别管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-message"></i>资源管理</template>
                            <el-menu-item-group>
                                <template slot="title">admin学习资源</template>
                                <el-menu-item index="/main/video">视频资源</el-menu-item>
                                <el-menu-item index="/assest/doc">文档资源</el-menu-item>
                                <el-menu-item index="/assest/exam">试题资源</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-message"></i>我的机构</template>
                            <el-menu-item-group>
                                <template slot="title">instAdmin机构管理</template>
                                <el-menu-item index="/main/application">人员配置</el-menu-item>
                                <el-menu-item index="/main/inst-type">信息管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-message"></i>机构资源</template>
                            <el-menu-item-group>
                                <template slot="title">instAdmin学习资源</template>
                                <el-menu-item index="/main/video">视频资源</el-menu-item>
                                <el-menu-item index="/assest/doc">文档资源</el-menu-item>
                                <el-menu-item index="/assest/exam">试题资源</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-message"></i>学员管理</template>
                            <el-menu-item-group>
                                <template slot="title">instAdmin学员管理</template>
                                <el-menu-item index="/main/video">学员审核</el-menu-item>
                                <el-menu-item index="/assest/doc">学员信息</el-menu-item>
                                <el-menu-item index="/assest/exam">学习/考试情况</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-message"></i>培训计划</template>
                            <el-menu-item-group>
                                <template slot="title">instAdmin培训计划</template>
                                <el-menu-item index="/main/video">培训计划管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title"><i class="el-icon-message"></i>视频审核</template>
                            <el-menu-item-group>
                                <template slot="title">inst审核员</template>
                                <el-menu-item index="/main/video">视频审核管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu> -->
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
import { mapState } from 'vuex'
export default {
    created() {
        this.$http.get('inst/type/get').then(res => {
            this.instTypeList = res.data.data
        });
        this.menuList = this.userRights
        console.log(this.menuList);
    },
    data() {
        return {
            menuList: [],
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
        getFatherRightList() {
            return this.menuList.filter(item => item.father_right === 0)
        },
        getChildrenRightList(fatherId) {
            return this.menuList.filter(item => item.father_right === fatherId)
        },
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
    computed: {
        ...mapState(['userInfo', 'userRights'])
    }
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