const yup = require("yup");

const userValidationSchema = yup.object({
  username: yup
    .string()
    .required("usernam est obligatoire")
    .min(3, "usernam doit compoter au moins 3car")
    .max(15, "usernam doit compoter au max 15cara"),
  password: yup
    .string()
    .required("password est obligatoire")
    .min(8)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])/,
      "Exemple : SaraBenFoulen123&"
    ),
  role: yup.string().oneOf(["admin", "client"]),
  cars: yup
    .array()
    .of(yup.string().matches(/^[0-9a-fA-F]{24}$/, "invalide"))
    .notRequired(),
});

function userValidation(req, res, next) {
  userValidationSchema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: "Validation des données échouée",
        errors: err.errors,
      });
    });
}
module.exports = userValidation;
