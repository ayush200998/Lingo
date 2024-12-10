import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin';

const LessonCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} />
      <ReferenceInput source='unitId' reference='units' label='Unit Id' />
      <NumberInput source="order" label="Order" validate={[required()]} />
    </SimpleForm>
  </Create>
);

export default LessonCreate;