export const createProject = (project) => {
    return (dispatch, getState, { getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err });
        });
        // firestore.collection().doc().delete()
    }
};

export const deleteProject = (id) => {
    
    return (dispatch, getState, { getFirestore }) => {
        console.log('ss')
        const firestore = getFirestore();
        firestore.delete({ collection: 'projects', doc: id })
        .then(() => {
            console.log(id)
        //     dispatch({type: 'DELETE_PROJECT'});
        // }).catch(() => {
            dispatch({type: 'DELETE_PROJECT_ERROR'});
        })
    }
}