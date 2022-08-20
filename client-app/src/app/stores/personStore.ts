import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Person, PersonFormValues } from "../models/person";
import { Pagination, PagingParams } from "../models/pagination";

export default class PersonStore {
    personRegistry = new Map<string, Person>();
    selectedPerson: Person | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.personRegistry.clear();
                this.loadPeople();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    resetPredicate = () => {
        this.predicate.forEach((value, key) => {
            this.predicate.delete(key);
        })
    }

    setPredicate = (
        value: string,
        completed: boolean,
        notCompleted: boolean) => {
        this.resetPredicate();
        this.predicate.set('title', value);
        this.predicate.set('completed', completed);
        this.predicate.set('notCompleted', notCompleted);
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => params.append(key, value))
        return params;
    }

    get peopleByDate() {
        return Array.from(this.personRegistry.values()).sort((a, b) => 
            a.deadline!.getTime() - b.deadline!.getTime());
    }

    loadPeople = async () => {
        this.loadingInitial = true;
        try {
            console.log('Retrieving people...');
            const result = await agent.People.list(this.axiosParams);
            result.data.forEach(person => {
                this.setPerson(person);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadPerson = async (id: string) => {
        let person = this.getPerson(id);
        if (person) {
            this.selectedPerson = person;
            return person; 
        } else {
            this.loadingInitial = true;
            try {
                person = await agent.People.details(id);
                this.setPerson(person);
                runInAction(() => {
                    this.selectedPerson = person;
                })
                this.setLoadingInitial(false);
                return person; 
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPerson = (person: Person) => {
        person.deadline = new Date(person.deadline!);
        this.personRegistry.set(person.id, person);
    }

    private getPerson = (id: string) => {
        return this.personRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPerson = async (person: PersonFormValues) => {
        try {
            await agent.People.create(person);
            const newPerson = new Person(person);
            this.setPerson(newPerson);
            runInAction(() => {
                this.selectedPerson = newPerson;
            })
        } catch(error) {
            console.log(error);
        }
    }

    updatePerson = async (person: PersonFormValues) => {
        try {
            await agent.People.update(person);
            runInAction(() => {
                if (person.id) {
                    let updatedPerson = {...this.getPerson(person.id), ...person}
                    this.personRegistry.set(person.id, updatedPerson as Person);
                    this.selectedPerson = updatedPerson as Person;
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    deletePerson = async (id: string) => {
        this.loading = true;
        try {
            await agent.People.delete(id);
            runInAction(() => {
                this.personRegistry.delete(id);
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        this.loading = true;
        try {
            await agent.People.attend(this.selectedPerson!.id);
            runInAction(() => {
                this.personRegistry.set(this.selectedPerson!.id, this.selectedPerson!)
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelPersonToggle = async () => {
        this.loading = true;
        try {
            await agent.People.attend(this.selectedPerson!.id);
            runInAction(() => {
                this.selectedPerson!.completed = !this.selectedPerson?.completed;
                this.personRegistry.set(this.selectedPerson!.id, this.selectedPerson!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedPerson = () => {
        this.selectedPerson = undefined;
    }
}