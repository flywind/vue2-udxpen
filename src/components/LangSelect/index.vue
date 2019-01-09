<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <span>{{curlang}}<i class="el-icon-arrow-down el-icon--right"></i></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    },
		curlang() {
			switch (this.$store.getters.language){
				case 'zh':
					return '中文';
					break;
				case 'en':
					return 'English';
					break;
			}
			return null;
		}
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>

