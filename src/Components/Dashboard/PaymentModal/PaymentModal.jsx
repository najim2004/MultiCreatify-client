import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
// import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
// import { Elements } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
// import CheckOutForm from "./CheckOutForm";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentModal = ({ open, setOpen, singleUserData }) => {
  const [amount, setAmount] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setAmount(singleUserData?.salary);
  }, [singleUserData?.salary]);
  const { data } = useQuery({
    queryKey: ["allPayments"],
    enabled: !!singleUserData?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/salary-history/${singleUserData?.email}`
      );
      return data;
    },
  });

  // Options for months
  const months = [
    { label: "January" },
    { label: "February" },
    { label: "March" },
    { label: "April" },
    { label: "May" },
    { label: "June" },
    { label: "July" },
    { label: "August" },
    { label: "September" },
    { label: "October" },
    { label: "November" },
    { label: "December" },
  ];
  const handleOpen = () => setOpen(!open);

  const generateTransactionId = (length = 16) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let transactionId = "";
    for (let i = 0; i < length; i++) {
      transactionId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return transactionId;
  };

  const handleSubmit = async () => {
    const findInfo = data.find((item) =>
      item.month.includes(`${month} ${year}`)
    );
    if (!singleUserData.verified) {
      toast.error("Please verify the employee first!");
      return;
    }
    if (findInfo) {
      toast.error("Salary of this month already paid!");
      return;
    }
    const transactionId = generateTransactionId();
    const postData = {
      email: singleUserData.email,
      month: `${month} ${year}`,
      amount: amount ? amount : singleUserData.amount,
      transactionId,
    };
    console.log(postData);
    return;
    const { data: res } = await axiosSecure.post("/salary-history", postData);
    if (res.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Salary Paid Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center">
          Salary Transaction Summary
        </DialogHeader>
        <DialogBody className="flex justify-center">
          <div className="w-full">
            {/* <Elements stripe={stripePromise}>
            <CheckOutForm />
            </Elements> */}
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="bankAccount"
                >
                  Bank Account
                </label>
                <input
                  id="bankAccount"
                  name="bankAccount"
                  type="text"
                  className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={singleUserData?.bankAccount}
                  disabled
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="amount"
                >
                  $ Amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={amount ? amount : singleUserData?.salary}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="month"
                >
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  className="mt-1 block bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={months[new Date().getMonth()].label}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  {months?.map((month, i) => (
                    <option key={i} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="year"
                >
                  Year
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  className="mt-1 block bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            variant="gradient"
            color="green"
            onClick={handleSubmit}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        <Toaster />
      </Dialog>
    </>
  );
};
PaymentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  singleUserData: PropTypes.object.isRequired,
};

export default PaymentModal;
