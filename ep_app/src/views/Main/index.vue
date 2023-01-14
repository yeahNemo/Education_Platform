<template>
    <div style="height:100%">
        <div>
            <mu-appbar style="width: 100%;" title="交运通" color="primary" z-depth="0"></mu-appbar>
        </div>
        <router-view></router-view>
        <div class="footer">
            <mu-bottom-nav>
                <mu-bottom-nav-item title="首页" icon="home" to="/main/home"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="课程" icon="book"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="我的" icon="account_circle" to="/main/user"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },

}
</script>

<style scoped>
.footer {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>