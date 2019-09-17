<template>
    <Page class="page">

        <ActionBar class="action-bar">
            <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back"/>
            <Label class="action-bar-title" :text="item.name"></Label>
        </ActionBar>

        <GridLayout>
            <Label class="m-10 h3" :text="item.description" verticalAlignment="top" ></Label>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    props: ["context"],

    computed: {
        item() {
            return this.context || {};
        }
    }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles

</style>