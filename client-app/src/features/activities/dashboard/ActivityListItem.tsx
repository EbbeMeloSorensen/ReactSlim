import React, { SyntheticEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    const {activityStore} = useStore();
    const {deleteActivity, loading} = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title} ({activity.category})
                        </Item.Header>
                        <Button
                            as={Link}
                            to={`/activities/${activity.id}`}
                            color='teal'
                            floated='right'
                            content='View'
                            size='tiny'
                        />
                        <Button 
                            name={activity.id}
                            loading={loading && target === activity.id.toString()}
                            onClick={(e) => handleActivityDelete(e, activity.id)} 
                            floated='right' 
                            content='Delete' 
                            color='red'
                            size='tiny'
                        />
                    </Item.Content>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}