
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

interface ContactSubmission {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();
    
    if (!record || !record.id) {
      return new Response(
        JSON.stringify({ error: "Missing record information" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Get the full contact submission details
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', record.id)
      .single();

    if (error || !data) {
      console.error("Error fetching contact submission:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch contact submission details" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const submission = data as ContactSubmission;
    
    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${submission.first_name} ${submission.last_name} (${submission.email})</p>
      <p><strong>Subject:</strong> ${submission.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message.replace(/\n/g, '<br/>')}</p>
      <p><strong>Submitted at:</strong> ${new Date(submission.created_at).toLocaleString()}</p>
      <hr/>
      <p>This is an automated notification from Heart Mender.</p>
    `;

    // Send the email notification
    const emailResponse = await resend.emails.send({
      from: "Heart Mender <notifications@heartmender.com>",
      to: ["support@heartmenderhub.com"],
      subject: `New Contact Form: ${submission.subject}`,
      html: emailContent,
      reply_to: submission.email
    });

    console.log("Email notification sent:", emailResponse);

    return new Response(
      JSON.stringify({ 
        message: "Email notification sent successfully", 
        id: emailResponse.id 
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
    
  } catch (error) {
    console.error("Error in contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email notification" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
};

serve(handler);
