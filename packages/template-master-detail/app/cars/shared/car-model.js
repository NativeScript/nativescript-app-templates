function Car(options) {
  const model = {
    id: options.id,
    name: options.name,
    hasAC: options.hasAC,
    description: options.description,
    seats: options.seats,
    luggage: Number(options.luggage),
    class: options.class,
    doors: Number(options.doors),
    price: Number(options.price),
    transmission: options.transmission,
    imageUrl: options.imageUrl,
    imageStoragePath: options.imageStoragePath,
    isModelValid: !!options.name && !!options.imageUrl,
  }

  return model
}

module.exports = Car
