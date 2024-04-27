const imgURLToBase64 = async (imgURL) => {
  try {
    const imgURLRes = await fetch(imgURL);
    const blob = await imgURLRes.blob();
    return await new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return "";
  }
};

export default imgURLToBase64;
