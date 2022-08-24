import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps, registerLocale, setDefaultLocale} from 'react-datepicker';
import es from 'date-fns/locale/es'
registerLocale('es', es)
// https://www.npmjs.com/package/react-datepicker

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                locale="es"
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
