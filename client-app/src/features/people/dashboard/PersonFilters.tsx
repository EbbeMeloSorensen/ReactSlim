import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Label } from "semantic-ui-react";
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
            <Label>Yes</Label>
                <input
                    type='checkbox'
                    defaultChecked={completed}
                    onChange={() => setCompleted(!completed)}
            />
            <br></br>
            <Label>No</Label>
                <input
                    type='checkbox'
                    defaultChecked={notCompleted}
                    onChange={() => setNotCompleted(!notCompleted)}
            />
            <br></br>
            <Label>Unspecified</Label>
                <input
                    type='checkbox'
                    defaultChecked={completedUnspecified}
                    onChange={() => setCompletedUnspecified(!completedUnspecified)}
            />

            <Button
                floated="right"
                content='Search'
                onClick={() => handleClick()}
            />
        </>
    )
})