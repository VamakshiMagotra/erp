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
    type: "",
    syllabus: "",
  },
  announcements: [
    //   {
    //     "announcement": {
    //         "id": 1,
    //         "title": "Introduction to Object Oriented Programming",
    //         "announce": "Object Oriented Programming Notes",
    //         "time": "2021-12-28T09:38:42"
    //     },
    //     "files": [
    //         {
    //             "id": 1,
    //             "file": "https://firebasestorage.googleapis.com/v0/b/college-erp-8c72a.appspot.com/o/files%2FObject-Oriented-Design_Course-Notes.pdf?alt=media&token=d4557258-10ef-4679-935d-8a61d84d4f30"
    //         }
    //     ],
    //     "links": [
    //         {
    //             "id": 1,
    //             "link": "https://www.geeksforgeeks.org/introduction-of-object-oriented-programming/"
    //         },
    //         {
    //             "id": 2,
    //             "link": "https://www.w3schools.com/cpp/cpp_oop.asp"
    //         }
    //     ]
    // }
  ]
};

export const timeTableSchema = {
  id: 0,
  courseModel: {
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
  type: "",
  day: "",
  hour: 0,
  minute: 0,
  duration: 0,
};
