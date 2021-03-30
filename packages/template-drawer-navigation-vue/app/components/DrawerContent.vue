<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" text="User Name"/>
            <Label class="nt-drawer__header-footnote" text="username@mail.com"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Home)">
                    <Label col="0" text.decode="&#xf015;" class="nt-icon fas"/>
                    <Label col="1" text="Home" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Browse' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Browse)">
                    <Label col="0" text.decode="&#xf1ea;" class="nt-icon far"/>
                    <Label col="1" text="Browse" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Search' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Search)">
                    <Label col="0" text.decode="&#xf002;" class="nt-icon fas"/>
                    <Label col="1" text="Search" class="p-r-10"/>
                </GridLayout>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Featured' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Featured)">
                    <Label col="0" text.decode="&#xf005;" class="nt-icon fas"/>
                    <Label col="1" text="Featured" class="p-r-10"/>
                </GridLayout>

                <StackLayout class="hr"/>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"/>
                    <Label col="1" text="Settings" class="p-r-10"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import Home from "./Home";
  import Browse from "./Browse";
  import Featured from "./Featured";
  import Search from "./Search";
  import Settings from "./Settings";
  import * as utils from "~/shared/utils";
  import { SelectedPageService } from "~/shared/selected-page-service";

  export default {
    mounted() {
      SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage) => this.selectedPage = selectedPage);
    },
    data() {
      return {
        Home: Home,
        Browse: Browse,
        Featured: Featured,
        Search: Search,
        Settings: Settings,
        selectedPage: ""
      };
    },
    components: {
      Home,
      Browse,
      Featured,
      Search,
      Settings
    },
    methods: {
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
      }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
