'use client'

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

// Custom Components
import ChallengeList from './challenge/list';
import ChallengeCreate from './challenge/create';
import ChallengeEdit from './challenge/edit';
import ChallengeOptionList from './challenge_option/list';
import ChallengeOptionCreate from './challenge_option/create';
import ChallengeOptionEdit from './challenge_option/edit';
import CourseList from './course/list';
import CourseCreate from './course/create';
import CourseEdit from './course/edit';
import LessonList from './lesson/list';
import LessonCreate from './lesson/create';
import LessonEdit from './lesson/edit';
import UnitList from './unit/list';
import UnitCreate from './unit/create';
import UnitEdit from './unit/edit';

const dataProvider = simpleRestProvider('/api');

const AdminPanel = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
            />
            <Resource
                name="units"
                list={UnitList}
                create={UnitCreate}
                edit={UnitEdit}
            />
            <Resource
                name="lessons"
                list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
            />
            <Resource
                name="challenges"
                list={ChallengeList}
                create={ChallengeCreate}
                edit={ChallengeEdit}
            />
            <Resource
                name="challengeOptions"
                list={ChallengeOptionList}
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
            />
        </Admin>
    )
}

export default AdminPanel;