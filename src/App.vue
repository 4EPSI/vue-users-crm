<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <router-link class="logo" to="/">Users CRM</router-link>
            <ul class="navbar-list">
              <li v-for="link in links" :key="link.name" class="navbar-item">
                <router-link class="navbar-link" :to="link.path">{{ link.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      links: [
        { name: 'Home', path: '/' },
        { name: 'Users', path: '/users' },
        { name: 'Notify', path: '/notifyPage'},
        { name: 'Github', path: '/github'},
      ]
    }
  }
}
</script>

<style lang="scss">
.navbar-link {
  &.router-link-exact-active {
    color: #5247e7;
  }
}
</style>
