<template>
    <!-- <iframe src="Home/home.html" frameborder="0" style="width:100vw; height:100vh"></iframe> -->
    <div class="body">
        <header>
            <a href="#" class="logo">Logo</a>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Service</a></li>
                <li><a href="#">Protfolio</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </header>
        <div class="center-text">
            <div class="text-large">
                <h1>交运通：线上教学</h1>
            </div>
            <hr class="hr-light" style="width: 50rem">
            <div class="text-md">
                <h2>精选的网络教学平台</h2>
            </div>
            <div class="button-container">
                <router-link to="/login">
                    <button type="button" class="btn btn-outline-white font-weight-bold rounded-lg">点击登录</button>
                </router-link>
            </div>
            <div>

            </div>
        </div>
        <section class="banner">
            <div class="warp-mask">

            </div>

        </section>
    </div>
</template>

<script>
export default {
    created() {
    },

}
</script>

<style scoped>
.button-container {
    margin-left: 15rem;
    margin-top: 3rem;
    font-weight: bold;
}

.btn {
    margin: .375rem;
    color: inherit;
    text-transform: uppercase;
    word-wrap: break-word;
    white-space: normal;
    cursor: pointer;
    border: 0;
    border-radius: .125rem;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    padding: .84rem 2.14rem;
    font-size: .90rem
}

.btn-outline-white {
    color: #fff !important;
    background-color: transparent !important;
    border: 2px solid #fff !important;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.hr-light {
    border-top: 0px solid #fff;
    margin-left: -3.125rem;
}

.text-large {
    font-size: 2.5rem;
    letter-spacing: 0.4rem;
}

.text-md {
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
    margin-left: 11rem;
    margin-top: 0.5rem;
}

.center-text {
    position: fixed;
    top: 36%;
    left: 50%;
    margin-left: -350px;
    z-index: 10;
    color: #fff;
}

.body {
    background-color: #000;
    min-height: 100vh;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.6s;
    padding: 40px 100px;
    z-index: 100;
}

.sticky {
    height: 1000px;
}

header .logo {
    position: relative;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.6s;
}

header ul {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

header ul li {
    position: relative;
    list-style: none;
}

header ul li a {
    position: relative;
    margin: 0 15px;
    text-decoration: none;
    color: #fff;
    letter-spacing: 1px;
    font-weight: 500;
    transition: 0.6s;
}

.banner {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('@/assets/Home/img2.jpg');
    background-size: cover;
}

.warp-mask {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .7);
}
</style>