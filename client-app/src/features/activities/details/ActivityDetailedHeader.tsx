import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    return (
        <Segment.Group>
            <Segment clearing attached='bottom'>
                <Header>{activity.title}</Header>
                <Button as={Link} 
                    to={`/manage/${activity.id}`}
                    color='orange'
                    floated='right'>
                    Update
                </Button>
            </Segment>
        </Segment.Group>
    )
})
