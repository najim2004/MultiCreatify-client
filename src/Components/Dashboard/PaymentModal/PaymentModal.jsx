import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentModal = ({ open, setOpen }) => {
  const handleSubmit = async () => {};
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center">
          Update the Stuff Information
        </DialogHeader>
        <DialogBody className="flex justify-center">
          <div className="w-full">
            <Elements stripe={stripePromise}>
              <CheckOutForm />
            </Elements>
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
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
};

export default PaymentModal;
