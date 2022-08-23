export interface Person {
    id: string;
    firstName: string;
    surname: string;
    nickname: string;
    address: string;
    zipCode: string;
    city: string;
    birthday: Date | null;
    category: string;
    description: string;
    completed: boolean | null;
    created: Date;
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
    nickname: string = '';
    address: string = '';
    zipCode: string = '';
    city: string = '';
    birthday: Date | null = null;
    category: string = '';
    description: string = '';
    completed: boolean | null = null;

    constructor(person?: PersonFormValues) {
        if (person) {
            this.id = person.id;
            this.firstName = person.firstName;
            this.surname = person.surname;
            this.nickname = person.nickname;
            this.address = person.address;
            this.zipCode = person.zipCode;
            this.city = person.city;
            this.birthday = person.birthday;
            this.category = person.category;
            this.description = person.description;
            this.completed = person.completed;
        }
    }
}