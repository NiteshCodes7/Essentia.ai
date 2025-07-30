import { sendEmail } from "./mail";

export const sendOtpEmail = async (email: string, otp?: string, razorpay_payment_id?: string, price_id?: string) => {
  let html = "";
  if(otp !== ""){
    html += `
      <div style="font-family: sans-serif;">
        <h2>Your OTP</h2>
        <p>Use the following OTP to verify your account:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;
  }

  if(razorpay_payment_id && price_id){
    html += `
      <div style="font-family: sans-serif;">
        <h2>Payment Confirmation</h2>
        <p>Thank you for your payment!</p>
        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        <p><strong>Plan:</strong> ${price_id.includes("basic") ? "Basic Plan" : "Pro Plan"}</p>
        <p>Your subscription has been activated successfully.</p>
      </div>
    `;
  }

  if(html){
    await sendEmail({
      to: email,
      subject: otp ? "Your OTP Code" : "Payment Confirmation",
      html,
    });
  }
};
