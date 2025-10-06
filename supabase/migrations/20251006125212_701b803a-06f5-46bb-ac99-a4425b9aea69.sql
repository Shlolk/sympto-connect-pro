-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  experience INTEGER NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  available_slots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create symptoms table
CREATE TABLE IF NOT EXISTS public.symptoms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symptoms TEXT NOT NULL,
  severity TEXT NOT NULL,
  duration TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health_tips table
CREATE TABLE IF NOT EXISTS public.health_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;

-- Doctors policies (public read)
CREATE POLICY "Doctors are viewable by everyone" ON public.doctors FOR SELECT USING (true);

-- Symptoms policies
CREATE POLICY "Users can view their own symptoms" ON public.symptoms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own symptoms" ON public.symptoms FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON public.appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own appointments" ON public.appointments FOR UPDATE USING (auth.uid() = user_id);

-- Health tips policies (public read)
CREATE POLICY "Health tips are viewable by everyone" ON public.health_tips FOR SELECT USING (true);

-- Insert sample doctors
INSERT INTO public.doctors (name, specialty, rating, experience, location, latitude, longitude) VALUES
('Dr. Sarah Johnson', 'Cardiologist', 4.8, 15, 'New York Medical Center', 40.7589, -73.9851),
('Dr. Michael Chen', 'Neurologist', 4.9, 12, 'Boston General Hospital', 42.3601, -71.0589),
('Dr. Emily Rodriguez', 'Pediatrician', 4.7, 8, 'Chicago Children''s Hospital', 41.8781, -87.6298),
('Dr. James Wilson', 'Orthopedic Surgeon', 4.9, 20, 'LA Medical Plaza', 34.0522, -118.2437),
('Dr. Lisa Anderson', 'Dermatologist', 4.6, 10, 'Miami Skin Clinic', 25.7617, -80.1918);

-- Insert sample health tips
INSERT INTO public.health_tips (title, description, category, icon) VALUES
('Stay Hydrated', 'Drink at least 8 glasses of water daily for optimal health', 'Wellness', '💧'),
('Regular Exercise', 'Aim for 30 minutes of physical activity daily', 'Fitness', '🏃'),
('Balanced Diet', 'Include fruits, vegetables, and whole grains in your meals', 'Nutrition', '🥗'),
('Quality Sleep', 'Get 7-9 hours of sleep each night for better health', 'Rest', '😴');