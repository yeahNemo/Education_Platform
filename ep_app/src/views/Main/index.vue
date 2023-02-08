<template>
    <div style="height:100%">
        <div>
            <mu-appbar style="width: 100%;" title="交运通" color="primary" z-depth="1">
            </mu-appbar>
        </div>
        <router-view></router-view>
        <div class="footer">
            <mu-bottom-nav :value.sync="active">
                <mu-bottom-nav-item title="首页" icon="home"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="培训" icon="book"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="我的" icon="account_circle"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        if (this.active === 0 && this.$route.path != '/main/home') {
            this.$router.push('/main/home')
        } else if (this.active === 1 && this.$route.path != '/main/course') {
            this.$router.push('/main/course')
        } else if (this.active === 2 && this.$route.path != '/main/user') {
            this.$router.push('/main/user')
        }
    },
    data() {
        return {
            active: 0
        }
    },
    watch: {
        active(newVal) {
            if (newVal === 0) {
                this.$router.push('/main/home')
            } else if (newVal === 1) {
                this.$router.push('/main/course')
            } else if (newVal === 2) {
                this.$router.push('/main/user')
            }
        }
    }
}
</script>

<style scoped>
.footer {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>