<template>
    <div style="display: flex;flex-direction: column;">
        <mu-tabs :value.sync="active" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
            indicator-color="lightBlue800" class="tab">
            <mu-tab>资料</mu-tab>
            <mu-tab>机构</mu-tab>
        </mu-tabs>
        <div v-if="active == 1" class="inst-list">
            <mu-paper v-for="inst in insList" :key="inst.id" class="inst-card" :z-depth="3" @click="routeTo(inst.id)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <avatar :instId="inst.id"></avatar>
                    </div>
                    <div>
                        <div class="inst-name">
                            {{ inst.instName }}
                        </div>
                        <div class="inst-description">
                            {{ typeList[inst.typeId]? typeList[inst.typeId].name : '' }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
        <div v-else>
            <mu-paper v-for="item in publicResourceList" :key="item.id" class="inst-card" :z-depth="3"
                @click="openFile(item.storeName)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <!-- <avatar :instId="item.id">我是图片</avatar> -->
                    </div>
                    <div>
                        <div class="inst-name">
                            {{ item.filename }}
                        </div>
                        <div class="inst-description">
                            {{ item.description }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import avatar from '@/components/avatar.vue'
export default {
    components: { avatar },
    async created() {
        let res = await this.$http.get('/inst/all?keyword=&pageSize=&pageNum=')
        this.insList = res.data.data.list
        res = await this.$http.get('/inst/type/listAll')
        this.typeList = res.data.data
        res = await this.$http.get('/file/shareDoc')
        this.publicResourceList = res.data.data

    },
    methods: {
        routeTo(instId) {
            this.$router.push(`/ins-home/${instId}`)
        },
        openFile(storeName) {
            console.log(storeName.substr(-3, 3));

            if (storeName.substr(-3, 3) === 'pdf') {
                this.$router.push(`/pdf-file/${storeName}`)
            }
            else if (storeName.substr(-3, 3) === 'mp4') {
                this.$router.push(`/video-file/${storeName}`)
            }
        },
    },
    data() {
        return {
            active: 0,
            insList: [],
            typeList: [],
            publicResourceList: []
        }
    },
}
</script>

<style scoped>
.inst-list {
    /* background-color: white; */
    flex-grow: 1;
    margin-bottom: 3.5rem;
}

.inst-card {
    font-size: 12px;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem 1rem;
    height: auto;
    max-height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inst-name {
    font-size: 1rem;
}

.tab {
    position: sticky;
    top: 3.5rem;
    z-index: 10;
}
</style>