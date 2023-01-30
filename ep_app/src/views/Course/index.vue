<template>
    <div>
        <!-- <h3>机构列表</h3> -->
        <div class="ins-list">
            <mu-paper v-for="inst in instList" :key="inst.id" class="ins-card" :z-depth="3" @click="routeTo(inst.id)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <!-- <avatar :instId="inst.id"></avatar> -->
                    </div>
                    <div>
                        <div class="ins-name">
                            {{ inst.instName }}
                        </div>
                        <div class="ins-description">
                            {{ typeList[inst.typeId].name }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            typeList: [],
            instList: []
        }
    },
    methods: {
        routeTo(instId) {
            this.$router.push(`/inst-course/${instId}`)
        }
    },
    async mounted() {
        let res = await this.$http.get('/inst/type/listAll')
        this.typeList = res.data.data
        res = await this.$http.get(`/inst/stuInstList/${this.userInfo.id}`)
        // console.log(res);
        this.instList = res.data.data
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style socped>
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
</style>