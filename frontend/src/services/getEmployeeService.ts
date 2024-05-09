export const EmployeesList = async () => {
  try {
    const Employees = await fetch("http://localhost:8080/employees");
    return Employees.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployee = async (empId: any) => {
  try {
    const users = await fetch("http://localhost:8080/employees", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({empId}),
    });
  } catch (err) {
    console.log(err);
  }
};
