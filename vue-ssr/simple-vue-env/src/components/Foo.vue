<template>
    <div id="foo" @click="handleClick">This is Foo Component</div>
</template>

<script>
export default {
  methods: {
    handleClick() {
        console.log('你点击了我')
    }
  }
};
</script>
