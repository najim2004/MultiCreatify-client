// src/components/CheckOutForm.js
import { useState } from "react";
import { Input } from "@material-tailwind/react";

const CheckOutForm = () => {
  const [bankAccount, setBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Input
        label="Bank Account"
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
        required
      />
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <Input
        label="Month"
        type="number"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />
      <Input
        label="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
    </form>
  );
};

export default CheckOutForm;

// --------------------------------------------------------------------------------------------

// // This example shows you how to set up React Stripe.js and use Elements.
// // Learn how to accept a payment using the official Stripe docs.
// // https://stripe.com/docs/payments/accept-a-payment#web

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// // import "./CheckOutForm.css";

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }

//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("[error]", error);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#424770",
//               "::placeholder": {
//                 color: "#aab7c4",
//               },
//             },
//             invalid: {
//               color: "#9e2146",
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;
