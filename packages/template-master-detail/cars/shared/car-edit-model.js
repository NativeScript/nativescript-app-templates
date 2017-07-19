function CarEditModel(options) {
    const model = {
        id: options.id,
        name: options.name,
        seats: options.seats,
        luggage: Number(options.luggage),
        class: options.class,
        doors: Number(options.doors),
        price: Number(options.price),
        transmission: options.transmission,
        imageUrl: options.imageUrl,
        imageStoragePath: options.imageStoragePath
    };

    return viewModel;
}

module.exports = CarEditModel;
