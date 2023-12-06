/** @format */

const Table = require("../models/table");

const createTable = async (req, res) => {
    const { name, status } = req.body;
    try {
        const newTable = new Table({
            name,
            status,
        });
        await newTable.save();
        res.status(201).json({
            success: true,
            table: newTable,
            message: "Table created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTables = async (req, res) => {
    try {
        const tables = await Table.find().populate({
            path: "order",
            populate: [
                {
                    path: "items",
                    populate: {
                        path: "foodId",
                    },
                },
                {
                    path: "user_id",
                    select: "username",
                },
            ],
        });
        res.status(200).json({
            success: true,
            tables,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTableById = async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({
            success: true,
            table,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateTableById = async (req, res) => {
    try {
        const { tableId } = req.params;
        const { name, status } = req.body;
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        table.name = name;
        table.status = status;
        if (status != "Occupied") {
            table.order = null;
        }
        await table.save();
        res.status(200).json({
            success: true,
            table,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteTableById = async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        await table.remove();
        res.status(200).json({
            success: true,
            table,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createTable,
    getTables,
    getTableById,
    updateTableById,
    deleteTableById,
};
