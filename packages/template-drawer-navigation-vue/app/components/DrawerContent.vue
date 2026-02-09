<template>
    <GridLayout rows="auto, *">
        <StackLayout row="0" class="p-4 bg-gray-100">
            <Image class="fas text-4xl text-gray-500 text-center" src.decode="font://&#xf2bd;"/>
            <Label class="text-lg font-bold text-center" text="User Name"/>
            <Label class="text-sm text-gray-500 text-center" text="username@mail.com"/>
        </StackLayout>

        <ScrollView row="1">
            <StackLayout>
                <GridLayout columns="auto, *" class="p-4"
                            :class="{ 'bg-gray-200': selectedPage === 'Home' }"
                            @tap="onNavigationItemTap(Home, 'Home')">
                    <Label col="0" text.decode="&#xf015;" class="fas text-lg w-8"/>
                    <Label col="1" text="Home" class="text-base"/>
                </GridLayout>

                <GridLayout columns="auto, *" class="p-4"
                            :class="{ 'bg-gray-200': selectedPage === 'Browse' }"
                            @tap="onNavigationItemTap(Browse, 'Browse')">
                    <Label col="0" text.decode="&#xf1ea;" class="far text-lg w-8"/>
                    <Label col="1" text="Browse" class="text-base"/>
                </GridLayout>

                <GridLayout columns="auto, *" class="p-4"
                            :class="{ 'bg-gray-200': selectedPage === 'Search' }"
                            @tap="onNavigationItemTap(Search, 'Search')">
                    <Label col="0" text.decode="&#xf002;" class="fas text-lg w-8"/>
                    <Label col="1" text="Search" class="text-base"/>
                </GridLayout>

                <GridLayout columns="auto, *" class="p-4"
                            :class="{ 'bg-gray-200': selectedPage === 'Featured' }"
                            @tap="onNavigationItemTap(Featured, 'Featured')">
                    <Label col="0" text.decode="&#xf005;" class="fas text-lg w-8"/>
                    <Label col="1" text="Featured" class="text-base"/>
                </GridLayout>

                <StackLayout class="border-b border-gray-300 my-2"/>

                <GridLayout columns="auto, *" class="p-4"
                            :class="{ 'bg-gray-200': selectedPage === 'Settings' }"
                            @tap="onNavigationItemTap(Settings, 'Settings')">
                    <Label col="0" text.decode="&#xf013;" class="fas text-lg w-8"/>
                    <Label col="1" text="Settings" class="text-base"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import { $navigateTo } from 'nativescript-vue'
  import * as utils from '~/shared/utils'
  import Home from './Home.vue'
  import Browse from './Browse.vue'
  import Featured from './Featured.vue'
  import Search from './Search.vue'
  import Settings from './Settings.vue'

  export default {
    data() {
      return {
        selectedPage: 'Home'
      }
    },
    methods: {
      onNavigationItemTap(component, pageName) {
        this.selectedPage = pageName
        $navigateTo(component, {
          clearHistory: true
        })
        utils.closeDrawer()
      }
    }
  }
</script>
