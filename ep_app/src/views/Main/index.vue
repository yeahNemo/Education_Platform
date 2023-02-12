<template>
    <div style="height:100%">
        <div>
            <mu-appbar style="width: 100%;" title="交运通" color="primary" z-depth="1">
                <mu-button icon slot="left" @click="reload">
                    <svg t="1676101315949" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2690">
                        <path
                            d="M887.8 394.8H719.3c-21.5 0-38.9-17.4-38.9-38.9s17.4-38.9 38.9-38.9H787c-61-86.2-161.3-142.5-275-142.5-186.1 0-336.9 150.8-336.9 336.9 0 186.1 150.8 336.9 336.9 336.9 186 0 336.9-150.8 336.9-336.9 0-21.5 17.4-38.9 38.9-38.9s38.9 17.4 38.9 38.9C926.7 740.4 741 926 512 926S97.4 740.4 97.4 511.4C97.4 282.4 283 96.8 512 96.8c139 0 261.7 68.5 336.9 173.5v-69.8c0-21.5 17.4-38.9 38.9-38.9s38.9 17.4 38.9 38.9V356c0 21.4-17.5 38.8-38.9 38.8z m0 0"
                            fill="#ffffff" p-id="2691"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
    inject: ['reload'],
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