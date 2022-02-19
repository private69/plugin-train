<template>
</template>
<script>
export default {
    mounted() {
        let that = this;
        // 验证是否跳转
        that.$confirm('是否跳转？' ,'提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then( res => {
            that.gotoNewPage();
        })
    },
    methods: {
        // 跳转新页面
        gotoNewPage() {
            let value = (Math.random() * 10000).toFixed() + '';
            window.sessionStorage.setItem("name",value);
            window.localStorage.setItem("name",value);
            console.log(sessionStorage.getItem("name"));
            let newWin = this.$router.resolve({
                name: '/',
                param: {
                    name: value,
                    age: 20
                }
            })
            console.log(newWin);
            window.open(newWin.href,"_blank")
        },
    }
}
</script>
<style lang="sass" scoped>

</style>

