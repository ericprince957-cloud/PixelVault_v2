-- PixelVault Database Seed
-- Run this in the Supabase SQL Editor to populate the content_items table

-- First, ensure the tables exist (these should already be created via Supabase dashboard or migrations)

-- Insert 24 curated content items across 6 categories
INSERT INTO content_items (title, description, category, creator, date, tags, thumbnail, color) VALUES
-- UI Design
('Minimal Dashboard Kit', 'A comprehensive dashboard UI kit with 50+ components, dark and light modes, and responsive layouts.', 'UI Design', 'Sarah Chen', '2025-12-15', ARRAY['dashboard', 'ui-kit', 'minimal', 'responsive'], NULL, '#6366f1'),
('E-commerce Mobile App', 'Modern e-commerce mobile app design with smooth animations and intuitive navigation patterns.', 'UI Design', 'Alex Rivera', '2025-11-20', ARRAY['mobile', 'e-commerce', 'app-design', 'animations'], NULL, '#8b5cf6'),
('SaaS Landing Page Template', 'High-converting SaaS landing page with hero section, features, pricing, and testimonials.', 'UI Design', 'Maya Patel', '2025-10-05', ARRAY['landing-page', 'saas', 'conversion', 'template'], NULL, '#06b6d4'),
('Design System Components', 'A complete design system with tokens, components, and documentation for scalable product design.', 'UI Design', 'James Okonkwo', '2026-01-10', ARRAY['design-system', 'components', 'tokens', 'documentation'], NULL, '#3b82f6'),

-- Photography
('Urban Landscapes Collection', 'Stunning urban photography capturing city skylines, architecture, and street life across major cities.', 'Photography', 'David Mensah', '2025-09-18', ARRAY['urban', 'architecture', 'cityscape', 'street'], NULL, '#f59e0b'),
('Nature Macro Series', 'Close-up macro photography revealing the hidden beauty of flowers, insects, and natural textures.', 'Photography', 'Amara Diallo', '2025-08-22', ARRAY['macro', 'nature', 'flowers', 'textures'], NULL, '#10b981'),
('Portrait Lighting Guide', 'Professional portrait photography with studio and natural lighting setups for various moods.', 'Photography', 'Kwame Asante', '2025-12-01', ARRAY['portrait', 'lighting', 'studio', 'professional'], NULL, '#ef4444'),
('Aerial Drone Shots', 'Breathtaking aerial photography from drone captures of coastlines, mountains, and cityscapes.', 'Photography', 'Lina Torres', '2026-01-05', ARRAY['aerial', 'drone', 'landscape', 'birds-eye'], NULL, '#0ea5e9'),

-- Illustration
('Abstract Geometric Art', 'Bold abstract illustrations using geometric shapes, vibrant colors, and modern compositions.', 'Illustration', 'Yuki Tanaka', '2025-11-10', ARRAY['abstract', 'geometric', 'bold', 'colorful'], NULL, '#ec4899'),
('Character Design Sheet', 'Complete character design sheets with expressions, poses, and turnaround references.', 'Illustration', 'Carlos Mendez', '2025-10-28', ARRAY['character', 'design', 'expressions', 'reference'], NULL, '#f97316'),
('Botanical Illustrations', 'Detailed botanical illustrations of exotic plants and flowers in watercolor style.', 'Illustration', 'Fatima Al-Rashid', '2025-09-15', ARRAY['botanical', 'watercolor', 'plants', 'detailed'], NULL, '#22c55e'),
('Retro Pixel Art Pack', 'Nostalgic pixel art sprites and scenes inspired by classic 8-bit and 16-bit games.', 'Illustration', 'Nikolai Petrov', '2026-01-20', ARRAY['pixel-art', 'retro', 'gaming', 'sprites'], NULL, '#a855f7'),

-- 3D Art
('Isometric City Builder', 'Detailed isometric 3D city elements including buildings, vehicles, and infrastructure.', '3D Art', 'Studio Vertex', '2025-12-08', ARRAY['isometric', '3d', 'city', 'buildings'], NULL, '#6366f1'),
('Abstract 3D Shapes', 'Smooth abstract 3D shapes with gradient materials and studio lighting for modern web design.', '3D Art', 'Render Lab', '2025-11-25', ARRAY['abstract', '3d', 'shapes', 'gradient'], NULL, '#8b5cf6'),
('Low-Poly Animal Pack', 'Cute low-poly 3D animal models perfect for games, apps, and creative projects.', '3D Art', 'PolyCraft', '2025-10-12', ARRAY['low-poly', 'animals', '3d-models', 'cute'], NULL, '#14b8a6'),
('Product Visualization', 'Photorealistic 3D product renders for e-commerce and marketing materials.', '3D Art', 'Pixel Forge', '2026-01-15', ARRAY['product', '3d-render', 'photorealistic', 'ecommerce'], NULL, '#f43f5e'),

-- Typography
('Modern Sans-Serif Collection', 'A curated collection of modern sans-serif typefaces for headings, body text, and UI.', 'Typography', 'Type Foundry', '2025-12-20', ARRAY['sans-serif', 'modern', 'typeface', 'ui'], NULL, '#3b82f6'),
('Handwritten Script Fonts', 'Elegant handwritten script fonts for invitations, branding, and creative projects.', 'Typography', 'Letter Press Co', '2025-11-05', ARRAY['handwritten', 'script', 'elegant', 'branding'], NULL, '#f59e0b'),
('Monospace Code Fonts', 'Clean, readable monospace fonts optimized for code editors and technical documentation.', 'Typography', 'DevType', '2025-10-30', ARRAY['monospace', 'code', 'developer', 'technical'], NULL, '#10b981'),
('Display Headline Fonts', 'Bold, attention-grabbing display fonts for headlines, posters, and hero sections.', 'Typography', 'Bold Type Studio', '2026-01-08', ARRAY['display', 'headline', 'bold', 'poster'], NULL, '#ef4444'),

-- Motion
('Loading Animation Pack', 'Smooth loading animations and spinners for web and mobile applications.', 'Motion', 'Animate Studio', '2025-12-12', ARRAY['loading', 'animation', 'spinner', 'web'], NULL, '#8b5cf6'),
('Micro-Interactions Kit', 'Subtle micro-interactions for buttons, toggles, cards, and form elements.', 'Motion', 'Motion Lab', '2025-11-18', ARRAY['micro-interactions', 'ui', 'buttons', 'subtle'], NULL, '#06b6d4'),
('Page Transition Effects', 'Beautiful page transition animations for single-page applications and websites.', 'Motion', 'Flow Design', '2025-10-22', ARRAY['transitions', 'page', 'spa', 'smooth'], NULL, '#ec4899'),
('Social Media Animations', 'Eye-catching animated templates for Instagram stories, reels, and social content.', 'Motion', 'Viral Motion', '2026-01-18', ARRAY['social-media', 'instagram', 'stories', 'animated'], NULL, '#f97316');
