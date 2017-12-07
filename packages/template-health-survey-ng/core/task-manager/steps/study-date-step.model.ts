import * as jsTimezone from "jstimezonedetect";
import { StudyStep } from "./study-step.model";

export class StudyDateStep extends StudyStep {
    private static getIsDaylightSavingTime(date: Date) {
        const januaryDate = new Date(date.getFullYear(), 0, 1);
        const julyDate = new Date(date.getFullYear(), 6, 1);
        const standardTimeZoneOffset = Math.max(januaryDate.getTimezoneOffset(), julyDate.getTimezoneOffset());

        return date.getTimezoneOffset() < standardTimeZoneOffset;
    }

    private static getTimezoneAbbreviation(date: Date): string {
        const localeTimeStringArray = date.toLocaleTimeString("en-us", { timeZoneName: "short" }).split(" ");

        let abbreviation = "";
        if (localeTimeStringArray.length > 2) {
            abbreviation = localeTimeStringArray[2].replace(/[(^,)$]/g, "");
        }

        return abbreviation;
    }

    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, dateAnswer: Date) {
        super(identifier);

        this.results = [
            {
                calendar: "Gregorian",
                timeZone: {
                    secondsFromGMT: dateAnswer.getTimezoneOffset() * 60,
                    isDaylightSavingTime: StudyDateStep.getIsDaylightSavingTime(dateAnswer),
                    abbreviation: StudyDateStep.getTimezoneAbbreviation(dateAnswer),
                    identifier: jsTimezone.determine().name()
                },
                questionType: "Date",
                saveable: false,
                dateAnswer,
                identifier
            }
        ];
    }
}
