<template>
    <div>
        <div class="main-form">
            <h1 style="margin-bottom: 2rem;">注册</h1>
            <mu-form ref="form" :model="model" class="mu-demo-form">
                <mu-form-item prop="email" :rules="emailRules">
                    <mu-text-field placeholder="邮箱" type="email" v-model="model.email" prop="email"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="authCode" :rules="authCodeRules">
                    <mu-text-field placeholder="验证码" v-model="model.authCode" prop="authCode">
                        <template #append>
                            <mu-button :disabled="disabled" flat small color="primary"
                                @click="sendSmsCode">{{ sendBtnText }}</mu-button>
                        </template>
                    </mu-text-field>

                </mu-form-item>
                <mu-form-item prop="username" :rules="usernameRules">
                    <mu-text-field placeholder="用户名" v-model="model.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="password" :rules="passwordRules">
                    <mu-text-field placeholder="密码" autocomplete="off" v-model="model.password"
                        :action-icon="visibility ? 'visibility_off' : 'visibility'"
                        :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
                        prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="confirmedPassword" :rules="confirmedPasswordRules">
                    <mu-text-field placeholder="确认密码" autocomplete="off" type="password"
                        v-model="model.confirmedPassword"></mu-text-field>
                </mu-form-item>
                <div style="display:flex; justify-content: end;">
                    <router-link to="/login">已有账号？</router-link>
                </div>
                <div>
                    <mu-button style="width:100%; margin-top:1rem" color="primary" @click="submit">注册</mu-button>
                </div>
            </mu-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            authCodeRules: [
                { validate: (val) => !!val, message: '请填写验证码' },
                { validate: (val) => val.length == 6, message: '验证码为6位！' }
            ],
            usernameRules: [
                { validate: (val) => !!val, message: '请填写用户名' },
                { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '请填写密码' },
                { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
            ],
            confirmedPasswordRules: [
                { validate: (val, model) => val === model.password, message: '两次密码不一致' }
            ],
            emailRules: [
                { validate: (val) => !!val, message: '填写邮箱' },
                { validate: (val) => (val.match(/^\w+@\w+\.\w+$/i)), message: '检查邮箱格式！' },
            ],
            visibility: false,
            model: {
                username: '',
                password: '',
                email: '',
                confirmedPassword: '',
                authCode: ''
            },
            // 倒计时
            timer: null,
            sendBtnText: '发送验证码',
            counter: 59,
            // 发送按钮的禁用
            disabled: false,
        }
    },
    methods: {
        async sendSmsCode() {
            // 顶部显示发送成功
            // 发送的api
            const res = await this.$http.get(`mail/send/${this.model.email}`).then(res => {
                if (res.data.data.code == 200) {
                    this.$toast.success('已发送');
                }
            }).catch(e => {
                console.log(e);
                this.$toast.error('失败');
            })
            if (res === undefined) {
                return
            }

            this.disabled = true
            this.counter = 59
            // TODO 倒计时再次发送
            this.timer = setInterval(() => {
                // 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
                this.sendBtnText = `${this.counter}秒后重新发送`
                this.counter--
                if (this.counter < 0) {
                    // 当计时小于零时，取消该计时器
                    clearInterval(this.timer)
                    this.resetTimer()
                }
            }, 1000)

        },
        resetTimer() {
            this.counter = 59
            this.disabled = false
            this.sendBtnText = '发送验证码'
        },
        submit() {
            this.$refs.form.validate().then((result) => {

                if (result) {
                    this.$http.post('ums/register', this.model).then(res => {
                        console.log(res);
                    }).catch(e => {
                        console.log(e);
                    })
                } else {
                    return
                }

            });
        },
        clear() {
            this.$refs.form.clear();
            this.model = {
                username: '',
                password: '',
                email: '',
                confirmedPassword: '',
                authCode: ''
            };
        }
    }
};
</script>
<style scoped>
.mu-demo-form {
    width: 100%;
    max-width: 460px;
}

.main-form {
    margin: 0;
    padding: 1rem 2rem
}
</style>