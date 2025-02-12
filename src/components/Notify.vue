<template>
  <div>
    <table>
      <transition-group name="list" tag="tbody">
        <tr v-for="message in messages" :key="message.title">
          <td><span>{{ message.title }}</span></td>
        </tr>
      </transition-group>
  
    </table>
    <button 
      class="btn btnPrimary"
      @click="loadMore" 
      :disabled="maxLength === 0"
      :class="{ btnDisabled: maxLength === 0 }"
      >
        Load more
    </button>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  computed: {
    maxLength() {
      return this.$store.getters.getMessageFilter.length
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
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  &.btnDisabled {
    cursor: not-allowed;
    opacity: .6;
  }
}
</style>