import {
    EventData,
    Dialogs,
    Frame,
    GridLayout,
    NavigatedData,
    Page,
} from '@nativescript/core'

import { CarDetailEditViewModel } from './car-detail-edit-view-model'

export function onNavigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return
    }

    const page = <Page>args.object

    page.bindingContext = new CarDetailEditViewModel(page.navigationContext)
}

export function onCancelButtonTap(args: EventData): void {
    Frame.topmost().goBack()
}

export function onDoneButtonTap(args: EventData): void {
    /* ***********************************************************
     * By design this app is set up to work with read-only sample data.
     * Follow the steps in the "Firebase database setup" section in app/readme.md file
     * and uncomment the code block below to make it editable.
     *************************************************************/

    /* ***********************************************************
    const actionItem = <ActionItem>args.object;
    const bindingContext = <CarDetailEditViewModel>actionItem.bindingContext;

    bindingContext.saveChanges()
        .then(() => Frame.topmost().navigate({
            moduleName: "cars/cars-list-page",
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }))
        .catch((errorMessage: any) =>
            Dialogs.alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" }));
    *************************************************************/

    /* ***********************************************************
     * Comment out the code block below if you made the app editable.
     *************************************************************/
    const readOnlyMessage =
        'Check out the "Firebase database setup" section in the readme file to make it editable.' // tslint:disable-line:max-line-length
    const queue = Promise.resolve()
    queue
        .then(() =>
            Dialogs.alert({
                title: 'Read-Only Template!',
                message: readOnlyMessage,
                okButtonText: 'Ok',
            })
        )
        .then(() =>
            Frame.topmost().navigate({
                moduleName: 'cars/cars-list-page',
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'slideBottom',
                    duration: 200,
                    curve: 'ease',
                },
            })
        )
}

export function onSelectorTap(args: EventData): void {
    const gridLayout = <GridLayout>args.object
    const tag = gridLayout.get('tag')
    const bindingContext = <CarDetailEditViewModel>gridLayout.bindingContext
    const selectedValue = bindingContext.car[tag]
    const context = { tag, selectedValue }
    const modalPagePath =
        'cars/list-selector-modal-page/list-selector-modal-page'
    const page = <Page>gridLayout.page

    page.showModal(modalPagePath, {
        context,
        closeCallback: (value: string) => {
            if (value) {
                bindingContext.car[tag] = value
            }
        },
        fullscreen: false,
    })
}

export function onImageAddRemoveTap(args: EventData): void {
    const gridLayout = <GridLayout>args.object
    const bindingContext = <CarDetailEditViewModel>gridLayout.bindingContext

    bindingContext.onImageAddRemove()
}
