export const updateEmployee = async (details: any) => {
  try {
    const users = await fetch("http://localhost:8080/employees/:id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    return users.json();
  } catch (err) {
    console.log(err);
  }
};
