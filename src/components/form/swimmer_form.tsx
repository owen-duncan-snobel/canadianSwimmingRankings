import React, { useState } from 'react';

const SwimmerForm: React.FC = (props) => {
    const [ddl_season, set_ddl_season] = useState<String | null>('2019-2020');
    const [ddl_club, set_ddl_club] = useState<String | null>('72542');
    const [ddl_course, set_ddl_course] = useState<String | null>('SCM');
    const [loading, set_loading] = useState<Boolean>(false);


    /*             ddl_season: '2019-2020',
                ddl_club: '72542',
                ddl_course: 'SCM',
                year: '',
                club_name: 'Oakville Aquatic Club',
                swimmer_data: null,
                loading: false */


    return <div></div>
}
export default SwimmerForm;


