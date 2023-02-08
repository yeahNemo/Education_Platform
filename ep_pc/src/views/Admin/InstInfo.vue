<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="机构信息">
                <SingleInstInfo :instId="instId"></SingleInstInfo>
            </el-tab-pane>
            <el-tab-pane label="机构学员">
                <StudentList :instId="instId"></StudentList>
            </el-tab-pane>
            <el-tab-pane label="学员申请">
                <StudentApply :instId="instId"></StudentApply>
            </el-tab-pane>
            <el-tab-pane label="培训计划">
                <Schedule :instId="instId"></Schedule>
            </el-tab-pane>
            <el-tab-pane label="前端咨询">
                <Chat :instId="instId"></Chat>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import SingleInstInfo from './InstCopy/SingleInstInfo.vue';
import StudentList from './InstCopy/StudentList.vue';
import Schedule from './InstCopy/Schedule.vue';
import Chat from './InstCopy/Chat.vue';
import StudentApply from './InstCopy/StudentApply.vue';
export default {
    props: ['instId'],
    components: {
        SingleInstInfo,
        StudentList,
        Schedule,
        Chat,
        StudentApply
    }
}
</script>

<style>

</style>