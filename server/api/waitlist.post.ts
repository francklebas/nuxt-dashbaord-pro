import { z } from "zod";

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  plan: z.enum(["current", "v1", "v2"]).optional(),
});

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event);
    const data = waitlistSchema.parse(body);

    // TODO: Add your waitlist storage logic here
    // Options:
    // 1. Store in a database (Supabase, MongoDB, PostgreSQL, etc.)
    // 2. Send to email service (Mailchimp, ConvertKit, etc.)
    // 3. Store in a simple JSON file for development
    // 4. Send notification via webhook

    // For now, just log it (replace with real implementation)
    console.log("New waitlist signup:", data);

    // Example: Store in a simple JSON file (for development only)
    // In production, use a proper database
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs/promises");
      const path = await import("path");

      const dataDir = path.join(process.cwd(), "data");
      const filePath = path.join(dataDir, "waitlist.json");

      // Create data directory if it doesn't exist
      try {
        await fs.mkdir(dataDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }

      // Read existing data
      let waitlist = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        waitlist = JSON.parse(fileContent);
      } catch (err) {
        // File might not exist yet
      }

      // Add new entry with timestamp
      waitlist.push({
        ...data,
        timestamp: new Date().toISOString(),
      });

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));
    }

    // Return success response
    return {
      success: true,
      message: "Successfully added to waitlist",
      data: {
        email: data.email,
      },
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation error",
        data: {
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
      });
    }

    // Handle other errors
    console.error("Waitlist API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
