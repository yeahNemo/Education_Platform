<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="考试详情" color="primary" z-depth="3">
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <div class="main">
            <div v-if="showForbidden">
                <div style="padding:1rem; font-weight: bold; font-size: large;">考试截至前无法查阅！</div>
            </div>
            <div v-else>
                <div class="single-ques-detail" v-for=" (item, index)  in quesDetailList" :key="index">
                    <mu-paper class="demo-paper" :z-depth="3">
                        <span v-html="item.content"></span>
                        <br>
                        <div>{{ `正确答案：${item.answer}` }}</div>
                        <div>{{ `我的答案：${item.stuAnswer}` }}</div>
                        <div>{{ `得分：${item.stuScore}` }}</div>
                    </mu-paper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async mounted() {
        const res = await this.$http.get(`/exam/exam-result/${this.$route.query.adminId}/${this.$route.query.examId}`)
        if (res.data.code === 400) {
            this.showForbidden = true
        } else {
            this.quesDetailList = res.data.data
        }
    },
    data() {
        return {
            showForbidden: false,
            quesDetailList: []
        }
    },
}
</script>

<style scoped>
.single-ques-detail {
    margin: 1rem 1rem 1rem 1rem;
}

.demo-paper {
    padding: 1rem 1rem 1rem 1rem
}
</style>