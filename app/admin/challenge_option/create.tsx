import {
  BooleanInput,
  Create,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

const ChallengeOptionCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source='challengeId' reference='challenges' label='Challenge Id' />
      <TextInput source="text" label="Text" validate={required()} />
      <BooleanInput label="Is correct" source="correct" />
      <TextInput source="imageSrc" label="Image" />
      <TextInput source="audioSrc" label="Audio" />
    </SimpleForm>
  </Create>
);

export default ChallengeOptionCreate;