export const formatUpdateStudentDataPayload = (updatedStudent) => {
  const {
    address,
    age,
    busStop,
    classAttended2017,
    education,
    email,
    fatherMobile,
    fatherName,
    gender,
    motherMobile,
    name,
    occupation,
    optIn2018,
    course2018,
    secretKey,
  } = updatedStudent;

  const newData = {
    address,
    age,
    busStop,
    classAttended2017,
    education,
    email,
    fatherMobile,
    fatherName,
    gender,
    motherMobile,
    name,
    occupation,
    optIn2018,
    course2018,
    secretKey,
  };

  return {
    ...newData
  };
};

export const formatCreateStudentDataPayload = student => {
  return {
    ...student
  };
};

