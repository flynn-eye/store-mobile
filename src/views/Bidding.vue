<template>
    <div>
      <NavigationLayout
        location-title='订单竞标'
        :show-left='true'/>
    </div>
</template>

<script>
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'Bidding',
  components: {
    NavigationLayout,
  },
};
</script>

<style scoped>

</style>
