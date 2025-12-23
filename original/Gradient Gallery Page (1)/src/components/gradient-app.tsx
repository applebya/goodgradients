import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Sparkles, Heart, Palette, Zap, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GradientCard } from './gradient-card';
import { GradientDetailModal } from './gradient-detail-modal';
import { AnimationStudioModal } from './animation-studio-modal';
import { GradientControls, type GradientType } from './gradient-controls';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

export interface Gradient {
  id: number;
  gradient: string;
  name: string;
  colors: string[];
  description: string;
  category: string;
  tags: string[];
  angle?: number;
}

const gradients: Gradient[] = [
  // Purple Gradients (1-15)
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    name: 'Purple Dream',
    colors: ['#667eea', '#764ba2'],
    description: 'A smooth blend of vibrant purple hues creating a dreamy, mystical atmosphere perfect for creative projects.',
    category: 'Purple',
    tags: ['vibrant', 'mystical', 'creative'],
    angle: 135,
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
    name: 'Royal Purple',
    colors: ['#8e2de2', '#4a00e0'],
    description: 'Deep, rich purple gradient conveying luxury, sophistication and premium quality.',
    category: 'Purple',
    tags: ['luxury', 'premium', 'bold'],
    angle: 135,
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
    name: 'Midnight Purple',
    colors: ['#a8c0ff', '#3f2b96'],
    description: 'Light purple fading into deep midnight tones, perfect for elegant designs.',
    category: 'Purple',
    tags: ['elegant', 'dark', 'sophisticated'],
    angle: 135,
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    name: 'Lavender Sky',
    colors: ['#e0c3fc', '#8ec5fc'],
    description: 'Soft lavender to sky blue creating a peaceful, calming effect.',
    category: 'Purple',
    tags: ['soft', 'calming', 'peaceful'],
    angle: 135,
  },
  {
    id: 5,
    gradient: 'linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%)',
    name: 'Purple Haze',
    colors: ['#7028e4', '#e5b2ca'],
    description: 'Bold purple transitioning to soft pink haze.',
    category: 'Purple',
    tags: ['bold', 'dreamy', 'artistic'],
    angle: 135,
  },
  {
    id: 6,
    gradient: 'linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)',
    name: 'Electric Violet',
    colors: ['#b721ff', '#21d4fd'],
    description: 'Electric purple to cyan gradient with high energy.',
    category: 'Purple',
    tags: ['electric', 'vibrant', 'modern'],
    angle: 135,
  },
  {
    id: 7,
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    name: 'Lavender Fields',
    colors: ['#d299c2', '#fef9d7'],
    description: 'Soothing lavender to cream gradient evoking tranquil fields.',
    category: 'Purple',
    tags: ['soothing', 'elegant', 'tranquil'],
    angle: 135,
  },
  {
    id: 8,
    gradient: 'linear-gradient(135deg, #6a3093 0%, #a044ff 100%)',
    name: 'Deep Plum',
    colors: ['#6a3093', '#a044ff'],
    description: 'Rich plum to vibrant purple perfect for bold statements.',
    category: 'Purple',
    tags: ['rich', 'bold', 'powerful'],
    angle: 135,
  },
  {
    id: 9,
    gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    name: 'Orchid Bloom',
    colors: ['#c471f5', '#fa71cd'],
    description: 'Vibrant orchid to pink bloom gradient.',
    category: 'Purple',
    tags: ['floral', 'vibrant', 'feminine'],
    angle: 135,
  },
  {
    id: 10,
    gradient: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
    name: 'Iris',
    colors: ['#4e54c8', '#8f94fb'],
    description: 'Deep to light iris purple gradient.',
    category: 'Purple',
    tags: ['soft', 'elegant', 'refined'],
    angle: 135,
  },
  {
    id: 11,
    gradient: 'linear-gradient(135deg, #9d50bb 0%, #6e48aa 100%)',
    name: 'Plum Perfect',
    colors: ['#9d50bb', '#6e48aa'],
    description: 'Perfect blend of rich plum tones.',
    category: 'Purple',
    tags: ['rich', 'warm', 'inviting'],
    angle: 135,
  },
  {
    id: 12,
    gradient: 'linear-gradient(135deg, #c33764 0%, #1d2671 100%)',
    name: 'Berry Blast',
    colors: ['#c33764', '#1d2671'],
    description: 'Berry red to deep purple gradient.',
    category: 'Purple',
    tags: ['bold', 'dramatic', 'striking'],
    angle: 135,
  },
  {
    id: 13,
    gradient: 'linear-gradient(135deg, #aa076b 0%, #61045f 100%)',
    name: 'Magenta Night',
    colors: ['#aa076b', '#61045f'],
    description: 'Deep magenta to purple night sky.',
    category: 'Purple',
    tags: ['dark', 'mysterious', 'intense'],
    angle: 135,
  },
  {
    id: 14,
    gradient: 'linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)',
    name: 'Purple Teal',
    colors: ['#5f2c82', '#49a09d'],
    description: 'Purple blending into teal waters.',
    category: 'Purple',
    tags: ['unique', 'balanced', 'cool'],
    angle: 135,
  },
  {
    id: 15,
    gradient: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
    name: 'Dark Velvet',
    colors: ['#200122', '#6f0000'],
    description: 'Deep dark purple to burgundy velvet.',
    category: 'Purple',
    tags: ['dark', 'luxury', 'dramatic'],
    angle: 135,
  },

  // Blue Gradients (16-30)
  {
    id: 16,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    name: 'Ocean Breeze',
    colors: ['#4facfe', '#00f2fe'],
    description: 'Refreshing cyan tones evoking calm ocean waters.',
    category: 'Blue',
    tags: ['calm', 'fresh', 'professional'],
    angle: 135,
  },
  {
    id: 17,
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    name: 'Deep Ocean',
    colors: ['#30cfd0', '#330867'],
    description: 'Dramatic transition from bright cyan to deep purple depths.',
    category: 'Blue',
    tags: ['dramatic', 'mysterious', 'bold'],
    angle: 135,
  },
  {
    id: 18,
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    name: 'Sky Blue',
    colors: ['#a1c4fd', '#c2e9fb'],
    description: 'Light and airy blue gradient reminiscent of clear skies.',
    category: 'Blue',
    tags: ['light', 'airy', 'peaceful'],
    angle: 135,
  },
  {
    id: 19,
    gradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    name: 'Arctic',
    colors: ['#2193b0', '#6dd5ed'],
    description: 'Cool arctic blue gradient.',
    category: 'Blue',
    tags: ['cool', 'fresh', 'crisp'],
    angle: 135,
  },
  {
    id: 20,
    gradient: 'linear-gradient(135deg, #0083b0 0%, #00b4db 100%)',
    name: 'Aqua Marine',
    colors: ['#0083b0', '#00b4db'],
    description: 'Deep to light aqua marine waters.',
    category: 'Blue',
    tags: ['aquatic', 'clean', 'modern'],
    angle: 135,
  },
  {
    id: 21,
    gradient: 'linear-gradient(135deg, #3494e6 0%, #ec6ead 100%)',
    name: 'Blue Pink Sky',
    colors: ['#3494e6', '#ec6ead'],
    description: 'Sky blue to pink sunset gradient.',
    category: 'Blue',
    tags: ['sunset', 'dreamy', 'romantic'],
    angle: 135,
  },
  {
    id: 22,
    gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
    name: 'Electric Blue',
    colors: ['#00d2ff', '#3a7bd5'],
    description: 'Bright electric blue gradient.',
    category: 'Blue',
    tags: ['electric', 'vibrant', 'energetic'],
    angle: 135,
  },
  {
    id: 23,
    gradient: 'linear-gradient(135deg, #73c8a9 0%, #373b44 100%)',
    name: 'Ocean Depth',
    colors: ['#73c8a9', '#373b44'],
    description: 'Teal to deep ocean darkness.',
    category: 'Blue',
    tags: ['deep', 'mysterious', 'cool'],
    angle: 135,
  },
  {
    id: 24,
    gradient: 'linear-gradient(135deg, #348f50 0%, #56b4d3 100%)',
    name: 'Tropical Water',
    colors: ['#348f50', '#56b4d3'],
    description: 'Green-blue tropical water gradient.',
    category: 'Blue',
    tags: ['tropical', 'fresh', 'natural'],
    angle: 135,
  },
  {
    id: 25,
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    name: 'Navy Blue',
    colors: ['#1e3c72', '#2a5298'],
    description: 'Professional navy blue gradient.',
    category: 'Blue',
    tags: ['professional', 'corporate', 'trustworthy'],
    angle: 135,
  },
  {
    id: 26,
    gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
    name: 'Dusk Blue',
    colors: ['#2b5876', '#4e4376'],
    description: 'Blue to purple dusk gradient.',
    category: 'Blue',
    tags: ['dusk', 'calm', 'serene'],
    angle: 135,
  },
  {
    id: 27,
    gradient: 'linear-gradient(135deg, #000046 0%, #1cb5e0 100%)',
    name: 'Midnight Sky',
    colors: ['#000046', '#1cb5e0'],
    description: 'Deep midnight to bright sky blue.',
    category: 'Blue',
    tags: ['dramatic', 'bold', 'striking'],
    angle: 135,
  },
  {
    id: 28,
    gradient: 'linear-gradient(135deg, #076585 0%, #fff 100%)',
    name: 'Ice Blue',
    colors: ['#076585', '#ffffff'],
    description: 'Blue fading to pure white ice.',
    category: 'Blue',
    tags: ['clean', 'minimal', 'crisp'],
    angle: 135,
  },
  {
    id: 29,
    gradient: 'linear-gradient(135deg, #314755 0%, #26a0da 100%)',
    name: 'Steel Blue',
    colors: ['#314755', '#26a0da'],
    description: 'Dark steel to bright blue gradient.',
    category: 'Blue',
    tags: ['industrial', 'modern', 'strong'],
    angle: 135,
  },
  {
    id: 30,
    gradient: 'linear-gradient(135deg, #06beb6 0%, #48b1bf 100%)',
    name: 'Turquoise',
    colors: ['#06beb6', '#48b1bf'],
    description: 'Beautiful turquoise gradient.',
    category: 'Blue',
    tags: ['fresh', 'bright', 'inviting'],
    angle: 135,
  },

  // Green Gradients (31-45)
  {
    id: 31,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    name: 'Mint Fresh',
    colors: ['#43e97b', '#38f9d7'],
    description: 'Energizing green to turquoise blend with a fresh feel.',
    category: 'Green',
    tags: ['fresh', 'energizing', 'modern'],
    angle: 135,
  },
  {
    id: 32,
    gradient: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)',
    name: 'Teal Haven',
    colors: ['#13547a', '#80d0c7'],
    description: 'Professional teal gradient perfect for tech applications.',
    category: 'Green',
    tags: ['professional', 'corporate', 'modern'],
    angle: 135,
  },
  {
    id: 33,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    name: 'Emerald',
    colors: ['#11998e', '#38ef7d'],
    description: 'Rich emerald to bright green gradient.',
    category: 'Green',
    tags: ['rich', 'vibrant', 'natural'],
    angle: 135,
  },
  {
    id: 34,
    gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    name: 'Forest',
    colors: ['#0ba360', '#3cba92'],
    description: 'Deep forest green gradient.',
    category: 'Green',
    tags: ['natural', 'earthy', 'organic'],
    angle: 135,
  },
  {
    id: 35,
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    name: 'Lime Light',
    colors: ['#56ab2f', '#a8e063'],
    description: 'Vibrant lime green gradient.',
    category: 'Green',
    tags: ['vibrant', 'fresh', 'energetic'],
    angle: 135,
  },
  {
    id: 36,
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    name: 'Sage',
    colors: ['#134e5e', '#71b280'],
    description: 'Calming sage green gradient.',
    category: 'Green',
    tags: ['calm', 'natural', 'soothing'],
    angle: 135,
  },
  {
    id: 37,
    gradient: 'linear-gradient(135deg, #02aab0 0%, #00cdac 100%)',
    name: 'Aqua Green',
    colors: ['#02aab0', '#00cdac'],
    description: 'Bright aqua green gradient.',
    category: 'Green',
    tags: ['bright', 'fresh', 'clean'],
    angle: 135,
  },
  {
    id: 38,
    gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    name: 'Neon Green',
    colors: ['#2af598', '#009efd'],
    description: 'Neon green to blue gradient.',
    category: 'Green',
    tags: ['neon', 'electric', 'modern'],
    angle: 135,
  },
  {
    id: 39,
    gradient: 'linear-gradient(135deg, #7de2fc 0%, #b9fbc0 100%)',
    name: 'Mint Ice',
    colors: ['#7de2fc', '#b9fbc0'],
    description: 'Light mint to ice gradient.',
    category: 'Green',
    tags: ['light', 'cool', 'refreshing'],
    angle: 135,
  },
  {
    id: 40,
    gradient: 'linear-gradient(135deg, #5a3f37 0%, #2c7744 100%)',
    name: 'Earth Green',
    colors: ['#5a3f37', '#2c7744'],
    description: 'Earthy brown to green gradient.',
    category: 'Green',
    tags: ['earthy', 'natural', 'organic'],
    angle: 135,
  },
  {
    id: 41,
    gradient: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
    name: 'Spring',
    colors: ['#00b09b', '#96c93d'],
    description: 'Fresh spring green gradient.',
    category: 'Green',
    tags: ['spring', 'fresh', 'lively'],
    angle: 135,
  },
  {
    id: 42,
    gradient: 'linear-gradient(135deg, #136a8a 0%, #267871 100%)',
    name: 'Deep Teal',
    colors: ['#136a8a', '#267871'],
    description: 'Deep teal gradient.',
    category: 'Green',
    tags: ['deep', 'professional', 'calm'],
    angle: 135,
  },
  {
    id: 43,
    gradient: 'linear-gradient(135deg, #283c86 0%, #45a247 100%)',
    name: 'Aurora Green',
    colors: ['#283c86', '#45a247'],
    description: 'Blue to green aurora gradient.',
    category: 'Green',
    tags: ['unique', 'bold', 'striking'],
    angle: 135,
  },
  {
    id: 44,
    gradient: 'linear-gradient(135deg, #29323c 0%, #485563 100%)',
    name: 'Charcoal Green',
    colors: ['#29323c', '#485563'],
    description: 'Dark charcoal with green undertones.',
    category: 'Green',
    tags: ['dark', 'sophisticated', 'modern'],
    angle: 135,
  },
  {
    id: 45,
    gradient: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
    name: 'Tropical Green',
    colors: ['#1d976c', '#93f9b9'],
    description: 'Deep to light tropical green.',
    category: 'Green',
    tags: ['tropical', 'fresh', 'vibrant'],
    angle: 135,
  },

  // Pink Gradients (46-60)
  {
    id: 46,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    name: 'Sunset Bliss',
    colors: ['#f093fb', '#f5576c'],
    description: 'Warm pink to coral sunset transition.',
    category: 'Pink',
    tags: ['warm', 'romantic', 'sunset'],
    angle: 135,
  },
  {
    id: 47,
    gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    name: 'Cherry Blossom',
    colors: ['#ff6e7f', '#bfe9ff'],
    description: 'Delicate pink to sky blue inspired by cherry blossoms.',
    category: 'Pink',
    tags: ['delicate', 'spring', 'elegant'],
    angle: 135,
  },
  {
    id:48,
    gradient: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
    name: 'Rose Sunset',
    colors: ['#f77062', '#fe5196'],
    description: 'Bold coral to magenta blend.',
    category: 'Pink',
    tags: ['bold', 'confident', 'energetic'],
    angle: 135,
  },
  {
    id: 49,
    gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    name: 'Rose Quartz',
    colors: ['#ee9ca7', '#ffdde1'],
    description: 'Gentle rose gradient with romantic touch.',
    category: 'Pink',
    tags: ['romantic', 'feminine', 'gentle'],
    angle: 135,
  },
  {
    id: 50,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    name: 'Pink Paradise',
    colors: ['#ff9a9e', '#fecfef'],
    description: 'Soft pink paradise gradient.',
    category: 'Pink',
    tags: ['soft', 'dreamy', 'sweet'],
    angle: 135,
  },
  {
    id: 51,
    gradient: 'linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%)',
    name: 'Peach Pink',
    colors: ['#ffc3a0', '#ffafbd'],
    description: 'Warm peach to pink gradient.',
    category: 'Pink',
    tags: ['warm', 'soft', 'inviting'],
    angle: 135,
  },
  {
    id: 52,
    gradient: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)',
    name: 'Berry Wine',
    colors: ['#cc2b5e', '#753a88'],
    description: 'Deep berry to wine gradient.',
    category: 'Pink',
    tags: ['rich', 'bold', 'dramatic'],
    angle: 135,
  },
  {
    id: 53,
    gradient: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    name: 'Coral Flame',
    colors: ['#eb3349', '#f45c43'],
    description: 'Vibrant coral flame gradient.',
    category: 'Pink',
    tags: ['vibrant', 'energetic', 'bold'],
    angle: 135,
  },
  {
    id: 54,
    gradient: 'linear-gradient(135deg, #dd5e89 0%, #f7bb97 100%)',
    name: 'Sunset Pink',
    colors: ['#dd5e89', '#f7bb97'],
    description: 'Pink to peach sunset gradient.',
    category: 'Pink',
    tags: ['sunset', 'warm', 'gentle'],
    angle: 135,
  },
  {
    id: 55,
    gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
    name: 'Hot Pink',
    colors: ['#f857a6', '#ff5858'],
    description: 'Bold hot pink gradient.',
    category: 'Pink',
    tags: ['hot', 'bold', 'vibrant'],
    angle: 135,
  },
  {
    id: 56,
    gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
    name: 'Pink Lemonade',
    colors: ['#ff0844', '#ffb199'],
    description: 'Bright pink to soft peach.',
    category: 'Pink',
    tags: ['bright', 'playful', 'fun'],
    angle: 135,
  },
  {
    id: 57,
    gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
    name: 'Neon Pink',
    colors: ['#ff6a00', '#ee0979'],
    description: 'Orange to neon pink gradient.',
    category: 'Pink',
    tags: ['neon', 'electric', 'bold'],
    angle: 135,
  },
  {
    id: 58,
    gradient: 'linear-gradient(135deg, #e43a15 0%, #e65245 100%)',
    name: 'Red Coral',
    colors: ['#e43a15', '#e65245'],
    description: 'Deep red to coral gradient.',
    category: 'Pink',
    tags: ['warm', 'vibrant', 'energetic'],
    angle: 135,
  },
  {
    id: 59,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
    name: 'Watermelon',
    colors: ['#ff6b6b', '#ffd93d'],
    description: 'Pink to yellow watermelon gradient.',
    category: 'Pink',
    tags: ['playful', 'summer', 'fun'],
    angle: 135,
  },
  {
    id: 60,
    gradient: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
    name: 'Pink Sky',
    colors: ['#fc466b', '#3f5efb'],
    description: 'Pink to blue sky gradient.',
    category: 'Pink',
    tags: ['dramatic', 'bold', 'striking'],
    angle: 135,
  },

  // Orange Gradients (61-70)
  {
    id: 61,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    name: 'Tropical Sunrise',
    colors: ['#fa709a', '#fee140'],
    description: 'Vibrant pink to yellow gradient capturing tropical energy.',
    category: 'Orange',
    tags: ['vibrant', 'energetic', 'tropical'],
    angle: 135,
  },
  {
    id: 62,
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    name: 'Coral Reef',
    colors: ['#ff9a56', '#ff6a88'],
    description: 'Warm coral tones inspired by underwater ecosystems.',
    category: 'Orange',
    tags: ['warm', 'vibrant', 'playful'],
    angle: 135,
  },
  {
    id: 63,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    name: 'Peach Melba',
    colors: ['#ffecd2', '#fcb69f'],
    description: 'Delicate peach gradient with warm feel.',
    category: 'Orange',
    tags: ['warm', 'soft', 'inviting'],
    angle: 135,
  },
  {
    id: 64,
    gradient: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    name: 'Mango',
    colors: ['#ff7e5f', '#feb47b'],
    description: 'Sweet mango gradient.',
    category: 'Orange',
    tags: ['sweet', 'tropical', 'warm'],
    angle: 135,
  },
  {
    id: 65,
    gradient: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
    name: 'Fire',
    colors: ['#f83600', '#f9d423'],
    description: 'Hot fire gradient from red to yellow.',
    category: 'Orange',
    tags: ['hot', 'energetic', 'bold'],
    angle: 135,
  },
  {
    id: 66,
    gradient: 'linear-gradient(135deg, #ff512f 0%, #f09819 100%)',
    name: 'Burning Orange',
    colors: ['#ff512f', '#f09819'],
    description: 'Intense burning orange gradient.',
    category: 'Orange',
    tags: ['intense', 'warm', 'energetic'],
    angle: 135,
  },
  {
    id: 67,
    gradient: 'linear-gradient(135deg, #ed213a 0%, #93291e 100%)',
    name: 'Red Earth',
    colors: ['#ed213a', '#93291e'],
    description: 'Red earth tones gradient.',
    category: 'Orange',
    tags: ['earthy', 'warm', 'natural'],
    angle: 135,
  },
  {
    id: 68,
    gradient: 'linear-gradient(135deg, #f46b45 0%, #eea849 100%)',
    name: 'Tangerine',
    colors: ['#f46b45', '#eea849'],
    description: 'Fresh tangerine gradient.',
    category: 'Orange',
    tags: ['fresh', 'vibrant', 'citrus'],
    angle: 135,
  },
  {
    id: 69,
    gradient: 'linear-gradient(135deg, #de6161 0%, #2657eb 100%)',
    name: 'Sunset Fire',
    colors: ['#de6161', '#2657eb'],
    description: 'Red sunset to blue sky.',
    category: 'Orange',
    tags: ['dramatic', 'sunset', 'bold'],
    angle: 135,
  },
  {
    id: 70,
    gradient: 'linear-gradient(135deg, #ff8008 0%, #ffc837 100%)',
    name: 'Golden Hour',
    colors: ['#ff8008', '#ffc837'],
    description: 'Beautiful golden hour gradient.',
    category: 'Orange',
    tags: ['golden', 'warm', 'inviting'],
    angle: 135,
  },

  // Yellow Gradients (71-75)
  {
    id: 71,
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    name: 'Sunshine',
    colors: ['#f7971e', '#ffd200'],
    description: 'Bright sunshine gradient.',
    category: 'Yellow',
    tags: ['bright', 'cheerful', 'energetic'],
    angle: 135,
  },
  {
    id: 72,
    gradient: 'linear-gradient(135deg, #ffb75e 0%, #ed8f03 100%)',
    name: 'Amber',
    colors: ['#ffb75e', '#ed8f03'],
    description: 'Warm amber gradient.',
    category: 'Yellow',
    tags: ['warm', 'rich', 'golden'],
    angle: 135,
  },
  {
    id: 73,
    gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    name: 'Lemon Ice',
    colors: ['#fddb92', '#d1fdff'],
    description: 'Lemon to ice gradient.',
    category: 'Yellow',
    tags: ['light', 'fresh', 'cool'],
    angle: 135,
  },
  {
    id: 74,
    gradient: 'linear-gradient(135deg, #ffe000 0%, #799f0c 100%)',
    name: 'Citrus',
    colors: ['#ffe000', '#799f0c'],
    description: 'Yellow to green citrus gradient.',
    category: 'Yellow',
    tags: ['citrus', 'fresh', 'vibrant'],
    angle: 135,
  },
  {
    id: 75,
    gradient: 'linear-gradient(135deg, #ffe259 0%, #ffa751 100%)',
    name: 'Honey',
    colors: ['#ffe259', '#ffa751'],
    description: 'Sweet honey gradient.',
    category: 'Yellow',
    tags: ['sweet', 'warm', 'golden'],
    angle: 135,
  },

  // Pastel Gradients (76-85)
  {
    id: 76,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    name: 'Cotton Candy',
    colors: ['#a8edea', '#fed6e3'],
    description: 'Soft pastel blend of mint and pink.',
    category: 'Pastel',
    tags: ['soft', 'pastel', 'gentle'],
    angle: 135,
  },
  {
    id: 77,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    name: 'Pastel Peach',
    colors: ['#ffecd2', '#fcb69f'],
    description: 'Delicate pastel peach gradient.',
    category: 'Pastel',
    tags: ['delicate', 'soft', 'warm'],
    angle: 135,
  },
  {
    id: 78,
    gradient: 'linear-gradient(135deg, #fbda61 0%, #ff5acd 100%)',
    name: 'Candy',
    colors: ['#fbda61', '#ff5acd'],
    description: 'Sweet candy gradient.',
    category: 'Pastel',
    tags: ['sweet', 'playful', 'vibrant'],
    angle: 135,
  },
  {
    id: 79,
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    name: 'Rose Cream',
    colors: ['#fad0c4', '#ffd1ff'],
    description: 'Creamy rose gradient.',
    category: 'Pastel',
    tags: ['creamy', 'soft', 'elegant'],
    angle: 135,
  },
  {
    id: 80,
    gradient: 'linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 100%)',
    name: 'Butter Cream',
    colors: ['#ffeaa7', '#dfe6e9'],
    description: 'Light butter cream gradient.',
    category: 'Pastel',
    tags: ['light', 'soft', 'minimal'],
    angle: 135,
  },
  {
    id: 81,
    gradient: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
    name: 'Cloud Nine',
    colors: ['#fff1eb', '#ace0f9'],
    description: 'Soft cloud gradient.',
    category: 'Pastel',
    tags: ['soft', 'airy', 'peaceful'],
    angle: 135,
  },
  {
    id: 82,
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    name: 'Misty',
    colors: ['#cfd9df', '#e2ebf0'],
    description: 'Misty gray-blue gradient.',
    category: 'Pastel',
    tags: ['misty', 'subtle', 'calm'],
    angle: 135,
  },
  {
    id: 83,
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    name: 'Lilac Dream',
    colors: ['#fdcbf1', '#e6dee9'],
    description: 'Dreamy lilac gradient.',
    category: 'Pastel',
    tags: ['dreamy', 'soft', 'feminine'],
    angle: 135,
  },
  {
    id: 84,
    gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    name: 'Silver Mist',
    colors: ['#f5f7fa', '#c3cfe2'],
    description: 'Gentle silver mist gradient.',
    category: 'Pastel',
    tags: ['gentle', 'minimal', 'clean'],
    angle: 135,
  },
  {
    id: 85,
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    name: 'Dream State',
    colors: ['#e0c3fc', '#8ec5fc'],
    description: 'Purple to blue dream gradient.',
    category: 'Pastel',
    tags: ['dreamy', 'soft', 'peaceful'],
    angle: 135,
  },

  // Dark/Neutral Gradients (86-100)
  {
    id: 86,
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    name: 'Carbon',
    colors: ['#232526', '#414345'],
    description: 'Dark carbon gradient.',
    category: 'Dark',
    tags: ['dark', 'professional', 'modern'],
    angle: 135,
  },
  {
    id: 87,
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 0%, #2c5364 100%)',
    name: 'Midnight',
    colors: ['#0f2027', '#2c5364'],
    description: 'Deep midnight gradient.',
    category: 'Dark',
    tags: ['midnight', 'dark', 'mysterious'],
    angle: 135,
  },
  {
    id: 88,
    gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
    name: 'Slate Blue',
    colors: ['#373b44', '#4286f4'],
    description: 'Dark slate to blue gradient.',
    category: 'Dark',
    tags: ['professional', 'modern', 'cool'],
    angle: 135,
  },
  {
    id: 89,
    gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
    name: 'Royal',
    colors: ['#141e30', '#243b55'],
    description: 'Deep royal blue gradient.',
    category: 'Dark',
    tags: ['royal', 'elegant', 'professional'],
    angle: 135,
  },
  {
    id: 90,
    gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    name: 'Black Steel',
    colors: ['#000000', '#434343'],
    description: 'Black to steel gradient.',
    category: 'Dark',
    tags: ['bold', 'modern', 'sleek'],
    angle: 135,
  },
  {
    id: 91,
    gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    name: 'Midnight Blue',
    colors: ['#606c88', '#3f4c6b'],
    description: 'Cool midnight blue gradient.',
    category: 'Dark',
    tags: ['cool', 'calm', 'professional'],
    angle: 135,
  },
  {
    id: 92,
    gradient: 'linear-gradient(135deg, #283048 0%, #859398 100%)',
    name: 'Graphite',
    colors: ['#283048', '#859398'],
    description: 'Dark graphite gradient.',
    category: 'Dark',
    tags: ['sophisticated', 'modern', 'elegant'],
    angle: 135,
  },
  {
    id: 93,
    gradient: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)',
    name: 'Deep Purple Teal',
    colors: ['#360033', '#0b8793'],
    description: 'Deep purple to teal gradient.',
    category: 'Dark',
    tags: ['deep', 'mysterious', 'bold'],
    angle: 135,
  },
  {
    id: 94,
    gradient: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
    name: 'Evening',
    colors: ['#1f1c2c', '#928dab'],
    description: 'Dark evening gradient.',
    category: 'Dark',
    tags: ['evening', 'calm', 'sophisticated'],
    angle: 135,
  },
  {
    id: 95,
    gradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 0%, #ffaf7b 100%)',
    name: 'Cosmic Fusion',
    colors: ['#3a1c71', '#ffaf7b'],
    description: 'Purple to orange cosmic gradient.',
    category: 'Multi',
    tags: ['cosmic', 'vibrant', 'unique'],
    angle: 135,
  },
  {
    id: 96,
    gradient: 'linear-gradient(135deg, #ff0099 0%, #493240 100%)',
    name: 'Berry Dark',
    colors: ['#ff0099', '#493240'],
    description: 'Hot pink to dark gradient.',
    category: 'Multi',
    tags: ['bold', 'dramatic', 'striking'],
    angle: 135,
  },
  {
    id: 97,
    gradient: 'linear-gradient(135deg, #834d9b 0%, #d04ed6 100%)',
    name: 'Purple Love',
    colors: ['#834d9b', '#d04ed6'],
    description: 'Deep to bright purple gradient.',
    category: 'Multi',
    tags: ['purple', 'vibrant', 'bold'],
    angle: 135,
  },
  {
    id: 98,
    gradient: 'linear-gradient(135deg, #ef32d9 0%, #89fffd 100%)',
    name: 'Neon Life',
    colors: ['#ef32d9', '#89fffd'],
    description: 'Neon pink to cyan gradient.',
    category: 'Multi',
    tags: ['neon', 'electric', 'vibrant'],
    angle: 135,
  },
  {
    id: 99,
    gradient: 'linear-gradient(135deg, #22c1c3 0%, #fdbb2d 100%)',
    name: 'Beach',
    colors: ['#22c1c3', '#fdbb2d'],
    description: 'Cyan to golden beach gradient.',
    category: 'Multi',
    tags: ['beach', 'tropical', 'vibrant'],
    angle: 135,
  },
  {
    id: 100,
    gradient: 'linear-gradient(135deg, #eea2a2 0%, #bbc1bf 0%, #57c6e1 0%, #b49fda 0%, #7ac5d8 100%)',
    name: 'Rainbow Dreams',
    colors: ['#eea2a2', '#7ac5d8'],
    description: 'Multicolor rainbow gradient.',
    category: 'Multi',
    tags: ['rainbow', 'colorful', 'playful'],
    angle: 135,
  },
];

