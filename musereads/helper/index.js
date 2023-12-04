const { default: axios } = require("axios");

const UploadImage = async (file) => {
  console.log(file, " --dg");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ivee-image");
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dovxxvgpq/image/upload`,
    formData
  );
  const data = await response.data;
  return { done: true, imgUrl: data.secure_url, imgData: data };
};

const CalculateProgress = (currentValue, totalValue) => {
  const progressPercentage = (currentValue / totalValue) * 100;
  console.log(typeof progressPercentage);
  return progressPercentage.toFixed(2);
};

function calculateTimeAgoInMinutes(createdAt) {
  const now = Date.now();
  const millisecondsAgo = now - createdAt;
  const secondsAgo = millisecondsAgo / 1000;
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;

  if (secondsAgo < 1) {
    return "just now";
  } else if (secondsAgo < 60) {
    return `${Math.round(secondsAgo)}s ago`;
  } else if (minutesAgo < 60) {
    return `${Math.round(minutesAgo)}min ago`;
  } else {
    return `${Math.round(hoursAgo)}hr ago`;
  }
}

export { UploadImage, CalculateProgress, calculateTimeAgoInMinutes };
