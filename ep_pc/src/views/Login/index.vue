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
                                @click="flag = !flag" />
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
        submit() {
            this.$refs['registerForm'].validate(async (result) => {
                if (result) {
                    await this.$http.post('ums/login', this.model).then(res => {
                        console.log(res);
                        setToken(res.data.data.tokenHead + ' ' + res.data.data.token)
                        successMsg('登陆成功')
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
.box-card {
    width: 30rem;
    margin: 13rem auto;
}
</style>