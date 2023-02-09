<template>

    <div>
        <h1>审核资源</h1>
        <div>
            <el-table :data="assetList" stripe style="width: 100%">
                <el-table-column prop="filename" label="文件名" width="180">
                </el-table-column>
                <el-table-column prop="description" label="介绍" width="180">
                </el-table-column>
                <el-table-column label="是否通过">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleCheck(scope.row)">查看</el-button>
                        <el-switch @change="handleIsShow(arguments[0], scope.row)" :active-value="1" :inactive-value="0"
                            v-model="scope.row.passed" active-color="#13ce66">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    async mounted() {
        const res = await this.$http.get(`/file/inst-doc/${this.userInfo.instId}`)
        this.assetList = res.data.data
    },
    data() {
        return {
            assetList: []
        }
    },
    methods: {
        async handleIsShow(status, row) {
            const res = await this.$http.post(`/file/audit-share-doc/${row.id}/${status}`)
            successMsg('修改成功')
        },
        handleCheck(row) {
            //TODO 打开文件
            window.open(`http://localhost:8081/file/get/${row.storeName}`)
            console.log('CheckFile')
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>