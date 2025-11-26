import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    type: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    location: {
      type: String,
      required: function () {
        return this.type === "offline";
      },
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
