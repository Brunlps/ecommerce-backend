const { Router } = require("express");
const CouponController = require("./coupon.controller");

const router = Router();

router.post("/", CouponController.create);

router.get("/", CouponController.getAll);

router.get("/:id", CouponController.getById);

module.exports = router;