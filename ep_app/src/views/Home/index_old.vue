<template>
    <div style="display: flex;flex-direction: column;">
        <mu-tabs :value.sync="active" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
            indicator-color="lightBlue800" class="header">
            <mu-tab>资料</mu-tab>
            <mu-tab>机构</mu-tab>
        </mu-tabs>
        <div v-if="active == 1" class="ins-list">
            <mu-paper v-for="inst in insList" :key="inst.id" class="ins-card" :z-depth="3" @click="routeTo(inst.id)">
                <div style="display: flex; flex-direction: row;">
                    <div style="margin-right: 0.5rem; overflow: hidden;">
                        <avatar :instId="inst.id"></avatar>
                    </div>
                    <div>
                        <div class="ins-name">
                            {{ inst.instName }}
                        </div>
                        <div class="ins-description">
                            {{ typeList[inst.typeId].name }}
                        </div>
                    </div>
                </div>
            </mu-paper>
        </div>
        <div v-else>
            <h1>这里是共享资料</h1>
            <video id="myVideo" class="video-js">
                <source :src="require('D:\\education_platform\\video.mp4')" type="video/mp4" />
            </video>
        </div>
    </div>
</template>

<script>
import avatar from '@/components/avatar.vue'
export default {
    components: { avatar },
    async created() {
        this.$http.get('/inst/all?keyword=&pageSize=&pageNum=').then(
            res => {
                this.insList = res.data.data.list
            }
        )
        const res = await this.$http.get('/inst/type/listAll')
        this.typeList = res.data.data
        console.log('type', this.typeList)
        // 播放器实例化
        this.getVideo()

    },
    methods: {
        routeTo(instId) {
            this.$router.push(`/ins-home/${instId}`)
        },
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
    },
    data() {
        return {
            active: 0,
            insList: [],
            typeList: []
        }
    },
}
</script>

<style scoped>
.ins-name {
    font-size: 1rem;
}

.ins-list {
    /* background-color: white; */
    flex-grow: 1;
    margin-bottom: 3.5rem;
}

.ins-card {
    font-size: 12px;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 1rem 1rem;
    height: auto;
    max-height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.header {
    position: sticky;
    top: 0;
    background-color: white;
}
</style>