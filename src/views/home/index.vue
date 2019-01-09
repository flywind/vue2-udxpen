<template>
  <div class="dashboard-container" style="height:3000px;background-color: #f2f2f2;">
		<router-link to="/work">Hello world</router-link>
   <!-- <component :is="currentRole"/> -->{{roles}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import adminDashboard from './admin'
//import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  //components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
