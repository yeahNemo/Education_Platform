<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="培训计划" color="primary" z-depth="3">
                <mu-button icon slot="right" @click="reload">
                    <svg t="1676101315949" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2690">
                        <path
                            d="M887.8 394.8H719.3c-21.5 0-38.9-17.4-38.9-38.9s17.4-38.9 38.9-38.9H787c-61-86.2-161.3-142.5-275-142.5-186.1 0-336.9 150.8-336.9 336.9 0 186.1 150.8 336.9 336.9 336.9 186 0 336.9-150.8 336.9-336.9 0-21.5 17.4-38.9 38.9-38.9s38.9 17.4 38.9 38.9C926.7 740.4 741 926 512 926S97.4 740.4 97.4 511.4C97.4 282.4 283 96.8 512 96.8c139 0 261.7 68.5 336.9 173.5v-69.8c0-21.5 17.4-38.9 38.9-38.9s38.9 17.4 38.9 38.9V356c0 21.4-17.5 38.8-38.9 38.8z m0 0"
                            fill="#ffffff" p-id="2691"></path>
                    </svg>
                </mu-button>
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <div class="plan-list">
            <mu-paper v-for="plan in planList" :key="plan.id" class="plan-card" :z-depth="3" @click="routeTo(plan)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <!-- <avatar :instId="inst.id"></avatar> -->
                    </div>
                    <div>
                        <div class="plan-name">
                            {{ plan.name }}
                        </div>
                        <div class="plan-description">
                            {{ plan.description }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import { errorMsg } from '@/utils/message'
import dayjs from 'dayjs'
export default {
    inject: ['reload'],
    props: ['instId'],
    async mounted() {
        let res = await this.$http.get(`/plan/list/${this.instId}`)
        // console.log(res);
        this.planList = res.data.data
    },
    data() {
        return {
            planList: []
        }
    },
    methods: {
        routeTo(plan) {
            console.log(plan);
            const nowDate = dayjs()
            if (nowDate.isBefore(plan.startDate)) {
                errorMsg('培训暂未开始')
                return
            } else if (nowDate.isAfter(plan.endDate)) {
                errorMsg('培训已结束！')
                return
            }
            this.$router.push(`/plan-task/${plan.id}`)
        }
    },
}
</script>

<style scoped>
.plan-name {
    font-size: 1rem;
}

.plan-list {
    /* background-color: white; */
    flex-grow: 1;
    margin-bottom: 3.5rem;
}

.plan-card {
    font-size: 12px;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem 1rem;
    height: auto;
    max-height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>