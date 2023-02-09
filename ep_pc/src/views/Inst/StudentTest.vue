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
            <el-dialog title="选择考试" :visible.sync="testDialogVisible">
                <el-table :data="testList" stripe style="width: 100%">
                    <el-table-column prop="title" label="考试" width="180">
                    </el-table-column>
                    <el-table-column prop="startTime" label="开始时间" width="180">
                    </el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="180">
                    </el-table-column>
                    <el-table-column prop="totalTime" label="考试时长" width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkTest(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="testDialogVisible = false">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="考试情况" :visible.sync="detailDialogVisible">
                <ve-ring :data="chartData1" :settings="chartSettings"></ve-ring>
                <ve-ring :data="chartData2" :settings="chartSettings"></ve-ring>
                <ve-ring :data="chartData3" :settings="chartSettings"></ve-ring>
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
    async mounted() {
        this.$http.get(`inst/${this.userInfo.instId}/stu`).then(res => {
            this.stuList = res.data.data
        })
        const res = await this.$http.get(`/plan/list/${this.userInfo.instId}`)
        this.planList = res.data.data
    },
    data() {
        return {
            chartSettings: { type: 'pie' },
            chartData1: {
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
            chartData2: {
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
            chartData3: {
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
            testList: [],
            planDialogVisible: false,
            detailDialogVisible: false,
            testDialogVisible: false,
            selectedStuId: '',
            selectedPlanId: '',
            selectedTestId: ''
        }
    },
    methods: {
        checkStu(row) {
            this.planDialogVisible = true
            this.selectedStuId = row.id
        },
        async checkPlan(row) {
            this.selectedPlanId = row.id
            const res = await this.$http.get(`/exam/${this.selectedPlanId}`)
            this.testList = res.data.data
            console.log(this.testList);

            this.testDialogVisible = true
        },
        async checkTest(row) {
            this.selectedTestId = row.id
            this.detailDialogVisible = true
            // console.log('当前选择学生：', this.selectedStuId);
            // console.log('当前选择培训：', this.selectedPlanId);
            // console.log('当前选择考试：', this.selectedTestId);
            // 填充数据 
            const res = await this.$http.get(`/exam/statistic/${this.selectedStuId}/${this.selectedTestId}`)
            // this.chartData.rows = [{ key: '已完成', value: 1 }, { key: '未完成', value: 3 }]
            let rawData = res.data.data
            this.chartData1.rows = [rawData[0], rawData[1]]
            this.chartData2.rows = [rawData[2], rawData[3]]
            this.chartData3.rows = [rawData[4], rawData[5]]

            console.clear()
            this.$nextTick(() => {
                console.clear()
            })
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>