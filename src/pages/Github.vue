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

          <div class="repos-sort">
            <span @click="sort('name')">
              Name {{ currentSort === 'name' ? (currentSortDir === 'asc' ? '▲' : '▼') : '' }}
            </span>
            <span @click="sort('stargazers_count')">
              Stars {{ currentSort === 'stargazers_count' ? (currentSortDir === 'asc' ? '▲' : '▼') : '' }}
            </span>
          </div>
  
          <div v-for="repo in sortedRepos" :key="repo.id" class="repos-item">
            <!-- <img :src="repo.owner.avatar_url" :alt="repo.owner.login"> -->
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
      repos: null,
      currentSort: 'name',
      currentSortDir: 'asc'
    }
  },
  // mounted() {
  //   this.getRepos()
  // },
  computed: {
    sortedRepos() {
      if (!this.repos) return [];
      
      return [...this.repos].sort((a, b) => {
        let modifier = this.currentSortDir === 'asc' ? 1 : -1;
        let aValue = a[this.currentSort];
        let bValue = b[this.currentSort];

        if (this.currentSort === 'name') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    async getRepos() {
    //  console.log(`get user ${this.search} repos`)
      if(!this.search.trim()) return

      this.loading = true;
      this.repos = null

      try {
        const response = await axios.get(`https://api.github.com/users/${this.search}/repos`)
        this.repos = response.data
        this.error = null
        console.log(this.repos);
        
      } catch(error) {
        console.error('error in getRepos', error)
        this.repos = null
        this.error = 'Can`t find this user'
      } finally {
        this.loading = false
      }
    },
    sort(sort) {
      if(sort === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.currentSort = sort
        this.currentSortDir = 'asc'
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
.repos-sort {
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
</style>