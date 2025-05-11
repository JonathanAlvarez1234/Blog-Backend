import { verify, hash } from "argon2";
import User from '../users/user.model.js';

export const validatePasswordUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password, oPassword } = req.body;

        if (!oPassword) {
            return res.status(400).json({
                success: false,
                msg: "Old password is required"
            });
        }

        const user = await User.findById(id);
        if (!user || !user.password) {
            return res.status(404).json({
                success: false,
                msg: "User not found or password missing"
            });
        }

        const validPassword = await verify(user.password, oPassword);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                msg: "The old password does not match"
            });
        }

        if (password) {
            req.body.password = await hash(password, 10);
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error validating password update',
            error: error.message
        });
    }

}

export const validateUserDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const authenticatedUser = req.user;

        if (!authenticatedUser) {
            return res.status(401).json({
                success: false,
                msg: "Authentication required"
            });
        }

        const isOwner = authenticatedUser._id.toString() === id;
        const isAdmin = authenticatedUser.role === "ADMIN_ROLE" || authenticatedUser.role === "ADMIN_HOTEL_ROLE";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                msg: "Only the account owner or an administrator can delete this user"
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        if (!isAdmin) {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    msg: "Password is required to delete your own account"
                });
            }

            const validPassword = await verify(user.password, password);
            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    msg: "Incorrect password"
                });
            }
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error during user deletion validation',
            error: error.message
        });
    }
};

export const validateUpdateUSer = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        if (user._id.toString() === id) {
            return next();
        }

        if (user.role === 'ADMIN_ROLE' || user.role === 'ADMIN_HOTEL_ROLE') {
            return next();
        }

        return res.status(403).json({
            success: false,
            msg: 'You do not have permission to update this user'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error validating user permissions',
            error: error.message
        });
    }
};