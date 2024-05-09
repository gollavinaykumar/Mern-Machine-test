export const createUser = async (user: {}) => {
  try {
    const createdUser = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return createdUser.json();
  } catch (err) {
    console.log(err);
  }
};
