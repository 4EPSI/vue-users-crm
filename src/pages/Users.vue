<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')">Gender &#8595;</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in sortedUsers" :key="user.id">
              <td>
                <img :src="user.picture.large" :alt="user.name.first">
                <span>{{ user.name.first }}</span>
              </td>
              <td>{{ user.dob.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center;">
          <span>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</span>
          <p>page: {{ this.page.current }}, length: {{ this.page.length }}</p>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="button-list">
          <div @click="prevPage" class="btn btnPrimary"> &#x2190; </div>
          <div @click="nextPage" class="btn btnPrimary"> &#8594; </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }
    }
  },
  created() {
    axios
      .get('https://randomuser.me/api/?results=20')
      .then(response => {
        this.users = response.data.results
        console.log(response.data.results)
      })
      .catch(error => {
        console.error(error)
      })
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) => {
        let modifier = this.currentSortDir === 'desc' ? -1 : 1;

        const valueMap = {
          name: a => a.name.first,
          age: a => a.dob.age,
          gender: a => a.gender
        };

        let aValue = valueMap[this.currentSort] ? valueMap[this.currentSort](a) : a[this.currentSort];
        let bValue = valueMap[this.currentSort] ? valueMap[this.currentSort](b) : b[this.currentSort];

        return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * modifier;
      }).filter((row, index) => {
        let start = (this.page.current - 1) * this.page.length;
        let end = this.page.current * this.page.length;
        if(index >= start && index < end) return true
      });
    },
  },

  methods: {
    sort(event) {
      if(event === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.currentSort = event
        this.currentSortDir = 'asc'
      }
    },
    prevPage() {
      if(this.page.current > 1) this.page.current--
      // this.page.current > 1 ? this.page.current-- : null
    },
    nextPage() {
      if(this.page.current * this.page.length < this.users.length) {
        this.page.current++
      }
      // this.page.current < this.page.total ? this.page.current++ : null
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}
.button-list {
  width: 100%;
  text-align: center;

  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
}
</style>