<template lang="html">
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Browse"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf1ea;"></Label>
            <Label class="page-placeholder" :text="message"></Label>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    data: () => {
        return {
            message: "<!-- Browse page content goes here -->"
        };
    }
}
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles

</style>