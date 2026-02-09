<template>
  <Page>
    <ActionBar>
      <Label text="Home" class="font-bold text-lg"/>
    </ActionBar>

    <GridLayout>
      <Label class="text-xl align-middle text-center text-gray-500" :text="message" @tap="logMessage" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  export default {
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    },

    methods: {
      logMessage() {
        console.log('You have tapped the message!')
      }
    }
  };
</script>
