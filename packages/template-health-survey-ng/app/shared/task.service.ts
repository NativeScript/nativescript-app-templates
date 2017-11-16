import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

@Injectable()
export class TaskService {
    steps: { [identifier: string]: any } = {};

    addStep(step: any) {
        const identifier = step.identifier;

        if (!this.steps[identifier]) {
            this.steps[identifier] = step;
        }
    }

    pushTask(taskIdentifier: string): Promise<any> {
        const tasksDataStore = Kinvey.DataStore.collection("TaskResult");
        const stepsArray = Object.keys(this.steps).map((key) => this.steps[key]);

        this.steps = {};

        return tasksDataStore.save({
            identifier: taskIdentifier,
            results: stepsArray
        });
    }
}
