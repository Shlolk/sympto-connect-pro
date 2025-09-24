-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  consultation_fee DECIMAL(10,2) DEFAULT 0.00,
  location TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  bio TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  symptoms TEXT,
  notes TEXT,
  consultation_type TEXT DEFAULT 'in-person' CHECK (consultation_type IN ('in-person', 'online', 'follow-up')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create symptoms table
CREATE TABLE public.symptoms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  description TEXT NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  date_reported TIMESTAMP WITH TIME ZONE DEFAULT now(),
  has_visited_doctor BOOLEAN DEFAULT false,
  previous_doctor_name TEXT,
  prescription_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health_tips table
CREATE TABLE public.health_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;

-- RLS Policies for doctors
CREATE POLICY "Doctors are viewable by everyone" 
ON public.doctors 
FOR SELECT 
USING (true);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" 
ON public.appointments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
ON public.appointments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for symptoms
CREATE POLICY "Users can view their own symptoms" 
ON public.symptoms 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own symptoms" 
ON public.symptoms 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own symptoms" 
ON public.symptoms 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for health tips
CREATE POLICY "Health tips are viewable by everyone" 
ON public.health_tips 
FOR SELECT 
USING (is_active = true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_doctors_updated_at
BEFORE UPDATE ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_tips_updated_at
BEFORE UPDATE ON public.health_tips
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample doctors data
INSERT INTO public.doctors (name, specialty, experience_years, rating, consultation_fee, location, address, phone, email, bio) VALUES
('Dr. Sarah Johnson', 'Internal Medicine', 15, 4.9, 150.00, 'Medical Center Downtown', '123 Health St, Downtown', '+1-555-0101', 'sarah.johnson@medcenter.com', 'Experienced internal medicine physician with expertise in preventive care and chronic disease management.'),
('Dr. Michael Chen', 'Cardiology', 12, 4.8, 200.00, 'Heart Care Clinic', '456 Cardiac Ave, Midtown', '+1-555-0102', 'michael.chen@heartcare.com', 'Board-certified cardiologist specializing in interventional cardiology and heart disease prevention.'),
('Dr. Emily Rodriguez', 'Family Medicine', 10, 4.9, 120.00, 'Community Health Center', '789 Family Dr, Suburbs', '+1-555-0103', 'emily.rodriguez@community.com', 'Dedicated family physician providing comprehensive care for patients of all ages.'),
('Dr. David Kim', 'Dermatology', 8, 4.7, 180.00, 'Skin Health Institute', '321 Derma Blvd, Uptown', '+1-555-0104', 'david.kim@skinhealth.com', 'Dermatologist with expertise in both medical and cosmetic dermatology procedures.'),
('Dr. Lisa Wang', 'Pediatrics', 14, 4.9, 140.00, 'Children''s Medical Center', '654 Kids Lane, Central', '+1-555-0105', 'lisa.wang@childrensmed.com', 'Pediatrician committed to providing exceptional healthcare for children and adolescents.');

-- Insert sample health tips
INSERT INTO public.health_tips (title, content, category) VALUES
('Stay Hydrated Daily', 'Drink at least 8 glasses of water throughout the day to maintain proper hydration and support overall health.', 'General Health'),
('Regular Exercise Benefits', 'Aim for at least 30 minutes of moderate exercise daily to improve cardiovascular health and mental wellbeing.', 'Fitness'),
('Importance of Sleep', 'Get 7-9 hours of quality sleep each night to allow your body to repair and recharge for optimal health.', 'Wellness'),
('Balanced Nutrition', 'Include a variety of fruits, vegetables, whole grains, and lean proteins in your daily diet for balanced nutrition.', 'Nutrition'),
('Stress Management', 'Practice relaxation techniques like deep breathing, meditation, or yoga to manage stress effectively.', 'Mental Health');