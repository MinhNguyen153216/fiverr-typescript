import React, { useRef, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { number } from "yup/lib/locale";
import PopUpModal from "../../../components/PopUpModal/PopUpModal";
import PopUpService from "../../../components/PopUpModal/PopUpService";
import PopUpTask from "../../../components/PopUpModal/PopUpTask";
// import PopUpTask from "../../../components/PopUpModal/PopUpTask";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { CongViec, ThueCongViec } from "../../../redux/models/congViecModel";
import {
  deleteServiceApi,
  deleteTaskApi,
  getServiceApi,
  getTaskApi,
  updateServiceAction,
  updateTaskAction,
  updateTaskAdminApi,
} from "../../../redux/reducers/congViecReducer";

type Props = {};

export default function AdminTask({}: Props) {
  const { arrService } = useSelector((state: RootState) => state.congViecReducer);
  const { arrRowService } = useSelector((state: RootState) => state.congViecReducer);
  const dispatch: AppDispatch = useDispatch();

  let keywordRef = useRef("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [editable, setEditable] = useState(false);
  const [active, setActive] = useState(false);
  // console.log(arrRow);
  // console.log(Number(keywordRef.current));

  const tasksPerPage = 5;
  // const pageCount = Math.ceil(arrTask.length / tasksPerPage);
  const pageCount = Math.ceil(arrRowService/ tasksPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected+1);
    // return selected
  };
  // console.log({selected})

  // const pagesVisited = pageNumber * tasksPerPage;
  let displayTasks = arrService
    .map((task: ThueCongViec, index: number) => {
      return (
        <tr key={task.id}>
          <td className="text-center">{task.id}</td>
          <td className="text-center">{task.maCongViec}</td>
          <td className="text-center">
          {task.maNguoiThue}
          </td>
          <td className="text-center">{task.ngayThue}</td>
          <td className="fs-4 text-center">{task.hoanThanh?<i className="fa-solid fa-square-check text-success"></i>:<i className="fa-solid fa-square-xmark text-danger"></i>}</td>
          <td className="text-center " >
            <button
              className="btn btn-primary me-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalService"
              onClick={() => {
                setEditable(true)
                handleUpdate(task.id, task);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(task.id, task);
              }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });

    const handleUpdate = (id: any, service: any) => {
      const action =updateServiceAction(service)
      dispatch(action)
      console.log(service);
   
    };

  const handleDelete = (id: any, service: any) => {
    const actionThunk = deleteServiceApi(id, service);
    console.log(id);
    dispatch(actionThunk);
  };
  // console.log(displayTasks);

  let keyword: any = searchParams.get("keyword");
  // console.log(keyword);

  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
    setSearchParams({ keyword: keywordRef.current });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchParams({ keyword: keywordRef.current });
  };


  useEffect(() => {
    dispatch(getServiceApi(keyword,pageNumber));
  }, [keywordRef.current,pageNumber]);

  useEffect(() => {
    dispatch(getServiceApi('',1));
  }, []);


  return (
    <div className="adminuser">
      <h1>
        <span
          data-bs-toggle="modal"
          data-bs-target="#exampleModalService"
          onClick={() => {
            setEditable(false);
          }}
        >
          Thêm chi tiết thuê công việc
        </span>
      </h1>
      <form className="search" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          id="search"
          placeholder="Nhập vào mã thuê công việc cần tìm"
        />
        <button type="submit">Tìm</button>
      </form>
      <table className="table table-striped " style={{width:'200%'}}>
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Mã công việc</th>
            <th>Mã người thuê</th>
            <th>Ngày thuê</th>
            <th>Hoàn thành</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{displayTasks}</tbody>
      </table>

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <PopUpService editable={editable} setEditable={setEditable} />


  
      
    </div>
  );
}
