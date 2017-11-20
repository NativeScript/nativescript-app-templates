import { Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from "@angular/core";
import { Animation } from "ui/animation/animation";
import { AnimationCurve } from "ui/enums";
import { Label } from "ui/label";

const radialAnimationDurationMilliseconds = 1000;

@Component({
    selector: "CircularStatus",
    moduleId: module.id,
    templateUrl: "./circular-status.component.html",
    styleUrls: ["./circular-status.component.css"]
})
export class CircularStatusComponent implements OnChanges {

    @ViewChild("progressLabel") progressLabelElement: ElementRef;
    @ViewChild("completionLabel") completionLabelElement: ElementRef;

    @Input() kFontSize: number;
    @Input() kCol: number;
    @Input() value: number;
    @Input() inProgressIcon: string;
    @Input() completionIcon: string;

    private _progresslabel: Label;
    private _completionLabel: Label;
    private _animation: Animation;

    get radialAnimationDuration(): number {
        return radialAnimationDurationMilliseconds;
    }

    private get progressLabel(): Label {
        if (!this._progresslabel) {
            this._progresslabel = <Label>(this.progressLabelElement.nativeElement);
        }

        return this._progresslabel;
    }

    private get completionLabel(): Label {
        if (!this._completionLabel) {
            this._completionLabel = <Label>(this.completionLabelElement.nativeElement);
        }

        return this._completionLabel;
    }

    private get animation(): Animation {
        if (!this._animation) {
            this._animation = new Animation([{
                target: this.progressLabel,
                opacity: 0,
                duration: 0,
                delay: this.radialAnimationDuration
            }, {
                target: this.completionLabel,
                opacity: 1,
                duration: 200,
                delay: this.radialAnimationDuration,
                curve: AnimationCurve.easeIn
            }]);
        }

        return this._animation;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.updateAnimation(changes.value);
        }

        if (changes.kFontSize) {
            // TODO: Reconsider this approach
            // HACK: customizing the "completion" font size results in proper rendering for the small/large case
            this.completionLabel.style.fontSize = changes.kFontSize.currentValue;
        }
    }

    private updateAnimation(valueChange: SimpleChange): void {
        const currentValue = Number(valueChange.currentValue || 0);
        const previousValue = Number(valueChange.previousValue || 0);

        if (this.animation.isPlaying) {
            this.animation.cancel();
        }

        if (currentValue === 100) {
            // catch animation cancelled error (and do nothing)
            this.animation.play().catch(() => void 0);
        } else {
            this.completionLabel.opacity = 0;
            this.progressLabel.opacity = 1;
        }
    }
}
