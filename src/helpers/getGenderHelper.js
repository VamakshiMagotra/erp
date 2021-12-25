export const getGenderHelper = (gender) => {

  switch(gender) {
    case 'M':
      return "Male";
    
    case "F":
      return "Female";
    
    case "O":
      return "Others";

    default:
      return "";
  }
};