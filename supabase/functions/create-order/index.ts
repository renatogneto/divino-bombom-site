import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests per time window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  // Brazilian phone should have 10-11 digits
  return digitsOnly.length >= 10 && digitsOnly.length <= 11;
}

function sanitizeInput(input: string, maxLength: number): string {
  return input.trim().substring(0, maxLength);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    console.log(`Order creation attempt from IP: ${clientIP}`);

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Muitas tentativas. Por favor, aguarde um momento.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { name, phone, email, description, delivery_date } = await req.json();

    // Validate required fields
    if (!name || !phone || !email || !description || !delivery_date) {
      console.warn('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.warn(`Invalid email format: ${email}`);
      return new Response(
        JSON.stringify({ error: 'Email inválido.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate phone format
    if (!validatePhone(phone)) {
      console.warn(`Invalid phone format: ${phone}`);
      return new Response(
        JSON.stringify({ error: 'Telefone inválido. Use o formato com DDD.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate delivery date (must be in the future)
    const deliveryDate = new Date(delivery_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deliveryDate < today) {
      console.warn(`Invalid delivery date: ${delivery_date}`);
      return new Response(
        JSON.stringify({ error: 'Data de entrega deve ser futura.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name, 100),
      phone: sanitizeInput(phone, 20),
      email: sanitizeInput(email, 255),
      description: sanitizeInput(description, 1000),
      delivery_date: delivery_date,
      status: 'pending',
    };

    // Create Supabase client with service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert order
    const { data, error } = await supabase
      .from('orders')
      .insert([sanitizedData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Erro ao processar pedido. Tente novamente.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Order created successfully: ${data.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Pedido registrado com sucesso!',
        orderId: data.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in create-order function:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
