<template>
    <div>
        <h3>List status(Loading)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="loading"></xy-list-status>
        </div>
        <h3>List status(Nomore)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="nomore"></xy-list-status>
        </div>
        <h3>List status(Slot loading)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="loading">
                <div slot="loading">loading</div>
            </xy-list-status>
        </div>
        <h3>List status(Slot empty)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="empty">
                <div slot="empty">empty</div>
            </xy-list-status>
        </div>
        <h3>List status(Slot nomore)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="nomore">
                <div slot="nomore">nomore</div>
            </xy-list-status>
        </div>
        <h3>List status(Empty 100vh from bottom default)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status status="empty"></xy-list-status>
        </div>
        <h3>List status(Empty with 50vh from bottom)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <xy-list-status
                status="empty"
                bottom="50vh"
            ></xy-list-status>
        </div>
        <h3>List status(Empty inner with top content)</h3>
        
        <div style="box-shadow:0 0 0 1px red inset;">
            <div style="height:30vh;background:rgba(0,255,0,0.2);">Top content</div>
            <xy-list-status status="empty"></xy-list-status>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
}
</style>
