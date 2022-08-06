import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();

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
            <Header />
        </>
    )
})