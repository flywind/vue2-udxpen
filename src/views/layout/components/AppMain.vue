<template>
  <section class="app-main">
		<keep-alive :include="cachedViews">
			<router-view :key="key"/>
		</keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*110 = navbar + tags-view = 60 +50 */
  min-height: calc(100vh - 110px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #edf1f5;
  padding:20px;
}
</style>

