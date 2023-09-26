const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
    create,
    getAll,
    getById,
    update,
    remove,
} = require("../controllers/category");

router.post("/", verifyToken, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);



module.exports = router;