<template>
    <div style="display: flex;flex-direction: column;">
        <mu-tabs :value.sync="active" inverse color="lightBlue800" text-color="rgba(0, 0, 0, .54)" full-width
            indicator-color="lightBlue800" class="header">
            <mu-tab>资料</mu-tab>
            <mu-tab>机构</mu-tab>
        </mu-tabs>
        <div v-if="active == 1" class="ins-list">
            <mu-paper v-for="ins in insList" :key="ins.id" class="ins-card" :z-depth="3" @click="routeTo(ins.id)">
                <div>
                    <div class="ins-name">
                        {{ ins.instName }}
                    </div>
                    <div class="ins-description">
                        {{ ins.description }}
                    </div>
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        await this.$http.get('/inst/all?keyword=&pageSize=&pageNum=').then(
            res => {
                this.insList = res.data.data.list
            }
        )
    },
    methods: {
        routeTo(instId) {
            this.$router.push(`/ins-home/${instId}`)
        }
    },
    data() {
        return {
            active: 0,
            insList: []
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