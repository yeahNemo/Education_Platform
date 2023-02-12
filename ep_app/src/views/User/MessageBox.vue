<template>

    <div>
        <div>
            <mu-appbar style="width: 100%;" title="收件箱" color="primary" z-depth="3">
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            <mu-list>
                <mu-list-item @click="showMsg(item)" v-for="item in msgList" :key="item.id" button :ripple="true">
                    <mu-list-item-title>{{ item.title }}</mu-list-item-title>
                    <div v-if="item.readed === 0" class="nemo-status-point" style=" background-color:#409EFF" />
                </mu-list-item>
            </mu-list>
        </div>
        <div>
            <mu-dialog :title="selectedItem.title" width="360" :open.sync="msgDialogVisible">
                <span v-html="selectedItem.content"></span>
                <mu-button slot="actions" flat color="primary" @click="handleConfirm">确认</mu-button>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'MessageBox',
    async mounted() {
        // const res = await this.$http.get(`/inst/message-box/${this.userInfo.id}`)
        // this.msgList = res.data.data
        this.msgList = this.userMessageBox
    },
    data() {

        return {
            msgList: [],
            msgDialogVisible: false,
            selectedItem: {
                title: '',
                content: ''
            }
        }
    },
    methods: {
        async handleConfirm() {
            // 设置已读
            let res = await this.$http.get(`/inst/message/${this.selectedItem.id}`)
            // 重新请求messageBox以更新
            res = await this.$http.get(`/inst/message-box/${this.userInfo.id}`)
            this.$store.commit('setUserMessageBox', res.data.data)
            this.msgList = this.userMessageBox
            this.msgDialogVisible = false
        },
        showMsg(msg) {
            this.selectedItem = msg
            this.msgDialogVisible = true
        }
    },
    computed: {
        ...mapState(['userInfo', 'userMessageBox'])
    }
}
</script>

<style scoped>
.nemo-status-point {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin-right: 1rem;
}
</style>