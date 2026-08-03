import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Simple server-side validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email || email.trim() === "" || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, message });

    // Log the message in the backend console
    console.log("================ NEW CONTACT MESSAGE (SAVED TO DB) ================");
    console.log(`Saved ID: ${contact._id}`);
    console.log(`Received At: ${contact.createdAt}`);
    console.log(`From: ${contact.name} (${contact.email})`);
    console.log(`Message: \n${contact.message}`);
    console.log("===================================================================");

    // Return success response matching the expected frontend signature
    res.status(201).json({
      success: true,
      message: "Your message has been received successfully! I will get back to you shortly.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};
