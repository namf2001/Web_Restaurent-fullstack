/** @format */

import { useState } from "react";
import reviewApi from "../../../api/reviewApi";
import { Button } from "../../../components";

const Review = ({ idProduct }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const submitReview = async (e) => {
        e.preventDefault();
        // Thực hiện gửi đánh giá lên máy chủ tại đây
        const data = {
            product: idProduct,
            rating,
        };
        setLoading(true);
        // Sử dụng fetch hoặc axios để gửi dữ liệu đánh giá lên máy chủ
        try {
            const res = await reviewApi.create(data);
            setLoading(false);
            console.log(res);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        // Sau khi gửi xong, bạn có thể làm một số xử lý khác như hiển thị thông báo thành công
        console.log(`Rating: ${rating}, Review: ${review}`);
    };

    const handleReview = async (idProduct, rating, comment) => { 
            setLoading(true);
        try {
            const res = await reviewApi.create(idProduct ,rating);
            console.log(res);
                setLoading(true);
        } catch (error) {
            console.log(error);
        } 

        if (comment) {
            alert("Bạn chưa nhập đánh giá");
        }
    }
    return (
        <div className="bg-white flex flex-col justify-between w-full h-[540px] p-12 rounded-xl">
            <div className="text-center text-lg font-medium leading-[32px] text-[#261e27] self-center">
                Chia sẻ ý kiến của bạn
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 items-center mx-6">
                    <div
                        id="Element2"
                        className="text-right leading-[19.2px] text-[#5b555c]">
                        Đánh giá của bạn cho sản phẩm này
                    </div>
                    <div className="self-stretch flex flex-row justify-between items-start">
                        {[1, 2, 3, 4, 5].map((i) =>
                            i <= rating ? (
                                <img
                                    key={i}
                                    src="https://file.rendit.io/n/bhBomezh4pNwj0DQJNJA.svg"
                                    className="w-10 shrink-0"
                                    onClick={() => setRating(i)}
                                />
                            ) : (
                                <img
                                    key={i}
                                    src="https://file.rendit.io/n/rb87Kfpnuui8o0JSXKAt.svg"
                                    className="w-10 shrink-0"
                                    onClick={() => setRating(i)}
                                />
                            )
                        )}
                    </div>
                </div>
                <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Thêm ý kiến của bạn tại đây..."
                    className="border-solid border-[#f6f6f6] bg-[#f6f6f6] px-4 py-3 border rounded-lg"></textarea>
            </div>
            <Button
                btnText="Gửi đánh giá"
            />
        </div>
    );
};

export default Review;
