import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

// Constants
import { CHALLENGE_SELECT_INPUT } from '@/constants/constants';

const ChallengeEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput source="category" choices={CHALLENGE_SELECT_INPUT} />
      <ReferenceInput source='lessonId' reference='lessons' label='Lesson Id' />
      <TextInput source="question" label="Question" validate={required()} />
      <NumberInput source="order" label="Order" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export default ChallengeEdit;