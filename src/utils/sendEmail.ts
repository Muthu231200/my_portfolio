import emailjs from "@emailjs/browser";

// ── EmailJS Setup (free: 200 emails/month) ──
// 1. Go to https://www.emailjs.com → Sign up free
// 2. Email Services → Add Service → Gmail → Connect your Gmail
// 3. Email Templates → Create Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{message}}
// 4. Copy your IDs below:

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}): Promise<boolean> {
  try {
    const res = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Not provided",
        message: data.message,
      },
      PUBLIC_KEY
    );
    return res.status === 200;
  } catch {
    return false;
  }
}
