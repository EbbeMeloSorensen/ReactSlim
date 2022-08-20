import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const {personStore: {setPredicate}} = useStore();

    // Nogle states, vi gerne vil sende til activityStore, når man klikker på Search-knappen
    const [filter, setFilter] = useState('');
    const [completed, setCompleted] = useState(false);
    const [notCompleted, setNotCompleted] = useState(true);

    function handleClick() {
        console.log(filter);
        setPredicate(filter, completed, notCompleted);
    }

    return (
        <>
            <Header icon='filter' attached color='teal' content='Filters' />
            <br></br>

            <Label>Completed</Label>
                <input
                    type='checkbox'
                    defaultChecked={completed}
                    onChange={() => setCompleted(!completed)}
            />
            <br></br>

            <Label>Not Completed</Label>
                <input
                    type='checkbox'
                    defaultChecked={notCompleted}
                    onChange={() => setNotCompleted(!notCompleted)}
            />
            <br></br>

            <Label>Title contains</Label>
                <input value={filter} onChange={e => setFilter(e.target.value)}
            />
            <Button
                floated="right"
                content='Search'
                onClick={() => handleClick()}
            />
        </>
    )
})