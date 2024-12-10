import { Edit, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin';

const UnitEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} />
      <TextInput source="description" label="Description" validate={required()} />
      <ReferenceInput source='courseId' reference='courses' label='Course Id' />
      <TextInput source="order" label="Order" />
      </SimpleForm>
  </Edit>
);

export default UnitEdit;