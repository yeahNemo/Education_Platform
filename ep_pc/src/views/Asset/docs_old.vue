<template>
  <div>
    <h1>文档上传</h1>
    <div>
      <el-form :model="model" label-width="5rem">
        <el-form-item label="类型" prop="type">
          <el-input v-model="model.type"></el-input>
        </el-form-item>
        <el-form-item label="文件名" prop="filename">
          <el-input v-model="model.filename"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="description">
          <el-input v-model="model.description"></el-input>
        </el-form-item>
        <el-form-item label="上传">
          <el-upload ref="uploadDom" action="string" :http-request="uploaderSubmit" :auto-upload="false"
            class="upload-demo" :on-success="upFile" name="files" accept=".pdf,.doc" :on-preview="handlePreview"
            :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
            :file-list="fileList" :on-change="handleChange">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: start;">
          <el-button @click="submitForm" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      model: {
        type: '',
        filename: '',
        description: ''
      },
      fileList: [],
      fileToUpload: ''
    }
  },
  methods: {
    handleChange(file, fileList) {
      console.log('handleChange');
      this.fileToUpload = file
    },
    uploaderSubmit() {
      let formData = new FormData()
      formData.append('file', this.fileToUpload)
      // this.$http.post(`/file/upload?type=${this.model.type}&filename=${this.model.filename}&description=${this.model.description}`, this.fileList[0])
      axios({
        url: 'http://localhost:8081/file/upload',
        method: 'post',
        data: formData, // data中的参数是通过body传参
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: { type: this.model.type, filename: this.model.filename, description: this.model.description } // params中的参数是通过地址栏传参
      }).then(res => {
        console.log(res)
      })
    },
    upFile() {
      this.$message.success('上传成功');
    },
    submitForm() {
      this.$refs.uploadDom.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style>

</style>