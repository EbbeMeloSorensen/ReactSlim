import React, { SyntheticEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Item, List, Segment } from "semantic-ui-react";
import { Person } from "../../../app/models/person";
import { useStore } from '../../../app/stores/store';

interface Props {
    person: Person
}

export default function PersonListItem({person}: Props) {
    const {personStore} = useStore();
    const {deletePerson, loading} = personStore;
    const [target, setTarget] = useState('');

    function handlePersonDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePerson(id);
    }

    return (
        <List.Item>
            <List.Content>
                <List.Header as={Link} to={`/people/${person.id}`}>
                    {person.title}
                </List.Header>
            </List.Content>
            <List.Content floated='right'>
                <Button.Group verticalAlign='Top Aligned'>
                    <Button
                        as={Link}
                        to={`/people/${person.id}`}
                        color='teal'
                        floated='right'
                        content='View'
                        size='tiny'
                    />
                    <Button
                        name={person.id}
                        loading={loading && target === person.id.toString()}
                        onClick={(e) => handlePersonDelete(e, person.id)} 
                        floated='right' 
                        content='Delete' 
                        color='red'
                        size='tiny'
                    />
                </Button.Group>
            </List.Content>
        </List.Item>
    )
}