const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
} = require("../controllers/reservation");

router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.post("/", createReservation);
router.patch("/:id", verifyToken, updateReservation);
router.delete("/:id", verifyToken, deleteReservation);

module.exports = router;