<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="正在考试" color="primary" z-depth="3">
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
export default {
    props: ['testId'],
    async mounted() {
        const res = await this.$http.get(`/exam/getById/${this.testId}`)
        this.examObj = res.data.data
    },
    data() {
        return {
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
    }
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