<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="任务点" color="primary" z-depth="3">
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
            <mu-tabs :value.sync="tabActive" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
                indicator-color="lightBlue800" class="tab">
                <mu-tab>任务</mu-tab>
                <mu-tab>考试</mu-tab>
            </mu-tabs>
        </div>
        <div class="main">
            <div class="task-list" v-if="tabActive === 0">
                <mu-list>
                    <mu-list-item @click="openFile(item.filename, item.id, item.title, item.content)"
                        v-for="item in taskList" :key="item.id" button :ripple="true">
                        <mu-list-item-title>{{ item.title }}</mu-list-item-title>
                        <p :id="`${item.id}`" :fun="isTaskFinished(item.id)"></p>
                    </mu-list-item>
                </mu-list>
            </div>
            <div class="test-list" v-else>
                <mu-list>
                    <mu-list-item @click="startTest(item)" v-for="item in testList" :key="item.id" button
                        :ripple="true">
                        <mu-list-item-title>{{ item.title }}</mu-list-item-title>
                        <label>{{ getTestState(item) }}</label>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>
    </div>
</template>

<script>
import { errorMsg } from '@/utils/message';
import Message from 'muse-ui-message'
import { mapState } from 'vuex';
export default {
    props: ['planId'],
    async mounted() {
        let res = await this.$http.get(`/planTask/getByInstId/${this.planId}`)
        // console.log(res);
        this.taskList = res.data.data
        res = await this.$http.get(`/exam/stu/${this.userInfo.id}/${this.planId}`)
        // console.log(res);
        this.testList = res.data.data
    },
    data() {
        return {
            tabActive: 0,
            taskList: [],
            testList: []
        }
    },
    methods: {
        getTestState(test) {
            const nowTime = new Date()
            const endTime = new Date(test.endTime)
            if (nowTime > endTime) {
                return '逾期'
            } else {
                return test.submitted === 1 ? '完成' : '待做'
            }
        },
        async startTest(test) {
            const nowTime = new Date()
            const endTime = new Date(test.endTime)
            if (nowTime > endTime) {
                errorMsg('考试已逾期')
                return
            }
            if (test.submitted === 0) {
                Message.confirm('确定开始？考试不允许暂停！').then((async ({ result }) => {
                    if (result) {
                        const res = await this.$http.post('/exam/exam-log', { adminId: this.userInfo.id, examId: test.id })
                        this.$router.push({ path: `/test/${test.id}`, query: { planId: this.planId } })
                    }
                }))
            } else if (test.submitted === 1) {
                this.$router.push({ path: '/test-result', query: { adminId: this.userInfo.id, examId: test.id } })
            }
        },
        async isTaskFinished(taskId) {
            // console.log(taskId);
            const res = await this.$http.get(`/taskProcess/getProcess/${this.userInfo.id}/${taskId}`)
            const textDom = document.getElementById(taskId)
            if (res.data.data === null) {
                const res2 = await this.$http.post(`/taskProcess/add`,
                    {
                        'adminId': this.userInfo.id,
                        'taskId': taskId,
                        'videoProcess': '0',
                        'finished': 0
                    })
                textDom.innerText = '待做'
                return false
            } else {
                if (res.data.data.finished === 0) {
                    textDom.innerText = '待做'
                    return false
                } else {
                    textDom.innerText = '已做'
                    return true
                }
            }

        },
        async openFile(storeName, taskId, title, description) {

            const res = await this.$http.get(`/taskProcess/getProcess/${this.userInfo.id}/${taskId}`)


            if (storeName.substr(-3, 3) === 'pdf') {

                await this.$http.post(`/taskProcess/update`,
                    {
                        finished: 1,
                        id: res.data.data.id,
                        videoProcess: '0'

                    })

                this.$router.push(`/pdf-file/${storeName}`)

            }
            else if (storeName.substr(-3, 3) === 'mp4') {
                this.$router.push({ path: `/video-file/${storeName}`, query: { recordId: res.data.data.id, taskId, userId: this.userInfo.id, title, description } })
            }
        },
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>