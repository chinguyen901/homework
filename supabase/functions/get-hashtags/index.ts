const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HashtagItem {
  id: string
  rank: number
  tag: string
  views: number
  growth: number
  progressPct: number
  isNew: boolean
}

const MOCK_HASHTAGS: HashtagItem[] = [
  { id: 'h1', rank: 1, tag: '#vaymaxiboho', views: 2400000, growth: 127, progressPct: 95, isNew: false },
  { id: 'h2', rank: 2, tag: '#sontinhanquoc', views: 1800000, growth: 89, progressPct: 78, isNew: true },
  { id: 'h3', rank: 3, tag: '#milahanquoc', views: 3100000, growth: 203, progressPct: 100, isNew: true },
  { id: 'h4', rank: 4, tag: '#ophone15', views: 990000, growth: 45, progressPct: 62, isNew: false },
  { id: 'h5', rank: 5, tag: '#denledphong', views: 780000, growth: -5, progressPct: 48, isNew: false },
  { id: 'h6', rank: 6, tag: '#thoitranghe2024', views: 1200000, growth: 67, progressPct: 71, isNew: false },
  { id: 'h7', rank: 7, tag: '#myphamhanquoc', views: 950000, growth: 34, progressPct: 55, isNew: false },
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { limit, query } = await req.json().catch(() => ({}))

    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')
    let hashtags = [...MOCK_HASHTAGS]

    if (RAPIDAPI_KEY) {
      // TODO: Bỏ comment khi có RapidAPI key
      // const res = await fetch(`https://tiktok-api23.p.rapidapi.com/api/hashtag/info?name=${query ?? 'trending'}`, {
      //   headers: {
      //     'x-rapidapi-key': RAPIDAPI_KEY,
      //     'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      //   },
      // })
      // if (res.ok) hashtags = normalizeRapidAPI(await res.json())
    }

    if (query) {
      const q = String(query).toLowerCase()
      hashtags = hashtags.filter((h) => h.tag.toLowerCase().includes(q))
    }
    if (limit) hashtags = hashtags.slice(0, Number(limit))

    return new Response(JSON.stringify(hashtags), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
