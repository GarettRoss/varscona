import { useEffect, useRef, useState } from 'react'

const NAMES = [
  'A.R. Gurney','Aaron Franks','Aaron Macri','Aaron Talbot','Abigail McDougall',
  'Adam Turnbull','Aimee Beaudoin','Alana Hawley','Alexandra Dawkins','Alicia Thorgrimsson',
  'Alison Wells','Alison Yanota','Amanda Goldberg','Amanda Wilson','Amber Bissonnette',
  'Amber Borotsik','Ami Farrow','Amlin Gray','Amy Berger','Amy DeFelice',
  'Andrea Handal Rivera','Andrea House','Andrea Murphy','Andrew Bovell','Andrew Gummer',
  'Andrew MacDonald-Smith','Andrew Mecready','Andrew Muir','Andrew Ritchie','Andrew Wreggit',
  'Andy Curtis','Angela Christie','Anna Davidson','Anna-Maria Le Maistre','Anne Mansfield',
  'Annette Loiselle','Annie Baker','Anthony Santiago','April Banigan','April Viczko',
  'Ari Cohen','Arun Lakra','Ashley Wright','Barrie Keefe','Belinda Cornish',
  'Ben Kuchera','Beth Graham','Beth Greives','Betty Hushlak','Bill Damur',
  'Binaifer Kapadia','Blaine Newman','Blair Wensley','Blake Brooker','Blake Heathcote',
  'Bob Glaudini','Bobby Smale','Bradley Moss','Brennan Campbell','Brett Dahl',
  'Brett Johnson','Brian Bast','Brian Copping','Brian Dooley','Brian Linds',
  'Brice Parow','C.M. Zuby','Caaryn Sadoway','Caelea Morgan Yamada','Caleb Ellsworth-Clarke',
  'Caley Suliak','Cameron Grant','Cameron Kneteman','Carl Hare','Caro Vanrensberg',
  'Carole Frechette','Caroline Livingstone','Carter Lewis','Cat Mudryk','Catherine Mudryk',
  'Cathleen Rootsaert','Cathy Derkach','Cathy Nosaty','Celina Stachow','Chantal Perron',
  'Chantel Fortin','Cheryl Strayed','Chris Bullough','Chris Fassbender','Chris Hicks',
  'Chris Hunt','Chris Nelson','Chris Pereira','Chris W. Cook','Chris Wynters',
  'Christine Frederick','Christopher Durang','Christopher Hampton','CM Zuby',
  'Cody Ray','Colin Doyle','Colleen Tillotson','Collin Winslow','Conni Massing',
  'Coralie Cairns','Cory Sincennes','Craig Wright','Curtis den Otter','Dale Ladouceur',
  'Dana Andersen','Dana Wylie','Daniel MacDonald','Daniel McIvor','Daniel Perry',
  'Daniel vanHeyst','Daniela Masellis','Daniela Vlaskalic','Danielle Burns','Danielle LaRose',
  'Darren Hagen','Dave Clarke','David Barnet','David Belke','David Brindle',
  'David Everhart','David Ley','David MacInnis','David Mamet','David Mann',
  'David McNally','David Skelton','David Smith','Davina Stewart','Davis Shewchuk',
  'Dawn Friesen','Dayna Lea Hoffmann','Deanna Finnman','Debbie MacLeod','Declan O\'Reilly',
  'Denise Kenney','Don Ross','Donna-Leny Hansen','Doug Blackley','Doug Curtis',
  'Doug Mertz','Doug Tokaryk','Douglas Tokaryk','Dr. Ashraf El-Assaly','Dr. Mishael Frishkopf',
  'Drew Hayden Taylor','Duncan Macmillan','Duval Lang','E. Cherie Hoyles','E. Cherrie Hoyles',
  'Earl Klein','Edward Albee','Edward Atienza','Elena Porter','Elinor Holt',
  'Elise Jason','Elizabeth Allison-Jorde','Ellie Heath','Emily Howard','Emma Houghton',
  'Eric-Emmanuel Schmitt','Erik Mortimer','Erika Conway','Erin Hayes','Erin Shields',
  'Erin Valentine','Erin Voaklander','Eugene Stickland','Evelyn Rollans','Even Gilchrist',
  'Fatmi Yassine el Fassi el Fihri','Frank Zotter','Gaby Phaneuf','Garett Ross','Garner Butler',
  'Garret C Smith','Gary Bowman','Geoffrey Ewert','George Szilagyi',
  'Gina Moe','Glen Gaston','Glenn Nelson','Glyn Thomas','Gordon Bell',
  'Graeme MacKinnon','Graeme McKinnon','Guillermo Verdacchia','Hansi Klemm','Harvey Anderson',
  'Hayley Moorhouse','Heather Cornick','Heather Moore','Howard Buten','Ingrid Kottke',
  'Jacob Banigan','Jacqueline Walters','Jake Tkaczyk','James DeFelice','James MacDonald',
  'James McLure','Jamie Cavanagh','Jamie Konchak','Jan Randall','Jason Memhel',
  'Jayce McKenzie','Jean-Pierre Fournier','Jeff Haslam','Jeffrey Hatcher','Jen Silverman',
  'Jenn Best','Jennie Esdale','Jennifer McMillan','Jennifer Wigmore','Jenna Dykes',
  'Jenny McKillop','Jeremy Gordaneer','Jesse Gervais','Jesses Gervais','Jim Cej',
  'Jim Milan','JoAnna Black','Jocelyn Alhf','Joel Finnestad','John Cariani',
  'John Kirkpatrick','John Kolvenbach','John Merrell','John Mortimer',
  'John Patrick Shanley','John Rivet','John Rusich','John Sproule','John Wright',
  'John "Woody" Woroschuk','Jon Lachlan Stewart','Josh Meredith','Josh Travnik','Judy Unwin',
  'Juliana Barclay','Julie Golosky','Julie Murphy','Julien Arnold','Karen Cogan',
  'Karen Hines','Karen Johnson-Diamond','Karen Mott','Kat Evans','Kate Bagnall',
  'Kate Newby','Kate Ryan','Katherine Deane','Katherine Smith','Kathleen Mann',
  'Kathleen Weiss','Katori Hall','Keath Thome','Kelly Reay','Ken Brown',
  'Ken Cameron','Ken Matthews','Kendra Connor','Kerem Centinel','Kerem Cetinel',
  'Kerri Gibson','Kerry Ann Doherty','Kevin Corey','Kevin Kruchkywich','Kevin Rothery',
  'Kevin Sutley','Kieran Martin Murphy','Kijo Gatama','Kim McCaw','Kirstin Piehl',
  'Kjersten Saude','Kristi Hansen','Kristen Welker','Kristin da Silva','Kristin Unruh',
  'Krystal Johnson','Lana Michelle Hughes','Larissa Lashley','Larry Larson','Laurie Frerichs',
  'Leif Ingebrigtsen','Leif Oleson-Cormack','Len Crowther','Leona Brausen','Levi Lee',
  'Lezlie Faith Wade','Liana Shannon','Lieke Den Bakker','Linda Grass','Lindsay Burns',
  'Lindsey Walker','Lisa Hancharek','Lora Brovald','Lora Brovold','Lynette Maurice',
  'Lynley Hall','Mabelle Carvajal','Madeleine Suddaby','Maralyn Ryan','Marianne Copithorne',
  'Mark Anderako','Mark Hampton','Mark Ikeda','Mark Jenkins','Mark Meer',
  'Martin Crimp','Mary Glenfield','Mary Louise Wilson','Mat Busby','Mathew Hulshof',
  'Matt Baram','Matt Currie','Matt Schuurman','Matthew Kowalchuk','Mattie Overall',
  'Maureen Rooney','Megan Koska','Melissa Hande','Mhairi Berg','Michael Becker',
  'Michael Charrois','Michael D. James','Michael Healey','Michael James','Michael McLean',
  'Michael Melski','Michael Peng','Michael Watt','Michele Fleiger','Michele Riml',
  'Michelle Chan','Michelle Diaz','Michelle Fleiger','Michelle Todd','Mick Gordon',
  'Mikaela Cochrane','Mike Czuba','Mike Takats','Miranda Allen','Molly Flood',
  'Monica Gate','Myla Southward','Nadien Chu','Nancy McAlear','Nancy Yuen',
  'Natascha Girgis','Nathan Cuckow','Nathan Fillion','Neil Grahn','Nia Vardalos',
  'Nick Green','Nick Payne','Nick Rose','Nick Samoil','Nico VanderKley',
  'Nicola Elbro','Nicole Man','Nicole Mion','Nikki Huklowski','Noel Coward',
  'Noori Gill','Nyssa Beairsto','Pat Strain','Patricia Casey','Patricia Cerra',
  'Patricia Darbasie','Patrick Beagan','Paul Cowling','Paul Morgan Donald',
  'Paul Punyi','Paul-Ford Manguelle','Paula Vogel','Peter Quilter','Pru McEvoy',
  'Rachel Bowron','Rachel Dawn Woods','Rachel Martens','Rae McCallum','Raul Tome',
  'Ray Hunt','Ray Strachan','Rebecca Cypher','Rebecca Shaw','Rebecca Starr',
  'Reed McColm','Renee Suchy','Rhonda NuGent','Richard Gishler','Richard Greenberg',
  'Richard Meen','Rick Ash','Robert Walsh','Robin Fulford','Roger Schultz',
  'Ron Jenkins','Ron Pederson','Rory Turner','Rosemarie Seiver','Ross Smith',
  'Russ Baker','Ruth Smillie','Ryan Cunningham','Sam Shepard','Sandy Paddick',
  'Sara Turner','Sarah Dowling','Sarah Gale','Sarah Jean Butler','Scott Peters',
  'Scott Sharplin','Shaeah Fialkow','Shannon Blanchet','Sharla Matkin','Sharr White',
  'Shaun Johnston','Shawna Burnett','Shelagh Stephenson','Sheldon Currie','Sheldon Elter',
  'Sher Horvath','Shomee Chakrabartty','Shon Thomas','Simon Abbott','Simon Stephens',
  'Sophie May Healey','Steph Link','Stephanie Bahniuk','Stephanie Wolfe','Steven Dietz',
  'Steven Greenfield','Steven Sobolewski','Suzanne Lebeau','Sydney Williams','Tanya Lampey',
  'Tennessee Williams','Terrilee Shannon','Terry Gunvordahl','Tessa Stamp','Theresa Kind',
  'Thomas Geddes','Tiana McLean','Tim Yakimek','Tom Donaghy','Tom Edwards',
  'Tom Stoppard','Tori Morrison','Tracy Carroll','Tracy Penner','Trevor Duplessis',
  'Trevor Schmidt','Troy O\'Donnell','Tsuyoshi Turnbull','Tuan Kung Yun','Twilla MacLeod',
  'Val Planche','Valerie Planche','Vanessa Holmes','Vanessa Porteous','Vanessa Portious',
  'Vanessa Sabourin','Viktoria Grynenko','Wendy Lill','Whittyn Jason','William Hornecker',
  'William Shakespeare','Ximena Pinilla','Yazmina Reza','Yvette Martin',
]

