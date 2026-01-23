import Income from "../models/income.model.js";
import mongoose from "mongoose";

export const getTransaction = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === 'asc' ? 1 : -1;
        const filter = req.query.filter || 'all';

        // Default to descending order (newest first) when no order is specified
        const finalOrder = req.query.order ? order : -1;

        const userId = new mongoose.Types.ObjectId(req.user._id);
        const search = req.query.search || "";

        const pipeline = [
            // 1. Match Income docs for this user
            { $match: { userId: userId } },

            // 2. Add a 'type' field for filtering
            { $addFields: { type: "income" } },

            // 3. Union with Expenses
            {
                $unionWith: {
                    coll: "expenses",
                    pipeline: [
                        { $match: { userId: userId } },
                        { $addFields: { type: "expense" } }
                    ]
                }
            },

            // 4. Search Filter (matches search term in category, store, or description)
            ...(search ? [{
                $match: {
                    $or: [
                        { category: { $regex: search, $options: "i" } },
                        { store: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } }
                    ]
                }
            }] : []),

            // 5. Filter by type if not 'all'
            ...(filter !== 'all' ? [{ $match: { type: filter } }] : []),

            // 5. Sort combined results
            { $sort: { [sortBy]: finalOrder } },

            // 6. Pagination
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: skip }, { $limit: limit }]
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

// This is the example if we only have one collection/schema, because in our current collection this is not optimal
// import mongoose from "mongoose";

// export const getTransaction = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const sortBy = req.query.sortBy || "date";
//     const order = req.query.order === 'asc' ? 1 : -1;
//     const filter = req.query.filter; // 'income', 'expense', or undefined

//     const match = { userId: new mongoose.Types.ObjectId(req.user._id) };
//     if (filter && filter !== 'all') match.type = filter;

//     // Query with sorting and pagination
//     const data = await Transaction.find(match)
//       .sort({ [sortBy]: order })
//       .skip(skip)
//       .limit(limit);

//     const total = await Transaction.countDocuments(match);
//     const totalPages = Math.ceil(total / limit);

//     res.status(200).json({
//       success: true,
//       data,
//       pagination: { total, page, limit, totalPages }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };


