<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="notify__wrapper">
          <div class="notify-title">
            <p>Notify App</p>
            <img @click="fetchMessages" src="@/assets/img/reload.svg" alt="img">
          </div>

          <div class="notify__content">
            <preloader v-if="loading" :width="90" :height="90" />

            <div v-if="error" class="error">
              <p>{{ error }}</p>
            </div>
            <notify v-if="!loading && !error" :messages="messages" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import notify from '@/components/Notify.vue'
import preloader from '@/components/UI/Preloader.vue';

export default {
  components: {
    notify,
    preloader
  },
  mounted() {
    this.fetchMessages()
  },
  computed: {
    messages() {
      return this.$store.getters.getMessageMain
    },
    error() {
      return this.$store.getters.getError
    },
    loading() {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    fetchMessages() {
      this.$store.dispatch('fetchMessages')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.notify__wrapper {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 22px 0 rgba(0, 0, 0, 0.1);
}

.notify__content {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
}

.notify-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
  p {
    font-size: 24px;
  }
}

.error {
  color: red;
  margin: 20px 0;
}
</style>