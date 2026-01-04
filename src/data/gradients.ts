import type { Gradient, GradientCategory } from '@/types';

/**
 * Curated gradient presets
 *
 * Design principles:
 * - Only smooth 2-color gradients (gradual transitions)
 * - Colors within same family (no rainbow effects)
 * - Categories match header UI exactly
 */
export const gradients: Gradient[] = [
  // Purple (smooth violet/lavender gradients)
  { id: 'purple-1', name: 'Velvet Dream', description: 'Rich violet to soft lavender', category: 'Purple', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'], tags: ['elegant', 'professional', 'hero'] },
  { id: 'purple-2', name: 'Cosmic Purple', description: 'Deep space purple tones', category: 'Purple', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', colors: ['#8B5CF6', '#6366F1'], tags: ['cosmic', 'tech', 'modern'] },
  { id: 'purple-3', name: 'Grape Fusion', description: 'Vibrant grape shades', category: 'Purple', gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', colors: ['#A855F7', '#7C3AED'], tags: ['vibrant', 'creative', 'bold'] },
  { id: 'purple-4', name: 'Plum Mist', description: 'Soft plum to violet', category: 'Purple', gradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)', colors: ['#C084FC', '#A855F7'], tags: ['soft', 'feminine', 'gentle'] },
  { id: 'purple-5', name: 'Violet Storm', description: 'Dynamic violet energy', category: 'Purple', gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)', colors: ['#7C3AED', '#4F46E5'], tags: ['dynamic', 'energy', 'power'] },
  { id: 'purple-6', name: 'Deep Violet', description: 'Intense violet depths', category: 'Purple', gradient: 'linear-gradient(135deg, #5B21B6 0%, #4C1D95 100%)', colors: ['#5B21B6', '#4C1D95'], tags: ['deep', 'intense', 'dramatic'] },
  { id: 'purple-7', name: 'Orchid Bloom', description: 'Delicate orchid petals', category: 'Purple', gradient: 'linear-gradient(135deg, #E879F9 0%, #D946EF 100%)', colors: ['#E879F9', '#D946EF'], tags: ['floral', 'spring', 'fresh'] },
  { id: 'purple-8', name: 'Iris Glow', description: 'Glowing iris hues', category: 'Purple', gradient: 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)', colors: ['#818CF8', '#6366F1'], tags: ['glow', 'light', 'bright'] },
  { id: 'purple-9', name: 'Mauve Whisper', description: 'Subtle mauve tones', category: 'Purple', gradient: 'linear-gradient(135deg, #F5D0FE 0%, #E9D5FF 100%)', colors: ['#F5D0FE', '#E9D5FF'], tags: ['subtle', 'whisper', 'delicate'] },
  { id: 'purple-10', name: 'Byzantine', description: 'Ancient Byzantine purple', category: 'Purple', gradient: 'linear-gradient(135deg, #6B21A8 0%, #581C87 100%)', colors: ['#6B21A8', '#581C87'], tags: ['ancient', 'historic', 'rich'] },

  // Blue (ocean and sky blues)
  { id: 'blue-1', name: 'Ocean Depth', description: 'Deep ocean blue tones', category: 'Blue', gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', colors: ['#3B82F6', '#1D4ED8'], tags: ['ocean', 'deep', 'professional'] },
  { id: 'blue-2', name: 'Sky Breeze', description: 'Light sky blue gradient', category: 'Blue', gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', colors: ['#60A5FA', '#3B82F6'], tags: ['sky', 'light', 'fresh'] },
  { id: 'blue-3', name: 'Azure Dream', description: 'Dreamy azure tones', category: 'Blue', gradient: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', colors: ['#38BDF8', '#0EA5E9'], tags: ['azure', 'dream', 'calm'] },
  { id: 'blue-4', name: 'Midnight Blue', description: 'Deep midnight shades', category: 'Blue', gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)', colors: ['#1E3A8A', '#1E40AF'], tags: ['midnight', 'dark', 'elegant'] },
  { id: 'blue-5', name: 'Sapphire', description: 'Rich sapphire gemstone', category: 'Blue', gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', colors: ['#2563EB', '#1D4ED8'], tags: ['sapphire', 'gem', 'luxury'] },
  { id: 'blue-6', name: 'Electric Blue', description: 'Vibrant electric charge', category: 'Blue', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)', colors: ['#0EA5E9', '#2563EB'], tags: ['electric', 'vibrant', 'tech'] },
  { id: 'blue-7', name: 'Navy Gradient', description: 'Professional navy tones', category: 'Blue', gradient: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)', colors: ['#1E40AF', '#1E3A8A'], tags: ['navy', 'professional', 'corporate'] },
  { id: 'blue-8', name: 'Cyan Flow', description: 'Flowing cyan stream', category: 'Blue', gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)', colors: ['#22D3EE', '#06B6D4'], tags: ['cyan', 'flow', 'modern'] },
  { id: 'blue-9', name: 'Atlantic', description: 'Atlantic ocean depths', category: 'Blue', gradient: 'linear-gradient(135deg, #0369A1 0%, #075985 100%)', colors: ['#0369A1', '#075985'], tags: ['atlantic', 'ocean', 'deep'] },
  { id: 'blue-10', name: 'Cobalt', description: 'Bold cobalt blue', category: 'Blue', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)', colors: ['#1D4ED8', '#2563EB'], tags: ['cobalt', 'bold', 'strong'] },

  // Green (nature and fresh greens)
  { id: 'green-1', name: 'Forest', description: 'Deep forest greens', category: 'Green', gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', colors: ['#22C55E', '#16A34A'], tags: ['forest', 'nature', 'fresh'] },
  { id: 'green-2', name: 'Mint Fresh', description: 'Cool mint freshness', category: 'Green', gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', colors: ['#34D399', '#10B981'], tags: ['mint', 'fresh', 'cool'] },
  { id: 'green-3', name: 'Emerald', description: 'Precious emerald stone', category: 'Green', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)', colors: ['#059669', '#047857'], tags: ['emerald', 'precious', 'luxury'] },
  { id: 'green-4', name: 'Spring Meadow', description: 'Fresh spring greens', category: 'Green', gradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)', colors: ['#4ADE80', '#22C55E'], tags: ['spring', 'meadow', 'fresh'] },
  { id: 'green-5', name: 'Jungle', description: 'Dense jungle foliage', category: 'Green', gradient: 'linear-gradient(135deg, #15803D 0%, #166534 100%)', colors: ['#15803D', '#166534'], tags: ['jungle', 'dense', 'tropical'] },
  { id: 'green-6', name: 'Lime Zest', description: 'Zesty lime citrus', category: 'Green', gradient: 'linear-gradient(135deg, #84CC16 0%, #65A30D 100%)', colors: ['#84CC16', '#65A30D'], tags: ['lime', 'citrus', 'zesty'] },
  { id: 'green-7', name: 'Seafoam', description: 'Soft seafoam green', category: 'Green', gradient: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)', colors: ['#6EE7B7', '#34D399'], tags: ['seafoam', 'soft', 'ocean'] },
  { id: 'green-8', name: 'Olive Grove', description: 'Mediterranean olives', category: 'Green', gradient: 'linear-gradient(135deg, #65A30D 0%, #4D7C0F 100%)', colors: ['#65A30D', '#4D7C0F'], tags: ['olive', 'mediterranean', 'warm'] },
  { id: 'green-9', name: 'Fern', description: 'Delicate fern fronds', category: 'Green', gradient: 'linear-gradient(135deg, #86EFAC 0%, #4ADE80 100%)', colors: ['#86EFAC', '#4ADE80'], tags: ['fern', 'delicate', 'nature'] },
  { id: 'green-10', name: 'Pine Forest', description: 'Deep pine forest', category: 'Green', gradient: 'linear-gradient(135deg, #166534 0%, #14532D 100%)', colors: ['#166534', '#14532D'], tags: ['pine', 'forest', 'deep'] },

  // Pink (rose and coral tones)
  { id: 'pink-1', name: 'Rose Petal', description: 'Delicate rose petals', category: 'Pink', gradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)', colors: ['#F472B6', '#EC4899'], tags: ['rose', 'romantic', 'soft'] },
  { id: 'pink-2', name: 'Hot Pink', description: 'Vibrant hot pink', category: 'Pink', gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', colors: ['#EC4899', '#DB2777'], tags: ['hot', 'vibrant', 'bold'] },
  { id: 'pink-3', name: 'Blush', description: 'Soft blush tones', category: 'Pink', gradient: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)', colors: ['#FBCFE8', '#F9A8D4'], tags: ['blush', 'soft', 'feminine'] },
  { id: 'pink-4', name: 'Coral Sunset', description: 'Warm coral sunset', category: 'Pink', gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)', colors: ['#FB7185', '#F43F5E'], tags: ['coral', 'sunset', 'warm'] },
  { id: 'pink-5', name: 'Fuchsia', description: 'Bold fuchsia flower', category: 'Pink', gradient: 'linear-gradient(135deg, #D946EF 0%, #C026D3 100%)', colors: ['#D946EF', '#C026D3'], tags: ['fuchsia', 'bold', 'flower'] },
  { id: 'pink-6', name: 'Cherry Blossom', description: 'Japanese cherry blossoms', category: 'Pink', gradient: 'linear-gradient(135deg, #FDA4AF 0%, #FB7185 100%)', colors: ['#FDA4AF', '#FB7185'], tags: ['cherry', 'blossom', 'spring'] },
  { id: 'pink-7', name: 'Magenta', description: 'Deep magenta shade', category: 'Pink', gradient: 'linear-gradient(135deg, #A21CAF 0%, #86198F 100%)', colors: ['#A21CAF', '#86198F'], tags: ['magenta', 'deep', 'rich'] },
  { id: 'pink-8', name: 'Cotton Candy', description: 'Sweet cotton candy', category: 'Pink', gradient: 'linear-gradient(135deg, #F9A8D4 0%, #F472B6 100%)', colors: ['#F9A8D4', '#F472B6'], tags: ['candy', 'sweet', 'fun'] },
  { id: 'pink-9', name: 'Berry Crush', description: 'Crushed berry juice', category: 'Pink', gradient: 'linear-gradient(135deg, #BE185D 0%, #9D174D 100%)', colors: ['#BE185D', '#9D174D'], tags: ['berry', 'crush', 'juice'] },
  { id: 'pink-10', name: 'Raspberry', description: 'Fresh raspberry', category: 'Pink', gradient: 'linear-gradient(135deg, #DB2777 0%, #BE185D 100%)', colors: ['#DB2777', '#BE185D'], tags: ['raspberry', 'fresh', 'fruit'] },

  // Orange (warm citrus tones)
  { id: 'orange-1', name: 'Sunset Fire', description: 'Blazing sunset orange', category: 'Orange', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', colors: ['#F97316', '#EA580C'], tags: ['sunset', 'fire', 'warm'] },
  { id: 'orange-2', name: 'Tangerine', description: 'Fresh tangerine citrus', category: 'Orange', gradient: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)', colors: ['#FB923C', '#F97316'], tags: ['tangerine', 'citrus', 'fresh'] },
  { id: 'orange-3', name: 'Amber Glow', description: 'Warm amber glow', category: 'Orange', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', colors: ['#FBBF24', '#F59E0B'], tags: ['amber', 'glow', 'warm'] },
  { id: 'orange-4', name: 'Peach', description: 'Soft peach tones', category: 'Orange', gradient: 'linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)', colors: ['#FDBA74', '#FB923C'], tags: ['peach', 'soft', 'gentle'] },
  { id: 'orange-5', name: 'Autumn Leaves', description: 'Fall autumn colors', category: 'Orange', gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', colors: ['#EA580C', '#C2410C'], tags: ['autumn', 'fall', 'leaves'] },
  { id: 'orange-6', name: 'Copper', description: 'Metallic copper shine', category: 'Orange', gradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)', colors: ['#C2410C', '#9A3412'], tags: ['copper', 'metallic', 'warm'] },
  { id: 'orange-7', name: 'Mango', description: 'Tropical mango blend', category: 'Orange', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)', colors: ['#FBBF24', '#F97316'], tags: ['mango', 'tropical', 'fruit'] },
  { id: 'orange-8', name: 'Honey', description: 'Sweet golden honey', category: 'Orange', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', colors: ['#F59E0B', '#D97706'], tags: ['honey', 'sweet', 'golden'] },

  // Teal (aqua and cyan)
  { id: 'teal-1', name: 'Deep Teal', description: 'Rich deep teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', colors: ['#0D9488', '#0F766E'], tags: ['deep', 'ocean', 'calm'] },
  { id: 'teal-2', name: 'Aqua Teal', description: 'Light aqua teal', category: 'Teal', gradient: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)', colors: ['#2DD4BF', '#14B8A6'], tags: ['aqua', 'light', 'fresh'] },
  { id: 'teal-3', name: 'Peacock', description: 'Peacock feather teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', colors: ['#0891B2', '#0E7490'], tags: ['peacock', 'elegant', 'rich'] },
  { id: 'teal-4', name: 'Turquoise', description: 'Bright turquoise', category: 'Teal', gradient: 'linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 100%)', colors: ['#5EEAD4', '#2DD4BF'], tags: ['turquoise', 'bright', 'tropical'] },
  { id: 'teal-5', name: 'Sea Glass', description: 'Smooth sea glass', category: 'Teal', gradient: 'linear-gradient(135deg, #99F6E4 0%, #5EEAD4 100%)', colors: ['#99F6E4', '#5EEAD4'], tags: ['sea glass', 'smooth', 'beach'] },
  { id: 'teal-6', name: 'Caribbean', description: 'Caribbean waters', category: 'Teal', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', colors: ['#06B6D4', '#0891B2'], tags: ['caribbean', 'tropical', 'vacation'] },
  { id: 'teal-7', name: 'Mint Teal', description: 'Fresh mint teal', category: 'Teal', gradient: 'linear-gradient(135deg, #34D399 0%, #14B8A6 100%)', colors: ['#34D399', '#14B8A6'], tags: ['mint', 'fresh', 'cool'] },
  { id: 'teal-8', name: 'Ocean Depth', description: 'Deep ocean teal', category: 'Teal', gradient: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)', colors: ['#0F766E', '#115E59'], tags: ['ocean', 'depth', 'mysterious'] },

  // Warm (earth tones, browns, warm neutrals)
  { id: 'warm-1', name: 'Ember', description: 'Glowing ember warmth', category: 'Warm', gradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)', colors: ['#F97316', '#C2410C'], tags: ['ember', 'glow', 'fire'] },
  { id: 'warm-2', name: 'Terracotta', description: 'Earthy terracotta', category: 'Warm', gradient: 'linear-gradient(135deg, #EA580C 0%, #9A3412 100%)', colors: ['#EA580C', '#9A3412'], tags: ['terracotta', 'earthy', 'natural'] },
  { id: 'warm-3', name: 'Caramel', description: 'Sweet caramel', category: 'Warm', gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', colors: ['#D97706', '#B45309'], tags: ['caramel', 'sweet', 'dessert'] },
  { id: 'warm-4', name: 'Bronze', description: 'Metallic bronze', category: 'Warm', gradient: 'linear-gradient(135deg, #B45309 0%, #78350F 100%)', colors: ['#B45309', '#78350F'], tags: ['bronze', 'metallic', 'antique'] },
  { id: 'warm-5', name: 'Cinnamon', description: 'Spicy cinnamon', category: 'Warm', gradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)', colors: ['#C2410C', '#9A3412'], tags: ['cinnamon', 'spicy', 'autumn'] },
  { id: 'warm-6', name: 'Sand Dune', description: 'Desert sand dune', category: 'Warm', gradient: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%)', colors: ['#FDE68A', '#FCD34D'], tags: ['sand', 'desert', 'natural'] },
  { id: 'warm-7', name: 'Rust', description: 'Weathered rust', category: 'Warm', gradient: 'linear-gradient(135deg, #9A3412 0%, #7C2D12 100%)', colors: ['#9A3412', '#7C2D12'], tags: ['rust', 'weathered', 'vintage'] },
  { id: 'warm-8', name: 'Ginger', description: 'Warm ginger spice', category: 'Warm', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', colors: ['#F59E0B', '#D97706'], tags: ['ginger', 'spice', 'warm'] },
  { id: 'warm-9', name: 'Crimson', description: 'Deep crimson red', category: 'Warm', gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', colors: ['#DC2626', '#B91C1C'], tags: ['crimson', 'bold', 'power'] },
  { id: 'warm-10', name: 'Ruby', description: 'Precious ruby gemstone', category: 'Warm', gradient: 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)', colors: ['#991B1B', '#7F1D1D'], tags: ['ruby', 'gem', 'luxury'] },

  // Cool (ice, frost, cool blues/purples)
  { id: 'cool-1', name: 'Arctic', description: 'Arctic ice blue', category: 'Cool', gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', colors: ['#E0F2FE', '#BAE6FD'], tags: ['arctic', 'ice', 'cold'] },
  { id: 'cool-2', name: 'Glacier', description: 'Glacial blue', category: 'Cool', gradient: 'linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)', colors: ['#CFFAFE', '#A5F3FC'], tags: ['glacier', 'blue', 'frozen'] },
  { id: 'cool-3', name: 'Winter Mint', description: 'Cool winter mint', category: 'Cool', gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', colors: ['#D1FAE5', '#A7F3D0'], tags: ['winter', 'mint', 'fresh'] },
  { id: 'cool-4', name: 'Frost', description: 'Morning frost', category: 'Cool', gradient: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)', colors: ['#F0FDFA', '#CCFBF1'], tags: ['frost', 'morning', 'cold'] },
  { id: 'cool-5', name: 'Steel Blue', description: 'Cool steel blue', category: 'Cool', gradient: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', colors: ['#7DD3FC', '#38BDF8'], tags: ['steel', 'blue', 'industrial'] },
  { id: 'cool-6', name: 'Moonlight', description: 'Cool moonlight', category: 'Cool', gradient: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)', colors: ['#E0E7FF', '#C7D2FE'], tags: ['moonlight', 'night', 'serene'] },
  { id: 'cool-7', name: 'Periwinkle', description: 'Soft periwinkle', category: 'Cool', gradient: 'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 100%)', colors: ['#C7D2FE', '#A5B4FC'], tags: ['periwinkle', 'soft', 'calm'] },
  { id: 'cool-8', name: 'Winter Sky', description: 'Clear winter sky', category: 'Cool', gradient: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)', colors: ['#BAE6FD', '#7DD3FC'], tags: ['winter', 'sky', 'clear'] },

  // Neutral (grays, slates, minimal)
  { id: 'neutral-1', name: 'Silver Mist', description: 'Soft silver mist', category: 'Neutral', gradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)', colors: ['#E5E7EB', '#D1D5DB'], tags: ['silver', 'mist', 'subtle'] },
  { id: 'neutral-2', name: 'Platinum', description: 'Elegant platinum', category: 'Neutral', gradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)', colors: ['#F3F4F6', '#E5E7EB'], tags: ['platinum', 'elegant', 'minimal'] },
  { id: 'neutral-3', name: 'Stone', description: 'Natural stone', category: 'Neutral', gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)', colors: ['#9CA3AF', '#6B7280'], tags: ['stone', 'natural', 'earthy'] },
  { id: 'neutral-4', name: 'Concrete', description: 'Urban concrete', category: 'Neutral', gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)', colors: ['#6B7280', '#4B5563'], tags: ['concrete', 'urban', 'industrial'] },
  { id: 'neutral-5', name: 'Ash', description: 'Soft ash gray', category: 'Neutral', gradient: 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)', colors: ['#D1D5DB', '#9CA3AF'], tags: ['ash', 'soft', 'neutral'] },
  { id: 'neutral-6', name: 'Graphite', description: 'Dark graphite', category: 'Neutral', gradient: 'linear-gradient(135deg, #4B5563 0%, #374151 100%)', colors: ['#4B5563', '#374151'], tags: ['graphite', 'dark', 'professional'] },
  { id: 'neutral-7', name: 'Cloud', description: 'Light cloud gray', category: 'Neutral', gradient: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', colors: ['#F9FAFB', '#F3F4F6'], tags: ['cloud', 'light', 'airy'] },
  { id: 'neutral-8', name: 'Charcoal', description: 'Rich charcoal depths', category: 'Neutral', gradient: 'linear-gradient(135deg, #374151 0%, #1F2937 100%)', colors: ['#374151', '#1F2937'], tags: ['charcoal', 'dark', 'neutral'] },
  { id: 'neutral-9', name: 'Obsidian', description: 'Black obsidian glass', category: 'Neutral', gradient: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', colors: ['#1F2937', '#111827'], tags: ['obsidian', 'black', 'glass'] },
  { id: 'neutral-10', name: 'Slate', description: 'Dark slate storm', category: 'Neutral', gradient: 'linear-gradient(135deg, #475569 0%, #334155 100%)', colors: ['#475569', '#334155'], tags: ['slate', 'storm', 'moody'] },

  // Multi (tasteful 2-color combos from different families)
  { id: 'multi-1', name: 'Sunset Beach', description: 'Purple to pink sunset', category: 'Multi', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', colors: ['#8B5CF6', '#EC4899'], tags: ['sunset', 'beach', 'tropical'] },
  { id: 'multi-2', name: 'Ocean Breeze', description: 'Teal to blue transition', category: 'Multi', gradient: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)', colors: ['#14B8A6', '#3B82F6'], tags: ['ocean', 'breeze', 'calm'] },
  { id: 'multi-3', name: 'Forest Dawn', description: 'Green to teal blend', category: 'Multi', gradient: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)', colors: ['#22C55E', '#14B8A6'], tags: ['forest', 'dawn', 'nature'] },
  { id: 'multi-4', name: 'Candy Pop', description: 'Pink to purple blend', category: 'Multi', gradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 100%)', colors: ['#F472B6', '#A855F7'], tags: ['candy', 'pop', 'fun'] },
  { id: 'multi-5', name: 'Dusk', description: 'Orange to pink twilight', category: 'Multi', gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)', colors: ['#F97316', '#EC4899'], tags: ['dusk', 'twilight', 'evening'] },
  { id: 'multi-6', name: 'Northern Lights', description: 'Green to blue aurora', category: 'Multi', gradient: 'linear-gradient(135deg, #22C55E 0%, #3B82F6 100%)', colors: ['#22C55E', '#3B82F6'], tags: ['aurora', 'northern', 'lights'] },
  { id: 'multi-7', name: 'Cyberpunk', description: 'Cyan to pink neon', category: 'Multi', gradient: 'linear-gradient(135deg, #22D3EE 0%, #EC4899 100%)', colors: ['#22D3EE', '#EC4899'], tags: ['cyberpunk', 'neon', 'futuristic'] },
  { id: 'multi-8', name: 'Vaporwave', description: 'Pink to cyan retro', category: 'Multi', gradient: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 100%)', colors: ['#EC4899', '#06B6D4'], tags: ['vaporwave', 'retro', '80s'] },
];

// Categories that match the header UI
export const gradientCategories: (GradientCategory | 'All' | 'Favorites')[] = [
  'All',
  'Favorites',
  'Purple',
  'Blue',
  'Green',
  'Pink',
  'Orange',
  'Teal',
  'Warm',
  'Cool',
  'Neutral',
  'Multi',
];

export function getGradientById(id: string): Gradient | undefined {
  return gradients.find((g) => g.id === id);
}

export function getGradientsByCategory(category: string): Gradient[] {
  if (category === 'All') return gradients;
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

// Extract all unique tags from gradients, sorted alphabetically
export const allTags: string[] = Array.from(
  new Set(gradients.flatMap((g) => g.tags))
).sort();
