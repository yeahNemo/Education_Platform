<template>
    <div class="update-photo">
        <img :src="img" alt="" class="img" ref="img">
        <div class="tool-bar">
            <div class="cancel-btn" @click="$emit('close')">取消</div>
            <div class="confirm-btn" @click="confirm">完成</div>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import postFormData from '@/utils/postFormData'
import { mapState } from 'vuex'
import { successMsg } from '@/utils/message'
export default {
    name: 'UpdatePhoto',
    created() {

    },
    props: {
        img: {
            type: [String, Object],
            required: true
        },
        fileName: {
            type: [String],
            required: true
        }
    },
    data() {
        return {
            cropper: null,
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        confirm() {
            this.cropper.getCroppedCanvas().toBlob(blob => {
                console.log(blob);
                // 调用后端API上传文件，返回src赋予后展示头像
                let formData = new FormData()
                formData.append('file', blob, this.fileName)
                postFormData(`http://localhost:8081/ums/upload/icon/${this.userInfo.id}`, formData).then(
                    res => {
                        console.log('postFormData', res);
                        successMsg(res.data.message)
                        this.$emit('closePop')
                    }
                )
            })
        }
    },
    mounted() {
        // console.log('mounted');
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true,
        });

    },
}
</script>

<style scoped lang="less">
.update-photo {
    margin-top: 50%;

    .img {
        display: block;
        max-height: 100%;
        max-width: 100%;
    }

    .tool-bar {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        color: white;
        display: flex;
        justify-content: space-between;

        .cancel-btn,
        .confirm-btn {
            font-size: 1rem;
            padding: 1rem 1rem;
        }
    }
}
</style>