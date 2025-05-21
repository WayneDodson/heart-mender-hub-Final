
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in environment variables");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get the request body
    const { record } = await req.json();
    
    if (!record || !record.email || !record.message) {
      throw new Error("Invalid request: Required fields missing in contact submission");
    }
    
    console.log("Processing contact submission:", record);
    
    // Here you would typically integrate with an email service like Resend or SendGrid
    // This is a placeholder for the email sending logic
    const emailSent = await sendEmailNotification(record);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact notification processed successfully",
        emailSent 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing contact notification:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});

// Placeholder function for email notification
// Replace with actual implementation using your preferred email service
async function sendEmailNotification(record) {
  try {
    // In a real implementation, you'd use something like:
    // const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // const resend = new Resend(resendApiKey);
    // await resend.emails.send({...})
    
    console.log(`Email notification would be sent to admin about contact from: ${record.email}`);
    
    // For now we're just simulating a successful email send
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}
