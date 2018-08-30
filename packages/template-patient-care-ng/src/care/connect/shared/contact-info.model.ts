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