// ── Timing (frames at ~60 fps) ──────────────────────────────────────────────
const FPS         = 60
const BLACK_DUR   = 10 * FPS
const TITLE_DUR   =  2 * FPS
const SUB_DUR     =  3 * FPS
const HOLD_DUR    =  3 * FPS
const FADEBLK_DUR =  4 * FPS
const NAMES_START = BLACK_DUR + TITLE_DUR + SUB_DUR + HOLD_DUR

// ── Canvas ───────────────────────────────────────────────────────────────────
const W  = 1280
const H  = 720
const CX = W / 2
const CY = H / 2
const NUM_ACTIVE = 48
const EDGE_PAD = 14          // min clearance from canvas edge
const CHAR_W   = 0.62        // em-ratio: approx char width / font-size for Playfair

const COLORS = ['#FF5F38','#00C09A','#7B3FE4','#BF1650','#F2EDDF','#F2EDDF','#FF5F38']

type Particle = {
  name: string
  x: number; y: number     // x = left edge of text; y = baseline
  vx: number; vy: number
  size: number
  tw: number               // approximate text width (size * CHAR_W * name.length)
  color: string
  opacity: number
  maxOpacity: number
  phase: 'wait' | 'in' | 'hold' | 'out'
  timer: number
  inDur: number; holdDur: number; outDur: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function approxTW(name: string, size: number) {
  return Math.ceil(name.length * size * CHAR_W)
}

function safePos(tw: number, size: number): { x: number; y: number } {
  // Ensure the full text rectangle sits inside the canvas, away from centre
  const maxX = W - tw  - EDGE_PAD
  const minX = EDGE_PAD
  const maxY = H - EDGE_PAD
  const minY = size + EDGE_PAD
  let x: number, y: number, tries = 0
  do {
    x = minX + Math.random() * (maxX - minX)
    y = minY + Math.random() * (maxY - minY)
    tries++
    // avoid a 320×120 rectangle around the centre title
  } while (tries < 30 && Math.abs(x + tw / 2 - CX) < 340 && Math.abs(y - size / 2 - CY) < 130)
  return { x, y }
}

function makeParticle(name: string, delay = 0): Particle {
  const size = 11 + Math.floor(Math.random() * 16)
  const tw   = approxTW(name, size)
  const { x, y } = safePos(tw, size)
  const angle = Math.random() * Math.PI * 2
  const speed = 0.12 + Math.random() * 0.22
  return {
    name, x, y, tw, size,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0,
    maxOpacity: 0.35 + Math.random() * 0.55,
    phase: 'wait',
    timer: delay,
    inDur:   45 + Math.floor(Math.random() * 45),
    holdDur: 200 + Math.floor(Math.random() * 260),
    outDur:  45 + Math.floor(Math.random() * 45),
  }
}

function bounceEdges(p: Particle) {
  if (p.x < EDGE_PAD)              { p.x  = EDGE_PAD;              p.vx =  Math.abs(p.vx) }
  if (p.x + p.tw > W - EDGE_PAD)  { p.x  = W - EDGE_PAD - p.tw;  p.vx = -Math.abs(p.vx) }
  if (p.y - p.size < EDGE_PAD)    { p.y  = p.size + EDGE_PAD;     p.vy =  Math.abs(p.vy) }
  if (p.y > H - EDGE_PAD)         { p.y  = H - EDGE_PAD;          p.vy = -Math.abs(p.vy) }
}

function collideParticles(particles: Particle[]) {
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]
    if (a.phase === 'wait' || a.opacity < 0.01) continue
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]
      if (b.phase === 'wait' || b.opacity < 0.01) continue
      // AABB overlap check (baseline y convention: rect is [x, y-size, x+tw, y])
      const ox = Math.min(a.x + a.tw, b.x + b.tw) - Math.max(a.x, b.x)
      const oy = Math.min(a.y, b.y)               - Math.max(a.y - a.size, b.y - b.size)
      if (ox <= 0 || oy <= 0) continue
      // Resolve along the smaller overlap axis, swap velocity on that axis
      if (ox < oy) {
        const push = ox / 2 + 1
        if (a.x < b.x) { a.x -= push; b.x += push } else { a.x += push; b.x -= push }
        const tmp = a.vx; a.vx = b.vx; b.vx = tmp
      } else {
        const push = oy / 2 + 1
        if (a.y < b.y) { a.y -= push; b.y += push } else { a.y += push; b.y -= push }
        const tmp = a.vy; a.vy = b.vy; b.vy = tmp
      }
      bounceEdges(a); bounceEdges(b)
    }
  }
}

