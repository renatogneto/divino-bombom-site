-- Allow public inserts on orders table (for website visitors)
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO public
WITH CHECK (true);

-- Keep other policies for authenticated users only
-- (to manage orders in the admin panel)