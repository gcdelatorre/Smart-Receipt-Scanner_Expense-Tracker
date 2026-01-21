import Income from "../models/income.model.js";
import mongoose from "mongoose";

export const getTransaction = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "date";
        const order = req.query.order === 'asc' ? 1 : -1;

        const userId = new mongoose.Types.ObjectId(req.user._id);

        const pipeline = [
            // 1. Match Income docs for this user
            { $match: { userId: userId } },

            // 2. Union with Expenses
            {
                $unionWith: {
                    coll: "expenses", // Collection name in MongoDB (usually lowercase plural)
                    pipeline: [
                        { $match: { userId: userId } }
                    ]
                }
            },

            // 3. Sort combined results by date (descending default)
            { $sort: { [sortBy]: order } },

            // 4. Facet for pagination (Total count + Page data)
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ]
                }
            }
        ];

        const result = await Income.aggregate(pipeline);

        const data = result[0].data;
        const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        });

    } catch (err) {
        console.error("Transaction fetch error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};