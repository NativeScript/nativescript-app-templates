export class VisibilityValueConverter {
    toView(value: string): string {
        if (value) {
            return "collapsed";
        } else {
            return "visible";
        }
    }

    toModel(value: string): string {
        return value;
    }
}
