<template>
  <Frame>
    <CarList :cars="cars" />
  </Frame>
</template>

<script>
import CarList from './CarList'

export default {
  components: {
    CarList,
  },

  data() {
    return {
      cars: [],
    }
  },
}
</script>
