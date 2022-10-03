import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import { Person } from "../../../app/models/person";
import { useStore } from '../../../app/stores/store';

interface Props {
    person: Person
}

export default observer (function PersonDetailedHeader({person}: Props) {
    const history = useHistory();
    const {personStore} = useStore();
    const {deletePerson, loading} = personStore;

    function handlePersonDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        deletePerson(id).then(() => history.push(`/people`));
    }

    return (
        <Segment.Group>
            <Segment clearing attached='bottom'>
                <Header>{person.firstName} {person.surname}</Header>
                <Button.Group floated='right'>
                    <Button
                        loading={loading}
                        onClick={(e) => handlePersonDelete(e, person.id)} 
                        color='red'
                        type='button'>
                        Delete
                    </Button>
                    <Button as={Link} 
                        to={`/manage/${person.id}`}
                        color='orange'
                        floated='right'
                        type='button'>
                        Edit
                    </Button>
                </Button.Group>
            </Segment>
        </Segment.Group>
    )
})
