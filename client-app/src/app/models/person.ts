export interface Person {
    id: string;
    title: string;
    deadline: Date | null;
    description: string;
    completed: boolean;
}

export class Person implements Person {
    constructor(init?: PersonFormValues) {
        Object.assign(this, init); // Populate all of the properties that it can into our person
    }
}

export class PersonFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    deadline: Date | null = null;

    constructor(person?: PersonFormValues) {
        if (person) {
            this.id = person.id;
            this.title = person.title;
            this.description = person.description;
            this.deadline = person.deadline;
        }
    }
}