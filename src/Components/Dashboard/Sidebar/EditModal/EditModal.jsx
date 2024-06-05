import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useRef } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
const EditModal = ({ open, setOpen, currentObj, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const bankAccountRef = useRef(null);
  const salaryRef = useRef(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (UpdateData) => {
      const { data } = await axiosSecure.patch(
        `/users/${currentObj._id}`,
        UpdateData
      );
      return data;
    },
    onSuccess: async (data) => {
      if (data.modifiedCount > 0) {
        await handleOpen(!open);
        refetch();
        setTimeout(() => {
          toast.success("Successfully updated");
        }, 400);
      } else {
        toast.error("No changes were made");
      }
    },
  });
  const handleSubmit = async () => {
    const email = emailRef.current.querySelector("input").value;
    const name = userNameRef.current.querySelector("input").value;
    const bankAccount = bankAccountRef.current.querySelector("input").value;
    const salary = salaryRef.current.querySelector("input").value;
    if (salary < currentObj.salary) {
      toast.error("Salary can't be less than the current salary");
      return;
    }
    const updateData = {
      name: name,
      email: email,
      bankAccount: bankAccount,
      salary: salary,
    };
    try {
      mutateAsync(updateData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center">
          Update the Stuff Information
        </DialogHeader>
        <DialogBody className="flex justify-center">
          <form className="grid grid-cols-1 justify-center lg:grid-cols-2 gap-3">
            <div className="w-72">
              <Input
                ref={userNameRef}
                defaultValue={currentObj?.name}
                required
                label="Username"
              />
            </div>
            <div className="w-72">
              <Input
                name="email"
                defaultValue={currentObj?.email}
                ref={emailRef}
                required
                label="Email"
              />
            </div>
            <div className="w-72">
              <Input
                ref={bankAccountRef}
                defaultValue={currentObj?.bankAccount || "null"}
                required
                label="Bank Account No"
              />
            </div>
            <div className="w-72">
              <Input
                ref={salaryRef}
                defaultValue={currentObj?.salary || "null"}
                required
                label="Salary"
              />
            </div>
          </form>
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
EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  currentObj: PropTypes.object.isRequired,
};

export default EditModal;
