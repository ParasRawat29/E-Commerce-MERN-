import axios from "axios";

export const checkoutHandler = async (amount, user, shippingInfo) => {
  const { keyId } = await axios.get("/api/v1/payment/key");
  const {
    data: { order },
  } = await axios.post("/api/v1/payment/process", { amount });

  const options = {
    key: keyId,
    amount: order.amount,
    currency: "INR",
    name: "Ecom",
    description: "Payment for your order",
    order_id: order.id,
    callback_url: "/api/v1/payment/paymentverification",
    prefill: {
      name: user.name,
      email: user.email,
      contact: shippingInfo.phoneNumber,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#59e147",
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};
