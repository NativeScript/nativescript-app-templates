export class ContactInfo {
    type: number;
    displayString: string;
    label: string;

    constructor(options: any) {
        this.type = options.type;
        this.displayString = options.displayString;
        this.label = options.label;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Contact {
    id: string;
    name: string;
    monogram: string;
    tintColor: string;
    relation: string;
    type: number;
    contactInfoItems: Array<ContactInfo>;

    constructor(options: any) {
        this.id = options._id;
        this.name = options.name;
        this.monogram = options.monogram;
        this.relation = options.relation;
        this.type = options.type;

        this.contactInfoItems = new Array<ContactInfo>();

        if (options.contactInfoItems && options.contactInfoItems.length) {
            options.contactInfoItems.forEach((contactInfoData) => {
                const contactInfo = new ContactInfo(contactInfoData);
                this.contactInfoItems.push(contactInfo);
            });
        }
    }
}
