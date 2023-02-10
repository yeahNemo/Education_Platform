<template>
    <div class="main-container">
        <div class="main">
            <mu-row class="avatar-name">
                <div class="nemo-avatar">
                    <mu-avatar size="54" color="indigo">
                        <!-- <mu-icon size="40" value="account_circle"></mu-icon> -->
                        <img ref="avatar" :src="`http://120.79.171.132:8081/ums/icon/${this.userInfo.id}`" alt="头像">
                    </mu-avatar>
                </div>
                <div class="user-name">
                    {{ userInfo.username }}
                </div>
            </mu-row>
            <div>
                <mu-paper class="info-paper" :z-depth="4">
                    交运通认证学员
                </mu-paper>
            </div>
            <mu-list>
                <mu-list-item button to="/user-edit">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>个人资料</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button to="/user-message-box">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>收件箱</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="exit">
                    <mu-list-item-action>
                        <svg t="1675879996237" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3470" width="21" height="21">
                            <path
                                d="M1024 448c0 19.2-6.4 32-19.2 44.8l0 0-128 128 0 0C864 633.6 851.2 640 832 640c-38.4 0-64-25.6-64-64 0-19.2 6.4-32 19.2-44.8l0 0L806.4 512 640 512C601.6 512 576 486.4 576 448c0-38.4 25.6-64 64-64l166.4 0-19.2-19.2 0 0C774.4 352 768 339.2 768 320c0-38.4 25.6-64 64-64 19.2 0 32 6.4 44.8 19.2l0 0 128 128 0 0C1017.6 416 1024 428.8 1024 448zM832 128l-128 0L576 128 294.4 128l121.6 70.4 0 0C435.2 211.2 448 230.4 448 256l0 512 64 0 192 0 128 0c38.4 0 64 25.6 64 64s-25.6 64-64 64L512 896 448 896l0 64c0 38.4-25.6 64-64 64-12.8 0-25.6-6.4-32-12.8l0 0-320-192 0 0 0 0c-6.4-6.4-12.8-12.8-19.2-19.2 0 0 0 0 0-6.4C6.4 787.2 0 780.8 0 768L0 64c0-25.6 19.2-51.2 38.4-57.6C44.8 0 57.6 0 64 0l0 0 512 0 256 0c38.4 0 64 25.6 64 64C896 102.4 870.4 128 832 128z"
                                p-id="3471" fill="#8a8a8a"></path>
                        </svg>
                    </mu-list-item-action>
                    <mu-list-item-title>退出登录</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import { mapState } from 'vuex'
export default {
    methods: {
        exit() {
            sessionStorage.clear()
            this.$router.push('/login')
            successMsg('已退出')
            window.location.reload()
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }

}
</script>

<style scoped>
.nemo-avatar {
    margin-right: 1rem;
}

.avatar-name {
    padding: 1.5rem 0 0.5rem 1rem;
}

.user-name {
    font-weight: bold;
    font-size: 1.2rem
}

.main .info-paper {
    font-size: 16px;
    border-radius: 1rem;
    padding: 1.5rem 1.5rem;
    margin: 1rem 1rem;
    font-weight: bold;
    /* background: url('@/assets/User/bg.jpg') no-repeat;
    background-size: cover;
    background-position: 50% 50%; */
}

/* .main-container {
    background: url('@/assets/User/info-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
} */
</style>