export class ConnectItem {
    id: string;
    name: string;
    shortName: string;
    title: string;
    phone: string;
    email: string;

    constructor(id, name, shortName, title, phone, email) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.title = title;
        this.phone = phone;
        this.email = email;
    }
}
