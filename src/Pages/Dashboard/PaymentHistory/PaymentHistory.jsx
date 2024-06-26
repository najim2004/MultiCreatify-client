import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import ReactPaginate from "react-paginate";
import "tailwindcss/tailwind.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const {
    data: payments,
    isPending,
    error,
  } = useQuery({
    queryKey: ["salaryHistory", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/salary-history/${user?.email}`);
      return data;
    },
  });
  if (error) {
    console.log("Error! When fetching salary history", error);
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage; // 1=0*5, 2=1*5, 3=2*5
  const currentPageData = payments?.slice(offset, offset + itemsPerPage) || [];

  return (
    <div className="">
      <Helmet>
        <title>Payment History | Dashboard | MultiCreatify</title>
      </Helmet>
      {isPending || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto text-nowrap lg:p-4">
          <h1 className="text-2xl lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            Salary Payment History
          </h1>
          <div className="overflow-x-auto min-h-[250px]">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-titleClr bg-opacity-85 text-white">
                  <th className="py-2 px-4 border-b">Month</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((payment, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 odd:bg-white text-center"
                  >
                    <td className="py-2 px-4 border-b">
                      {new Date(payment.month).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </td>
                    <td className="py-2 px-4 border-b">{payment.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {payments && payments.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(payments.length / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center mt-4"}
              pageClassName={"mx-1"}
              pageLinkClassName={"px-3 py-1 border rounded"}
              previousLinkClassName={"px-3 py-1 border rounded"}
              nextLinkClassName={"px-3 py-1 border rounded"}
              activeClassName={
                "bg-titleClr rounded-sm bg-opacity-85 text-white"
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
