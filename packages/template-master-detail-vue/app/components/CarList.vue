<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Car List" horizontalAlignment="center" />
        </ActionBar>

        <RadListView v-if="!isLoading" for="item in carList" @itemTap="onItemTap" class="list-group">
            <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
            <v-template>
                <GridLayout rows="*, *, *" columns="*, *" class="list-group-item-content">
                    <Label :text="item.name" class="text-primary font-weight-bold"/>
                    <Label col="1" horizontalAlignment="right" class="list-group-item-text m-r-5">
                        <FormattedString>
                            <Span text.decode="&euro;"/>
                            <Span :text="item.price"/>
                            <Span text="/day"/>
                        </FormattedString>
                    </Label>

                    <Label row="1" class="hr-light m-t-5 m-b-5" colSpan="2"/>

                    <Image row="2" :src="item.imageUrl" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>

                    <StackLayout row="2" col="1" verticalAlignment="center" class="list-group-item-text">
                        <Label class="p-b-10">
                            <FormattedString ios.fontFamily="system">
                                <Span text.decode="&#xf1b9;   " class="fa text-primary"></Span>
                                <Span :text="item.class"/>
                            </FormattedString>
                        </Label>
                        <Label class="p-b-10">
                            <FormattedString ios.fontFamily="system">
                                <Span text.decode="&#xf085;   " class="fa text-primary"/>
                                <Span :text="item.transmission"/>
                                <Span text=" Transmission"/>
                            </FormattedString>
                        </Label>
                        <Label class="p-b-10">
                            <FormattedString ios.fontFamily="system">
                                <Span text.decode="&#xf2dc;   " class="fa text-primary"/>
                                <Span :text="item.hasAC ? 'Yes' : 'No'"/>
                            </FormattedString>
                        </Label>
                    </StackLayout>
                </GridLayout>
            </v-template>
        </RadListView>
        <ActivityIndicator v-else :busy="isLoading"/>
    </Page>
</template>

<script>
    import CarDetails from "./CarDetails";

    export default {
        computed: {
            carList() {
                return this.$root.cars;
            },

            isLoading() {
                return !this.carList.length;
            }
        },

        methods: {
            onItemTap(e) {
                this.$emit("select", e.item);
                this.$navigateTo(CarDetails, { props: { car: e.item } });
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .list-group {
        .list-group-item {
            padding: 0 0 8 0;
            background-color: $blue-10;

            .list-group-item-content {
                padding: 8 15 4 15;
                background-color: $background-light;
            }

            .fa {
                color: $accent-dark;
            }
        }
    }
</style>
