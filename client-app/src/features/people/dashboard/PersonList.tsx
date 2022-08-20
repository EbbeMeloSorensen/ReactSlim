import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PersonListItem from './PersonListItem';

export default observer(function PersonList() {
    const {personStore} = useStore();
    const {peopleByDate} = personStore;

    return (
        <List divided verticalAlign='middle'>
            {peopleByDate.map(person => (
                <PersonListItem key={person.id} person={person} />
            ))}
        </List>
    )
})