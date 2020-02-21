<template>
  <div class="counter">
    <span @click="reduce">-</span>
    <input type="number"
           v-model="countValue">
    <span @click="add">+</span>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      countValue: this.count,
    };
  },
  watch: {
    countValue() {
      this.$emit('onChange', this.index, this.countValue);
    },
  },
  methods: {
    add() {
      this.countValue += 1;
    },
    reduce() {
      if (this.countValue > 0) {
        this.countValue -= 1;
      }
    },
  },
};
</script>

<style scoped>
  .counter span {
    display: inline-block;
    width: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    float: left;
  }
  .counter input {
    float: left;
    width: 2rem;
    height: 1.2rem;
    text-align: center;
    margin: 0 0.2rem;
    font-size: 0.8rem;
    background-color: #f5f5f5;
    border: 0;
  }
</style>
