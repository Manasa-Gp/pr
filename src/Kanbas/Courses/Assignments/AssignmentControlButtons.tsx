import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import "./index.css"

export default function GradesControlButtons() {
  return (
    <div className="float-end ">
        <span className="wd-rounded-corners-all-around wd-border-black wd-border-solid me-3">
            {"40% of Total"}
        </span>
        <BsPlusLg className="me-3 fs-4"/>
        <IoEllipsisVertical className="me-3 fs-4" />
    </div>
    
);
}
