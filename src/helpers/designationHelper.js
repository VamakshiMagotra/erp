export const designationHelper = (faculty) => {
  if(faculty.qualification.includes("PhD"))  return "Dr.";
  if(faculty.userId.gender === 'M') return "Mr.";
  return "Ms.";
};