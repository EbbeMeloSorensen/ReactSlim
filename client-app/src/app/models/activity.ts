export interface Activity {
    id: string;
    title: string;
    deadline: Date | null;
    description: string;
    completed: boolean;
}

export class Activity implements Activity {
    constructor(init?: ActivityFormValues) {
        Object.assign(this, init); // Populate all of the properties that it can into our activity
    }
}

export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    deadline: Date | null = null;

    constructor(activity?: ActivityFormValues) {
        if (activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.description = activity.description;
            this.deadline = activity.deadline;
        }
    }
}