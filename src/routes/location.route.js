const { Router } = require("express");
const locationRouter = Router();

const showController = require("../controllers/show.controller");

locationRouter.get("/", showController.getLocation);

module.exports = locationRouter;
