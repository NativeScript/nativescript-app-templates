<template lang="html">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem>
                <Label text="Home"></Label>
                <Image src.decode="font://&#xf015;" class="fa t-36"></Image>
            </TabStripItem>
            <TabStripItem>
                <Label text="Browse"></Label>
                <Image src.decode="font://&#xf1ea;" class="fa t-36"></Image>
            </TabStripItem>
            <TabStripItem>
                <Label text="Search"></Label>
                <Image src.decode="font://&#xf002;" class="fa t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame>
                <Items />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Browse />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Search />
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
@import "../app-variables";
// End custom common variables

// Custom styles

</style>
