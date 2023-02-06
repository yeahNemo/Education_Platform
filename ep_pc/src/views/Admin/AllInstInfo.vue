<template>
    <div>
        <h1>所有机构管理</h1>
        <el-table :data="instList" style="width: 100%">
            <el-table-column prop="instName" label="机构名称" width="180">
            </el-table-column>
            <el-table-column prop="typeId" label="机构类型" width="180">
                <template slot-scope="scope">
                    {{ instTypeList[scope.row.typeId]? instTypeList[scope.row.typeId].name : '' }}
                </template>
            </el-table-column>
            <el-table-column prop="description" label="机构简介">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleConfig(scope.row)">配置</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    mounted() {
        // 获取机构列表
        this.$http.get('http://localhost:8081/inst/all?keyword=&pageSize=&pageNum=').then(res => {
            this.instList = res.data.data.list
        })
        // 获取机构种类
        this.$http.get('inst/type/listAll').then(res => {
            this.instTypeList = res.data.data
        })
    },
    data() {
        return {
            instList: [],
            instTypeList: []
        }
    },
    methods: {
        handleConfig(row) {
            this.$router.push(`/admin-inst-info/${row.id}`)
        }
    },
}
</script>

<style>

</style>