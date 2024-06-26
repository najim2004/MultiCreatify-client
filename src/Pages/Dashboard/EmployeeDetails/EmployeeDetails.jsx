/* eslint-disable react/prop-types */
import { FaEnvelope } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Cell,
  Tooltip as RechartsTooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../../Components/Loader";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const EmployeeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [salaryHistory, setSalaryHistory] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["singleEmployee", id],
    queryFn: async () => {
      const { data: employee } = await axiosSecure.get(`/users/${id}`);
      const { data: salary } = await axiosSecure.get(
        `/salary-history/${employee.email}`
      );
      return { employee, salary };
    },
  });

  useEffect(() => {
    if (data?.salary.length > 12) {
      setSalaryHistory(data?.salary.slice(data.salary.length - 12));
    }
    setSalaryHistory(data?.salary);
  }, [data?.salary]);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d0ed57",
    "#a4de6c",
    "#d0ed57",
    "#8dd1e1",
    "#83a6ed",
    "#8a99d1",
    "#ffc0cb",
    "#ff69b4",
    "#ff4500",
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
          <p className="label">{`Month: ${label}`}</p>
          <p className="intro">{`Salary: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <Helmet>
        <title>
          {`${data?.employee?.name}`} | Details | Dashboard | MultiCreatify
        </title>
      </Helmet>
      {isLoading || loading ? (
        <div className="w-full flex justify-center overflow-hidden min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <div className="flex flex-col items-center lg:flex-row gap-12">
            <img
              className="w-[150px] h-[150px] rounded-full bg-gray-200"
              src={data?.employee?.image}
              alt="Employee Photo"
            />
            <div className="space-y-2 my-auto text-center lg:text-start">
              <h1 className="text-4xl text-titleClr font-bold font-poppins">
                {data?.employee?.name}
              </h1>
              <h1 className="text-3xl text-gray-800 font-semibold font-poppins">
                {data?.employee?.designation || "null"}
              </h1>
              <h2 className="font-openSans text-desClr text-2xl font-medium flex gap-1 items-center">
                <FaEnvelope />
                {data?.employee?.email}
              </h2>
            </div>
          </div>
          <div className="mt-20 w-full h-[400px] !overflow-x-auto">
            <ResponsiveContainer>
              <BarChart data={salaryHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  label={{
                    value: "Salary",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="amount" barSize={80}>
                  {salaryHistory?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                  <LabelList dataKey="amount" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
