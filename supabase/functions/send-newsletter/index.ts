
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with your API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  content: string;
  fromName?: string;
  fromEmail?: string;
  testEmail?: string; // For testing the newsletter before sending to all subscribers
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content, fromName, fromEmail, testEmail } = await req.json() as NewsletterRequest;
    
    // Validate required fields
    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Default sender details
    const senderName = fromName || "Heart Mender";
    const senderEmail = fromEmail || "newsletter@heartmender.com";
    
    // If testEmail is provided, only send to that email for testing
    if (testEmail) {
      const emailResponse = await resend.emails.send({
        from: `${senderName} <${senderEmail}>`,
        to: [testEmail],
        subject: subject,
        html: content,
      });

      return new Response(
        JSON.stringify({ 
          message: "Test email sent successfully", 
          id: emailResponse.id 
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Get all active subscribers
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("active", true);

    if (error) {
      console.error("Error fetching subscribers:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch subscribers" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    if (!subscribers?.length) {
      return new Response(
        JSON.stringify({ message: "No active subscribers found" }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // For bulk sending, we need to handle batch processing
    // This is a simple implementation; for large subscriber lists,
    // you might want to use a queue or process in smaller batches
    const emailAddresses = subscribers.map(s => s.email);
    
    // Process in batches of 100 to avoid rate limits
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < emailAddresses.length; i += batchSize) {
      const batch = emailAddresses.slice(i, i + batchSize);
      
      // Send emails with BCC to hide recipient addresses from each other
      const emailResponse = await resend.emails.send({
        from: `${senderName} <${senderEmail}>`,
        bcc: batch, // Use BCC for privacy
        subject: subject,
        html: content,
      });
      
      results.push(emailResponse);
      
      // Add a small delay between batches to avoid rate limits
      if (i + batchSize < emailAddresses.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Newsletter sent to ${emailAddresses.length} subscribers`, 
        results 
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send newsletter" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
};

serve(handler);