// ── Shared animation state ────────────────────────────────────────────────────
type AnimState = {
  frame: number
  titleAlpha: number; subAlpha: number; overlayAlpha: number
  particles: Particle[]
  namesShown: Set<string>
  noRespawn: boolean
  fadingBlack: boolean
  done: boolean
  pool: string[]; poolIdx: number
  johnPhase: 'hidden' | 'in' | 'hold' | 'out' | 'done'
  johnAlpha: number
  johnTimer: number
  blackEndTimer: number
}

function freshState(): AnimState {
  return {
    frame: 0, titleAlpha: 0, subAlpha: 0, overlayAlpha: 0,
    particles: [], namesShown: new Set(),
    noRespawn: false, fadingBlack: false, done: false,
    pool: shuffle(NAMES), poolIdx: 0,
    johnPhase: 'hidden', johnAlpha: 0, johnTimer: 0, blackEndTimer: 600,
  }
}

function nextName(s: AnimState): string {
  if (s.poolIdx >= s.pool.length) { s.pool = shuffle(NAMES); s.poolIdx = 0 }
  return s.pool[s.poolIdx++]
}

export default function ShadowArtists() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const rafRef     = useRef<number>(0)
  const stateRef   = useRef<AnimState>(freshState())
  // Expose the draw step so startRecording can restart it
  const stepRef    = useRef<() => void>(() => {})

  const [recording,  setRecording]  = useState(false)
  const [elapsed,    setElapsed]    = useState(0)
  const [countdown,  setCountdown]  = useState<number | null>(10)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef   = useRef<Blob[]>([])
  const timerRef    = useRef<number>(0)
  const cdRef       = useRef<number>(0)
  const onDoneRef   = useRef<() => void>(() => {})

  // Keep onDoneRef current so the animation loop can auto-stop recording
  onDoneRef.current = () => {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop()
      clearInterval(timerRef.current)
      setRecording(false)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function step() {
      const s = stateRef.current
      if (s.done) return
      s.frame++

      // ── Background ──────────────────────────────────────────────────────────
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      // ── Title + subtitle alphas ─────────────────────────────────────────────
      if (s.frame >= BLACK_DUR)
        s.titleAlpha = Math.min(1, (s.frame - BLACK_DUR) / TITLE_DUR)

      const subStart = BLACK_DUR + TITLE_DUR
      if (s.frame >= subStart)
        s.subAlpha = Math.min(1, (s.frame - subStart) / SUB_DUR)

      // ── Spawn particles when names phase begins ─────────────────────────────
      if (s.frame === NAMES_START) {
        s.particles = Array.from({ length: NUM_ACTIVE }, (_, i) =>
          makeParticle(nextName(s), i * 10)
        )
      }

      // ── Update + draw particles ─────────────────────────────────────────────
      if (s.frame >= NAMES_START && !s.fadingBlack) {
        // Pass 1: update phases and positions
        for (const p of s.particles) {
          p.timer--
          if (p.phase === 'wait') {
            if (p.timer <= 0) { p.phase = 'in'; p.timer = p.inDur; s.namesShown.add(p.name) }
          } else if (p.phase === 'in') {
            p.opacity = (1 - p.timer / p.inDur) * p.maxOpacity
            p.x += p.vx; p.y += p.vy; bounceEdges(p)
            if (p.timer <= 0) { p.phase = 'hold'; p.timer = p.holdDur; p.opacity = p.maxOpacity }
          } else if (p.phase === 'hold') {
            p.x += p.vx; p.y += p.vy; bounceEdges(p)
            if (p.timer <= 0) { p.phase = 'out'; p.timer = p.outDur }
          } else if (p.phase === 'out') {
            p.opacity = (p.timer / p.outDur) * p.maxOpacity
            p.x += p.vx; p.y += p.vy; bounceEdges(p)
            if (p.timer <= 0) {
              if (s.noRespawn) {
                p.opacity = 0; p.phase = 'wait'; p.timer = 999999
              } else {
                const name  = nextName(s)
                const size  = 11 + Math.floor(Math.random() * 16)
                const tw    = approxTW(name, size)
                const { x, y } = safePos(tw, size)
                const angle = Math.random() * Math.PI * 2
                const speed = 0.12 + Math.random() * 0.22
                p.name = name; p.tw = tw; p.size = size; p.x = x; p.y = y
                p.vx = Math.cos(angle) * speed; p.vy = Math.sin(angle) * speed
                p.color      = COLORS[Math.floor(Math.random() * COLORS.length)]
                p.maxOpacity = 0.35 + Math.random() * 0.55
                p.opacity = 0; p.phase = 'wait'
                p.timer   = 20 + Math.floor(Math.random() * 80)
                p.inDur   = 45 + Math.floor(Math.random() * 45)
                p.holdDur = 200 + Math.floor(Math.random() * 260)
                p.outDur  = 45 + Math.floor(Math.random() * 45)
                s.namesShown.add(name)
              }
            }
          }
        }

        // Pass 2: draw
        for (const p of s.particles) {
          if (p.opacity > 0.005 && p.phase !== 'wait') {
            ctx.save()
            ctx.globalAlpha = p.opacity
            ctx.font = `${p.size}px 'Playfair Display', Georgia, serif`
            ctx.fillStyle = p.color
            ctx.fillText(p.name, p.x, p.y)
            ctx.restore()
          }
        }

        if (!s.noRespawn && s.namesShown.size >= NAMES.length) s.noRespawn = true

        if (s.noRespawn && s.johnPhase === 'hidden' &&
            s.particles.every(p => p.phase === 'wait' || p.opacity < 0.005)) {
          s.johnPhase = 'in'; s.johnTimer = 150
        }
      }

      // ── Centre title ────────────────────────────────────────────────────────
      if (s.titleAlpha > 0) {
        const grd = ctx.createRadialGradient(CX, CY, 0, CX, CY, 270)
        grd.addColorStop(0,    `rgba(0,0,0,${0.9  * s.titleAlpha})`)
        grd.addColorStop(0.5,  `rgba(0,0,0,${0.55 * s.titleAlpha})`)
        grd.addColorStop(1,    'rgba(0,0,0,0)')
        ctx.fillStyle = grd
        ctx.fillRect(CX - 270, CY - 270, 540, 540)

        ctx.save()
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'

        ctx.globalAlpha = s.titleAlpha
        ctx.font = `bold 72px 'Playfair Display', Georgia, serif`
        ctx.shadowColor = '#000'; ctx.shadowBlur = 24
        ctx.fillStyle = '#F2EDDF'
        ctx.fillText('Shadow Theatre', CX, CY - 24)

        if (s.subAlpha > 0) {
          ctx.globalAlpha = s.subAlpha * 0.35
          ctx.strokeStyle = '#FF5F38'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(CX - 170, CY + 8); ctx.lineTo(CX + 170, CY + 8); ctx.stroke()

          ctx.globalAlpha = s.subAlpha
          ctx.shadowBlur = 14
          ctx.font = `300 28px 'Playfair Display', Georgia, serif`
          ctx.fillStyle = '#FF5F38'
          ctx.fillText('30 Years of Artists', CX, CY + 40)
        }
        ctx.restore()
      }

      // ── John Hudson tribute ─────────────────────────────────────────────────
      if (s.johnPhase !== 'hidden' && s.johnPhase !== 'done') {
        s.johnTimer--
        if (s.johnPhase === 'in') {
          s.johnAlpha = Math.min(1, 1 - s.johnTimer / 150)
          if (s.johnTimer <= 0) { s.johnPhase = 'hold'; s.johnTimer = 300 }
        } else if (s.johnPhase === 'hold') {
          s.johnAlpha = 1
          if (s.johnTimer <= 0) { s.johnPhase = 'out'; s.johnTimer = 150 }
        } else if (s.johnPhase === 'out') {
          s.johnAlpha = Math.max(0, s.johnTimer / 150)
          if (s.johnTimer <= 0) { s.johnPhase = 'done'; s.fadingBlack = true }
        }

        if (s.johnAlpha > 0.005) {
          ctx.save()
          ctx.globalAlpha = s.johnAlpha
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.font = `italic 34px 'Playfair Display', Georgia, serif`
          ctx.fillStyle = '#F2EDDF'
          ctx.shadowColor = '#000'; ctx.shadowBlur = 28
          ctx.fillText('John Hudson', CX, CY + 98)
          ctx.restore()
        }
      }

      // ── Final fade to black then 10s hold ──────────────────────────────────
      if (s.fadingBlack) {
        s.overlayAlpha = Math.min(1, s.overlayAlpha + 1 / FADEBLK_DUR)
        ctx.globalAlpha = s.overlayAlpha
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H)
        ctx.globalAlpha = 1
        if (s.overlayAlpha >= 1) {
          s.blackEndTimer--
          if (s.blackEndTimer <= 0) {
            s.done = true
            onDoneRef.current()
            return
          }
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    stepRef.current = step

    // Countdown for the initial black phase
    clearInterval(cdRef.current)
    setCountdown(10)
    cdRef.current = window.setInterval(() =>
      setCountdown(c => { if (c === null || c <= 1) { clearInterval(cdRef.current); return null } return c - 1 })
    , 1000)

    document.fonts.ready.then(() => {
      rafRef.current = requestAnimationFrame(step)
    })

    return () => { cancelAnimationFrame(rafRef.current); clearInterval(cdRef.current) }
  }, [])

  function restartAnimation() {
    cancelAnimationFrame(rafRef.current)
    stateRef.current = freshState()
    clearInterval(cdRef.current)
    setCountdown(10)
    cdRef.current = window.setInterval(() =>
      setCountdown(c => { if (c === null || c <= 1) { clearInterval(cdRef.current); return null } return c - 1 })
    , 1000)
    rafRef.current = requestAnimationFrame(stepRef.current)
  }

  function startRecording() {
    restartAnimation()
    const canvas = canvasRef.current!
    chunksRef.current = []
    const stream   = canvas.captureStream(30)
    const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm'
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 })
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `shadow-artists.${mimeType.includes('mp4') ? 'mp4' : 'webm'}`
      a.click(); URL.revokeObjectURL(url)
    }
    recorder.start()
    recorderRef.current = recorder
    setRecording(true); setElapsed(0)
    timerRef.current = window.setInterval(() => setElapsed(s => s + 1), 1000)
  }

  function stopRecording() {
    recorderRef.current?.stop()
    clearInterval(timerRef.current)
    setRecording(false)
  }

  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const secs = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="pt-16 min-h-screen bg-[#1C1410] flex flex-col items-center justify-center gap-4 px-4 py-8">
      <div className="relative w-full max-w-[1280px]">
        <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto rounded block" />
        {countdown !== null && (
          <div className="absolute bottom-3 right-4 pointer-events-none">
            <p className="text-white/20 text-xs tracking-widest uppercase">begins in {countdown}s</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-1">
        {!recording ? (
          <button
            onClick={startRecording}
            className="inline-flex items-center gap-2 bg-[#FF5F38] hover:bg-[#ff7a57] text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Record from Start
          </button>
        ) : (
          <>
            <div className="flex items-center gap-2 text-white/50 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {mins}:{secs}
            </div>
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors"
            >
              Stop & Download
            </button>
          </>
        )}
        <p className="text-white/20 text-xs">
          {typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4')
            ? 'saves as .mp4' : 'saves as .webm'}
        </p>
      </div>
    </div>
  )
}
