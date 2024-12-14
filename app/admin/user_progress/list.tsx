import { List, Datagrid, TextField, SelectField, ReferenceField, NumberField, BooleanField } from 'react-admin';

const ChallengeOptionList = () => (
  <List>
    <Datagrid>
      <ReferenceField source='userId' reference='challenges' label='Challenge Id' />
      <TextField source="text" />
      <BooleanField source="correct" />
      <TextField source="imageSrc" />
      <TextField source="audioSrc" />
    </Datagrid>
  </List>
);

export default ChallengeOptionList;