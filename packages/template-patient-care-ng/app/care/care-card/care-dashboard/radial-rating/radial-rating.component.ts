import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from "@angular/core"; // tslint:disable-line:max-line-length
import { Animation } from "ui/animation/animation";
import { AnimationCurve } from "ui/enums";
import { Label } from "ui/label";

const radialAnimationDurationMilliseconds = 1000;

@Component({
    selector: "RadialRating",
    moduleId: module.id,
    templateUrl: "./radial-rating.component.html",
    styleUrls: ["./radial-rating.component.css"]
})
export class RadialRatingComponent implements AfterViewInit, OnChanges {

    @ViewChild("progressLabel") progressLabelElement: ElementRef;
    @ViewChild("completionLabel") completionLabelElement: ElementRef;

    @Input() kCompletionIconFontSize: number;
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

    ngAfterViewInit(): void {
        this._progresslabel = <Label>(this.progressLabelElement.nativeElement);
        this._completionLabel = <Label>(this.completionLabelElement.nativeElement);

        this._animation = new Animation([{
            target: this._progresslabel,
            opacity: 0,
            duration: 0,
            delay: this.radialAnimationDuration
        }, {
            target: this._completionLabel,
            opacity: 1,
            duration: 200,
            curve: AnimationCurve.easeIn
        }], true);

        this.updateAnimation(this.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this._animation && changes.value) {
            this.updateAnimation(changes.value.currentValue || 0);
        }
    }

    private updateAnimation(value: number): void {
        if (this._animation.isPlaying) {
            this._animation.cancel();
        }

        this._completionLabel.opacity = 0;
        this._progresslabel.opacity = 1;

        if (value === 100) {
            // catch animation cancelled error (and do nothing)
            setTimeout(() => this._animation.play().catch(() => void 0));
        }
    }
}
