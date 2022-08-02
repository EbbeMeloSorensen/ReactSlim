import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {activitiesByDate} = activityStore;

    return (
        <List divided verticalAlign='middle'>
            {activitiesByDate.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
            ))}
        </List>
    )
})