import { db } from "../libs/db.js";

// Return all users (optionally filter out admins if requested)
export const getAllUsers = async (req, res) => {
  try {
    const includeAdmins = req.query.includeAdmins === "true";

    const users = await db.user.findMany({
      where: includeAdmins ? {} : { role: "USER" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        lastloginDate: true,
        createdAt: true,
        isVerified: true,
        loginMap: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Return users considered "active" within the last N days (default 7)
export const getActiveUsers = async (req, res) => {
  try {
    const days = Number(req.query.days || 7);
    const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const users = await db.user.findMany({
      where: {
        role: "USER",
        lastloginDate: { gte: threshold },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        lastloginDate: true,
        loginMap: true,
      },
      orderBy: { lastloginDate: "desc" },
    });

    res.json({ users, days });
  } catch (error) {
    console.error("Error fetching active users:", error);
    res.status(500).json({ message: "Failed to fetch active users" });
  }
};


