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
        <div class="player">
            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
                @timeupdate="onPlayerTimeupdate($event)" @ready="playerReadied" @ended="onPlayerEnded($event)">
            </video-player>
        </div>
    </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';

export default {
    props: ['storeName', 'recordId'],
    name: "VideoPlayer",
    components: {
        videoPlayer
    },
    data() {
        return {
            timer: null,
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: true, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    src: `http://localhost:8081/file/get/${this.storeName}` //你的视频地址（必填）
                }],
                poster: "", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true
                }
            },
            gk: ""
        }
    },
    methods: {
        // 上传视频进度
        async uploadProgress() {
            if (this.$route.query.recordId) {
                const res = await this.$http.post(`/taskProcess/update`,
                    {
                        finished: 0,
                        id: this.$route.query.recordId,
                        videoProcess: Number(this.gk)
                    })
                console.log('video', res);

            }
        },
        onPlayerPlay(player) {
            // 播放回调
        },
        onPlayerPause(player) {
            // 暂停回调
        },
        onPlayerEnded($event) {
            //播放完成回调
        },
        goFast() {
            //快进
            this.gk += 5;
            this.$refs.videoPlayer.player.currentTime(this.gk)
        },
        goBack() {
            //后退
            this.gk -= 5;
            this.$refs.videoPlayer.player.currentTime(this.gk);
        },
        onPlayerTimeupdate(player) {
            //获取当前播放时间
            this.gk = player.cache_.currentTime;
        },
        playerReadied(player) {
            let taskId = this.$route.query.taskId
            let userId = this.$route.query.userId
            if (userId && taskId) {
                this.$http.get(`/taskProcess/getProcess/${userId}/${taskId}`).then(res => {
                    const currentTime = res.data.data.videoProcess
                    console.log('current', currentTime);
                    player.currentTime(currentTime);
                })
            }
        },
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    watch: {
        gk: function () { }
    },
    mounted() {
        let that = this
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 39) {
                that.goFast()
            }
            if (e.keyCode === 37) {
                that.goBack()
            }
        })
        console.log('recordId', this.$route.query.recordId);
        console.log('taskId', this.$route.query.taskId);
        console.log('recordId', this.$route.query.recordId);
        // 计时器，计时上传进度
        this.timer = setInterval(this.uploadProgress, 3000)

    },
    destroyed() {
        // 清除定时器
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
}
</script>

<style scoped>
.vjs-custom-skin {}
</style>
