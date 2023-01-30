<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span>登录</span>
            </div>
            <div style="padding-right:3rem;">
                <el-form :model="model" label-width="5rem" :rules="rules" ref="registerForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="model.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="model.password" :type="flag ? 'text' : 'password'">
                            <i slot="suffix" class="icon-style" :class="elIcon" autocomplete="auto"
                                @click="flag = !flag"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="display: flex; justify-content: start;">
                        <el-button @click="submit" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import { successMsg, errorMsg } from '@/utils/message'
export default {
    computed: {
        elIcon() {
            return this.flag ? "el-icon-minus" : "el-icon-view";
        }
    },
    data() {
        return {
            flag: false,
            model: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // submit() {
        //     const mockResAdmin = {
        //         "code": 200,
        //         "message": "操作成功",
        //         "data": {
        //             "tokenHead": "Bearer",
        //             "userInfo": {
        //                 "id": 1,
        //                 "instId": 2,
        //                 "username": "admin",
        //                 "password": null,
        //                 "nickName": "admin",
        //                 "icon": "c01c9690-2017-40e7-9df3-372561d2b8ca.jpg",
        //                 "email": null,
        //                 "rights": [
        //                     { "id": 1, "rightName": "学员管理", "father_right": 0 },
        //                     { "id": 2, "rightName": "学员信息管理", "father_right": 1 },
        //                     { "id": 3, "rightName": "学员学习情况", "father_right": 1 },
        //                     { "id": 4, "rightName": "学员考试情况", "father_right": 1 },
        //                     { "id": 5, "rightName": "机构管理", "father_right": 0 },
        //                     { "id": 6, "rightName": "机构账号审核", "father_right": 5 },
        //                     { "id": 7, "rightName": "机构信息管理", "father_right": 5 },
        //                     { "id": 8, "rightName": "公共资源管理", "father_right": 0 },
        //                     { "id": 9, "rightName": "公共文档视频", "father_right": 8 },
        //                     { "id": 10, "rightName": "公共试题资源", "father_right": 8 },
        //                 ],
        //                 "note": "超级管理员账号",
        //                 "createTime": "2022-11-22 15:45:23",
        //                 "loginTime": "2023-01-13 00:10:07",
        //                 "status": 1
        //             },
        //             "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NzM1ODY3NTQ3NzAsImV4cCI6MTY3NDE5MTU1NH0.5yENblX7mztcWmg5fb26zp9aiAlVedtntIpzWTIuBrZRhtG1VBtdwaVEOHu-1ICWbcSt8at1lSqkz879f3d5WQ"
        //         }
        //     }
        //     const mockRes = {
        //         "code": 200,
        //         "message": "操作成功",
        //         "data": {
        //             "tokenHead": "Bearer",
        //             "userInfo": {
        //                 "id": 2,
        //                 "instId": 1,
        //                 "username": "city_bus",
        //                 "password": null,
        //                 "nickName": "city_bus",
        //                 "icon": "c01c9690-2017-40e7-9df3-372561d2b8ca.jpg",
        //                 "email": null,
        //                 "rights": [
        //                     { "id": 11, "rightName": "机构信息设置", "father_right": 0 },
        //                     { "id": 12, "rightName": "工作人员配置", "father_right": 11 },
        //                     { "id": 13, "rightName": "机构信息管理", "father_right": 11 },
        //                     { "id": 14, "rightName": "培训计划管理", "father_right": 11 },
        //                     { "id": 15, "rightName": "咨询列表管理", "father_right": 11 },
        //                     { "id": 16, "rightName": "机构学员管理", "father_right": 0 },
        //                     { "id": 17, "rightName": "审核学员信息", "father_right": 16 },
        //                     { "id": 18, "rightName": "学员信息管理", "father_right": 16 },
        //                     { "id": 19, "rightName": "学员学习记录", "father_right": 16 },
        //                 ],
        //                 "note": "城市交通机构管理员",
        //                 "createTime": "2022-11-22 15:45:23",
        //                 "loginTime": "2023-01-13 00:10:07",
        //                 "status": 1
        //             },
        //             "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NzM1ODY3NTQ3NzAsImV4cCI6MTY3NDE5MTU1NH0.5yENblX7mztcWmg5fb26zp9aiAlVedtntIpzWTIuBrZRhtG1VBtdwaVEOHu-1ICWbcSt8at1lSqkz879f3d5WQ"
        //         }
        //     }
        //     this.$refs['registerForm'].validate(async (result) => {
        //         if (result) {
        //             await this.$http.get('http://127.0.0.1:4523/m1/1968983-0-default/mock/login').then(res => {
        //                 console.log('res', mockRes.data);
        //                 // setToken(res.data.data.tokenHead + ' ' + res.data.data.token)
        //                 // successMsg('登陆成功')
        //                 this.$store.commit('setUserInfo', mockRes.data.userInfo)
        //                 this.$store.commit('setUserRights', mockRes.data.userInfo.rights)
        //                 this.$router.push('/main')
        //                 // 获取权限信息 根据权限信息动态添加侧边栏和动态路由
        //             })
        //         } else {
        //             errorMsg('检查填写！')
        //             return
        //         }

        //     });
        // },
        submit() {
            this.$refs['registerForm'].validate(async (result) => {
                if (result) {
                    await this.$http.post('ums/login', this.model).then(async res => {
                        console.log(res);
                        setToken(res.data.data.tokenHead + ' ' + res.data.data.token)
                        successMsg('登陆成功')
                        // console.log('userInfo:', res.data.data.userInfo);
                        this.$store.commit('setUserInfo', res.data.data.userInfo)
                        this.$store.commit('setUserRole', res.data.data.userRole)
                        this.$router.push('/main')
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

<style scoped>
.icon-style {
    margin-right: 8px;
}

.box-card {
    width: 30rem;
    margin: 13rem auto;
}
</style>