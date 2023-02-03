<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" title="视频任务" color="primary" z-depth="3">
                <mu-button @click="$router.back()" icon slot="left">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
            </mu-appbar>
        </div>

        <VideoPlayer :src="`http://localhost:8081/file/get/${storeName}`" controls :loop="true" :volume="0.6" />
    </div>
</template>

<script>
// import { VideoPlayer } from '@videojs-player/vue'
// import 'video.js/dist/video-js.css'
export default {
    props: ['storeName'],
    components: {
        VideoPlayer
    }
}

// export default {
//     props: ['storeName'],
//     components: {
//         VideoPlayer
//     },
//     created() {

//     },
//     data() {
//         return {
//             paused: true,
//             learningDuration: {
//                 id: '',
//                 userId: '',
//                 type: '0',
//                 examinationId: '',
//                 finishFlag: '0',
//                 durations: ''
//             },
//             playerOptions: {
//                 playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
//                 autoplay: false, // 如果true,浏览器准备好时开始回放。
//                 muted: false, // 默认情况下将会消除任何音频。
//                 loop: false, // 导致视频一结束就重新开始。
//                 preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
//                 language: 'zh-CN',
//                 aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
//                 fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
//                 sources: [{
//                     // src: '../../static/video/test.mp4', // 路径
//                     src: `http://localhost:8081//file/get/${this.storeName}`
//                     // type: 'video/mp4' // 类型
//                 }],
//                 poster: '../../../static/images/home/cnooc.png', // 你的封面地址
//                 // width: document.documentElement.clientWidth,
//                 notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
//                 controlBar: {
//                     timeDivider: true,
//                     durationDisplay: true,
//                     remainingTimeDisplay: false,
//                     fullscreenToggle: true // 全屏按钮
//                 }
//             }

//         }
//     },
//     methods: {
//     }
// }
</script>

<style>

</style>