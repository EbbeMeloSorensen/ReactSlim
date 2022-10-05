import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Checkbox, Form, Header, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PeopleFilters() {
    const {personStore: {setPredicate}} = useStore();

    // Nogle states, vi gerne vil sende til personStore, når man klikker på Search-knappen
    const [filter, setFilter] = useState('');
    const [dead, setDead] = useState(false);
    const [notDead, setNotDead] = useState(false);
    const [deadUnspecified, setDeadUnspecified] = useState(false);

    function handleClick() {
        setPredicate(filter, dead, notDead, deadUnspecified);
    }

    return (
        <>
            <Header icon='filter' attached color='teal' content='Filters' />

            <Header>Name</Header>
            <Label>Name contains</Label>
                <input value={filter} onChange={e => setFilter(e.target.value)}
            />

            <Header>Dead</Header>
            <Form>
                <Form.Field>
                    <Checkbox
                        label='Yes'
                        defaultChecked={dead}
                        onChange={() => setDead(!dead)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='No'
                        defaultChecked={notDead}
                        onChange={() => setNotDead(!notDead)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='Unspecified'
                        defaultChecked={deadUnspecified}
                        onChange={() => setDeadUnspecified(!deadUnspecified)}
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