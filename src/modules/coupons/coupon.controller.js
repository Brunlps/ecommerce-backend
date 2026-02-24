const CouponService = require("./coupon.service");

class CouponController {
  static async create(req, res) {
    const { nome, quantidade, validade, valor_desc } = req.body;
    try {
      const newCoupon = await CouponService.createCoupon(nome, quantidade, validade, valor_desc);
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const coupons = await CouponService.getAllCoupons();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const coupon = await CouponService.getCouponById(id);
      if (!coupon) {
        return res.status(404).json({ error: "Cupom não encontrado" });
      }
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CouponController;