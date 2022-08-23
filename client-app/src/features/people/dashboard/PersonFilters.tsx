import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Checkbox, Form, Header, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PeopleFilters() {
    const {personStore: {setPredicate}} = useStore();

    // Nogle states, vi gerne vil sende til personStore, når man klikker på Search-knappen
    const [filter, setFilter] = useState('');
    const [completed, setCompleted] = useState(false);
    const [notCompleted, setNotCompleted] = useState(true);
    const [completedUnspecified, setCompletedUnspecified] = useState(false);

    function handleClick() {
        setPredicate(filter, completed, notCompleted, completedUnspecified);
    }

    return (
        <>
            <Header icon='filter' attached color='teal' content='Filters' />

            <Header>Name</Header>
            <Label>First Name contains</Label>
                <input value={filter} onChange={e => setFilter(e.target.value)}
            />

            <Header>Completed</Header>
            <Form>
                <Form.Field>
                    <Checkbox
                        label='Yes'
                        defaultChecked={completed}
                        onChange={() => setCompleted(!completed)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='No'
                        defaultChecked={notCompleted}
                        onChange={() => setNotCompleted(!notCompleted)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='Unspecified'
                        defaultChecked={completedUnspecified}
                        onChange={() => setCompletedUnspecified(!completedUnspecified)}
                    />
                </Form.Field>
            </Form>

            <Button
                floated="right"
                content='Search'
                onClick={() => handleClick()}
            />
        </>
    )
})