<template>
    <div class="sample">
        <label v-xy-btn-act:style.scale>scale</label>
        <label v-xy-btn-act:style.color="'rgba(0, 0, 255, 0.2)'">color</label>
        <label
            style="background-color:yellow"
            v-xy-btn-act:style.grayscale
        >grayscale</label>
        <label v-xy-btn-act:style.wave="'rgba(255, 0, 0, 0.5)'">wave</label>
        <label
            v-xy-btn-act:style.scale
            disabled
        >disabled</label>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            status: ''
        }
    },
    methods: {
        onBottom() {
            alert('bottom')
        }
    },
    mounted: function () {
    }
}
</script>

<style lang="scss" scoped>
.sample {
  label {
    padding: 1em 2em;
    border: 1px solid #333;
    margin: 1em;
    display: block;
    text-align: center;
  }
  [xy-btn-act][disabled] {
    filter: grayscale(1);
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
