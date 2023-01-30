<template>
    <div style="height:100%">
        <div class="header">
            <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click="$router.back()">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
                机构信息
            </mu-appbar>
        </div>
        <mu-tabs :value.sync="tabValue" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
            indicator-color="lightBlue800" class="tab">
            <mu-tab>机构介绍</mu-tab>
            <mu-tab>公开资料</mu-tab>
        </mu-tabs>
        <div class="inst-info" v-if="tabValue === 0">
            <mu-card style="display: flex; flex-direction: column; width: 100%; min-height: 92%;">
                <div style="display: flex;">
                    <mu-card-header :title="instObj.instName" sub-title="交运通认证">
                        <mu-avatar slot="avatar">
                            <img src="../../assets/Ins/bus.jpg">
                        </mu-avatar>
                    </mu-card-header>
                    <div style="margin: 1rem 0.5rem 0 0">
                        <mu-button style="margin-top:0" color="info" @click="$router.push(`/ins-chat/${instObj.id}`)">咨询
                        </mu-button>
                    </div>
                </div>
                <mu-card-media :title="instObj.instName" :sub-title="instObj.instName">
                    <img src="../../assets/Ins/bus.jpg">
                </mu-card-media>
                <mu-card-title :title="instObj.instName" sub-title="介绍"></mu-card-title>
                <mu-card-text style="flex: 1;">
                    {{ instObj.description }}
                </mu-card-text>
                <mu-card-actions>
                    <mu-button @click="handleJoin()" color="success" style="margin:0 1rem 1rem 0.5rem">加入机构</mu-button>
                    <mu-button color="error">退出机构</mu-button>
                </mu-card-actions>
            </mu-card>
        </div>
        <div class="inst-resource" v-else>
            <mu-paper v-for="item in instResourceList" :key="item.id" class="inst-card" :z-depth="3"
                @click="openFile(item.storeName)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <!-- <avatar :instId="item.id">我是图片</avatar> -->
                    </div>
                    <div>
                        <div class="inst-name">
                            {{ item.filename }}
                        </div>
                        <div class="ins-description">
                            {{ item.description }}
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
    name: 'instHome',
    props: ['id'],
    async created() {
        let res = await this.$http.get(`/inst/${this.id}`)
        // console.log('res', res);
        this.instObj = res.data.data
        res = await this.$http.get(`/file/list/${this.id}`)
        console.log('res', res)
        this.instResourceList = res.data.data
    },
    data() {
        return {
            instObj: {},
            tabValue: 0,
            instResourceList: []
        }
    },
    methods: {
        async openFile(storeName) {
            console.log(storeName.substr(-3, 3));

            if (storeName.substr(-3, 3) === 'pdf') {
                this.$router.push(`/pdf-file/${storeName}`)
            }
            else if (storeName.substr(-3, 3) === 'mp4') {
                this.$router.push(`/video-file/${storeName}`)
            }
        },
        async handleJoin() {
            // Vuex取得用户信息，发送申请请求
            const res = await this.$http.post(`/inst/stu/apply/${this.userInfo.id}/${this.instObj.id}`)
            this.$toast.success('申请成功');
        }
    },

    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 10;
}

.tab {
    position: sticky;
    top: 3.5rem;
    z-index: 10;
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
</style>