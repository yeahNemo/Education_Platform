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
        submit() {
            this.$refs.form.validate().then(async (result) => {
                if (result) {
                    await this.$http.post('ums/login', this.model).then(res => {
                        console.log(res);
                        setToken(res.data.data.tokenHead + ' ' + res.data.data.token)
                        // Vuex保存用户数据
                        this.$store.commit('setUserInfo', res.data.data.userInfo)
                        this.$router.push('/main/home')
                    })
                }
            });
        },
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