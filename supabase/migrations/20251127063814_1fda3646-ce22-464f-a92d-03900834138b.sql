-- Create job applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position_title TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view applications (for admin purposes)
CREATE POLICY "Authenticated users can view applications"
ON public.job_applications
FOR SELECT
TO authenticated
USING (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload resumes
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes');

-- Allow authenticated users to view resumes
CREATE POLICY "Authenticated users can view resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');