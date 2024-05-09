export const checkUser = async (name: any, password: any) => {
  try {
    const users = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    return users.json();
  } catch (err) {
    console.log(err);
  }
};
