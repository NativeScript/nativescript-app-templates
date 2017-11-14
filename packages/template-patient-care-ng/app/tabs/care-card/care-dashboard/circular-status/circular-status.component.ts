import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from "@angular/core";
import { View } from "ui/core/view";
import { AnimationCurve } from "ui/enums";

@Component({
    selector: "CircularStatus",
    moduleId: module.id,
    templateUrl: "./circular-status.component.html",
    styleUrls: ["./circular-status.component.css"]
})
export class CircularStatusComponent implements OnInit, OnChanges {
    @ViewChild("label") labelElement: ElementRef;
    @ViewChild("button") buttonElement: ElementRef;

    @Input() kCol: number;
    @Input() value: number;
    @Input() inProgressIcon: string;
    @Input() completionIcon: string;

    private _label: View;
    private _button: View;

    ngOnInit(): void {
        // this.updateStatusIcon();
    }

    get label(): View {
        if (!this._label) {
            this._label = <View>(this.labelElement.nativeElement);
        }

        return this._label;
    }

    get button(): View {
        if (!this._button) {
            this._button = <View>(this.buttonElement.nativeElement);
        }

        return this._button;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.updateAnimations(changes.value);
        }
    }

    private updateAnimations(valueChange: SimpleChange): void {
        const currentValue = Number(valueChange.currentValue || 0);
        const previousValue = Number(valueChange.previousValue || 0);
        if (currentValue === 100) {
            const syncDelay = 1000;
            this.button.animate({
                opacity: 1,
                delay: syncDelay,
                duration: 200,
                curve: AnimationCurve.easeIn
            });
            setTimeout(() => this.label.opacity = 0, syncDelay);
        } else if (previousValue === 100) {
            this.button.opacity = 0;
            this.label.opacity = 1;
            // this.label.animate({
            //     opacity: 1,
            //     duration: 1000,
            //     curve: AnimationCurve.easeIn
            // });
        } else {
            this.button.opacity = 0;
        }
    }
}
