import { List, Datagrid, TextField, SelectField, ReferenceField, NumberField } from 'react-admin';

// Constants
import { CHALLENGE_SELECT_INPUT } from '@/constants/constants';

const ChallengeList = () => (
  <List>
    <Datagrid>
      <SelectField source='type' choices={CHALLENGE_SELECT_INPUT} />
      <ReferenceField source="lessonId" reference='lessons' />
      <TextField source="question" />
      <NumberField source="order" />
    </Datagrid>
  </List>
);

export default ChallengeList;