const categories = ['All', 'Purple', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Pastel', 'Dark', 'Multi', 'Animated', 'Saved', 'Random'];

export function GradientApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isAnimationStudioOpen, setIsAnimationStudioOpen] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [showControls, setShowControls] = useState(false);

  const filteredGradients = useMemo(() => {
    let filtered = gradients.filter((gradient) => {
      const matchesSearch =
        gradient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gradient.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        gradient.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Handle special categories
      if (selectedCategory === 'Saved') {
        return matchesSearch && favorites.has(gradient.id);
      }
      
      if (selectedCategory === 'Animated') {
        // Filter gradients that have animation-related tags
        return matchesSearch && gradient.tags.some(tag => ['animated', 'dynamic', 'motion'].includes(tag.toLowerCase()));
      }
      
      if (selectedCategory === 'Random') {
        return matchesSearch;
      }
      
      const matchesCategory = selectedCategory === 'All' || gradient.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Shuffle for Random category
    if (selectedCategory === 'Random') {
      return [...filtered].sort(() => Math.random() - 0.5);
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(id);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  // Scroll to top when category changes, with slight delay to avoid animation jank
  useEffect(() => {
    // Use requestAnimationFrame to ensure smooth scrolling after render
    const scrollToTop = () => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    };

    // Small delay to let the grid layout settle before scrolling
    const timeoutId = setTimeout(scrollToTop, 50);
    
    return () => clearTimeout(timeoutId);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Premium Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-400 flex items-center justify-center shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-2 border-neutral-950" />
              </div>
              <div>
                <h1 className="text-white tracking-tight">
                  Gradient<span className="text-neutral-400">Lab</span>
                </h1>
                <p className="text-neutral-500 text-sm">Professional gradient library & animation studio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-600"
              >
                <Heart className="w-4 h-4 mr-2" />
                {favorites.size} Saved
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsAnimationStudioOpen(true)}
                className="border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-600"
              >
                <Zap className="w-4 h-4 mr-2" />
                Animation Studio
              </Button>
              <Button 
                size="sm" 
                className="bg-white text-black hover:bg-neutral-200"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Random
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <Input
                placeholder="Search gradients, tags, or colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-white/20 focus-visible:border-neutral-600"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white hover:border-neutral-600'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Gradient Grid */}
        {filteredGradients.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-600" />
            </div>
            <h3 className="text-white mb-2">No gradients found</h3>
            <p className="text-neutral-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredGradients.map((gradient, index) => (
              <GradientCard
                key={gradient.id}
                gradient={gradient}
                isFavorite={favorites.has(gradient.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelectedGradient}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-xl mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-neutral-400">
            Vibe-coded with ❤️ by Appleby Consulting
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <GradientDetailModal
        gradient={selectedGradient}
        onClose={() => setSelectedGradient(null)}
        isFavorite={selectedGradient ? favorites.has(selectedGradient.id) : false}
        onToggleFavorite={selectedGradient ? () => toggleFavorite(selectedGradient.id) : () => {}}
      />

      {/* Animation Studio Modal */}
      <AnimationStudioModal
        isOpen={isAnimationStudioOpen}
        onClose={() => setIsAnimationStudioOpen(false)}
        gradients={gradients}
      />

      {/* Gradient Controls */}
      <AnimatePresence>
        {selectedGradient && (
          <GradientControls
            gradient={selectedGradient}
            type={gradientType}
            onChangeType={setGradientType}
          />
        )}
      </AnimatePresence>
    </div>
  );
}