import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Label, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();

    // Nogle states, vi gerne vil sende til activityStore, når man klikker på Search-knappen
    const [filter, setFilter] = useState('');

    function handleClick() {
        console.log(filter);
        setPredicate('title', filter);
    }

    return (
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop: 27}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Activities'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="Not Completed"
                    active={predicate.has('notCompleted')}
                    onClick={() => setPredicate('notCompleted', 'true')}
                />
                <Menu.Item
                    content="Completed"
                    active={predicate.has('completed')}
                    onClick={() => setPredicate('completed', 'true')}
                />
                <Menu.Item
                    content="Coming soon: Title filter"
                />
            </Menu>
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