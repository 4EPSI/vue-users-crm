<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">Users CRM</div>
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
        { name: 'Users', path: '/users' }
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
