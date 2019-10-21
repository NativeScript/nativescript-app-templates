<template>
    <Page>
        <ActionBar>
            <Label text="Car List" horizontalAlignment="center" />
        </ActionBar>

        <RadListView v-if="!isLoading" for="item in carList" @itemTap="onItemTap" class="cars-list">
            <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
            <v-template>
                <StackLayout class="cars-list__item">
                    <GridLayout rows="*, *, *" columns="*, *" class="cars-list__item-content">
                        <Label :text="item.name" class="cars-list__item-name font-weight-bold"/>
                        <Label col="1" horizontalAlignment="right" class="m-r-5">
                            <FormattedString>
                                <Span text.decode="&euro;"/>
                                <Span :text="item.price"/>
                                <Span text="/day"/> 
                            </FormattedString>
                        </Label>

                        <Label row="1" class="hr m-y-5" colSpan="2"/>

                        <Image row="2" :src="item.imageUrl" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>

                        <StackLayout row="2" col="1" verticalAlignment="center">
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf1b9;    " class="fas cars-list__item-icon"></Span>
                                    <Span :text="item.class"/>
                                </FormattedString>
                            </Label>
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf085;   " class="fas cars-list__item-icon"/>
                                    <Span :text="item.transmission"/>
                                    <Span text=" Transmission"/>
                                </FormattedString>
                            </Label>
                            <Label class="p-b-10">
                                <FormattedString ios.fontFamily="system">
                                    <Span text.decode="&#xf2dc;    " class="fas cars-list__item-icon"/>
                                    <Span :text="item.hasAC ? 'Yes' : 'No'"/>
                                </FormattedString>
                            </Label>
                        </StackLayout>
                    </GridLayout>
                </StackLayout>
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
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .cars-list {
        &__item {
            padding: 0 0 8 0;
            @include colorize($background-color: background-alt-10);

            &-content {
                padding: 8 15 4 15;
                @include colorize($background-color: background);
            }

            &-name,
            &-icon {
                @include colorize($color: accent);
            }
        }
    }
</style>
