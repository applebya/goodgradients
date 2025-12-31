import type { Gradient, GradientCategory } from '@/types';

export const gradients: Gradient[] = [
  // Purple (1-15)
  { id: 'purple-1', name: 'Velvet Dream', description: 'Rich violet to soft lavender', category: 'Purple', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], tags: ['elegant', 'professional', 'hero'] },
  { id: 'purple-2', name: 'Cosmic Purple', description: 'Deep space purple tones', category: 'Purple', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', colors: ['#8B5CF6', '#6366F1'], tags: ['cosmic', 'tech', 'modern'] },
  { id: 'purple-3', name: 'Grape Fusion', description: 'Vibrant grape shades', category: 'Purple', gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', colors: ['#A855F7', '#7C3AED'], tags: ['vibrant', 'creative', 'bold'] },
  { id: 'purple-4', name: 'Royal Amethyst', description: 'Regal purple gemstone', category: 'Purple', gradient: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 50%, #6366F1 100%)', colors: ['#9333EA', '#7C3AED', '#6366F1'], tags: ['royal', 'luxury', 'premium'] },
  { id: 'purple-5', name: 'Plum Mist', description: 'Soft plum to violet', category: 'Purple', gradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)', colors: ['#C084FC', '#A855F7'], tags: ['soft', 'feminine', 'gentle'] },
  { id: 'purple-6', name: 'Violet Storm', description: 'Dynamic violet energy', category: 'Purple', gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)', colors: ['#7C3AED', '#4F46E5'], tags: ['dynamic', 'energy', 'power'] },
  { id: 'purple-7', name: 'Lavender Dusk', description: 'Evening lavender skies', category: 'Purple', gradient: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 50%, #A78BFA 100%)', colors: ['#DDD6FE', '#C4B5FD', '#A78BFA'], tags: ['calm', 'evening', 'relaxing'] },
  { id: 'purple-8', name: 'Deep Violet', description: 'Intense violet depths', category: 'Purple', gradient: 'linear-gradient(135deg, #5B21B6 0%, #4C1D95 100%)', colors: ['#5B21B6', '#4C1D95'], tags: ['deep', 'intense', 'dramatic'] },
  { id: 'purple-9', name: 'Orchid Bloom', description: 'Delicate orchid petals', category: 'Purple', gradient: 'linear-gradient(135deg, #E879F9 0%, #D946EF 100%)', colors: ['#E879F9', '#D946EF'], tags: ['floral', 'spring', 'fresh'] },
  { id: 'purple-10', name: 'Mystic Purple', description: 'Mysterious purple aura', category: 'Purple', gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 50%, #A855F7 100%)', colors: ['#581C87', '#7E22CE', '#A855F7'], tags: ['mystic', 'mysterious', 'magic'] },
  { id: 'purple-11', name: 'Iris Glow', description: 'Glowing iris hues', category: 'Purple', gradient: 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)', colors: ['#818CF8', '#6366F1'], tags: ['glow', 'light', 'bright'] },
  { id: 'purple-12', name: 'Mauve Whisper', description: 'Subtle mauve tones', category: 'Purple', gradient: 'linear-gradient(135deg, #F5D0FE 0%, #E9D5FF 100%)', colors: ['#F5D0FE', '#E9D5FF'], tags: ['subtle', 'whisper', 'delicate'] },
  { id: 'purple-13', name: 'Violet Sunset', description: 'Purple sunset gradient', category: 'Purple', gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', colors: ['#7C3AED', '#EC4899'], tags: ['sunset', 'warm', 'dramatic'] },
  { id: 'purple-14', name: 'Byzantine', description: 'Ancient Byzantine purple', category: 'Purple', gradient: 'linear-gradient(135deg, #6B21A8 0%, #581C87 100%)', colors: ['#6B21A8', '#581C87'], tags: ['ancient', 'historic', 'rich'] },
  { id: 'purple-15', name: 'Electric Violet', description: 'Electrifying violet charge', category: 'Purple', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #D946EF 100%)', colors: ['#8B5CF6', '#A855F7', '#D946EF'], tags: ['electric', 'charged', 'animated'] },

  // Blue (16-30)
  { id: 'blue-1', name: 'Ocean Depth', description: 'Deep ocean blue tones', category: 'Blue', gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', colors: ['#3B82F6', '#1D4ED8'], tags: ['ocean', 'deep', 'professional'] },
  { id: 'blue-2', name: 'Sky Breeze', description: 'Light sky blue gradient', category: 'Blue', gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', colors: ['#60A5FA', '#3B82F6'], tags: ['sky', 'light', 'fresh'] },
  { id: 'blue-3', name: 'Azure Dream', description: 'Dreamy azure tones', category: 'Blue', gradient: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', colors: ['#38BDF8', '#0EA5E9'], tags: ['azure', 'dream', 'calm'] },
  { id: 'blue-4', name: 'Midnight Blue', description: 'Deep midnight shades', category: 'Blue', gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)', colors: ['#1E3A8A', '#1E40AF'], tags: ['midnight', 'dark', 'elegant'] },
  { id: 'blue-5', name: 'Teal Wave', description: 'Teal ocean wave', category: 'Blue', gradient: 'linear-gradient(135deg, #14B8A6 0%, #0891B2 100%)', colors: ['#14B8A6', '#0891B2'], tags: ['teal', 'wave', 'fresh'] },
  { id: 'blue-6', name: 'Sapphire', description: 'Rich sapphire gemstone', category: 'Blue', gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E3A8A 100%)', colors: ['#2563EB', '#1D4ED8', '#1E3A8A'], tags: ['sapphire', 'gem', 'luxury'] },
  { id: 'blue-7', name: 'Ice Crystal', description: 'Cold ice blue crystal', category: 'Blue', gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)', colors: ['#E0F2FE', '#BAE6FD', '#7DD3FC'], tags: ['ice', 'crystal', 'cold'] },
  { id: 'blue-8', name: 'Electric Blue', description: 'Vibrant electric charge', category: 'Blue', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)', colors: ['#0EA5E9', '#2563EB'], tags: ['electric', 'vibrant', 'tech'] },
  { id: 'blue-9', name: 'Navy Gradient', description: 'Professional navy tones', category: 'Blue', gradient: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)', colors: ['#1E40AF', '#1E3A8A'], tags: ['navy', 'professional', 'corporate'] },
  { id: 'blue-10', name: 'Cyan Flow', description: 'Flowing cyan stream', category: 'Blue', gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', colors: ['#22D3EE', '#06B6D4'], tags: ['cyan', 'flow', 'modern'] },
  { id: 'blue-11', name: 'Atlantic', description: 'Atlantic ocean depths', category: 'Blue', gradient: 'linear-gradient(135deg, #0369A1 0%, #075985 100%)', colors: ['#0369A1', '#075985'], tags: ['atlantic', 'ocean', 'deep'] },
  { id: 'blue-12', name: 'Blue Lagoon', description: 'Tropical lagoon blue', category: 'Blue', gradient: 'linear-gradient(135deg, #67E8F9 0%, #22D3EE 50%, #06B6D4 100%)', colors: ['#67E8F9', '#22D3EE', '#06B6D4'], tags: ['lagoon', 'tropical', 'vacation'] },
  { id: 'blue-13', name: 'Cobalt', description: 'Bold cobalt blue', category: 'Blue', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)', colors: ['#1D4ED8', '#2563EB'], tags: ['cobalt', 'bold', 'strong'] },
  { id: 'blue-14', name: 'Blue Steel', description: 'Industrial steel blue', category: 'Blue', gradient: 'linear-gradient(135deg, #64748B 0%, #475569 100%)', colors: ['#64748B', '#475569'], tags: ['steel', 'industrial', 'modern'] },
  { id: 'blue-15', name: 'Blueberry', description: 'Fresh blueberry tones', category: 'Blue', gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', colors: ['#6366F1', '#4F46E5'], tags: ['blueberry', 'fresh', 'fruit'] },

  // Green (31-45)
  { id: 'green-1', name: 'Forest', description: 'Deep forest greens', category: 'Green', gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', colors: ['#22C55E', '#16A34A'], tags: ['forest', 'nature', 'fresh'] },
  { id: 'green-2', name: 'Mint Fresh', description: 'Cool mint freshness', category: 'Green', gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', colors: ['#34D399', '#10B981'], tags: ['mint', 'fresh', 'cool'] },
  { id: 'green-3', name: 'Emerald', description: 'Precious emerald stone', category: 'Green', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)', colors: ['#059669', '#047857'], tags: ['emerald', 'precious', 'luxury'] },
  { id: 'green-4', name: 'Spring Meadow', description: 'Fresh spring greens', category: 'Green', gradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)', colors: ['#4ADE80', '#22C55E'], tags: ['spring', 'meadow', 'fresh'] },
  { id: 'green-5', name: 'Jungle', description: 'Dense jungle foliage', category: 'Green', gradient: 'linear-gradient(135deg, #15803D 0%, #166534 100%)', colors: ['#15803D', '#166534'], tags: ['jungle', 'dense', 'tropical'] },
  { id: 'green-6', name: 'Lime Zest', description: 'Zesty lime citrus', category: 'Green', gradient: 'linear-gradient(135deg, #84CC16 0%, #65A30D 100%)', colors: ['#84CC16', '#65A30D'], tags: ['lime', 'citrus', 'zesty'] },
  { id: 'green-7', name: 'Seafoam', description: 'Soft seafoam green', category: 'Green', gradient: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)', colors: ['#6EE7B7', '#34D399'], tags: ['seafoam', 'soft', 'ocean'] },
  { id: 'green-8', name: 'Jade', description: 'Elegant jade stone', category: 'Green', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)', colors: ['#10B981', '#059669', '#047857'], tags: ['jade', 'elegant', 'stone'] },
  { id: 'green-9', name: 'Olive Grove', description: 'Mediterranean olives', category: 'Green', gradient: 'linear-gradient(135deg, #65A30D 0%, #4D7C0F 100%)', colors: ['#65A30D', '#4D7C0F'], tags: ['olive', 'mediterranean', 'warm'] },
  { id: 'green-10', name: 'Teal Garden', description: 'Teal garden blend', category: 'Green', gradient: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)', colors: ['#2DD4BF', '#14B8A6'], tags: ['teal', 'garden', 'blend'] },
  { id: 'green-11', name: 'Fern', description: 'Delicate fern fronds', category: 'Green', gradient: 'linear-gradient(135deg, #86EFAC 0%, #4ADE80 100%)', colors: ['#86EFAC', '#4ADE80'], tags: ['fern', 'delicate', 'nature'] },
  { id: 'green-12', name: 'Pine Forest', description: 'Deep pine forest', category: 'Green', gradient: 'linear-gradient(135deg, #166534 0%, #14532D 100%)', colors: ['#166534', '#14532D'], tags: ['pine', 'forest', 'deep'] },
  { id: 'green-13', name: 'Matcha', description: 'Japanese matcha green', category: 'Green', gradient: 'linear-gradient(135deg, #BEF264 0%, #A3E635 100%)', colors: ['#BEF264', '#A3E635'], tags: ['matcha', 'japanese', 'tea'] },
  { id: 'green-14', name: 'Aqua Marine', description: 'Ocean aquamarine', category: 'Green', gradient: 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 100%)', colors: ['#5EEAD4', '#2DD4BF'], tags: ['aqua', 'marine', 'ocean'] },
  { id: 'green-15', name: 'Moss', description: 'Soft forest moss', category: 'Green', gradient: 'linear-gradient(135deg, #4D7C0F 0%, #3F6212 100%)', colors: ['#4D7C0F', '#3F6212'], tags: ['moss', 'forest', 'soft'] },

  // Pink (46-60)
  { id: 'pink-1', name: 'Rose Petal', description: 'Delicate rose petals', category: 'Pink', gradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)', colors: ['#F472B6', '#EC4899'], tags: ['rose', 'romantic', 'soft'] },
  { id: 'pink-2', name: 'Hot Pink', description: 'Vibrant hot pink', category: 'Pink', gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', colors: ['#EC4899', '#DB2777'], tags: ['hot', 'vibrant', 'bold'] },
  { id: 'pink-3', name: 'Blush', description: 'Soft blush tones', category: 'Pink', gradient: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)', colors: ['#FBCFE8', '#F9A8D4'], tags: ['blush', 'soft', 'feminine'] },
  { id: 'pink-4', name: 'Coral Sunset', description: 'Warm coral sunset', category: 'Pink', gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)', colors: ['#FB7185', '#F43F5E'], tags: ['coral', 'sunset', 'warm'] },
  { id: 'pink-5', name: 'Fuchsia', description: 'Bold fuchsia flower', category: 'Pink', gradient: 'linear-gradient(135deg, #D946EF 0%, #C026D3 100%)', colors: ['#D946EF', '#C026D3'], tags: ['fuchsia', 'bold', 'flower'] },
  { id: 'pink-6', name: 'Cherry Blossom', description: 'Japanese cherry blossoms', category: 'Pink', gradient: 'linear-gradient(135deg, #FDA4AF 0%, #FB7185 100%)', colors: ['#FDA4AF', '#FB7185'], tags: ['cherry', 'blossom', 'spring'] },
  { id: 'pink-7', name: 'Magenta', description: 'Deep magenta shade', category: 'Pink', gradient: 'linear-gradient(135deg, #A21CAF 0%, #86198F 100%)', colors: ['#A21CAF', '#86198F'], tags: ['magenta', 'deep', 'rich'] },
  { id: 'pink-8', name: 'Cotton Candy', description: 'Sweet cotton candy', category: 'Pink', gradient: 'linear-gradient(135deg, #F9A8D4 0%, #F472B6 100%)', colors: ['#F9A8D4', '#F472B6'], tags: ['candy', 'sweet', 'fun'] },
  { id: 'pink-9', name: 'Flamingo', description: 'Tropical flamingo pink', category: 'Pink', gradient: 'linear-gradient(135deg, #F472B6 0%, #E879F9 100%)', colors: ['#F472B6', '#E879F9'], tags: ['flamingo', 'tropical', 'fun'] },
  { id: 'pink-10', name: 'Berry Crush', description: 'Crushed berry juice', category: 'Pink', gradient: 'linear-gradient(135deg, #BE185D 0%, #9D174D 100%)', colors: ['#BE185D', '#9D174D'], tags: ['berry', 'crush', 'juice'] },
  { id: 'pink-11', name: 'Peony', description: 'Elegant peony flowers', category: 'Pink', gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%)', colors: ['#FDF2F8', '#FCE7F3', '#FBCFE8'], tags: ['peony', 'elegant', 'wedding'] },
  { id: 'pink-12', name: 'Raspberry', description: 'Fresh raspberry', category: 'Pink', gradient: 'linear-gradient(135deg, #DB2777 0%, #BE185D 100%)', colors: ['#DB2777', '#BE185D'], tags: ['raspberry', 'fresh', 'fruit'] },
  { id: 'pink-13', name: 'Bubblegum', description: 'Playful bubblegum', category: 'Pink', gradient: 'linear-gradient(135deg, #F9A8D4 0%, #EC4899 100%)', colors: ['#F9A8D4', '#EC4899'], tags: ['bubblegum', 'playful', 'fun'] },
  { id: 'pink-14', name: 'Rose Gold', description: 'Metallic rose gold', category: 'Pink', gradient: 'linear-gradient(135deg, #FCD5CE 0%, #F8EDEB 50%, #FAE1DD 100%)', colors: ['#FCD5CE', '#F8EDEB', '#FAE1DD'], tags: ['rose gold', 'metallic', 'luxury'] },
  { id: 'pink-15', name: 'Watermelon', description: 'Fresh watermelon slice', category: 'Pink', gradient: 'linear-gradient(135deg, #FB7185 0%, #22C55E 100%)', colors: ['#FB7185', '#22C55E'], tags: ['watermelon', 'fresh', 'summer'] },

  // Orange (61-70)
  { id: 'orange-1', name: 'Sunset Fire', description: 'Blazing sunset orange', category: 'Orange', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', colors: ['#F97316', '#EA580C'], tags: ['sunset', 'fire', 'warm'] },
  { id: 'orange-2', name: 'Tangerine', description: 'Fresh tangerine citrus', category: 'Orange', gradient: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)', colors: ['#FB923C', '#F97316'], tags: ['tangerine', 'citrus', 'fresh'] },
  { id: 'orange-3', name: 'Amber Glow', description: 'Warm amber glow', category: 'Orange', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', colors: ['#FBBF24', '#F59E0B'], tags: ['amber', 'glow', 'warm'] },
  { id: 'orange-4', name: 'Peach', description: 'Soft peach tones', category: 'Orange', gradient: 'linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)', colors: ['#FDBA74', '#FB923C'], tags: ['peach', 'soft', 'gentle'] },
  { id: 'orange-5', name: 'Autumn Leaves', description: 'Fall autumn colors', category: 'Orange', gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', colors: ['#EA580C', '#C2410C'], tags: ['autumn', 'fall', 'leaves'] },
  { id: 'orange-6', name: 'Mango Tango', description: 'Tropical mango blend', category: 'Orange', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)', colors: ['#FBBF24', '#F97316'], tags: ['mango', 'tropical', 'fruit'] },
  { id: 'orange-7', name: 'Coral Reef', description: 'Ocean coral reef', category: 'Orange', gradient: 'linear-gradient(135deg, #F97316 0%, #FB7185 100%)', colors: ['#F97316', '#FB7185'], tags: ['coral', 'reef', 'ocean'] },
  { id: 'orange-8', name: 'Copper', description: 'Metallic copper shine', category: 'Orange', gradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)', colors: ['#C2410C', '#9A3412'], tags: ['copper', 'metallic', 'warm'] },
  { id: 'orange-9', name: 'Sunrise', description: 'Early morning sunrise', category: 'Orange', gradient: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 50%, #FB923C 100%)', colors: ['#FED7AA', '#FDBA74', '#FB923C'], tags: ['sunrise', 'morning', 'new'] },
  { id: 'orange-10', name: 'Pumpkin Spice', description: 'Warm pumpkin spice', category: 'Orange', gradient: 'linear-gradient(135deg, #EA580C 0%, #DC2626 100%)', colors: ['#EA580C', '#DC2626'], tags: ['pumpkin', 'spice', 'autumn'] },

  // Yellow (71-75)
  { id: 'yellow-1', name: 'Sunshine', description: 'Bright sunny rays', category: 'Yellow', gradient: 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)', colors: ['#FDE047', '#FACC15'], tags: ['sunshine', 'bright', 'happy'] },
  { id: 'yellow-2', name: 'Golden Hour', description: 'Perfect golden light', category: 'Yellow', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', colors: ['#FBBF24', '#F59E0B'], tags: ['golden', 'hour', 'warm'] },
  { id: 'yellow-3', name: 'Lemon Zest', description: 'Fresh lemon citrus', category: 'Yellow', gradient: 'linear-gradient(135deg, #FEF08A 0%, #FDE047 100%)', colors: ['#FEF08A', '#FDE047'], tags: ['lemon', 'citrus', 'fresh'] },
  { id: 'yellow-4', name: 'Honey', description: 'Sweet golden honey', category: 'Yellow', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', colors: ['#F59E0B', '#D97706'], tags: ['honey', 'sweet', 'golden'] },
  { id: 'yellow-5', name: 'Canary', description: 'Bright canary yellow', category: 'Yellow', gradient: 'linear-gradient(135deg, #FACC15 0%, #EAB308 100%)', colors: ['#FACC15', '#EAB308'], tags: ['canary', 'bright', 'cheerful'] },

  // Pastel (76-85)
  { id: 'pastel-1', name: 'Cotton Cloud', description: 'Soft pastel clouds', category: 'Pastel', gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #E0E7FF 100%)', colors: ['#FDF2F8', '#FCE7F3', '#E0E7FF'], tags: ['cotton', 'cloud', 'soft'] },
  { id: 'pastel-2', name: 'Unicorn', description: 'Magical unicorn palette', category: 'Pastel', gradient: 'linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 33%, #E9D5FF 66%, #DDD6FE 100%)', colors: ['#FDF4FF', '#FAE8FF', '#E9D5FF', '#DDD6FE'], tags: ['unicorn', 'magical', 'fantasy'] },
  { id: 'pastel-3', name: 'Baby Blue', description: 'Gentle baby blue', category: 'Pastel', gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', colors: ['#E0F2FE', '#BAE6FD'], tags: ['baby', 'gentle', 'calm'] },
  { id: 'pastel-4', name: 'Mint Cream', description: 'Creamy mint tones', category: 'Pastel', gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', colors: ['#ECFDF5', '#D1FAE5'], tags: ['mint', 'cream', 'fresh'] },
  { id: 'pastel-5', name: 'Peach Sorbet', description: 'Delicate peach sorbet', category: 'Pastel', gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)', colors: ['#FEF3C7', '#FDE68A', '#FCD34D'], tags: ['peach', 'sorbet', 'dessert'] },
  { id: 'pastel-6', name: 'Lavender Mist', description: 'Light lavender haze', category: 'Pastel', gradient: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)', colors: ['#F3E8FF', '#E9D5FF'], tags: ['lavender', 'mist', 'haze'] },
  { id: 'pastel-7', name: 'Rose Quartz', description: 'Soft rose quartz crystal', category: 'Pastel', gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FBCFE8 100%)', colors: ['#FDF2F8', '#FBCFE8'], tags: ['rose', 'quartz', 'crystal'] },
  { id: 'pastel-8', name: 'Sky Whisper', description: 'Whispered sky blue', category: 'Pastel', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', colors: ['#F0F9FF', '#E0F2FE'], tags: ['sky', 'whisper', 'light'] },
  { id: 'pastel-9', name: 'Seafoam Dream', description: 'Dreamy seafoam', category: 'Pastel', gradient: 'linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)', colors: ['#CCFBF1', '#99F6E4'], tags: ['seafoam', 'dream', 'ocean'] },
  { id: 'pastel-10', name: 'Easter Egg', description: 'Festive easter colors', category: 'Pastel', gradient: 'linear-gradient(135deg, #FDF4FF 0%, #CCFBF1 50%, #FEF9C3 100%)', colors: ['#FDF4FF', '#CCFBF1', '#FEF9C3'], tags: ['easter', 'festive', 'spring'] },

  // Dark (86-94)
  { id: 'dark-1', name: 'Charcoal', description: 'Rich charcoal depths', category: 'Dark', gradient: 'linear-gradient(135deg, #374151 0%, #1F2937 100%)', colors: ['#374151', '#1F2937'], tags: ['charcoal', 'dark', 'neutral'] },
  { id: 'dark-2', name: 'Obsidian', description: 'Black obsidian glass', category: 'Dark', gradient: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', colors: ['#1F2937', '#111827'], tags: ['obsidian', 'black', 'glass'] },
  { id: 'dark-3', name: 'Slate Storm', description: 'Dark slate storm', category: 'Dark', gradient: 'linear-gradient(135deg, #475569 0%, #334155 100%)', colors: ['#475569', '#334155'], tags: ['slate', 'storm', 'moody'] },
  { id: 'dark-4', name: 'Midnight', description: 'Deep midnight blue', category: 'Dark', gradient: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)', colors: ['#0F172A', '#020617'], tags: ['midnight', 'deep', 'night'] },
  { id: 'dark-5', name: 'Dark Wine', description: 'Rich dark wine', category: 'Dark', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', colors: ['#7F1D1D', '#450A0A'], tags: ['wine', 'rich', 'luxurious'] },
  { id: 'dark-6', name: 'Deep Purple', description: 'Intense deep purple', category: 'Dark', gradient: 'linear-gradient(135deg, #4C1D95 0%, #2E1065 100%)', colors: ['#4C1D95', '#2E1065'], tags: ['purple', 'intense', 'deep'] },
  { id: 'dark-7', name: 'Dark Teal', description: 'Moody dark teal', category: 'Dark', gradient: 'linear-gradient(135deg, #134E4A 0%, #042F2E 100%)', colors: ['#134E4A', '#042F2E'], tags: ['teal', 'moody', 'ocean'] },
  { id: 'dark-8', name: 'Shadow', description: 'Subtle shadow gradient', category: 'Dark', gradient: 'linear-gradient(135deg, #27272A 0%, #18181B 100%)', colors: ['#27272A', '#18181B'], tags: ['shadow', 'subtle', 'neutral'] },
  { id: 'dark-9', name: 'Dark Forest', description: 'Dense dark forest', category: 'Dark', gradient: 'linear-gradient(135deg, #14532D 0%, #052E16 100%)', colors: ['#14532D', '#052E16'], tags: ['forest', 'dense', 'nature'] },

  // Multi-color (95-100)
  { id: 'multi-1', name: 'Rainbow', description: 'Full spectrum rainbow', category: 'Multi', gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 17%, #FACC15 33%, #22C55E 50%, #3B82F6 67%, #8B5CF6 83%, #EC4899 100%)', colors: ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'], tags: ['rainbow', 'spectrum', 'pride'] },
  { id: 'multi-2', name: 'Sunset Beach', description: 'Tropical sunset on beach', category: 'Multi', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%)', colors: ['#8B5CF6', '#EC4899', '#F97316'], tags: ['sunset', 'beach', 'tropical'] },
  { id: 'multi-3', name: 'Northern Lights', description: 'Aurora borealis colors', category: 'Multi', gradient: 'linear-gradient(135deg, #22C55E 0%, #3B82F6 33%, #8B5CF6 66%, #EC4899 100%)', colors: ['#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'], tags: ['aurora', 'northern', 'lights', 'animated'] },
  { id: 'multi-4', name: 'Candy Shop', description: 'Sweet candy colors', category: 'Multi', gradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 50%, #3B82F6 100%)', colors: ['#F472B6', '#A855F7', '#3B82F6'], tags: ['candy', 'sweet', 'fun'] },
  { id: 'multi-5', name: 'Ocean Sunset', description: 'Ocean meets sunset', category: 'Multi', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 50%, #EC4899 100%)', colors: ['#0EA5E9', '#8B5CF6', '#EC4899'], tags: ['ocean', 'sunset', 'beautiful'] },
  { id: 'multi-6', name: 'Neon Nights', description: 'Vibrant neon glow', category: 'Multi', gradient: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #F43F5E 100%)', colors: ['#22D3EE', '#A855F7', '#F43F5E'], tags: ['neon', 'nights', 'vibrant', 'animated'] },

  // Red (101-120)
  { id: 'red-1', name: 'Crimson', description: 'Deep crimson red', category: 'Red', gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', colors: ['#DC2626', '#B91C1C'], tags: ['crimson', 'bold', 'power'] },
  { id: 'red-2', name: 'Cherry', description: 'Bright cherry red', category: 'Red', gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', colors: ['#EF4444', '#DC2626'], tags: ['cherry', 'fruit', 'vibrant'] },
  { id: 'red-3', name: 'Ruby', description: 'Precious ruby gemstone', category: 'Red', gradient: 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)', colors: ['#991B1B', '#7F1D1D'], tags: ['ruby', 'gem', 'luxury'] },
  { id: 'red-4', name: 'Rose Red', description: 'Deep rose red', category: 'Red', gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)', colors: ['#F43F5E', '#E11D48'], tags: ['rose', 'romantic', 'elegant'] },
  { id: 'red-5', name: 'Scarlet', description: 'Vivid scarlet', category: 'Red', gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)', colors: ['#EF4444', '#F97316'], tags: ['scarlet', 'warm', 'energy'] },
  { id: 'red-6', name: 'Burgundy', description: 'Rich burgundy wine', category: 'Red', gradient: 'linear-gradient(135deg, #881337 0%, #4C0519 100%)', colors: ['#881337', '#4C0519'], tags: ['burgundy', 'wine', 'sophisticated'] },
  { id: 'red-7', name: 'Coral Red', description: 'Soft coral red', category: 'Red', gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)', colors: ['#FB7185', '#F43F5E'], tags: ['coral', 'soft', 'feminine'] },
  { id: 'red-8', name: 'Maroon', description: 'Classic maroon', category: 'Red', gradient: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', colors: ['#7F1D1D', '#450A0A'], tags: ['maroon', 'classic', 'deep'] },
  { id: 'red-9', name: 'Vermillion', description: 'Bright vermillion', category: 'Red', gradient: 'linear-gradient(135deg, #EF4444 0%, #EA580C 100%)', colors: ['#EF4444', '#EA580C'], tags: ['vermillion', 'bright', 'warm'] },
  { id: 'red-10', name: 'Blood Orange', description: 'Deep blood orange', category: 'Red', gradient: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)', colors: ['#DC2626', '#EA580C'], tags: ['blood orange', 'citrus', 'bold'] },
  { id: 'red-11', name: 'Hibiscus', description: 'Tropical hibiscus', category: 'Red', gradient: 'linear-gradient(135deg, #E11D48 0%, #DB2777 100%)', colors: ['#E11D48', '#DB2777'], tags: ['hibiscus', 'tropical', 'flower'] },
  { id: 'red-12', name: 'Raspberry Wine', description: 'Berry wine blend', category: 'Red', gradient: 'linear-gradient(135deg, #BE185D 0%, #881337 100%)', colors: ['#BE185D', '#881337'], tags: ['raspberry', 'wine', 'berry'] },
  { id: 'red-13', name: 'Fire Engine', description: 'Bright fire engine red', category: 'Red', gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)', colors: ['#EF4444', '#DC2626', '#B91C1C'], tags: ['fire', 'bright', 'intense'] },
  { id: 'red-14', name: 'Pomegranate', description: 'Rich pomegranate', category: 'Red', gradient: 'linear-gradient(135deg, #BE123C 0%, #9F1239 100%)', colors: ['#BE123C', '#9F1239'], tags: ['pomegranate', 'fruit', 'rich'] },
  { id: 'red-15', name: 'Sunset Red', description: 'Warm sunset red', category: 'Red', gradient: 'linear-gradient(135deg, #F87171 0%, #EF4444 50%, #DC2626 100%)', colors: ['#F87171', '#EF4444', '#DC2626'], tags: ['sunset', 'warm', 'evening'] },

  // Teal (121-135)
  { id: 'teal-1', name: 'Deep Teal', description: 'Rich deep teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', colors: ['#0D9488', '#0F766E'], tags: ['deep', 'ocean', 'calm'] },
  { id: 'teal-2', name: 'Aqua Teal', description: 'Light aqua teal', category: 'Teal', gradient: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)', colors: ['#2DD4BF', '#14B8A6'], tags: ['aqua', 'light', 'fresh'] },
  { id: 'teal-3', name: 'Peacock', description: 'Peacock feather teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', colors: ['#0891B2', '#0E7490'], tags: ['peacock', 'elegant', 'rich'] },
  { id: 'teal-4', name: 'Turquoise', description: 'Bright turquoise', category: 'Teal', gradient: 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 100%)', colors: ['#5EEAD4', '#2DD4BF'], tags: ['turquoise', 'bright', 'tropical'] },
  { id: 'teal-5', name: 'Sea Glass', description: 'Smooth sea glass', category: 'Teal', gradient: 'linear-gradient(135deg, #99F6E4 0%, #5EEAD4 100%)', colors: ['#99F6E4', '#5EEAD4'], tags: ['sea glass', 'smooth', 'beach'] },
  { id: 'teal-6', name: 'Caribbean', description: 'Caribbean waters', category: 'Teal', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', colors: ['#06B6D4', '#0891B2'], tags: ['caribbean', 'tropical', 'vacation'] },
  { id: 'teal-7', name: 'Mint Teal', description: 'Fresh mint teal', category: 'Teal', gradient: 'linear-gradient(135deg, #34D399 0%, #14B8A6 100%)', colors: ['#34D399', '#14B8A6'], tags: ['mint', 'fresh', 'cool'] },
  { id: 'teal-8', name: 'Ocean Depth', description: 'Deep ocean teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)', colors: ['#0F766E', '#115E59'], tags: ['ocean', 'depth', 'mysterious'] },
  { id: 'teal-9', name: 'Cyan Burst', description: 'Vibrant cyan', category: 'Teal', gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', colors: ['#22D3EE', '#06B6D4'], tags: ['cyan', 'burst', 'vibrant', 'animated'] },
  { id: 'teal-10', name: 'Lagoon', description: 'Tropical lagoon', category: 'Teal', gradient: 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 50%, #14B8A6 100%)', colors: ['#5EEAD4', '#2DD4BF', '#14B8A6'], tags: ['lagoon', 'tropical', 'paradise'] },

  // Neutral (136-155)
  { id: 'neutral-1', name: 'Silver Mist', description: 'Soft silver mist', category: 'Neutral', gradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)', colors: ['#E5E7EB', '#D1D5DB'], tags: ['silver', 'mist', 'subtle'] },
  { id: 'neutral-2', name: 'Platinum', description: 'Elegant platinum', category: 'Neutral', gradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)', colors: ['#F3F4F6', '#E5E7EB'], tags: ['platinum', 'elegant', 'minimal'] },
  { id: 'neutral-3', name: 'Stone', description: 'Natural stone', category: 'Neutral', gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)', colors: ['#9CA3AF', '#6B7280'], tags: ['stone', 'natural', 'earthy'] },
  { id: 'neutral-4', name: 'Concrete', description: 'Urban concrete', category: 'Neutral', gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)', colors: ['#6B7280', '#4B5563'], tags: ['concrete', 'urban', 'industrial'] },
  { id: 'neutral-5', name: 'Ash', description: 'Soft ash gray', category: 'Neutral', gradient: 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)', colors: ['#D1D5DB', '#9CA3AF'], tags: ['ash', 'soft', 'neutral'] },
  { id: 'neutral-6', name: 'Graphite', description: 'Dark graphite', category: 'Neutral', gradient: 'linear-gradient(135deg, #4B5563 0%, #374151 100%)', colors: ['#4B5563', '#374151'], tags: ['graphite', 'dark', 'professional'] },
  { id: 'neutral-7', name: 'Cloud', description: 'Light cloud gray', category: 'Neutral', gradient: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', colors: ['#F9FAFB', '#F3F4F6'], tags: ['cloud', 'light', 'airy'] },
  { id: 'neutral-8', name: 'Pewter', description: 'Metallic pewter', category: 'Neutral', gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%)', colors: ['#9CA3AF', '#6B7280', '#4B5563'], tags: ['pewter', 'metallic', 'classic'] },
  { id: 'neutral-9', name: 'Smoke', description: 'Wispy smoke', category: 'Neutral', gradient: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)', colors: ['#E5E7EB', '#9CA3AF'], tags: ['smoke', 'wispy', 'subtle'] },
  { id: 'neutral-10', name: 'Fog', description: 'Morning fog', category: 'Neutral', gradient: 'linear-gradient(135deg, #F3F4F6 0%, #D1D5DB 50%, #9CA3AF 100%)', colors: ['#F3F4F6', '#D1D5DB', '#9CA3AF'], tags: ['fog', 'morning', 'soft'] },

  // Warm (156-175)
  { id: 'warm-1', name: 'Ember', description: 'Glowing ember warmth', category: 'Warm', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)', colors: ['#F97316', '#EA580C', '#C2410C'], tags: ['ember', 'glow', 'fire'] },
  { id: 'warm-2', name: 'Terracotta', description: 'Earthy terracotta', category: 'Warm', gradient: 'linear-gradient(135deg, #EA580C 0%, #9A3412 100%)', colors: ['#EA580C', '#9A3412'], tags: ['terracotta', 'earthy', 'natural'] },
  { id: 'warm-3', name: 'Caramel', description: 'Sweet caramel', category: 'Warm', gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', colors: ['#D97706', '#B45309'], tags: ['caramel', 'sweet', 'dessert'] },
  { id: 'warm-4', name: 'Bronze', description: 'Metallic bronze', category: 'Warm', gradient: 'linear-gradient(135deg, #B45309 0%, #78350F 100%)', colors: ['#B45309', '#78350F'], tags: ['bronze', 'metallic', 'antique'] },
  { id: 'warm-5', name: 'Cinnamon', description: 'Spicy cinnamon', category: 'Warm', gradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)', colors: ['#C2410C', '#9A3412'], tags: ['cinnamon', 'spicy', 'autumn'] },
  { id: 'warm-6', name: 'Sand Dune', description: 'Desert sand dune', category: 'Warm', gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 50%, #FBBF24 100%)', colors: ['#FDE68A', '#FCD34D', '#FBBF24'], tags: ['sand', 'desert', 'natural'] },
  { id: 'warm-7', name: 'Apricot', description: 'Soft apricot', category: 'Warm', gradient: 'linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)', colors: ['#FDBA74', '#FB923C'], tags: ['apricot', 'soft', 'fruit'] },
  { id: 'warm-8', name: 'Rust', description: 'Weathered rust', category: 'Warm', gradient: 'linear-gradient(135deg, #9A3412 0%, #7C2D12 100%)', colors: ['#9A3412', '#7C2D12'], tags: ['rust', 'weathered', 'vintage'] },
  { id: 'warm-9', name: 'Ginger', description: 'Warm ginger spice', category: 'Warm', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', colors: ['#F59E0B', '#D97706'], tags: ['ginger', 'spice', 'warm'] },
  { id: 'warm-10', name: 'Sandstone', description: 'Natural sandstone', category: 'Warm', gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', colors: ['#FEF3C7', '#FDE68A'], tags: ['sandstone', 'natural', 'subtle'] },

  // Cool (176-195)
  { id: 'cool-1', name: 'Arctic', description: 'Arctic ice blue', category: 'Cool', gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)', colors: ['#E0F2FE', '#BAE6FD', '#7DD3FC'], tags: ['arctic', 'ice', 'cold'] },
  { id: 'cool-2', name: 'Glacier', description: 'Glacial blue', category: 'Cool', gradient: 'linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)', colors: ['#CFFAFE', '#A5F3FC'], tags: ['glacier', 'blue', 'frozen'] },
  { id: 'cool-3', name: 'Winter Mint', description: 'Cool winter mint', category: 'Cool', gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', colors: ['#D1FAE5', '#A7F3D0'], tags: ['winter', 'mint', 'fresh'] },
  { id: 'cool-4', name: 'Frost', description: 'Morning frost', category: 'Cool', gradient: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)', colors: ['#F0FDFA', '#CCFBF1'], tags: ['frost', 'morning', 'cold'] },
  { id: 'cool-5', name: 'Steel Blue', description: 'Cool steel blue', category: 'Cool', gradient: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', colors: ['#7DD3FC', '#38BDF8'], tags: ['steel', 'blue', 'industrial'] },
  { id: 'cool-6', name: 'Moonlight', description: 'Cool moonlight', category: 'Cool', gradient: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)', colors: ['#E0E7FF', '#C7D2FE'], tags: ['moonlight', 'night', 'serene'] },
  { id: 'cool-7', name: 'Ice Cave', description: 'Deep ice cave', category: 'Cool', gradient: 'linear-gradient(135deg, #67E8F9 0%, #22D3EE 50%, #06B6D4 100%)', colors: ['#67E8F9', '#22D3EE', '#06B6D4'], tags: ['ice', 'cave', 'mysterious'] },
  { id: 'cool-8', name: 'Periwinkle', description: 'Soft periwinkle', category: 'Cool', gradient: 'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 100%)', colors: ['#C7D2FE', '#A5B4FC'], tags: ['periwinkle', 'soft', 'calm'] },
  { id: 'cool-9', name: 'Winter Sky', description: 'Clear winter sky', category: 'Cool', gradient: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)', colors: ['#BAE6FD', '#7DD3FC'], tags: ['winter', 'sky', 'clear'] },
  { id: 'cool-10', name: 'Snowdrift', description: 'Fresh snowdrift', category: 'Cool', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)', colors: ['#F0F9FF', '#E0F2FE', '#BAE6FD'], tags: ['snow', 'fresh', 'pure'] },

  // Sunset (196-215)
  { id: 'sunset-1', name: 'Golden Hour', description: 'Perfect golden hour', category: 'Sunset', gradient: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F97316 100%)', colors: ['#FDE68A', '#FBBF24', '#F97316'], tags: ['golden', 'hour', 'warm', 'animated'] },
  { id: 'sunset-2', name: 'Dusk', description: 'Twilight dusk', category: 'Sunset', gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%)', colors: ['#F97316', '#EC4899', '#8B5CF6'], tags: ['dusk', 'twilight', 'evening'] },
  { id: 'sunset-3', name: 'Horizon', description: 'Distant horizon', category: 'Sunset', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 33%, #EC4899 66%, #8B5CF6 100%)', colors: ['#FBBF24', '#F97316', '#EC4899', '#8B5CF6'], tags: ['horizon', 'distant', 'beautiful'] },
  { id: 'sunset-4', name: 'Afterglow', description: 'Sunset afterglow', category: 'Sunset', gradient: 'linear-gradient(135deg, #FB923C 0%, #F472B6 100%)', colors: ['#FB923C', '#F472B6'], tags: ['afterglow', 'warm', 'romantic'] },
  { id: 'sunset-5', name: 'Desert Sunset', description: 'Desert sky at sunset', category: 'Sunset', gradient: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #DC2626 100%)', colors: ['#F59E0B', '#EA580C', '#DC2626'], tags: ['desert', 'sky', 'dramatic'] },
  { id: 'sunset-6', name: 'Tropical Sunset', description: 'Tropical paradise sunset', category: 'Sunset', gradient: 'linear-gradient(135deg, #FACC15 0%, #F97316 33%, #EC4899 66%, #A855F7 100%)', colors: ['#FACC15', '#F97316', '#EC4899', '#A855F7'], tags: ['tropical', 'paradise', 'vacation', 'animated'] },
  { id: 'sunset-7', name: 'California Sunset', description: 'West coast sunset', category: 'Sunset', gradient: 'linear-gradient(135deg, #FCD34D 0%, #FB923C 50%, #F472B6 100%)', colors: ['#FCD34D', '#FB923C', '#F472B6'], tags: ['california', 'west coast', 'chill'] },
  { id: 'sunset-8', name: 'Rose Sunset', description: 'Rosy sunset glow', category: 'Sunset', gradient: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 50%, #FB7185 100%)', colors: ['#FED7AA', '#FDBA74', '#FB7185'], tags: ['rose', 'rosy', 'gentle'] },
  { id: 'sunset-9', name: 'Island Sunset', description: 'Island paradise sunset', category: 'Sunset', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 25%, #EF4444 50%, #EC4899 75%, #8B5CF6 100%)', colors: ['#FBBF24', '#F97316', '#EF4444', '#EC4899', '#8B5CF6'], tags: ['island', 'paradise', 'tropical'] },
  { id: 'sunset-10', name: 'Mountain Sunset', description: 'Sunset over mountains', category: 'Sunset', gradient: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 50%, #7C3AED 100%)', colors: ['#F59E0B', '#DC2626', '#7C3AED'], tags: ['mountain', 'dramatic', 'nature'] },

  // Ocean (216-235)
  { id: 'ocean-1', name: 'Deep Sea', description: 'Deep ocean depths', category: 'Ocean', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)', colors: ['#0EA5E9', '#0284C7', '#0369A1'], tags: ['deep', 'sea', 'mysterious'] },
  { id: 'ocean-2', name: 'Surf', description: 'Ocean surf waves', category: 'Ocean', gradient: 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)', colors: ['#22D3EE', '#0EA5E9'], tags: ['surf', 'waves', 'beach', 'animated'] },
  { id: 'ocean-3', name: 'Coral Reef', description: 'Vibrant coral reef', category: 'Ocean', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #FB7185 100%)', colors: ['#06B6D4', '#0891B2', '#FB7185'], tags: ['coral', 'reef', 'tropical'] },
  { id: 'ocean-4', name: 'Seafoam', description: 'Light seafoam', category: 'Ocean', gradient: 'linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 50%, #34D399 100%)', colors: ['#A7F3D0', '#6EE7B7', '#34D399'], tags: ['seafoam', 'light', 'fresh'] },
  { id: 'ocean-5', name: 'Tide Pool', description: 'Calm tide pool', category: 'Ocean', gradient: 'linear-gradient(135deg, #67E8F9 0%, #5EEAD4 50%, #34D399 100%)', colors: ['#67E8F9', '#5EEAD4', '#34D399'], tags: ['tide', 'pool', 'calm'] },
  { id: 'ocean-6', name: 'Whale Song', description: 'Deep whale habitat', category: 'Ocean', gradient: 'linear-gradient(135deg, #0369A1 0%, #075985 50%, #164E63 100%)', colors: ['#0369A1', '#075985', '#164E63'], tags: ['whale', 'deep', 'majestic'] },
  { id: 'ocean-7', name: 'Tropical Water', description: 'Crystal clear tropical water', category: 'Ocean', gradient: 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 50%, #14B8A6 100%)', colors: ['#5EEAD4', '#2DD4BF', '#14B8A6'], tags: ['tropical', 'crystal', 'clear'] },
  { id: 'ocean-8', name: 'Atlantic Blue', description: 'Atlantic ocean blue', category: 'Ocean', gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)', colors: ['#3B82F6', '#2563EB', '#1D4ED8'], tags: ['atlantic', 'blue', 'vast'] },
  { id: 'ocean-9', name: 'Pacific', description: 'Pacific ocean waves', category: 'Ocean', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0891B2 100%)', colors: ['#0EA5E9', '#0891B2'], tags: ['pacific', 'waves', 'serene', 'animated'] },
  { id: 'ocean-10', name: 'Marine Life', description: 'Vibrant marine ecosystem', category: 'Ocean', gradient: 'linear-gradient(135deg, #22D3EE 0%, #14B8A6 33%, #34D399 66%, #4ADE80 100%)', colors: ['#22D3EE', '#14B8A6', '#34D399', '#4ADE80'], tags: ['marine', 'life', 'vibrant'] },

  // Nature (236-260)
  { id: 'nature-1', name: 'Forest Floor', description: 'Dappled forest floor', category: 'Nature', gradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 50%, #16A34A 100%)', colors: ['#4ADE80', '#22C55E', '#16A34A'], tags: ['forest', 'floor', 'dappled'] },
  { id: 'nature-2', name: 'Mountain Peak', description: 'Snow-capped mountain', category: 'Nature', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #CBD5E1 50%, #64748B 100%)', colors: ['#F0F9FF', '#CBD5E1', '#64748B'], tags: ['mountain', 'peak', 'majestic'] },
  { id: 'nature-3', name: 'Autumn Forest', description: 'Fall foliage colors', category: 'Nature', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 33%, #DC2626 66%, #9A3412 100%)', colors: ['#FBBF24', '#F97316', '#DC2626', '#9A3412'], tags: ['autumn', 'fall', 'foliage', 'animated'] },
  { id: 'nature-4', name: 'Meadow', description: 'Sunlit meadow', category: 'Nature', gradient: 'linear-gradient(135deg, #BEF264 0%, #84CC16 50%, #65A30D 100%)', colors: ['#BEF264', '#84CC16', '#65A30D'], tags: ['meadow', 'sunlit', 'grass'] },
  { id: 'nature-5', name: 'Wildflower', description: 'Field of wildflowers', category: 'Nature', gradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 33%, #3B82F6 66%, #22C55E 100%)', colors: ['#F472B6', '#A855F7', '#3B82F6', '#22C55E'], tags: ['wildflower', 'field', 'colorful'] },
  { id: 'nature-6', name: 'River Stone', description: 'Smooth river stones', category: 'Nature', gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%)', colors: ['#9CA3AF', '#6B7280', '#4B5563'], tags: ['river', 'stone', 'smooth'] },
  { id: 'nature-7', name: 'Spring Bloom', description: 'Cherry blossom spring', category: 'Nature', gradient: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 50%, #F472B6 100%)', colors: ['#FBCFE8', '#F9A8D4', '#F472B6'], tags: ['spring', 'bloom', 'cherry'] },
  { id: 'nature-8', name: 'Desert Dawn', description: 'Desert at dawn', category: 'Nature', gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 33%, #FBBF24 66%, #F97316 100%)', colors: ['#FEF3C7', '#FDE68A', '#FBBF24', '#F97316'], tags: ['desert', 'dawn', 'warm'] },
  { id: 'nature-9', name: 'Rainforest', description: 'Lush rainforest', category: 'Nature', gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 33%, #15803D 66%, #166534 100%)', colors: ['#22C55E', '#16A34A', '#15803D', '#166534'], tags: ['rainforest', 'lush', 'tropical'] },
  { id: 'nature-10', name: 'Sunset Lake', description: 'Lake at sunset', category: 'Nature', gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #3B82F6 100%)', colors: ['#F97316', '#EC4899', '#3B82F6'], tags: ['sunset', 'lake', 'reflection'] },

  // Abstract (261-285)
  { id: 'abstract-1', name: 'Neon Dreams', description: 'Futuristic neon glow', category: 'Abstract', gradient: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #EC4899 100%)', colors: ['#22D3EE', '#A855F7', '#EC4899'], tags: ['neon', 'futuristic', 'glow', 'animated'] },
  { id: 'abstract-2', name: 'Digital Rain', description: 'Matrix digital rain', category: 'Abstract', gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 50%, #15803D 100%)', colors: ['#22C55E', '#16A34A', '#15803D'], tags: ['digital', 'matrix', 'tech'] },
  { id: 'abstract-3', name: 'Cosmic Dust', description: 'Interstellar cosmic dust', category: 'Abstract', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 33%, #3B82F6 66%, #0EA5E9 100%)', colors: ['#8B5CF6', '#6366F1', '#3B82F6', '#0EA5E9'], tags: ['cosmic', 'dust', 'space', 'animated'] },
  { id: 'abstract-4', name: 'Prism', description: 'Light through prism', category: 'Abstract', gradient: 'linear-gradient(135deg, #EF4444 0%, #FACC15 20%, #22C55E 40%, #3B82F6 60%, #8B5CF6 80%, #EC4899 100%)', colors: ['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'], tags: ['prism', 'light', 'spectrum'] },
  { id: 'abstract-5', name: 'Vaporwave', description: '80s vaporwave aesthetic', category: 'Abstract', gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)', colors: ['#EC4899', '#8B5CF6', '#06B6D4'], tags: ['vaporwave', '80s', 'retro', 'animated'] },
  { id: 'abstract-6', name: 'Holographic', description: 'Holographic shimmer', category: 'Abstract', gradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 25%, #3B82F6 50%, #34D399 75%, #FACC15 100%)', colors: ['#F472B6', '#A855F7', '#3B82F6', '#34D399', '#FACC15'], tags: ['holographic', 'shimmer', 'iridescent'] },
  { id: 'abstract-7', name: 'Synthwave', description: 'Synthwave sunset', category: 'Abstract', gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%)', colors: ['#F97316', '#EC4899', '#8B5CF6'], tags: ['synthwave', 'retro', 'music'] },
  { id: 'abstract-8', name: 'Cyberpunk', description: 'Cyberpunk neon city', category: 'Abstract', gradient: 'linear-gradient(135deg, #22D3EE 0%, #EC4899 100%)', colors: ['#22D3EE', '#EC4899'], tags: ['cyberpunk', 'neon', 'city', 'animated'] },
  { id: 'abstract-9', name: 'Glitch', description: 'Digital glitch art', category: 'Abstract', gradient: 'linear-gradient(135deg, #EF4444 0%, #22D3EE 33%, #EC4899 66%, #22C55E 100%)', colors: ['#EF4444', '#22D3EE', '#EC4899', '#22C55E'], tags: ['glitch', 'digital', 'art'] },
  { id: 'abstract-10', name: 'Plasma', description: 'Flowing plasma energy', category: 'Abstract', gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 33%, #F97316 66%, #FACC15 100%)', colors: ['#A855F7', '#EC4899', '#F97316', '#FACC15'], tags: ['plasma', 'energy', 'flow', 'animated'] },

  // Subtle (286-310) - Very subtle gradients with low contrast
  { id: 'subtle-1', name: 'Whisper White', description: 'Barely there white gradient', category: 'Subtle', gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 50%, #F5F5F5 100%)', colors: ['#FFFFFF', '#FAFAFA', '#F5F5F5'], tags: ['white', 'minimal', 'clean'] },
  { id: 'subtle-2', name: 'Soft Gray', description: 'Gentle gray transition', category: 'Subtle', gradient: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', colors: ['#F9FAFB', '#F3F4F6'], tags: ['gray', 'soft', 'neutral'] },
  { id: 'subtle-3', name: 'Cream', description: 'Warm cream tones', category: 'Subtle', gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', colors: ['#FFFBEB', '#FEF3C7'], tags: ['cream', 'warm', 'cozy'] },
  { id: 'subtle-4', name: 'Blush Hint', description: 'Hint of blush pink', category: 'Subtle', gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)', colors: ['#FDF2F8', '#FCE7F3'], tags: ['blush', 'hint', 'delicate'] },
  { id: 'subtle-5', name: 'Sky Whisper', description: 'Faintest sky blue', category: 'Subtle', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', colors: ['#F0F9FF', '#E0F2FE'], tags: ['sky', 'faint', 'airy'] },

  // Complex - Multi-stop premium gradients optimized for animation
  { id: 'complex-1', name: 'Aurora Borealis', description: 'Northern lights dancing in the sky', category: 'Multi', gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 25%, #00C9FF 50%, #92FE9D 75%, #00C9FF 100%)', colors: ['#00C9FF', '#92FE9D', '#00C9FF', '#92FE9D', '#00C9FF'], tags: ['aurora', 'northern lights', 'animated', 'premium'] },
  { id: 'complex-2', name: 'Nebula Dream', description: 'Deep space nebula with cosmic colors', category: 'Multi', gradient: 'linear-gradient(135deg, #0F0C29 0%, #302B63 25%, #24243E 50%, #302B63 75%, #0F0C29 100%)', colors: ['#0F0C29', '#302B63', '#24243E', '#302B63', '#0F0C29'], tags: ['nebula', 'space', 'cosmic', 'dark', 'animated'] },
  { id: 'complex-3', name: 'Holographic', description: 'Iridescent holographic shimmer', category: 'Multi', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FEC89A 16%, #FFF3B0 32%, #C1FBA4 48%, #7BF1A8 64%, #7FD8BE 80%, #A594F9 100%)', colors: ['#FF6B6B', '#FEC89A', '#FFF3B0', '#C1FBA4', '#7BF1A8', '#7FD8BE', '#A594F9'], tags: ['holographic', 'iridescent', 'rainbow', 'animated', 'premium'] },
  { id: 'complex-4', name: 'Sunset Beach', description: 'Vibrant beach sunset palette', category: 'Sunset', gradient: 'linear-gradient(135deg, #FF512F 0%, #F09819 25%, #FFEB3B 50%, #F09819 75%, #DD2476 100%)', colors: ['#FF512F', '#F09819', '#FFEB3B', '#F09819', '#DD2476'], tags: ['sunset', 'beach', 'warm', 'animated', 'vibrant'] },
  { id: 'complex-5', name: 'Cyberpunk City', description: 'Neon-lit futuristic cityscape', category: 'Abstract', gradient: 'linear-gradient(135deg, #0D0221 0%, #0F084B 20%, #26081C 40%, #49111C 60%, #0D0221 80%, #190A05 100%)', colors: ['#0D0221', '#0F084B', '#26081C', '#49111C', '#0D0221', '#190A05'], tags: ['cyberpunk', 'neon', 'futuristic', 'dark', 'animated'] },
  { id: 'complex-6', name: 'Ocean Depths', description: 'Deep underwater color journey', category: 'Ocean', gradient: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 20%, #90E0EF 40%, #CAF0F8 60%, #90E0EF 80%, #0077B6 100%)', colors: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8', '#90E0EF', '#0077B6'], tags: ['ocean', 'underwater', 'deep', 'animated', 'blue'] },
  { id: 'complex-7', name: 'Liquid Metal', description: 'Flowing metallic mercury', category: 'Abstract', gradient: 'linear-gradient(135deg, #C0C0C0 0%, #808080 25%, #E8E8E8 50%, #A0A0A0 75%, #C0C0C0 100%)', colors: ['#C0C0C0', '#808080', '#E8E8E8', '#A0A0A0', '#C0C0C0'], tags: ['metal', 'liquid', 'silver', 'animated', 'metallic'] },
  { id: 'complex-8', name: 'Fire Storm', description: 'Blazing inferno gradient', category: 'Warm', gradient: 'linear-gradient(135deg, #FF0000 0%, #FF4500 20%, #FF8C00 40%, #FFD700 60%, #FF8C00 80%, #FF0000 100%)', colors: ['#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FF8C00', '#FF0000'], tags: ['fire', 'flame', 'hot', 'animated', 'intense'] },
  { id: 'complex-9', name: 'Enchanted Forest', description: 'Magical forest at twilight', category: 'Nature', gradient: 'linear-gradient(135deg, #134E5E 0%, #71B280 25%, #134E5E 50%, #2C5364 75%, #0F2027 100%)', colors: ['#134E5E', '#71B280', '#134E5E', '#2C5364', '#0F2027'], tags: ['forest', 'magical', 'twilight', 'animated', 'nature'] },
  { id: 'complex-10', name: 'Galaxy Swirl', description: 'Spiral galaxy with stars', category: 'Abstract', gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 20%, #0F3460 40%, #E94560 60%, #0F3460 80%, #1A1A2E 100%)', colors: ['#1A1A2E', '#16213E', '#0F3460', '#E94560', '#0F3460', '#1A1A2E'], tags: ['galaxy', 'space', 'swirl', 'animated', 'cosmic'] },
  { id: 'complex-11', name: 'Candy Pop', description: 'Sweet candy color explosion', category: 'Abstract', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FEC89A 20%, #F8B500 40%, #FF6B6B 60%, #C06C84 80%, #6C5B7B 100%)', colors: ['#FF6B6B', '#FEC89A', '#F8B500', '#FF6B6B', '#C06C84', '#6C5B7B'], tags: ['candy', 'pop', 'sweet', 'animated', 'fun'] },
  { id: 'complex-12', name: 'Prism Light', description: 'Light through a prism', category: 'Multi', gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 16%, #F093FB 32%, #F5576C 48%, #FFC107 64%, #4FACFE 80%, #667EEA 100%)', colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C', '#FFC107', '#4FACFE', '#667EEA'], tags: ['prism', 'light', 'rainbow', 'animated', 'spectrum'] },
  { id: 'complex-13', name: 'Moonrise', description: 'Moon rising over mountains', category: 'Nature', gradient: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 25%, #C4E0E5 50%, #F2F2F2 75%, #2C3E50 100%)', colors: ['#2C3E50', '#4CA1AF', '#C4E0E5', '#F2F2F2', '#2C3E50'], tags: ['moon', 'night', 'mountain', 'animated', 'serene'] },
  { id: 'complex-14', name: 'Tropical Punch', description: 'Tropical fruit medley', category: 'Warm', gradient: 'linear-gradient(135deg, #F857A6 0%, #FF5858 25%, #FFBA5A 50%, #F5D020 75%, #F857A6 100%)', colors: ['#F857A6', '#FF5858', '#FFBA5A', '#F5D020', '#F857A6'], tags: ['tropical', 'fruit', 'punch', 'animated', 'vibrant'] },
  { id: 'complex-15', name: 'Mermaid Scales', description: 'Shimmering mermaid tail', category: 'Multi', gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 25%, #11998E 50%, #00D4FF 75%, #38EF7D 100%)', colors: ['#11998E', '#38EF7D', '#11998E', '#00D4FF', '#38EF7D'], tags: ['mermaid', 'scales', 'shimmer', 'animated', 'fantasy'] },
  { id: 'complex-16', name: 'Neon Nights', description: 'Glowing neon signs', category: 'Abstract', gradient: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 25%, #FF00FF 50%, #FFFF00 75%, #00FFFF 100%)', colors: ['#FF00FF', '#00FFFF', '#FF00FF', '#FFFF00', '#00FFFF'], tags: ['neon', 'nights', 'glow', 'animated', 'electric'] },
  { id: 'complex-17', name: 'Storm Clouds', description: 'Dramatic storm approaching', category: 'Dark', gradient: 'linear-gradient(135deg, #373B44 0%, #4286F4 25%, #373B44 50%, #0F2027 75%, #4286F4 100%)', colors: ['#373B44', '#4286F4', '#373B44', '#0F2027', '#4286F4'], tags: ['storm', 'clouds', 'dramatic', 'animated', 'weather'] },
  { id: 'complex-18', name: 'Rose Garden', description: 'Blooming roses at dawn', category: 'Nature', gradient: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 20%, #FF9A9E 40%, #FECFEF 60%, #FCB69F 80%, #FFECD2 100%)', colors: ['#FFECD2', '#FCB69F', '#FF9A9E', '#FECFEF', '#FCB69F', '#FFECD2'], tags: ['rose', 'garden', 'bloom', 'animated', 'floral'] },
  { id: 'complex-19', name: 'Peacock Feather', description: 'Iridescent peacock colors', category: 'Multi', gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 20%, #2C5364 40%, #11998E 60%, #38EF7D 80%, #0F2027 100%)', colors: ['#0F2027', '#203A43', '#2C5364', '#11998E', '#38EF7D', '#0F2027'], tags: ['peacock', 'feather', 'iridescent', 'animated', 'elegant'] },
  { id: 'complex-20', name: 'Cotton Candy Sky', description: 'Pastel sunset clouds', category: 'Pastel', gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 20%, #E6E6FA 40%, #B0E0E6 60%, #FFC0CB 80%, #FFB6C1 100%)', colors: ['#FFB6C1', '#FFC0CB', '#E6E6FA', '#B0E0E6', '#FFC0CB', '#FFB6C1'], tags: ['cotton candy', 'sky', 'pastel', 'animated', 'dreamy'] },
];

export const gradientCategories: (GradientCategory | 'All' | 'Favorites' | 'Animated')[] = [
  'All',
  'Favorites',
  'Animated',
  'Purple',
  'Blue',
  'Green',
  'Pink',
  'Red',
  'Orange',
  'Yellow',
  'Teal',
  'Pastel',
  'Neutral',
  'Warm',
  'Cool',
  'Sunset',
  'Ocean',
  'Nature',
  'Abstract',
  'Subtle',
  'Dark',
  'Multi',
];

export function getGradientById(id: string): Gradient | undefined {
  return gradients.find((g) => g.id === id);
}

export function getGradientsByCategory(category: string): Gradient[] {
  if (category === 'All') return gradients;
  if (category === 'Animated') {
    return gradients.filter((g) => g.tags.includes('animated'));
  }
  return gradients.filter((g) => g.category === category);
}

export function searchGradients(query: string): Gradient[] {
  const lowerQuery = query.toLowerCase();
  return gradients.filter(
    (g) =>
      g.name.toLowerCase().includes(lowerQuery) ||
      g.description.toLowerCase().includes(lowerQuery) ||
      g.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      g.colors.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}

export function getRandomGradient(): Gradient {
  const index = Math.floor(Math.random() * gradients.length);
  return gradients[index] ?? gradients[0]!;
}
