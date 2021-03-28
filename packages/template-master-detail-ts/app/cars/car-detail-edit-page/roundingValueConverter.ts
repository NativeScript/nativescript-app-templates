export class RoundingValueConverter {
    toView(value: number): number {
        return value
    }

    toModel(value: number): number {
        return Math.round(value)
    }
}
