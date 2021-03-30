import db from "./car-rental-export-public.json"

class ApiService {
  constructor() {
    this.db = db;
  }

  update(path, updateModel) {
    const carId = path.split("/").slice(-1)[0];
    this.db.cars[carId] = {...this.db.cars[carId], ...updateModel }
  }

  uploadFile(params) {
    return {url: params.localFullPath}
  }

  addValueEventListener(onValueEvent, path) {
    onValueEvent(this.db.cars)
    return {
      path: path,
      listeners: this.db.cars
    }

  }
}

export default new ApiService;
