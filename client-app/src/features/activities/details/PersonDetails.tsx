import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedHeader from "./PersonDetailedHeader";
import ActivityDetailedInfo from "./PersonDetailedInfo";

export default observer(function ActivityDetails() {
    const {personStore} = useStore();
    const {selectedPerson: person, loadPerson, loadingInitial, clearSelectedPerson} = personStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadPerson(id);
        return () => clearSelectedPerson();
    }, [id, loadPerson, clearSelectedPerson]);

    if (loadingInitial || !person) return <LoadingComponent />;

    return (
        <>
            <ActivityDetailedHeader person={person} />
            <ActivityDetailedInfo person={person} />
        </>
    )
})