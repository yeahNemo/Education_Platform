<template>
    <div class="m-vue-pdf">
        <div class="u-page" v-show="loaded">
            {{ currentPage }}/{{ totalCount }}
        </div>
        <Pdf :src="pdfUrl" :page="currentPage" @num-pages="totalCount = $event" @page-loaded="currentPage = $event"
            @loaded="loadPdfHandler" />
    </div>
</template>
<script>
import Pdf from 'vue-pdf'
export default {
    props: ['storeName'],
    name: 'VuePdfPaging',
    components: {
        Pdf
    },
    data() {
        return {
            loaded: false,
            rootSize: 0,
            startx: 0,
            starty: 0,
            endx: 0,
            endy: 0,
            currentPage: 1, // pdf文件页码
            totalCount: 0, // pdf文件总页数
            // 可引入网络文件或者本地文件
            pdfUrl: `http://localhost:8081/file/get/${this.storeName}` // 如果引入本地pdf文件，需要将pdf放在public文件夹下，引用时使用绝对路径（/：表示public文件夹）
        }
    },
    created() {
        var docEl = window.document.documentElement // 即<html></html>标签
        var width = window.screen.availWidth || window.screen.width
        this.rootSize = width / 15 // 设置rem相对单位大小
        docEl.style.fontSize = this.rootSize + 'px'
    },
    mounted() {
        document.body.addEventListener('touchmove', this.touchMove, { passive: false }) // 禁用H5页面的下拉刷新
        document.body.addEventListener('touchstart', this.touchStart, false) // true: 表示在捕获阶段调用事件处理程序；false：表示在冒泡阶段调用事件处理程序
        document.body.addEventListener('touchend', this.touchEnd, false)
    },
    methods: {
        touchMove(e) {
            e.preventDefault()
            this.$once('hook:beforeDestroy', function () {
                removeEventListener('touchmove', this.touchMove)
            })
        },
        touchStart(e) {
            // console.log('start:', e)
            this.startx = e.touches[0].pageX
            this.starty = e.touches[0].pageY
            // console.log('start:', this.startx, this.starty)
            this.$once('hook:beforeDestroy', function () {
                removeEventListener('touchstart', this.touchStart)
            })
        },
        touchEnd(e) {
            // console.log('end:', e)
            this.endx = e.changedTouches[0].pageX
            this.endy = e.changedTouches[0].pageY
            // console.log('end:', this.endx, this.endy)
            // y方向上（或x方向上）滑动超过50px进行翻页
            if ((this.starty - this.endy) / this.rootSize > 5 || (this.startx - this.endx) / this.rootSize > 5) {
                this.nextPage()
            }
            if ((this.endy - this.starty) / this.rootSize > 5 || (this.endx - this.startx) / this.rootSize > 5) {
                this.prePage()
            }
            this.$once('hook:beforeDestroy', function () {
                removeEventListener('touchend', this.touchEnd)
            })
        },
        prePage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        nextPage() {
            if (this.currentPage < this.totalCount) {
                this.currentPage++
            }
        },
        // pdf加载时
        loadPdfHandler(e) {
            this.currentPage = 1 // 加载的时候先加载第一页
            this.loaded = true
        }
    }
}
</script>
<style lang="less" scoped>
.m-vue-pdf {
    overflow: hidden;

    .u-page {
        position: fixed;
        left: 0.5rem;
        top: 1rem;
        z-index: 999;
        font-size: 1rem;
        color: #FFF;
        padding: 0.2rem 0.8rem;
        border-radius: 0.64rem;
        background: rgba(0, 0, 0, 0.5);
        letter-spacing: 0.1rem;
    }
}
</style>