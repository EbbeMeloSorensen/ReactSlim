import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import { Person } from "../../../app/models/person";

interface Props {
    person: Person
}

export default observer (function PersonDetailedHeader({person}: Props) {
    return (
        <Segment.Group>
            <Segment clearing attached='bottom'>
                <Header>{person.firstName}</Header>
                <Button as={Link} 
                    to={`/manage/${person.id}`}
                    color='orange'
                    floated='right'>
                    Update
                </Button>
            </Segment>
        </Segment.Group>
    )
})
