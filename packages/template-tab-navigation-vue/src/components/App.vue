<template lang="html">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Home"></Label>
                <Image src.decode="font://&#xf015;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Browse"></Label>
                <Image src.decode="font://&#xf1ea;" class="far t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Search"></Label>
                <Image src.decode="font://&#xf002;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame id="items">
                <Items/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="browse">
                <Browse/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="search">
                <Search/>
            </Frame>
        </TabContentItem>

    </BottomNavigation>
</template>

<script>
  import Items from "./Items.vue";
  import Browse from "./Browse.vue";
  import Search from "./Search.vue";

  export default {
    components: {
      Items,
      Browse,
      Search
    }
  };
</script>

<style lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
