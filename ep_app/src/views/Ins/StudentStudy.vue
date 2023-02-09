<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="学习情况" color="primary" z-depth="3">
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
            <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    async mounted() {
        console.clear()
        let res = await this.$http.get(`/taskProcess/getPlanProcess/${this.userInfo.id}/${this.$route.query.planId}`)
        const studyDataList = res.data.data
        // 统计任务点总个数
        res = await this.$http.get(`/planTask/getByInstId/${this.$route.query.planId}`)
        const taskTotalNum = res.data.data.length
        // console.log(studyDataList);
        let finishedNum = 0
        studyDataList.forEach(item => {
            if (item.finished === 1) {
                finishedNum++
            }
        });
        // 填充数据 
        this.chartData.rows = [{ key: '已完成', value: finishedNum }, { key: '未完成', value: taskTotalNum - finishedNum }]
    },
    data() {
        return {
            chartSettings: { type: 'pie' },
            chartData: {
                columns: ['key', 'value'],
                rows: [
                    // {
                    //     key: '已完成',
                    //     value: 2
                    // },
                    // {
                    //     key: '未完成',
                    //     value: 3
                    // },
                ]
            },
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style scoped>
.main {
    margin: 1rem
}
</style>