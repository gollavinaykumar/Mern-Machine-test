import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../zustand/useEmployeeSTore";
import { useState } from "react";
import { HomeHeader } from "./Homepage";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { createEmployee } from "../services/createService";
import { useUserStore } from "../zustand/useUserStore";
import { updateEmployee } from "../services/EditEmployeeService";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Edit() {
  const [employee, setEmployee] = useState([]);
  const params = useParams();
  const EMPLOYEES = useEmployeeStore((s: any) => s.employees);
  useEffect(() => {
    const employee = EMPLOYEES.filter((ele: any) => params.id === ele.id);
    setName(employee[0].name);
    setEmail(employee[0].email);
    setNumber(employee[0].mobile);
    setDesignattion(employee[0].designation);
    setGender(employee[0].gender);
    setCourse(employee[0].course);
    setEmployee(employee);
    setImage(employee[0].image);
    setFileList([employee[0].image]);
  }, []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignattion] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const loggedUser = useUserStore((s: any) => s.user);
  console.log(designation, gender, course);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));

    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  async function onchange() {
    const updateEmp = await updateEmployee({
      name,
      email,
      mobile: number,
      designation,
      gender,
      course,
      image:
        fileList.length > 0 && fileList[1] ? fileList[1].thumbUrl : fileList[0],
      empId: params.id,
    });
    message.success("edit success");
    console.log(updateEmp);
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />

      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <div>
        <HomeHeader title="Edit Employee" />
        <div style={{ margin: 50 }}>
          <label>Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <br />
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <label>Mobile No : </label>
          <input
            type="text"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <br />
          <br />
          <label>Designation : </label>
          <select
            onChange={(e) => {
              setDesignattion(e.target.value);
            }}
          >
            <option></option>
            <option>HR</option>
            <option>Manager</option>
            <option>Sales</option>
          </select>
          <br />
          <br />
          <label>course : </label>
          <input
            type="checkbox"
            value="MCA"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
          <label>MCA</label>
          <input
            type="checkbox"
            value="BCA"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
          <label>BCA</label>
          <input
            type="checkbox"
            value="BSC"
            onChange={(e) => {
              setCourse(e.target.value);
            }}
          />
          <label>BSC</label>
          <br />
          <br />
          <label>Gender : </label>
          <input
            type="radio"
            value="Male"
            name="Male"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <label>Male</label>
          <input
            type="radio"
            value="Female"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <label>Female</label>
          <br />
          <br />
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          <br />
          <input
            type="button"
            value="Edit"
            onClick={() => {
              onchange();
            }}
          />
        </div>
      </div>
    </>
  );
}
