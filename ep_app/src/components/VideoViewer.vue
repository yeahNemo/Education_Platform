<template>
    <div>
        <video id="myVideo" class="video-js">
            <source :src="require('D:\\education_platform\\video.mp4')" type="video/mp4" />
        </video>
    </div>
</template>

<script>
export default {
    props: ['storeName'],
    created() {
        this.getVideo()
    },
    methods: {
        getVideo() {
            this.$nextTick(() => {
                let myPlayer = this.$video(myVideo, {
                    controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。 
                    //poster: CountyCoverUrl,//封面
                    autoplay: 'muted', //自动播放属性,muted:静音播放
                    preload: 'auto', //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    width: "350px",
                    height: "180px"
                });
            })
        }
    }
}
</script>

<style>

</style>