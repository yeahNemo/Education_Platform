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
        <div class="inst-info" v-show="tabValue === 0">
            <mu-card style="display: flex; flex-direction: column; width: 100%; min-height: inherit">
                <div style="display: flex;">
                    <mu-card-header :title="instObj.instName" sub-title="交运通认证">
                        <mu-avatar :size="50" slot="avatar">
                            <img class="avatar" :src="`http://120.79.171.132:8081/inst/icon/${id}`"
                                :onerror="defaultImg">
                        </mu-avatar>
                    </mu-card-header>
                    <div style="margin: 1rem 0.5rem 0 0">
                        <mu-button style="margin-top:0" color="info" @click="$router.push(`/ins-chat/${instObj.id}`)">咨询
                        </mu-button>
                    </div>
                </div>
                <mu-card-media :title="instObj.instName" :sub-title="instObj.instName">
                    <img :src="require('../../assets/Ins/bus.jpg')">
                </mu-card-media>
                <mu-card-title :title="instObj.instName" sub-title="介绍"></mu-card-title>
                <mu-card-text style="flex: 1;">
                    {{ instObj.description }}
                </mu-card-text>
                <mu-card-actions>
                    <mu-button :disabled="isJoined" @click="handleJoin()" color="success"
                        style="margin:0 1rem 1rem 0.5rem">申请加入</mu-button>
                </mu-card-actions>
            </mu-card>
        </div>
        <div class="inst-resource" v-show="tabValue === 1">
            <mu-paper v-for="item in instResourceList" :key="item.id" class="inst-card" :z-depth="3"
                @click="openFile(item.storeName)">
                <div style="display: flex; flex-direction: row;">
                    <div v-if="isPdf(item.storeName)" style="margin-right: 0.5rem; overflow: hidden;"
                        class="nemo-avatar">
                        <svg t="1675944302664" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2978">
                            <path
                                d="M272 144c-17.673 0-32 14.327-32 32v672c0 17.673 14.327 32 32 32h480c17.673 0 32-14.327 32-32V176c0-17.673-14.327-32-32-32H272z m0-80h480c61.856 0 112 50.144 112 112v672c0 61.856-50.144 112-112 112H272c-61.856 0-112-50.144-112-112V176c0-61.856 50.144-112 112-112z m78 260c-22.091 0-40-17.909-40-40s17.909-40 40-40h324c22.091 0 40 17.909 40 40s-17.909 40-40 40H350z m0 228c-22.091 0-40-17.909-40-40s17.909-40 40-40h324c22.091 0 40 17.909 40 40s-17.909 40-40 40H350z m0 228c-22.091 0-40-17.909-40-40s17.909-40 40-40h184c22.091 0 40 17.909 40 40s-17.909 40-40 40H350z"
                                fill="#333333" p-id="2979"></path>
                        </svg>
                    </div>
                    <div v-else style="margin-right: 0.5rem; overflow: hidden;" class="nemo-avatar">
                        <svg t="1675944484429" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4198">
                            <path
                                d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z"
                                fill="#4D4D4D" p-id="4199"></path>
                            <path d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D"
                                p-id="4200"></path>
                            <path
                                d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z"
                                fill="#4D4D4D" p-id="4201"></path>
                        </svg>
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
import { mapState } from 'vuex';
export default {
    name: 'instHome',
    props: ['id'],
    async created() {
        let res = await this.$http.get(`/inst/${this.id}`)
        // console.log('res', res);
        this.instObj = res.data.data
        res = await this.$http.get(`/file/inst-share-docs/${this.id}`)
        // console.log('res', res)
        this.instResourceList = res.data.data
        this.handleIsJoined()
    },
    data() {
        return {
            instObj: {},
            tabValue: 0,
            instResourceList: [],
            isJoined: false,
            defaultImg: 'this.src="' + require('../../assets/Ins/bus.jpg') + '"' //默认图地址
        }
    },
    methods: {
        isPdf(storeName) {
            if (storeName.substr(-3, 3) === 'pdf') {
                return true
            }
            else if (storeName.substr(-3, 3) === 'mp4') {
                return false
            }
        },
        async handleIsJoined() {
            const res = await this.$http.get(`/inst/stu-apply-state/${this.userInfo.id}/${this.id}`)
            // console.log('isJoined', res);
            this.isJoined = res.data.data
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
        async handleJoin() {
            // Vuex取得用户信息，发送申请请求
            const res = await this.$http.post(`/inst/stu/apply/${this.userInfo.id}/${this.instObj.id}`)
            this.$toast.success('申请成功');
            this.isJoined = true
        }
    },

    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style scoped>
.nemo-avatar {
    overflow: hidden;
    height: 3rem;
    width: 3rem;
    border-radius: 5px;
    margin-top: 0.3rem;
}

.inst-info {
    min-height: 35.2rem;
}

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