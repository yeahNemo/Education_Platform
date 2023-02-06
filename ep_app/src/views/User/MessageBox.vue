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
                </mu-list-item>
            </mu-list>
        </div>
        <div>
            <mu-dialog :title="selectedItem.title" width="360" :open.sync="msgDialogVisible">
                <span v-html="selectedItem.content"></span>
                <mu-button slot="actions" flat color="primary" @click="msgDialogVisible = false">确认</mu-button>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    async mounted() {
        const res = await this.$http.get(`/inst/message-box/${this.userInfo.id}`)
        this.msgList = res.data.data
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
        showMsg(msg) {
            this.selectedItem = msg
            this.msgDialogVisible = true
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style>

</style>