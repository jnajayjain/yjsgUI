
export const checkValidUserInfo = (errorMessageObject) => ({
  type: 'CHECK_FOR_VALID_USER_INFO',
  errorMessageObject,
});

export const createStudentData = student => ({
  type: 'CREATE_STUDENT',
  student
});

export const createStudentSuccessAction = newStudent => ({
  type: 'CREATE_STUDENT_SUCCESS_ACTION',
  newStudent,
});

export const createStudentFailedAction = message => ({
  type: 'CREATE_STUDENT_FAILED_ACTION',
  message,
});

export const fetchStudentData = (id, secretKey) => ({
  type: 'FETCH_STUDENT',
  id,
  secretKey
});

export const fetchStudentSuccessAction = student => ({
  type: 'FETCH_STUDENT_SUCCESS_ACTION',
  student,
});

export const fetchStudentFailedAction = message => ({
  type: 'FETCH_STUDENT_FAILED_ACTION',
  message,
});

export const updateStudentData = (id, secretKey, updatedStudent) => ({
  type: 'UPDATE_STUDENT',
  id,
  secretKey,
  updatedStudent,
});

export const updateStudentSuccessAction = student => ({
  type: 'UPDATE_STUDENT_SUCCESS_ACTION',
  student,
});

export const updateStudentFailedAction = message => ({
  type: 'UPDATE_STUDENT_FAILED_ACTION',
  message,
});
