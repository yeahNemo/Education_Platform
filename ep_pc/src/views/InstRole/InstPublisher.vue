<template>

    <div>
        <h1>发布资源</h1>
        <el-table :data="passedAssetList" stripe style="width: 100%">
            <el-table-column prop="filename" label="文件名" width="180">
            </el-table-column>
            <el-table-column prop="description" label="介绍" width="180">
            </el-table-column>
            <el-table-column label="是否发布">
                <template slot-scope="scope">
                    <el-switch @change="handleIsPublish(arguments[0], scope.row)" :active-value="1" :inactive-value="0"
                        v-model="scope.row.share" active-color="#13ce66">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    async mounted() {
        const res = await this.$http.get(`/file/audit-passed-docs/${this.userInfo.instId}`)
        this.passedAssetList = res.data.data
    },
    data() {
        return {
            passedAssetList: []
        }
    },
    methods: {
        async handleIsPublish(status, row) {
            const res = await this.$http.post(`/file/update-share-doc-status/${row.id}/${status}`)
            successMsg('成功')
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>