import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { PersonFormValues } from "../../../app/models/person";

export default observer(function PersonForm() {
    const history = useHistory();
    const {personStore} = useStore();
    const {createPerson, updatePerson, loadPerson, loadingInitial} = personStore; // "Destructure the props we need from the person store"
    const {id} = useParams<{id: string}>();

    const [person, setPerson] = useState<PersonFormValues>(new PersonFormValues());

    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name of the person is required')
        //surname: Yup.string().required('The surname of the person is required'),
        //description: Yup.string().required('The person description is required'),
        //birthday: Yup.string().required('Birthday is required').nullable()
    })

    useEffect(() => {
        if (id) loadPerson(id).then(person => setPerson(new PersonFormValues(person)))
    }, [id, loadPerson]);

    function handleFormSubmit(person: PersonFormValues) {
        if (!person.id) {
            let newPerson = {
                ...person, // ("spread" operator)
                id: uuid()
            };
            createPerson(newPerson).then(() => history.push(`/people/${newPerson.id}`))
        } else {
            updatePerson(person).then(() => history.push(`/people/${person.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading person...' />

    return (
        <Segment clearing>
            <Header content='Person Details' sub color='teal' />
            <Formik
            validationSchema={validationSchema}
                enableReinitialize
                initialValues={person}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='firstName' placeholder='First Name' />
                    <MyTextInput name='surname' placeholder='Surname' />
                    <MyTextInput name='nickname' placeholder='Nickname' />
                    <MyTextInput name='address' placeholder='Address' />
                    <MyTextInput name='zipCode' placeholder='Zip Code' />
                    <MyTextInput name='city' placeholder='City' />
                    <MyDateInput
                        placeholderText='Birthday'
                        name='birthday'
                        //showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <MyTextInput name='category' placeholder='Category' />
                    <MyTextArea rows={3} placeholder='Description' name='description'/>
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated='right' 
                        positive type='submit' content='Submit' />
                    <Button as={Link} to='/people' floated='right' type='button' content='Cancel' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})