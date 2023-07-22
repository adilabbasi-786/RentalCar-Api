module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/createnewbooking/",
      handler: "booking.newBooking",
    },
    {
      method: "POST",
      path: "/update_payment_status/",
      handler: "booking.updatePayment",
    },
  ],
};
