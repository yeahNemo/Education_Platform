<template>
    <div>
        <div>
            <mu-appbar style="width: 100%;" title="个人信息" color="primary" z-depth="3">
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <mu-list>
            <mu-list-item button @click="showBottomSheet = true">
                <mu-list-item-title>头像</mu-list-item-title>
                <mu-list-item-action>
                    <mu-avatar>
                        <img :src="`http://localhost:8081/ums/icon/${this.userInfo.id}`" ref="avatar">
                    </mu-avatar>
                </mu-list-item-action>
            </mu-list-item>
            <!-- <mu-list-item button @click="userNameDialogVisible = true">
                <mu-list-item-title>用户名</mu-list-item-title>
                <mu-list-item-action>
                    {{ userInfo.username }}
                </mu-list-item-action>
            </mu-list-item> -->
            <!-- 修改用户名有风险重名，砍掉了 暂不支持 -->
            <mu-list-item button>
                <mu-list-item-title>用户名</mu-list-item-title>
                <mu-list-item-action>
                    {{ userInfo.username }}
                </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button @click="nickNameDialogVisible = true">
                <mu-list-item-title>昵称</mu-list-item-title>
                <mu-list-item-action>
                    {{ userInfo.nickName }}
                </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>邮箱绑定</mu-list-item-title>
                <mu-list-item-action>
                    {{ userInfo.email }}
                </mu-list-item-action>
            </mu-list-item>
        </mu-list>
        <mu-bottom-sheet :open.sync="showBottomSheet">
            <mu-list @item-click="closeBottomSheet">
                <mu-list-item button @click="$refs.fileInput.click()">
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
        <!-- 上传文件 -->
        <input type="file" hidden @change="onFileChange" ref="fileInput">
        <!-- 弹出层操作头像 -->
        <div v-if="showDialog" class="pop-over">
            <update-photo @closePop="showDialog = false" :img="img" :fileName="fileName"
                @close="showDialog = false"></update-photo>
        </div>
        <!-- 用户名修改 -->
        <mu-dialog title="修改用户名" width="360" scrollable :open.sync="userNameDialogVisible">
            <mu-text-field v-model="newUserName" placeholder="新用户名">
            </mu-text-field>
            <mu-button slot="actions" flat color="primary" @click="changeUserName">提交</mu-button>
        </mu-dialog>
        <!-- 昵称修改 -->
        <mu-dialog title="修改昵称" width="360" scrollable :open.sync="nickNameDialogVisible">
            <mu-text-field v-model="newNickName" placeholder="新昵称">
            </mu-text-field>
            <mu-button slot="actions" flat color="primary" @click="changeNickName">提交</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
import UpdatePhoto from '@/components/UpdatePhoto.vue'
import { successMsg } from '@/utils/message'
import { mapState } from 'vuex'
export default {
    components: { UpdatePhoto },
    async mounted() {
        // const res = await this.$http.get(`/ums/icon/${this.userInfo.id}`)
        // this.$refs.avatar.src = 'http://localhost:8081/ums/icon/3'
    },
    data() {
        return {
            showDialog: false,
            showBottomSheet: false,
            // 预览的头像
            img: '',
            // 文件名
            fileName: 'avatar.jpg',
            newUserName: '',
            newNickName: '',
            userNameDialogVisible: false,
            nickNameDialogVisible: false
        }
    },
    methods: {
        onFileChange() {
            const file = this.$refs.fileInput.files[0]
            this.fileName = file.name
            // 基于文件对象获取 blob 数据
            this.img = window.URL.createObjectURL(file)
            this.showDialog = true
            // 情况value 防止同名文件不走change事件
            this.$refs.fileInput.value = ''
        },
        closeBottomSheet() {
            this.showBottomSheet = false;
        },
        editAvatar() {

        },
        async changeUserName() {
            const res = await this.$http.post(`/ums/update/info/${this.userInfo.id}`, {
                username: this.newUserName
            })
            successMsg('修改成功')
            this.userNameDialogVisible = false
        },
        async changeNickName() {
            const res = await this.$http.post(`/ums/update/info/${this.userInfo.id}`, {
                nickName: this.newNickName
            })
            successMsg('修改成功')
            this.$store.commit('setUserNickName', res.data.data.nickName)
            this.nickNameDialogVisible = false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }

}
</script>

<style scoped>
.pop-over {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: black;
}
</style>