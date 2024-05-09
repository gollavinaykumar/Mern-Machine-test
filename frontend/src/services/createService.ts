export const createEmployee = async (employee: any) => {
  try {
    const users = await fetch("http://localhost:8080/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    return users.json();
  } catch (err) {
    console.log(err);
  }
};
