module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/createnewbooking/",
      handler: "booking.newBooking",
    },
  ],
};
