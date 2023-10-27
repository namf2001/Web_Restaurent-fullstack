/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    createTable,
    getTables,
    getTableById,
    updateTableById,
    deleteTableById,
} = require("../controllers/table");

router.post("/", verifyToken, createTable);
router.get("/", getTables);
router.get("/:tableId", getTableById);
router.put("/:tableId", verifyToken, updateTableById);
router.delete("/:tableId", verifyToken, deleteTableById);

module.exports = router;