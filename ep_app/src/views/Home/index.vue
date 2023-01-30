<template>
    <div style="display: flex;flex-direction: column;">
        <mu-tabs :value.sync="active" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
            indicator-color="lightBlue800" class="tab">
            <mu-tab>资料</mu-tab>
            <mu-tab>机构</mu-tab>
        </mu-tabs>
        <div v-if="active == 1" class="ins-list">
            <mu-paper v-for="inst in insList" :key="inst.id" class="ins-card" :z-depth="3" @click="routeTo(inst.id)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <avatar :instId="inst.id"></avatar>
                    </div>
                    <div>
                        <div class="ins-name">
                            {{ inst.instName }}
                        </div>
                        <div class="ins-description">
                            {{ typeList[inst.typeId]? typeList[inst.typeId].name : '' }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
        <div v-else>
            <h1>这里是共享资料</h1>
            <mu-paper v-for="inst in insList" :key="inst.id" class="ins-card" :z-depth="3" @click="routeTo(inst.id)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <avatar :instId="inst.id"></avatar>
                    </div>
                    <div>
                        <div class="ins-name">
                            {{ inst.instName }}
                        </div>
                        <div class="ins-description">
                            {{ typeList[inst.typeId]? typeList[inst.typeId].name : '' }}
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
        console.log(res);

    },
    methods: {
        routeTo(instId) {
            this.$router.push(`/ins-home/${instId}`)
        },
    },
    data() {
        return {
            active: 0,
            insList: [],
            typeList: []
        }
    },
}
</script>

<style scoped>
.ins-name {
    font-size: 1rem;
}

.ins-list {
    /* background-color: white; */
    flex-grow: 1;
    margin-bottom: 3.5rem;
}

.ins-card {
    font-size: 12px;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem 1rem;
    height: auto;
    max-height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tab {
    position: sticky;
    top: 3.5rem;
    z-index: 10;
}
</style>