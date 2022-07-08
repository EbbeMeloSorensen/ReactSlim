import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {activitiesByDate} = activityStore;

    return (
        <>
            {activitiesByDate.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
            ))}
        </>
    )
})