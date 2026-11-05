import userModel from "../models/userModel.js"

// Logged-in user ka data (password chhupa ke)
export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password")
    if (!user) return res.json({ success: false, message: "User not found" })
    res.json({ success: true, userData: user })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}