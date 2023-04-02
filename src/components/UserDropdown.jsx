import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogout = () => {
    Swal.fire({
      text: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div
        className="text-slate-500 block cursor-pointer"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("../image/team-1-800x800.jpg")}
            />
          </span>
        </div>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div
          className={
            "text-sm py-2 px-5 font-normal flex items-center gap-2 w-full whitespace-nowrap bg-transparent text-slate-700 cursor-pointer hover:bg-gray-400"
          }
          onClick={handleLogout}
        >
          <FiLogOut /> Logout
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
