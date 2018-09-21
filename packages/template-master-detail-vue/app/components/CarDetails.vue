<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back" />
            <Label class="action-bar-title" :text="carData.name" horizontalAlignment="center" />
            <ActionItem @tap="onEditButtonTap" ios.position="right" android.position="right">
                <Label text="Edit" verticalAlignment="center" class="action-item" />
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <Image :src="carData.imageUrl" stretch="aspectFill" height="200" class="m-b-15" />

                <Label row="1" class="hr-light m-t-15 m-b-15"/>

                <GridLayout row="2" rows="*, *, *, *, *, *" columns="auto,auto">
                    <Label text="Price" class="p-l-15 p-b-10 m-r-20 text-secondary"/>
                    <Label col="1" class="text p-b-10">
                        <FormattedString>
                            <Span text.decode="&euro;" />
                            <Span :text="carData.price" />
                            <Span text="/day" />
                        </FormattedString>
                    </Label>

                    <Label text="Class" row="1" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                    <Label :text="carData.class" row="1" col="1" class="text p-b-10" />

                    <Label text="Doors" row="2" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                    <Label :text="carData.doors" row="2" col="1" class="text p-b-10" />

                    <Label text="Seats" row="3" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                    <Label :text="carData.seats" row="3" col="1" class="text p-b-10" />

                    <Label text="Transmission" row="4" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                    <Label :text="carData.transmission" row="4" col="1" class="text p-b-10" />

                    <Label text="Luggage" row="5" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                    <Label :text="carData.luggage" row="5" col="1" class="text p-b-10" />
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import CarDetailsEdit from "./CarDetailsEdit";

    export default {
        props: ["car"],

        computed: {
            carData() {
                return this.car || {};
            }
        },

        methods: {
            onEditButtonTap() {
                this.$navigateTo(CarDetailsEdit, {
                    transition: "slideTop",
                    backstackVisible: false,
                    props: { car: this.carData }
                });
            }
        }
    };
</script>
