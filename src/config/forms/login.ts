export const config = {
  initialValues: {
    email: "",
    name: "",
    password: "",
    terms: true,
  },

  validate: {
    email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    password: (val) =>
      val.length <= 6 ? "Password should include at least 6 characters" : null,
  },
};
