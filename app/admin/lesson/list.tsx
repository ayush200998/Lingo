import { List, Datagrid, TextField, ReferenceField, NumberField } from 'react-admin';

const LessonList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source='unitId' reference='units' />
      <NumberField source="order" />
    </Datagrid>
  </List>
);

export default LessonList;