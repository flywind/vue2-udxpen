<template>
  <div>
		<i :class="{'is-active':isActive}" class="iconfont uxd-list" v-waves @click="toggleClick"></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
i.uxd-list{
	font-size: 18px;
	transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
  cursor: pointer;
}
i.is-active {
  transform: rotate(0deg);
}
</style>
