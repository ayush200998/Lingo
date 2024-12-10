import { List, Datagrid, TextField } from 'react-admin';

const CourseList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="imageSrc" />
    </Datagrid>
  </List>
);

export default CourseList;