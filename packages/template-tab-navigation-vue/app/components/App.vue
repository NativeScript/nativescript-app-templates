<template>
    <TabView androidTabsPosition="bottom">
        <TabViewItem title="Home">
            <Frame id="items">
                <Items />
            </Frame>
        </TabViewItem>

        <TabViewItem title="Browse">
            <Frame id="browse">
                <Browse />
            </Frame>
        </TabViewItem>

        <TabViewItem title="Search">
            <Frame id="search">
                <Search />
            </Frame>
        </TabViewItem>
    </TabView>
</template>

<script>
  import Items from './Items.vue'
  import Browse from './Browse.vue'
  import Search from './Search.vue'

  export default {
    components: {
      Items,
      Browse,
      Search
    }
  }
</script>
