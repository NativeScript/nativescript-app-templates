<template>
  <Frame>
    <CarList :cars="cars" />
  </Frame>
</template>

<script>
import CarList from './CarList'
import db from "~/car-rental-export-public.json"

export default {
  components: {
    CarList,
  },

  data() {
    return {
      cars: Object.values(db.cars),
    }
  },
}
</script>
