<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="正在考试" color="primary" z-depth="3">
                <span slot="right" class="left-time">剩余时间：{{ leftSeccond }}秒</span>
                <!-- <mu-button @click="exitTest" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button> -->
            </mu-appbar>
        </div>
        <div class="main">
            <div class="single-ques" v-for="item in examObj.problems" :key="item.id">
                <mu-paper class="demo-paper" :z-depth="3">
                    {{ item.content }}
                    <br>
                    <mu-text-field v-model="item.userAnswer"></mu-text-field>
                </mu-paper>
            </div>
        </div>
        <div class="footer-btn">
            <mu-button @click="submitTest" round color="primary">提交考试</mu-button>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import Message from 'muse-ui-message'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
    props: ['testId'],
    async mounted() {
        let res = await this.$http.get(`/exam/getById/${this.testId}`)
        this.examObj = res.data.data
        // this.nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        res = await this.$http.get(`/exam/stu/${this.userInfo.id}/${this.$route.query.planId}`)
        console.log('res', res.data.data, 'testId', this.testId);
        this.userTestLogObj = (res.data.data).find(item => item.id === Number(this.testId))
        // 剩余时间等于 考试持续时间 - (现在时间 - 进入时间)
        this.leftSeccond = this.userTestLogObj.totalTime * 60 - (dayjs().diff(dayjs(this.userTestLogObj.enterTime), 'second'))
        let that = this
        this.timer = setInterval(async () => {
            if (that.leftSeccond <= 0 || dayjs() > dayjs(that.userTestLogObj.endTime)) {
                clearInterval(that.timer)
                const res = await this.$http.post(`/exam/submit-answer`, this.userAnswer)
                successMsg('已自动提交！')
                this.$router.back()
                return
            }
            this.leftSeccond--
        }, 1000);
    },
    data() {
        return {
            timer: null,
            userTestLogObj: null,
            leftSeccond: '',
            examObj: {
                exam: {},
                problems: []
            },
            userAnswer: []
        }
    },
    methods: {
        async submitTest() {
            Message.confirm('提交考试？').then(
                async ({ result }) => {
                    if (result) {
                        this.examObj.problems.forEach(item => {
                            this.userAnswer.push({
                                examId: Number(this.testId),
                                answer: item.userAnswer,
                                adminId: this.userInfo.id,
                                problemId: item.id
                            })
                        })
                        const res = await this.$http.post(`/exam/submit-answer`, this.userAnswer)
                        successMsg('提交成功！')
                        this.$router.back()
                    }
                })
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    destroyed() {
        if (this.timer != null) {
            clearInterval(this.timer)
        }
    },
}
</script>

<style scoped>
.single-ques {
    margin: 1rem 1rem 1rem 1rem;
    /* padding: 1rem 1rem 1rem 1rem; */
}

.demo-paper {
    padding: 1rem 1rem 1rem 1rem
}

.footer-btn {
    margin: 1rem 1rem 1rem 1rem
}
</style>