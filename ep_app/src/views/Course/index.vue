<template>
    <div>
        <div class="inst-list">
            <mu-paper v-for="inst in instList" :key="inst.id" class="inst-card" :z-depth="3" @click="routeTo(inst)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <img class="avatar" :src="`http://120.79.171.132:8081/inst/icon/${inst.id}`"
                            :onerror="defaultImg">
                    </div>
                    <div>
                        <div class=" inst-name">
                            {{ inst.instName }}
                        </div>
                        <div class="inst-description">
                            {{ typeList[inst.typeId]? typeList[inst.typeId].name : '' }}
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
            instList: [],
            defaultImg: 'this.src="' + require('../../assets/Ins/inst-default-avatar.png') + '"' //默认图地址
        }
    },
    methods: {
        routeTo(inst) {
            this.$router.push(`/inst-course/${inst.id}`)
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
.avatar {
    overflow: hidden;
    height: 3rem;
    width: 3rem;
    border-radius: 5px;
    margin-top: 0.3rem;
}

.inst-name {
    padding-top: 0.4rem;
    font-size: 1rem;
}

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
</style>