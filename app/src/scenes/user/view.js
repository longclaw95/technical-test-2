import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

import { setUser } from "../../redux/auth/actions";
import { avartarUrl } from "../../utils";

export default () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user details!");
      }
    })();
  }, [id]);

  if (!user) return <Loader />;

  return (
    <div>
      <div className="appContainer pt-24">
        <Detail user={user} />
      </div>
    </div>
  );
};

const Detail = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  async function deleteData() {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    try {
      await api.remove(`/user/${user._id}`);
      toast.success("Successfully removed!");
      history.push(`/user`);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  }

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        status: user.status || "active",
        job_title: user.job_title || "",
        days_worked: user.days_worked || 0,
        costPerDay: user.costPerDay || 0,
        sellPerDay: user.sellPerDay || 0,
        description: user.description || "",
      }}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          await api.put(`/user/${user._id}`, values);
          //FIX : Update user when going to account page
          dispatch(setUser({ ...values, avatar: avartarUrl, _id: user._id, address: user.address }));
          toast.success("Updated!");
        } catch (e) {
          console.log(e);
          toast.error("Some Error!");
        }
      }}>
      {({ values, handleChange, handleSubmit, isSubmitting }) => {
        return (
          <React.Fragment>
            <div className="flex justify-between flex-wrap mt-4">
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0 ">
                <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                <input className="projectsInput text-[14px] font-normal text-[#212325] bg-[#F9FBFD] rounded-[10px]" name="name" value={values.name} onChange={handleChange} />
              </div>
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Email</div>
                <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="email" value={values.email} onChange={handleChange} />
              </div>
              <div className="w-full md:w-[165px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Status</div>
                <select className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" type="select" name="status" value={values.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4	space-x-3">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium">Job title</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px] bg-[#fff]"
                  name="job_title"
                  value={values.job_title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Days worked</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="days_worked"
                  value={values.days_worked}
                  onChange={handleChange}
                />{" "}
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Cost per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="costPerDay"
                  value={values.costPerDay}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Sell per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="sellPerDay"
                  value={values.sellPerDay}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="text-[14px] text-[#212325] font-medium	">Description</div>
              <textarea
                className="w-full text-[14px] font-normal text-[#212325] border border-[#ced4da] mt-2 rounded-[10px] text-sm p-2  focus:outline-none focus:ring focus:ring-[#80bdff]"
                rows="12"
                name="description"
                value={values.description}
                onChange={handleChange}></textarea>
            </div>

            <div className="flex  mt-2">
              <LoadingButton
                className="bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]"
                loading={isSubmitting}
                onClick={handleSubmit}
                type="submit">
                Update
              </LoadingButton>
              <button className="ml-[10px] bg-[#F43F5E] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" onClick={deleteData}>
                Delete
              </button>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};
