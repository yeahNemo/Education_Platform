<template>
    <div>
        <div>
            <h1>选择学员查看</h1>
            <el-table :data="stuList" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180">
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkStu(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog title="选择培训计划" :visible.sync="planDialogVisible">
                <el-table :data="planList" stripe style="width: 100%">
                    <el-table-column prop="name" label="培训计划" width="180">
                    </el-table-column>
                    <el-table-column prop="description" label="简介" width="180">
                    </el-table-column>
                    <el-table-column prop="startDate" label="开始时间" width="180">
                    </el-table-column>
                    <el-table-column prop="endDate" label="结束时间" width="300">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkPlan(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="planDialogVisible = false">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="任务点学习情况" :visible.sync="detailDialogVisible">
                <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="detailDialogVisible = false">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    inject: ['reload'],
    props: ['instId'],
    async mounted() {
        this.$http.get(`inst/${this.instId}/stu`).then(res => {
            this.stuList = res.data.data
        })
        const res = await this.$http.get(`/plan/list/${this.instId}`)
        this.planList = res.data.data
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
            stuList: [],
            planList: [],
            planDialogVisible: false,
            detailDialogVisible: false,
            selectedStuId: '',
            selectedPlanId: ''
        }
    },
    methods: {
        checkStu(row) {
            this.planDialogVisible = true
            this.selectedStuId = row.id
        },
        async checkPlan(row) {
            this.selectedPlanId = row.id
            this.detailDialogVisible = true
            // console.log('当前选择学生：', this.selectedStuId);
            // console.log('当前选择任务：', this.selectedPlanId);
            console.clear()
            try {
                // 统计完成情况
                let res = await this.$http.get(`/taskProcess/getPlanProcess/${this.selectedStuId}/${this.selectedPlanId}`)
                const studyDataList = res.data.data
                // 统计任务点总个数
                res = await this.$http.get(`/planTask/getByInstId/${this.selectedPlanId}`)
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

                console.clear()
                this.$nextTick(() => {
                    console.clear()
                })
            } catch (error) {
                console.clear()
                alert('此计划没有配置任何任务点！')
            }

        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>