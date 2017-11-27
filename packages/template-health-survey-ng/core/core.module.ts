import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { TaskManagerService } from "./task-manager/task-manager.service";

@NgModule({
    providers: [
        TaskManagerService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CoreModule { }
