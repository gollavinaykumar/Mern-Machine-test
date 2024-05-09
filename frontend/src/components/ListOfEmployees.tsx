import { useEffect, useState } from "react";
import Homepage, { HomeHeader } from "./Homepage";
import { deleteEmployee, EmployeesList } from "../services/getEmployeeService";
import { useUserStore } from "../zustand/useUserStore";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useEmployeeStore } from "../zustand/useEmployeeSTore";

export default function ListOfEmployees() {
  const user = useUserStore((s: any) => s.user);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [searchingList, setSearching] = useState([]);
  const setEmployees = useEmployeeStore((s: any) => s.setEmployees);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const AllEmployees = await EmployeesList();
    const filteredEmployees = await AllEmployees.filter(
      (ele: any) => ele.userId === user[0].id
    );
    setList(filteredEmployees);
    setSearching(filteredEmployees);
    setEmployees(filteredEmployees)
  }

  function filteringByUser(text: any) {
    let answer: any = [];
    const mapping = searchingList.filter((ele: any) => {
      const values = Object.values(ele);
      if (values.includes(text)) {
        const obj = searchingList.find((el: any) => {
          return values.find((le: any) => le === el.id);
        });
        answer.push(obj);
      }
    });
    console.log(answer);
    setList(answer);
  }

  async function deleteEmploye(empId: any) {
    console.log(empId);
    const deleting = await deleteEmployee(empId);
    message.success("employee deleted");
  }

  return (
    <div>
      <HomeHeader title="Employee List" />
      <div style={{ textAlign: "end", marginRight: "10px", margin: 5 }}>
        <h3>Table Count : {list.length}</h3>
        <label>Search : </label>
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            filteringByUser(e.target.value);
          }}
        />
      </div>

      <div>
        <table
          style={{
            border: "1px solid black",
            textAlign: "center",
            width: "100%",
          }}
          cellPadding={5}
        >
          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }}>Id</th>
            <th style={{ border: "1px solid black" }}>Image</th>
            <th style={{ border: "1px solid black" }}>Name</th>
            <th style={{ border: "1px solid black" }}>Email</th>
            <th style={{ border: "1px solid black" }}>Mobile No</th>
            <th style={{ border: "1px solid black" }}>Designation</th>
            <th style={{ border: "1px solid black" }}>Gender</th>
            <th style={{ border: "1px solid black" }}>Course</th>
            <th style={{ border: "1px solid black" }}>Create date</th>
            <th style={{ border: "1px solid black" }}>Action</th>
          </tr>
          {list.map((ele: any) => {
            return (
              <>
                <tr key={ele.id}>
                  <td style={{ border: "1px solid black" }}>{ele.id}</td>
                  <td style={{ border: "1px solid black" }}>
                    <img src={ele.image} width={100} />
                  </td>
                  <td style={{ border: "1px solid black" }}>{ele.name}</td>
                  <td style={{ border: "1px solid black" }}>{ele.email}</td>
                  <td style={{ border: "1px solid black" }}>{ele.mobile}</td>
                  <td style={{ border: "1px solid black" }}>
                    {ele.designation}
                  </td>
                  <td style={{ border: "1px solid black" }}>{ele.gender}</td>
                  <td style={{ border: "1px solid black" }}>{ele.course}</td>
                  <td style={{ border: "1px solid black" }}>{ele.createdAt}</td>
                  <td style={{ border: "1px solid black" }}>
                    <Link to={`/employees/${ele.id}`}>Edit</Link>/
                    <span
                      onClick={() => {
                        deleteEmploye(ele.id);
                      }}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}
