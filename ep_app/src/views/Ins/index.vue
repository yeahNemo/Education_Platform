<template>
    <div>
        <div class="header">
            <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click="$router.back()">
                    <svg t="1673361192767" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1165" width="300" height="300">
                        <path d="M669.44 285.44L442.88 512l226.56 226.56-58.88 58.88L325.12 512l285.44-285.44z"
                            fill="#ffffff" p-id="1166"></path>
                    </svg>
                </mu-button>
                机构信息
            </mu-appbar>
        </div>
        <mu-card style="width: 100%; margin: 0 auto;">
            <mu-row>
                <mu-card-header :title="insObj.name" :sub-title="insObj.num">
                    <mu-avatar slot="avatar">
                        <img src="../../assets/Ins/bus.jpg">
                    </mu-avatar>
                </mu-card-header>
                <div>
                    <mu-button style="margin-top:1rem" color="info"
                        @click="$router.push(`/ins-chat/${insObj.id}`)">咨询</mu-button>
                </div>
            </mu-row>
            <mu-card-media :title="insObj.name" :sub-title="insObj.name">
                <img src="../../assets/Ins/bus.jpg">
            </mu-card-media>
            <mu-card-title :title="insObj.name" sub-title="介绍"></mu-card-title>
            <mu-card-text>
                公共汽车的概念系由公共马车（Omnibus）发展而来。虽然在1662年的法国巴黎，就有类似公共马车（Omnibus）的运输服务“五索尔马车”出现，一度颇受大众欢迎，然而由于巴黎议会颁布的法令不允许“士兵、随从、仆人和其他劳动者”使用这项服务以及车资涨价，使得“五索尔马车”在15年后便走入历史。而公共马车（Omnibus）变得普及则是1820年代的事。
                1824年，英国道路收费站管理人John Greenwood，在曼彻斯特（Manchester）与彭德尔顿（Pendleton）经营公共马车（Omnibus）服务，驾驶人应乘客请求随时让乘客上下车。
                1826年，法国退休军官 Stanislas Baudry
                在法国西北部的南特（Nantes）市郊开办磨面坊，将蒸汽机排出的热水供人洗澡而兴建公众浴场，并提供南特市中心与公众浴场之间的接驳马车服务。当他发现有些市民利用他的接驳马车作为移动手段，但并非前往他开设的公众浴场，他开始将接驳马车事业化，成立企业提供公共马车（Omnibus）服务。
                1829年7月4日，世界第一辆校车的制造商，英国人George Shillibeer的公共马车（Omnibus）出现于伦敦街头，他开设了帕丁顿与英格兰银行之间的路线，并于沿线设新路（New
                Road）、萨默斯镇（Somers Towns）与市路（City Rd）等停靠站，每日每个方向4班。不到十年，这一服务在法国、英国及美国东岸各大城市（如巴黎、里昂、伦敦、纽约）得到普及。
                在公共马车（Omnibus）普及化后，蒸气式公共汽车（Steam
                buses）与无轨电车（Trolleybuses）陆续问世。19世纪末至20世纪初，引擎（发动机）技术逐渐成熟，平治于1895年做出第一辆以内燃机驱动的公共汽车Benz Omnibus。
                大部分公共汽车仍以汽油、柴油引擎为动力。近年有些国家开始研发使用液化石油气、压缩天然气，油电复合动力和纯电力驱动的公共汽车。
            </mu-card-text>
            <mu-card-actions>
                <mu-button @click="handleJoin()" color="success" style="margin:0 1rem 1rem 0.5rem">加入机构</mu-button>
                <mu-button color="error">退出机构</mu-button>
            </mu-card-actions>
        </mu-card>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: ['id'],
    data() {
        return {
            insObj: {
                id: 0,
                name: '城市公交机构',
                num: '当前人数：100'
            }

        }
    },
    methods: {
        async handleJoin() {
            // Vuex取得用户信息，发送申请请求
            const res = await this.$http.post(`/inst/stu/apply/${this.userInfo.id}/${this.insObj.id}`)
            this.$toast.success('申请成功');
        }
    },

    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>