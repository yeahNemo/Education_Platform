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
                    NEMO
                </div>
            </mu-row>
            <div>
                <mu-paper class="info-paper" :z-depth="4">
                    公交机构认证学员
                </mu-paper>
            </div>
            <mu-list>
                <mu-list-item button to="/user-edit">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>个人资料</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>机构信息</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>咨询客服</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
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
export default {
    data() {
        return {

        }
    },
    methods: {

    },

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