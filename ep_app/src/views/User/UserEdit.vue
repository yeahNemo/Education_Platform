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
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>用户名</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>昵称</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>邮箱绑定</mu-list-item-title>
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
            <update-photo :img="img" @close="showDialog = false"></update-photo>
        </div>
        <!-- dialog组件不是全屏 -->
        <!-- <mu-dialog :open.sync="showDialog">
            <update-photo :img="img"></update-photo>
            <mu-button slot="actions" flat color="primary" @click="showDialog = false">Close</mu-button>
        </mu-dialog> -->
    </div>
</template>

<script>
import UpdatePhoto from '@/components/UpdatePhoto.vue'
export default {
    components: { UpdatePhoto },
    data() {
        return {
            showDialog: false,
            showBottomSheet: false,
            // 预览的头像
            img: ''
        }
    },
    methods: {
        onFileChange() {
            const file = this.$refs.fileInput.files[0]
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

        }
    },

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