<template>
    <div>
        <h1>培训计划管理</h1>
        <el-button size="small" type="primary" @click="addBtnOnClick">
            添加
        </el-button>
        <el-table :data="tableData" stripe style="width: 100%">
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
                    <el-button type="text" @click="handleMore(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleConfig(scope.row)">配置</el-button>
                    <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="培训计划" :visible.sync="dialogVisible">
            <el-form ref="applyForm" :model="model">
                <div style="padding-right:3rem">
                    <el-form-item label="培训名称" prop="name" label-width="120">
                        <el-input v-model="model.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="培训描述" prop="description" label-width="120">
                        <el-input v-model="model.description" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="培训类型" prop="typeId" label-width="120">
                        <el-select v-model="model.typeId" placeholder="选择培训类型">
                            <el-option v-for="item in planTypeList" :key="item.id" :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="startDate" label-width="120">
                        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="model.startDate" type="datetime"
                            placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="endDate" label-width="120">
                        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="model.endDate" type="datetime"
                            placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="任务点" :visible.sync="configDialogVisible">
            <el-button size="small" type="primary" @click="handleTaskAdd">
                添加
            </el-button>
            <el-table :data="taskTableData" stripe style="width: 100%">
                <el-table-column prop="title" label="标题" width="180">
                </el-table-column>
                <el-table-column prop="content" label="内容" width="180">
                </el-table-column>
                <el-table-column prop="filename" label="储存文件名" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="taskHandleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="taskHandleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="任务点" :visible.sync="taskFormVisible">
            <el-form :model="taskToAdd">
                <div style="padding-right:3rem">
                    <el-form-item label="标题" prop="title" label-width="120">
                        <el-input v-model="taskToAdd.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content" label-width="120">
                        <el-input v-model="taskToAdd.content" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="关联文件" prop="filename" label-width="120">
                        <el-select v-model="taskToAdd.filename" placeholder="选择关联文件">
                            <el-option v-for="item in instResourceList" :key="item.id" :label="item.filename"
                                :value="item.storeName"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitNewTask">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    async mounted() {
        let res = await this.$http.get(`/plan/list/${this.userInfo.instId}`)
        this.tableData = res.data.data
        res = await this.$http.get('/plan/type/list')
        this.planTypeList = res.data.data
        res = await this.$http.get(`/file/list/${this.userInfo.instId}`)
        this.instResourceList = res.data.data
    },
    data() {
        return {
            taskFormVisible: false,
            configDialogVisible: false,
            dialogVisible: false,
            tableData: [],
            taskTableData: [],
            planTypeList: [{ 'id': 1, name: '类型1' }, { 'id': 2, name: '类型2' }],
            model: {
                instId: ''
            },
            taskToAdd: {

            },
            isUpdate: false,
            instResourceList: []
        }
    },
    methods: {
        async submitNewTask() {
            const res = await this.$http.post('/planTask/add', this.taskToAdd)
            console.log('taskAdd', res);
            this.taskFormVisible = false
            successMsg('添加成功！')
        },
        handleTaskAdd() {
            this.taskFormVisible = true
        },
        async handleConfig(row) {
            const res = await this.$http.get(`/planTask/getByInstId/${row.id}`)
            // console.log('res!!', res);
            this.taskToAdd.planId = row.id
            this.taskTableData = res.data.data
            this.configDialogVisible = true
        },
        async handleDel(row) {
            const res = await this.$http.post(`/plan/delete/${row.id}`)
            successMsg('删除成功')
            setTimeout(() => {
                this.$router.go(0)
            }, 1)

        },
        addBtnOnClick() {
            this.isUpdate = false
            this.model = this.$options.data().model
            this.dialogVisible = true
        },
        async submit() {
            if (this.isUpdate) {
                await this.$http.post('/plan/update', this.model)
                successMsg('修改成功')
            } else {
                this.model.instId = this.userInfo.instId
                this.model.startDate = this.model.startDate.replace('T', " ").replace('Z', '')
                this.model.endDate = this.model.endDate.replace('T', " ").replace('Z', '')
                const res = this.$http.post('/plan/create', this.model)
                successMsg('添加成功')
                this.$router.go(0)
            }
            this.dialogVisible = false
        },
        handleMore(row) {
            this.dialogVisible = true
            this.model = row
            this.isUpdate = true
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>