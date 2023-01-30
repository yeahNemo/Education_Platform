<template>
    <div v-if="url">
        <img class="main" :src="url">
    </div>
    <div v-else>
        <img class="main" src="../assets/Ins/inst-default-avatar.png">
    </div>
</template>

<script>
export default {
    props: ['instId'],
    created() {
        this.$http.get(`/inst/icon/${this.instId}`).then(res => {
            this.url = 'data:image/gif;base64,' + res.data.data
        }).catch(e => {

        })

    },
    data() {
        return {
            url: ''
        }
    },
}
</script>

<style scoped>
.main {
    overflow: hidden;
    height: 3rem;
    width: 3rem;
    border-radius: 5px;
    margin-top: 0.3rem;
}
</style>