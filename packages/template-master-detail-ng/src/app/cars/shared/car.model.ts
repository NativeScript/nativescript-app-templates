export class Car {
  id: string
  name: string
  hasAC: boolean
  seats: string
  luggage: number
  class: string
  doors: number
  price: number
  transmission: string
  imageUrl: string
  imageStoragePath: string

  constructor(options: any) {
    this.id = options.id
    this.name = options.name
    this.hasAC = options.hasAC
    this.seats = options.seats
    this.luggage = Number(options.luggage)
    this.class = options.class
    this.doors = Number(options.doors)
    this.price = Number(options.price)
    this.transmission = options.transmission
    this.imageUrl = options.imageUrl
    this.imageStoragePath = options.imageStoragePath
  }
}
