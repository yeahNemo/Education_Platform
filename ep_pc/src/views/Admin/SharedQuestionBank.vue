<template>
    <div>
        <h1>共享题库</h1>
        <el-button size="small" type="primary"
            @click="quesFormDialogVisible = true; isEdit = false; quesToAdd = $options.data().quesToAdd">创建</el-button>
        <el-table :data="quesTableData" stripe style="width: 100%">
            <el-table-column prop="content" label="题目" width="180">
            </el-table-column>
            <el-table-column prop="answer" label="答案" width="180">
            </el-table-column>
            <el-table-column prop="type" label="题型" width="180">
                <template slot-scope="scope">
                    <p> {{ scope.row.type === 1 ? '选择题' : '填空题' }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="editQues(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delQues(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-dialog :title="`${isEdit ? '编辑题目' : '添加题目'}`" :visible.sync="quesFormDialogVisible">
                <el-form :model="quesToAdd">
                    <div style="padding-right:3rem">
                        <el-form-item label="类型" prop="type" label-width="120">
                            <el-select v-model="quesToAdd.type" placeholder="选择类型">
                                <el-option label="选择题" :value="1">
                                </el-option>
                                <el-option label="填空题" :value="2">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="题目" prop="content">
                            <VueEditor style="margin-top:2rem" v-model="quesToAdd.content"></VueEditor>
                        </el-form-item>
                        <el-form-item label="答案" prop="answer" label-width="120">
                            <el-input v-model="quesToAdd.answer" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="quesFormDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitNewQues">提 交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    async mounted() {
        const res = await this.$http.get('/problem/share-problem-list?keyword=&type=')
        this.quesTableData = res.data.data
    },
    data() {
        return {
            quesFormDialogVisible: false,
            isEdit: false,
            quesTableData: [],
            quesToAdd: {
                planId: 0,
                type: '',
                content: '',
                answer: ''
            }
        }
    },
    methods: {
        async delQues(row) {
            const res = this.$http.post(`/problem/delete/${row.id}`)
            successMsg('删除成功')
            this.quesTableData = this.quesTableData.filter(item => item.id !== row.id)
        },
        async editQues(row) {
            this.isEdit = true
            this.quesFormDialogVisible = true
            this.quesToAdd = row
        },
        async submitNewQues() {
            if (this.isEdit) {
                let res = await this.$http.post('/problem/update', this.quesToAdd)
                successMsg(this.isEdit ? '编辑成功' : '添加成功')
                console.log('res', res.data.data);
                const temp = this.quesTableData.find(item => item.id = res.data.data.id)
                temp.content = res.data.data.content
                temp.answer = res.data.data.answer
                temp.type = res.data.data.type
                temp.id = res.data.data.id
                temp.planId = res.data.data.planId
                this.quesFormDialogVisible = false
            } else {
                this.quesToAdd.planId = 0
                const res = await this.$http.post('/problem/add', this.quesToAdd)
                successMsg(this.isEdit ? '编辑成功' : '添加成功')
                this.quesTableData.push(res.data.data)
                this.quesFormDialogVisible = false
            }
            this.quesToAdd = this.$options.data().quesToAdd
        }

    },
}
</script>

<style>

</style>