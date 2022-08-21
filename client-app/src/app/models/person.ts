export interface Person {
    id: string;
    firstName: string;
    surname: string;
    birthday: Date | null;
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
    firstName: string = '';
    surname: string = '';
    description: string = '';
    birthday: Date | null = null;

    constructor(person?: PersonFormValues) {
        if (person) {
            this.id = person.id;
            this.firstName = person.firstName;
            this.surname = person.surname;
            this.description = person.description;
            this.birthday = person.birthday;
        }
    }
}