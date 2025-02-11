<template>
  <table>
    <transition-group name="list" tag="tbody">
      <tr v-for="message in messages" :key="message.title">
        <td><span>{{ message.title }}</span></td>
      </tr>
    </transition-group>

    <button @click="loadMore" class="btn btnPrimary">Load more</button>
  </table>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('loadMessages')
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  text-align: center;
}
td {
  display: flex;
  justify-content: space-between;
  padding: 12px 6px;
  font-size: 14px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transform: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
button {
  margin-top: 20px;
}
</style>