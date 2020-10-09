const initState = {
    projects: [
        {id: '1', title: 'ไปทะเล', date: Date.now()},
        {id: '2', title: 'ตกปลา', date: Date.now()},
        {id: '3', title: 'ดำน้ำ', date: Date.now()}
    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_PROJECT':
            console.log('create project: ', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        default:
            return state;
    }
}

export default projectReducer