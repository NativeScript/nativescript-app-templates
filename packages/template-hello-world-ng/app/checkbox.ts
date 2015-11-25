import {Component, View, EventEmitter} from "angular2/angular2";

@Component({
    selector: "Checkbox",
    properties: ['checked : checked'],
    events: ['tap'],
    template: `
    <Image
        [src]="checked ? 'res://checkbox_checked' : 'res://checkbox_unchecked'"
        class="checkbox"
        (tap)="onTap()"
        dock="left">
    </Image>
    `
})
export class Checkbox {
    public tap: EventEmitter<boolean> = new EventEmitter<boolean>();
    public checked: boolean = false;

    constructor() {
    }

    public onTap(): void {
        this.tap.next(this.checked);
    }
}

