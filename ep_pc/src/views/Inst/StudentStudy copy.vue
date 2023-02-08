<template>
    <div>
        <h1>学习情况</h1>
        <div>
            统计表
            <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
        console.clear()
    },
    data() {
        return {
            chartSettings: { type: 'pie' },
            chartData: {
                columns: ['key', 'value'],
                rows: [
                    {
                        key: 'Success',
                        value: 20
                    },
                    {
                        key: 'Error',
                        value: 30
                    },
                    {
                        key: 'Skipped',
                        value: 50
                    }
                ]
            }
        };

    },
}
</script>

<style>

</style>