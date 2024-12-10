import { Edit, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin';

const LessonEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} />
      <ReferenceInput source='unitId' reference='units' label='Unit Id' />
      <TextInput source="order" label="Order" />
    </SimpleForm>
  </Edit>
);

export default LessonEdit;