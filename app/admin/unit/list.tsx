import { List, Datagrid, TextField, ReferenceInput, ReferenceField, NumberField } from 'react-admin';

const UnitList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <ReferenceField source='courseId' reference='courses' />
      <NumberField source="order" />
    </Datagrid>
  </List>
);

export default UnitList;