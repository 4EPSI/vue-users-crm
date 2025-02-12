<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>

        <search 
          :value="search" 
          @search="search = $event"
          placeholder="type username..." 
        />
    
        <button v-if="!repos" @click="getRepos" class="btn btnPrimary">Search!</button>
        <button v-else @click="getRepos" class="btn btnPrimary">Search Again!</button>
  
        <div v-if="repos || loading" class="wrapper__repos">
  
          <preloader v-if="loading" :width="90" :height="90" />
  
          <div v-for="repo in repos" :key="repo.id" class="repos-item">
            <div class="repos-info">
              <a :href="repo.html_url" target="_blank" class="link">{{ repo.name }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import search from '@/components/Search.vue'
import preloader from '@/components/UI/Preloader.vue'
export default {
  components: {
    search,
    preloader
  },
  data() {
    return {
      search: '',
      loading: false,
      error: null,
      repos: null
    }
  },
  // mounted() {
  //   this.getRepos()
  // },
  methods: {
    async getRepos() {
      // console.log(`get user ${this.search} repos`)
      if(!this.search.trim()) return

      this.loading = true;
      this.repos = null

      try {
        const response = await axios.get(`https://api.github.com/users/${this.search}/repos`)
        this.repos = response.data
        this.error = null
      } catch(error) {
        console.error('error in getRepos', error)
        this.repos = null
        this.error = 'Can`t find this user'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  margin-top: 40px;
}
.wrapper__repos {
  width: 400px;
  margin: 30px 0;
}
.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}
.error {
  color: red;
  margin-bottom: 20px;
}
:deep(.preloader) {
  display: flex;
}
</style>