<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span>注册</span>
            </div>
            <el-form :model="model" label-width="5rem" :rules="rules" ref="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="model.password" :type="flag ? 'text' : 'password'">
                        <i slot="suffix" class="icon-style" :class="elIcon" autocomplete="auto" @click="flag = !flag" />
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="model.email"></el-input>
                </el-form-item>
                <el-row>
                    <el-form-item label="验证码" prop="authCode">
                        <el-input v-model="model.authCode">
                            <el-button slot="append" @click="sendSmsCode"
                                :disabled="disabled">{{ sendBtnText }}</el-button>
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-form-item style="display: flex; justify-content: start;">
                    <el-button @click="submit" type="primary">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
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
                password: "",
                email: "",
                authCode: ""
            },
            // 倒计时
            timer: null,
            sendBtnText: '发送',
            counter: 59,
            // 发送按钮的禁用
            disabled: false,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, message: '长度大于3位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, message: '长度大于6位', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: "输入邮箱！", trigger: "blur" },
                    { pattern: /^\w+@\w+\.\w+$/i, message: '检查格式！', trigger: 'blur' },
                ],
                authCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        sendSmsCode() {
            this.$refs.registerForm.validateField('email', async (result) => {
                if (result == '') {
                    await this.$http.get(`mail/send/${this.model.email}`).then(res => {
                        if (res.data.code == 200) {
                            successMsg('已发送');
                        }
                        if (res === undefined) {
                            console.log(res, 'res是undefined');
                            return
                        }
                        this.disabled = true
                        this.counter = 59
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
                    }).catch(e => {
                        console.log(e);
                        errorMsg('发送失败');
                    })


                } else {
                    errorMsg('请检查邮箱格式！');
                    return
                }
            })
            // 顶部显示发送成功
            // 发送的api


        },
        resetTimer() {
            this.counter = 59
            this.disabled = false
            this.sendBtnText = '发送'
        },
        submit() {
            this.$refs['registerForm'].validate((result) => {
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
    },

}
</script>

<style scoped>
.box-card {
    width: 30rem;
    margin: 8rem auto;
}
</style>