import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Person} from "../../../app/models/person";
import {format} from 'date-fns';

interface Props {
    person: Person
}

export default observer(function ActivityDetailedInfo({person}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{person.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {format(person.deadline!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='check circle' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {person.completed ? 'Completed' : 'Not completed'}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
