const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyticsResponse {
  summary: {
    totalViews: number
    trendingHashtags: number
    hotProducts: number
    viralVideos: number
  }
  chartData: Array<{
    label: string
    value: number
    secondaryValue: number
  }>
  niches: Array<{
    id: string
    icon: string
    name: string
    pct: number
    colors: [string, string]
  }>
}

const MOCK_ANALYTICS: AnalyticsResponse = {
  summary: {
    totalViews: 24500000,
    trendingHashtags: 245,
    hotProducts: 1200,
    viralVideos: 9900,
  },
  chartData: [
    { label: 'T2', value: 0.6, secondaryValue: 0.45 },
    { label: 'T3', value: 0.75, secondaryValue: 0.6 },
    { label: 'T4', value: 0.55, secondaryValue: 0.5 },
    { label: 'T5', value: 0.9, secondaryValue: 0.7 },
    { label: 'T6', value: 0.7, secondaryValue: 0.55 },
    { label: 'T7', value: 1.0, secondaryValue: 0.8 },
    { label: 'CN', value: 0.65, secondaryValue: 0.5 },
  ],
  niches: [
    { id: 'n1', icon: '👗', name: 'Thời trang', pct: 38, colors: ['#A78BFA', '#7C3AED'] },
    { id: 'n2', icon: '💄', name: 'Mỹ phẩm', pct: 27, colors: ['#6EE7B7', '#10B981'] },
    { id: 'n3', icon: '🍜', name: 'Đồ ăn', pct: 22, colors: ['#FCD34D', '#F59E0B'] },
    { id: 'n4', icon: '📱', name: 'Phụ kiện', pct: 13, colors: ['#FCA5A5', '#EF4444'] },
  ],
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    // dateRange có thể dùng để filter khi kết nối API thật
    // const { dateRange } = await req.json().catch(() => ({}))

    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')
    let analytics = MOCK_ANALYTICS

    if (RAPIDAPI_KEY) {
      // TODO: Bỏ comment khi có API thật — analytics thường cần aggregate từ nhiều endpoints
      // analytics = await buildAnalyticsFromRapidAPI(RAPIDAPI_KEY, dateRange)
    }

    return new Response(JSON.stringify(analytics), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
