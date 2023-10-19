const router = require("express").Router();
const { verifyToken } = require("../middleware/tokenHandler");
const {
        addComment,
    addReply,
    likeComment,
    dislikeComment,
    likeReply,
    dislikeReply,
    getAllComment,
    updateComment,
    updateReply,
    deleteComment,
    deleteReply,
} = require("../controllers/comment");

router.post("/:id", verifyToken, addComment);
router.post("/:id/reply", verifyToken, addReply);
router.get("/get-all/:id", verifyToken, getAllComment);
router.put("/:id", verifyToken, updateComment);
router.put("/:id/reply", verifyToken, updateReply);
router.delete("/:id", verifyToken, deleteComment);
router.delete("/:id/reply", verifyToken, deleteReply);
router.put("/:id/like", verifyToken, likeComment);
router.put("/:id/dislike", verifyToken, dislikeComment);
router.put("/:id/reply/like", verifyToken, likeReply);
router.put("/:id/reply/dislike", verifyToken, dislikeReply);

module.exports = router;