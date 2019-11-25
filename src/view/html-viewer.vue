<template>
    <div class="pad">
        <h3>auto iteration, for html content</h3>
        <xy-html-viewer :html="html"></xy-html-viewer>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            html: `<p><img src="http://dummyimage.com/100x100" data-lsrc="http://dummyimage.com/1000x1000">12345
      <img src="http://dummyimage.com/100x200" data-title="100x200">67890
      <img src="http://dummyimage.com/200x100" id="id1">abcdd
      <img src="http://dummyimage.com/300x100" data-id="id2">efghi</p>`
        }
    },
    methods: {
    },
    mounted() {
        // let that = this
        // setTimeout(() => {
        //     that.html = `<p><img src="http://dummyimage.com/100x100" data-lsrc="http://dummyimage.com/1000x1000"></p>`
        // }, 3000)
    }
}
</script>

<style lang="scss">
@import '~@/lib/scss/mixin';

h3 {
  margin: 5px;
}

section {
  display: flex;
  align-items: flex-start;
  background-color: #eee;
  img {
    width: 0;
    flex-grow: 1;
    margin: 5px;
  }
}
</style>
