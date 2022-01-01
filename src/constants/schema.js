export const departmentSchema = {
  id: "",
  name: "",
  adminDept: false,
};

export const degreeSchema = {
  id: 0,
  name: "",
  duration: 0,
};

export const userSchema = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  phone: "",
  profile: "",
  roles: "",
};

export const facultySchema = {
  id: "",
  userId: userSchema,
  departmentId: departmentSchema,
  qualification: "",
};

export const studentSchema = {
  id: "",
  userId: userSchema,
  departmentId: departmentSchema,
  degree: degreeSchema,
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  semester: 0,
  admissionDate: "",
  cgpa: 0.0,
};

export const courseSchema = {
  course: {
    id: "",
    name: "",
    departmentId: departmentSchema,
    faculty: {
      id: "",
      userId: userSchema,
      departmentId: departmentSchema,
      qualification: "",
    },
    credits: 0,
    theory: 0,
    practical: 0,
    tutorial: 0,
    students: 0,
    type: ""
  },
  announcements: []
};