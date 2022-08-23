import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Person} from "../../../app/models/person";
import {format} from 'date-fns';

interface Props {
    person: Person
}

export default observer(function PersonDetailedInfo({person}: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Grid attached='top'>
                    <Grid.Column width={2}>
                        Address
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.address}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        Zip Code
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.zipCode}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        City
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.city}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        Nickname
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.nickname}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        Birthday
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <span>
                            {person.birthday === null ? '' : format(person.birthday, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        Category
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.category}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={2}>
                        Description
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <p>{person.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid>
                    <Grid.Column width={2}>
                        Completed
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <span>
                            {person.completed === null ? '' : person.completed === true ? 'Yes' : 'No'}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
