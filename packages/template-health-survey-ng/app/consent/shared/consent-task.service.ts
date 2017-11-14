import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

@Injectable()
export class ConsentTaskService {
    steps: { [identifier: string]: any } = {};

    addStep(step: any) {
        const identifier = step.identifier;

        if (!this.steps[identifier]) {
            this.steps[identifier] = step;
        }
    }

    push(): Promise<any> {
        const tasksDataStore = Kinvey.DataStore.collection("TaskResult");
        const stepsArray = Object.keys(this.steps).map((key) => this.steps[key]);

        // console.log(JSON.stringify(Object.keys(this.steps).map((key) => this.steps[key])));

        return tasksDataStore.save({
            identifier: "consentTask",
            results: stepsArray
        });
    }
}
