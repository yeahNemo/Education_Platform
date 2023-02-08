<template>
    <div>
        <h1>咨询信息管理</h1>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="username" label="提问者" width="180">
            </el-table-column>
            <el-table-column prop="question" label="问题" width="300">
            </el-table-column>
            <el-table-column label="回复" width="300">
                <template slot-scope="scope">
                    <el-button type="text"
                        @click="handleAnswer(scope.row)">{{ scope.row.answer ? scope.row.answer : '暂未回复' }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="是否展示">
                <template slot-scope="scope">
                    <el-switch @change="handleIsShow(arguments[0], scope.row.id)" :active-value="1" :inactive-value="0"
                        v-model="scope.row.status" active-color="#13ce66">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="回复" :visible.sync="answerFormVisible">
            <el-form :model="answerForm" label-width="5rem">
                <el-form-item label="提问">
                    <el-input disabled v-model="answerForm.question"></el-input>
                </el-form-item>
                <el-form-item label="回复" prop="answer">
                    <el-input :placeholder="answerForm.answer ? '' : '暂未回复'" v-model="answerForm.answer"></el-input>
                </el-form-item>
                <el-form-item style="display: flex; justify-content: start;">
                    <el-button @click="submitAnswer" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
export default {
    props: ['instId'],
    async mounted() {
        const res = await this.$http.get(`/question/list/${this.instId}?answered=0`)
        const res2 = await this.$http.get(`/question/list/${this.instId}?answered=1`)
        this.tableData = [...res.data.data, ...res2.data.data]
    },
    data() {
        return {
            tableData: [],
            answerFormVisible: false,
            answerForm: {
                id: '',
                answer: '',
                instId: '',
                question: ''
            }
        }
    },
    methods: {
        async handleIsShow(status, qesId) {
            const res = await this.$http.post(`/question/update/${qesId}/${status}`)
            successMsg(res.data.message)
        },
        async submitAnswer() {
            const res = await this.$http.post('/question/update', this.answerForm)
            successMsg(res.data.message)
            this.answerFormVisible = false
            this.$router.go(0)
        },
        handleAnswer(row) {
            this.answerForm.instId = this.instId
            this.answerForm.answer = row.answer
            this.answerForm.question = row.question
            this.answerForm.id = row.id
            this.answerFormVisible = true
        }
    }

}
</script>

<style>

</style>