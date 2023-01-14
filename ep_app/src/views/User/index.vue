<template>
    <div class="main-container">
        <div class="main">
            <mu-row class="avatar-name">
                <div class="avatar" @click="openBotttomSheet">
                    <mu-avatar size=" 54" color="indigo">
                        <mu-icon size="40" value="account_circle"></mu-icon>
                    </mu-avatar>
                </div>
                <div class="user-name">
                    NEMO
                </div>
            </mu-row>
            <div>
                <mu-paper class="info-paper" :z-depth="6">
                    公交机构认证学员
                </mu-paper>
            </div>
            <mu-list>
                <mu-list-item button to="/main/user-edit">
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
        <mu-bottom-sheet :open.sync="showBottomSheet">
            <mu-list @item-click="closeBottomSheet">
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="image" color="orange"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>相册选取</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="photo_camera" color="blue"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>拍照</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showBottomSheet: false
        }
    },
    methods: {
        closeBottomSheet() {
            this.showBottomSheet = false;
        },
        openBotttomSheet() {
            this.showBottomSheet = true;
        },
        editAvatar() {

        }
    },

}
</script>

<style scoped>
.avatar {
    margin-right: 1rem;
}

.avatar-name {
    padding: 1.5rem 0 0 3rem;
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