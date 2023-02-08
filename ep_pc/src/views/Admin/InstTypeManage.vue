<template>
    <div>
        <h3>机构类型</h3>
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        <el-table :data="typeList" stripe>
            <el-table-column label="机构编号" prop="id" width="300">
            </el-table-column>
            <el-table-column label="机构名" prop="name">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleEdit(scope.row, 1)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row, 0)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="类型" :visible.sync="dialogFormVisible">
            <el-form ref="typeForm" :model="model" :rules="rules">
                <div style="padding-right:3rem">
                    <el-form-item label="类型名称" prop="name" label-width="5rem">
                        <el-input v-model="model.name" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    inject: ['reload'],
    created() {
        this.$http.get('/inst/type/listAll').then(res => {
            this.typeList = res.data.data
        })
    },
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            typeList: [],
            dialogFormVisible: false,
            isAdd: true,
            model: {
                id: '',
                name: ''
            }
        }
    },
    methods: {
        handleEdit(row) {
            this.isAdd = false
            this.dialogFormVisible = true
            this.model = row
        },
        handleDelete(row) {
            this.$http.delete(`inst/type/delete/${row.id}`).then(res => {
                console.log(res);
                this.reload()
            })
        },
        handleAdd() {
            this.isAdd = true
            this.model = this.$options.data().model
            this.dialogFormVisible = true
        },
        submit() {
            if (this.isAdd) {
                this.$http.post('inst/type/add', this.model).then(res => {
                    // console.log(res);
                    console.log('刷新');
                    this.reload()
                })
            } else {
                this.$http.post('inst/type/update', this.model).then(res => {
                    console.log('刷新');
                    this.reload()
                })

            }
            this.dialogFormVisible = false
        }
    },

}
</script>

<style>

</style>