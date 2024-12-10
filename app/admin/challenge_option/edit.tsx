import {
  BooleanInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

const ChallengeOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source='challengeId' reference='challenges' label='Challenge Id' />
      <TextInput source="text" label="Text" validate={required()} />
      <BooleanInput label="Is correct" source="correct" />
      <TextInput source="imageSrc" label="Image" />
      <TextInput source="audioSrc" label="Audio" />
    </SimpleForm>
  </Edit>
);

export default ChallengeOptionEdit;