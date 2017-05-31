export class Car {
    id: string;
    name: string;
    hasAC: boolean;
    description: string;
    seats: string;
    luggage: number;
    class: string;
    doors: number;
    price: number;
    transmission: string;
    imageUrl: string;

    constructor(optionJson: any) {
        this.id = optionJson.Id;
        this.name = optionJson.Name;
        this.hasAC = optionJson.AC;
        this.description = optionJson.Description;
        this.seats = optionJson.Seats;
        this.luggage = optionJson.Luggage;
        this.class = optionJson.Class;
        this.doors = optionJson.Doors;
        this.price = optionJson.Price;
        this.transmission = optionJson.Transmission;
        this.imageUrl = optionJson.ImageUrl;
    }
}

