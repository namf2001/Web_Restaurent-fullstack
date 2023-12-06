/** @format */

const mongoose = require("mongoose");
const moment = require('moment');
const Reservation = require("../models/reservation");
const Table = require("../models/table");
const Cart = require("../models/cart");
const User = require("../models/user");

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "name",
            })
        res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id)
            .populate({
                path: "user",
                select: "name",
            })
            .populate({
                path: "cart",
                select: "name",
            });
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }
        res.status(200).json(reservation);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const createReservation = async (req, res) => {
    const { user, user_name, note, date, time, guests, phone } = req.body;

    try {
        const reservation = await Reservation.create({
            user,
            user_name,
            date,
            time,
            note,
            guests,
            phone,
            // status,
        });
        res.status(201).json({
            success: true,
            message: "Create reservation successfully",
            reservation,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { user, user_name, date, time, guests, status } = req.body;
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            {
                user,
                user_name,
                date,
                time,
                guests,
                status,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Update reservation successfully",
            reservation,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reservation deleted successfully!",
            data: reservation,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
};
