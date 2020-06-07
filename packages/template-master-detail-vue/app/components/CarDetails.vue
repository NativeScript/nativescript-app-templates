<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="carData.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <Image :src="carData.imageUrl" class="m-b-15" height="200" stretch="aspectFill"/>

                <Label class="hr m-y-15" row="1"/>

                <GridLayout columns="auto,auto" row="2" rows="*, *, *, *, *, *">
                    <Label class="p-l-15 p-b-10 m-r-20" text="Price"/>
                    <Label class="p-b-10" col="1">
                        <FormattedString>
                            <Span text.decode="&euro;"/>
                            <Span :text="carData.price"/>
                            <Span text="/day"/>
                        </FormattedString>
                    </Label>

                    <Label class="p-l-15 p-b-10 m-r-20" row="1" text="Class"/>
                    <Label :text="carData.class" class="p-b-10" col="1" row="1"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="2" text="Doors"/>
                    <Label :text="carData.doors" class="p-b-10" col="1" row="2"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Seats"/>
                    <Label :text="carData.seats" class="p-b-10" col="1" row="3"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="4" text="Transmission"/>
                    <Label :text="carData.transmission" class="p-b-10" col="1" row="4"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="5" text="Luggage"/>
                    <Label :text="carData.luggage" class="p-b-10" col="1" row="5"/>
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
          props: {car: this.carData}
        });
      }
    }
  };
</script>
