import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import connectDB from "../config/db";
import User from "../modules/auth/auth.model";
import Project from "../modules/project/project.model";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Project.deleteMany({});

    const password = await bcrypt.hash("Password@123", 10);

    // ── ADMIN ──
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password,
      role: "ADMIN",
    });

    await Project.create({
      name: "Admin Project",
      description: "Main admin project",
      owner: admin._id,
    });

    // ── MANAGERS & their USERS ──
    const managersData = [
      { name: "Manager One",   email: "manager1@test.com" },
      { name: "Manager Two",   email: "manager2@test.com" },
      { name: "Manager Three", email: "manager3@test.com" },
    ];

    for (let mi = 0; mi < managersData.length; mi++) {
      const manager = await User.create({
        name: managersData[mi].name,
        email: managersData[mi].email,
        password,
        role: "MANAGER",
      });

      await Project.create({
        name: `${managersData[mi].name} Project`,
        description: `Project owned by ${managersData[mi].name}`,
        owner: manager._id,
      });

      for (let ui = 1; ui <= 3; ui++) {
        const user = await User.create({
          name: `User ${mi + 1}-${ui}`,
          email: `user${mi + 1}${ui}@test.com`,
          password,
          role: "USER",
          manager: manager._id,
        });

        await Project.create({
          name: `User ${mi + 1}-${ui} Project`,
          description: `Project owned by User ${mi + 1}-${ui} under ${managersData[mi].name}`,
          owner: user._id,
        });
      }
    }

    console.log("Seed completed successfully");
    console.log("  1 Admin");
    console.log("  3 Managers");
    console.log("  9 Users (3 per Manager)");
    console.log(" 13 Projects total");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
