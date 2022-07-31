export interface Activity {
    id: string;
    title: string;
    deadline: Date | null;
    description: string;
    category: string;
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
    category: string = '';
    description: string = '';
    deadline: Date | null = null;

    constructor(activity?: ActivityFormValues) {
        if (activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.deadline = activity.deadline;
        }
    }
}