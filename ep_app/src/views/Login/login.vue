<template>
    <div>
        <div class="main-form">
            <h1 style="margin-bottom: 2rem;">登录</h1>
            <mu-form ref="form" :model="model" class="mu-demo-form">
                <mu-form-item label="用户名" prop="username" :rules="usernameRules">
                    <mu-text-field v-model="model.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field autocomplete="off" type="password" v-model="model.password"
                        prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isAgree" :rules="argeeRules">
                    <mu-flex justify-content="center" align-items="center">
                        <mu-checkbox label="同意用户协议" v-model="model.isAgree"></mu-checkbox>
                        <router-link style="margin-left: 6rem;" to="/register">没有账号？</router-link>
                    </mu-flex>
                </mu-form-item>
                <div style="margin-top:1rem">
                    <mu-button style="width:100%" color="primary" @click="submit">登录</mu-button>
                </div>
            </mu-form>
        </div>
    </div>
</template>
<script>
import { setToken } from '@/utils/auth'
export default {
    data() {
        return {
            usernameRules: [
                { validate: (val) => !!val, message: '必须填写用户名' },
                { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码' },
                { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
            ],
            argeeRules: [{ validate: (val) => !!val, message: '须同意用户协议' }],
            model: {
                username: '',
                password: '',
                isAgree: false
            }
        }
    },
    methods: {
        // 正式环境
        submit() {
            this.$refs.form.validate().then(async (result) => {
                if (result) {
                    let res = await this.$http.post('ums/login', this.model)
                    setToken(res.data.data.tokenHead + ' ' + res.data.data.token)
                    // Vuex保存用户数据
                    this.$store.commit('setUserInfo', res.data.data.userInfo)
                    // Vuex初始化收件箱
                    res = await this.$http.get(`/inst/message-box/${res.data.data.userInfo.id}`)
                    this.$store.commit('setUserMessageBox', res.data.data)
                    this.$router.push('/main/home')
                }
            });
        },

        //本地MOCK
        // submit() {
        //     const mockRes = {
        //         "code": 200,
        //         "message": "操作成功",
        //         "data": {
        //             "tokenHead": "Bearer",
        //             "userInfo": {
        //                 "id": 3,
        //                 "instId": 0,
        //                 "username": "student1",
        //                 "password": null,
        //                 "nickName": "student1",
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
        //                 "note": "student1",
        //                 "createTime": "2022-11-22 15:45:23",
        //                 "loginTime": "2023-01-13 00:10:07",
        //                 "status": 1
        //             },
        //             "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NzM1ODY3NTQ3NzAsImV4cCI6MTY3NDE5MTU1NH0.5yENblX7mztcWmg5fb26zp9aiAlVedtntIpzWTIuBrZRhtG1VBtdwaVEOHu-1ICWbcSt8at1lSqkz879f3d5WQ"
        //         }
        //     }
        //     this.$refs.form.validate().then(async (result) => {
        //         if (result) {
        //             await this.$http.post('http://127.0.0.1:4523/m1/1968983-0-default/mock/login', this.model).then(res => {
        //                 setToken(mockRes.data.tokenHead + ' ' + mockRes.data.token)
        //                 // Vuex保存用户数据
        //                 this.$store.commit('setUserInfo', mockRes.data.userInfo)
        //                 this.$router.push('/main/home')
        //             })
        //         }
        //     });
        // },
    }
};
</script>
<style scoped>
.mu-demo-form {
    width: 100%;
    max-width: 460px;
}

.main-form {
    padding: 2rem 2rem
}
</style>