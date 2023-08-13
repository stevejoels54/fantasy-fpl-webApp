const storeUserDetailsInLocalStorage = (userDetails: any) => {
  localStorage.setItem(
    "userDetails",
    JSON.stringify({
      token: userDetails.accessToken,
      displayName: userDetails.displayName,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      photoURL: userDetails.photoURL,
      uid: userDetails.uid,
      emailVerified: userDetails.emailVerified,
    })
  );
};

const getUserDetailsFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    return JSON.parse(userDetails);
  }
  return null;
};

const removeUserDetailsFromLocalStorage = () => {
  localStorage.removeItem("userDetails");
};

export {
  storeUserDetailsInLocalStorage,
  getUserDetailsFromLocalStorage,
  removeUserDetailsFromLocalStorage,
};
