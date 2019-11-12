import { Observable } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { ShowModalOptions } from "tns-core-modules/ui/core/view";
const modalViewModulets = "./modal-ts-view-page";

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    onTap(args) {
        const mainView: Button = <Button>args.object;
        const option: ShowModalOptions = {
            context: { username: "test_username", password: "test" },
            closeCallback: (username, password) => {
                // Receive data from the modal view. e.g. username & password
                alert(`Username: ${username} : Password: ${password}`);
            },
            fullscreen: false
        };
        mainView.showModal(modalViewModulets, option);
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
