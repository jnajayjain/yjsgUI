import { takeLatest, put } from 'redux-saga/effects';

import { createStudent, fetchStudent, updateStudent } from './studentRegisterAPI';
import {
  createStudentFailedAction,
  createStudentSuccessAction, fetchStudentFailedAction, fetchStudentSuccessAction,
  updateStudentFailedAction,
  updateStudentSuccessAction
} from '../actions/studentRegistrationActions';


export default function* rootSaga () {
  yield takeLatest(['CREATE_STUDENT'], createStudentSaga);
  yield takeLatest(['FETCH_STUDENT'], fetchStudentSaga);
  yield takeLatest(['UPDATE_STUDENT'], updateStudentSaga);
}

export function* createStudentSaga(action) {
  const { student } = action;
  const errorMessage = 'Error creating new student.';
  try {
    const response = yield createStudent(student);
    if (response.student) {
      yield put(createStudentSuccessAction(response.student));
    } else {
      yield put(createStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(createStudentFailedAction(errorMessage));
    throw e;
  }
}

export function* fetchStudentSaga(action) {
  const { id, secretKey } = action;
  const errorMessage = 'Error fetching student details.';
  try {
    const response = yield fetchStudent(id, secretKey);
    if (response.student) {
      yield put(fetchStudentSuccessAction(response.student));
    } else {
      yield put(fetchStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(fetchStudentFailedAction(errorMessage));
    throw e;
  }
}

export function* updateStudentSaga(action) {
  const { id, secretKey,updatedStudent } = action;
  const errorMessage = 'Error updating student details.';
  try {
    const response = yield updateStudent(id, secretKey, updatedStudent);
    if (response) {
      yield put(updateStudentSuccessAction(response));
    } else {
      yield put(updateStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(updateStudentFailedAction(errorMessage));
    throw e;
  }
}