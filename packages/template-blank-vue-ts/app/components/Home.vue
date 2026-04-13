<template>
    <Frame>
        <Page>
            <ActionBar>
                <Label text="Home"/>
            </ActionBar>

            <GridLayout>
                <Label class="text-xl align-middle text-center text-gray-500" :text="message" />
            </GridLayout>
        </Page>
    </Frame>
</template>

<script setup lang="ts">
  import { computed } from 'nativescript-vue'

  const message = computed(() => "Blank {N}-Vue app");
</script>
