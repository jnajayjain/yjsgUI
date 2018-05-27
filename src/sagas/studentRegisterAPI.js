import { PUT, POST, GET } from '../utils/http';
import {
  formatUpdateStudentDataPayload,
  formatCreateStudentDataPayload,
} from '../utils/apiUtils';

export const updateStudent = (id, secretKey, updatedStudent) =>
  PUT({
    url: `/v1/students/${id}/${secretKey}`,
    body: formatUpdateStudentDataPayload(updatedStudent),
  });

export const createStudent = (student) =>
  POST({
    url: `/v1/students`,
    body: formatCreateStudentDataPayload(student),
  });

export const fetchStudent = (id, secretKey) =>
  GET({
    url: `/v1/students/${id}/${secretKey}`,
  });

export const searchStudent = (adminKey, searchKey, searchValue) =>
  GET({
    url: `/v1/students/${adminKey}/?${searchKey}=${searchValue}`,
  });
