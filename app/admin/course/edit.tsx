import { Edit, required, SimpleForm, TextInput } from 'react-admin';

const CourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} />
      <TextInput source="imageSrc" label="Image" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default CourseEdit;