<template>
    <div class="main-container">
        <div class="main">
            <mu-row class="avatar-name">
                <div class="avatar">
                    <mu-avatar size="54" color="indigo">
                        <!-- <mu-icon size="40" value="account_circle"></mu-icon> -->
                        <img :src="require('D:\\education_platform\\inst.png')" alt="头像">
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
                        <mu-icon value="drafts"></mu-icon>
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
    data() {
        return {

        }
    },
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
.avatar {
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