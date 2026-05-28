const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TrendItem {
  id: string
  rank: number
  icon: string
  bgColor: string
  name: string
  category: string
  price: number
  videoCount: number
  views: number
  growth: number
  isLive: boolean
}

const MOCK_TRENDS: TrendItem[] = [
  { id: 't1', rank: 1, icon: '👗', bgColor: '#EDE9FE', name: 'Váy Maxi Boho Mùa Hè 2024', category: 'fashion', price: 245000, videoCount: 12400, views: 2400000, growth: 127, isLive: false },
  { id: 't2', rank: 2, icon: '💄', bgColor: '#D1FAE5', name: 'Son Tint Hàn Quốc 3CE #Rose', category: 'beauty', price: 189000, videoCount: 8900, views: 1800000, growth: 89, isLive: true },
  { id: 't3', rank: 3, icon: '🍜', bgColor: '#FEF3C7', name: 'Mì Cay Buldak 2x Spicy', category: 'food', price: 55000, videoCount: 21000, views: 3100000, growth: 203, isLive: false },
  { id: 't4', rank: 4, icon: '📱', bgColor: '#E0E7FF', name: 'Ốp Lưng Magsafe iPhone 15', category: 'gadget', price: 120000, videoCount: 5600, views: 990000, growth: 45, isLive: false },
  { id: 't5', rank: 5, icon: '🏠', bgColor: '#FEE2E2', name: 'Đèn LED RGB Trang Trí Phòng', category: 'home', price: 85000, videoCount: 4200, views: 780000, growth: -5, isLive: false },
]

// Normalize dữ liệu từ RapidAPI về đúng shape TrendItem
// function normalizeRapidAPI(raw: unknown[]): TrendItem[] { ... }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { category, limit } = await req.json().catch(() => ({}))

    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')
    let trends = [...MOCK_TRENDS]

    if (RAPIDAPI_KEY) {
      // TODO: Bỏ comment khi có RapidAPI key và chọn endpoint phù hợp
      // const res = await fetch('https://tiktok-api23.p.rapidapi.com/api/trending/product', {
      //   headers: {
      //     'x-rapidapi-key': RAPIDAPI_KEY,
      //     'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      //   },
      // })
      // if (res.ok) trends = normalizeRapidAPI(await res.json())
    }

    if (category && category !== 'all') {
      trends = trends.filter((t) => t.category === category)
    }
    if (limit) trends = trends.slice(0, Number(limit))

    return new Response(JSON.stringify(trends), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
