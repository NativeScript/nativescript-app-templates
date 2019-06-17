import { Injectable } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { DataStoreService } from "kinvey-nativescript-sdk/lib/angular";

@Injectable({
    providedIn: "root"
})
export class TaskManagerService {
    steps: { [identifier: string]: any } = {};

    constructor(private _dataStoreService: DataStoreService) { }

    addStep(step: any) {
        const identifier = step.identifier;

        if (!this.steps[identifier]) {
            this.steps[identifier] = step;
        }
    }

    pushTask(taskIdentifier: string): Promise<any> {
        const tasksDataStore = this._dataStoreService.collection("TaskResult");
        const stepsArray = Object.keys(this.steps).map((key) => this.steps[key]);

        this.steps = {};

        return tasksDataStore.save({
            identifier: taskIdentifier,
            saveable: false,
            results: stepsArray
        });
    }
}
