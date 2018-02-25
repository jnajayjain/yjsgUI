const initialState = {
  student: {},
  isLoading: false,
  isFetched: false,
  isUpdated: false,
  isCreated: false,
  updateMessage: '',
};

const studentRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_STUDENT':
      return {
        ...state,
        isLoading: true,
        isCreated: false,
      };

    case 'FETCH_STUDENT':
      return {
        ...state,
        isLoading: true,
        isFetched: false,
        isUpdated: false,
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        isLoading: true,
        isUpdated: false,
      };

    case 'CREATE_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        newStudent: {...state.newStudent, ...action.newStudent},
        isLoading: false,
        isCreated: true,
      };

    case 'UPDATE_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        student: {...state.student, ...action.student},
        isLoading: false,
        isUpdated: true,
      };

    case 'FETCH_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        student: {...state.student, ...action.student},
        isLoading: false,
        isFetched: true,
      };

    case 'CREATE_STUDENT_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };

    case 'UPDATE_STUDENT_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case 'FETCH_STUDENT_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        isFetched: false,
      };

    default: {
      return {
        ...state,
      }
    }
  }
};

export default studentRegistrationReducer;

export const getStudent = state => state.studentRegistrationReducer.student;

export const getNewStudent = state => state.studentRegistrationReducer.newStudent;

export const isLoading = state => state.studentRegistrationReducer.isLoading;

export const isUpdated = state => state.studentRegistrationReducer.isUpdated;

export const isCreated = state => state.studentRegistrationReducer.isCreated;

export const isFetched = state => state.studentRegistrationReducer.isFetched;

export const updateMessage = state => state.studentRegistrationReducer.student.message;