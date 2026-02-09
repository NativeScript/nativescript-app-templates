<template>
    <Drawer ref="drawer" gesturesEnabled="true">
        <StackLayout ~leftDrawer backgroundColor="#ffffff">
            <DrawerContent />
        </StackLayout>
        <Frame ~mainContent>
            <Home />
        </Frame>
    </Drawer>
</template>

<script>
  import DrawerContent from './DrawerContent.vue'
  import Home from './Home.vue'

  export default {
    components: {
      DrawerContent,
      Home
    }
  }
</script>
