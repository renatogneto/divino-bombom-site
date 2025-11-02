-- Remove public insert policy
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Restore authenticated-only insert policy with proper authentication check
CREATE POLICY "Only authenticated users can create orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.role() = 'authenticated');