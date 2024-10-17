// import { toast } from "react-toastify";

// export const errorMessage = (message) => {
//   toast.error(message, {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// };

// export const successMessage = (message) => {
//   toast.success(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   });
// };

// export const warningMessage = (message) => {
//   toast.info(message, {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// };

export const inputStyle = "border-b border-gray-400 w-full pb-4  mb-1 outline-none focus:border-blue-500"

export const supportedImageExtensions = ["jpg", "jpeg", "png", "gif"];

export const parseTime = (timeString) => {
  const [time, period] = timeString.split(" ");
  const [hour, minute] = time.split(":");
  return { hour: parseInt(hour, 10), minute: parseInt(minute, 10), period };
};

export const isSameDate = (date1, date2) => {
  const isDate = (date) => Object.prototype.toString.call(date) === '[object Date]';

  if (!isDate(date1) || !isDate(date2)) {
    return false;
  }

  const formattedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const formattedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return formattedDate1.getTime() === formattedDate2.getTime();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  return `${formattedDate}, ${formattedTime}`;
};

export const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate
};

export const formatDayAndMonth = (date)=>  {
  const options = { month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export const formatDateToDDMMYYYY = (dateInput)=> {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const formatDateTimeToDDMMYYYY  = (dateInput) => {
  const date = new Date(dateInput);

  // Format date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // Format time
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  const formattedHours = String(hours).padStart(2, '0');

  return `${day}-${month}-${year},${formattedHours}:${minutes} ${ampm}`;
}