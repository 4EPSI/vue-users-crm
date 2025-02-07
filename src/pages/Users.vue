<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th @click="sort('name')">Name</th>
              <th @click="sort('age')">Age</th>
              <th @click="sort('gender')">Gender</th>
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
        <p>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</p>
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
      currentSortDir: 'asc'
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
      });
    }
  },

  methods: {
    sort(event) {
      if(event === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.currentSort = event
        this.currentSortDir = 'asc'
      }
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
</style>