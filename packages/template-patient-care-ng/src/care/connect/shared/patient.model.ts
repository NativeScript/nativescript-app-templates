import { Contact } from "./contact.model";

export class Patient {
    name: string;
    monogram: string;
    userInfo: any;
    tintColor: string;
    careTeamContacts: Array<Contact>;

    constructor(options: any) {
        this.name = options.name;
        this.monogram = options.monogram;
        this.userInfo = options.userInfo;
        this.tintColor = options.tintColor ? this.getHexColor(options.tintColor) : "";

        this.careTeamContacts = new Array<Contact>();

        if (options.careTeamContacts && options.careTeamContacts.length) {
            options.careTeamContacts.forEach((careTeamContactData) => {
                const careTeamContact = new Contact(careTeamContactData);
                this.careTeamContacts.push(careTeamContact);
            });
        }
    }

    getContactsByType(type: number): Array<Contact> {
        return this.careTeamContacts.filter((contact) => {
            return contact.type === type;
        });
    }

    private getHexColor(tintColor: any): string {
        const r = Math.round(tintColor.r * 255).toString().slice(0, 2);
        const g = Math.round(tintColor.g * 255).toString().slice(0, 2);
        const b = Math.round(tintColor.b * 255).toString().slice(0, 2);

        let hexColor = `#${r + g + b}`;
        let a = tintColor.a;

        if (a < 1) {
            a = Math.round(a * 255).toString().slice(0, 2);
            hexColor += a;
        }

        return hexColor;
    }
}
