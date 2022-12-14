<template>
    <div>
        <div>
            <mu-appbar style="width: 100%;" title="交运通" color="primary" z-depth="0"></mu-appbar>
        </div>
        <div class="main">

        </div>
        <router-view></router-view>
        <div class="footer">
            <mu-bottom-nav>
                <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main {
    min-height: 100%;
    margin-bottom: 3.5rem;
}

.footer {
    margin-top: 50px;
}
</style>