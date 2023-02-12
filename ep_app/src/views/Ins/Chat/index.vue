<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click="$router.back()">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
                咨询列表
                <mu-button icon slot="right" @click="isFormVisible = true">
                    <svg t="1673434967340" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2100" width="200" height="200">
                        <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" fill="#ffffff"
                            p-id="2101"></path>
                        <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" fill="#ffffff"
                            p-id="2102"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <div class="chat-list">
            <mu-paper v-for="chat in chatList" :key="chat.id" class="chat-card" :z-depth="3">
                <div class="user-ask" style="font-size:.875rem;margin-bottom: 3px;">
                    <span style="color:blue">
                        {{ chat.username }}
                    </span>
                    <span>提问：{{ chat.question }}</span>
                </div>
                <div class="content" style="font-size: 0.85rem">
                    <div class="chat-answer">
                        回答:&nbsp;{{ chat.answer }}
                    </div>
                </div>
                <div class="time">
                    <span>
                        {{ chat.time }}
                    </span>
                </div>
            </mu-paper>
        </div>
        <div class="question-form">
            <mu-dialog title="咨询" width="360" scrollable :open.sync="isFormVisible">
                <mu-form :model="form" class="mu-demo-form" label-position="top" label-width="100">
                    <mu-form-item prop="input" label="提问">
                        <mu-text-field v-model="form.question" placeholder="请在此输入..." multi-line :rows="1"
                            :rows-max="6">
                        </mu-text-field>
                    </mu-form-item>
                </mu-form>
                <mu-button slot="actions" flat color="primary" @click="submitQuestion">提交</mu-button>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { successMsg } from '@/utils/message'
export default {
    name: 'Chat',
    created() {
        this.$http.get(`/question/list/${this.id}?answered=1`).then(res => {
            // console.log(res.data.data);
            this.chatList = res.data.data
        })
    },
    mounted() {
        this.form = {
            userId: this.userInfo.id,
            username: this.userInfo.username,
            question: '',
            instId: this.id
        }
    },
    props: ['id'],
    methods: {
        async submitQuestion() {
            const res = await this.$http.post('/question/create', this.form)
            // console.log(res);
            this.isFormVisible = false
            successMsg(res.data.message)
        }
    },
    data() {
        return {
            form: {},
            isFormVisible: false,
            chatList: [
                {
                    id: 0,
                    username: 'NEMO',
                    question: '请问我是学生，能免费吗？',
                    answer: '你是畜生都不行。',
                    time: '2022-3-14'
                }
            ]
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}

</script>

<style scoped>
.time {
    color: #a9a9a9;
}

.header {
    position: sticky;
    top: 0;
    z-index: 10;
}

/* .chat-list {
    background-color: white;
    height: 100vh;
} */

.chat-card {
    /* font-size: 12px; */
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem 1rem;
    height: auto;
    /* max-height: 5rem; */
    overflow: hidden;
}
</style>