const SAVE_KEY = "neon-exile-save-v3";
const SLOT_KEY = "neon-exile-active-slot";
const SLOT_COUNT = 3;

const classes = {
  runner: {
    name: "Ghost Runner",
    description: "Fast, slippery, and built for ugly exits.",
    statBonus: { guts: 0, wits: 2, charm: 1 },
    moves: [
      { level: 1, name: "Static Step", effect: "Quick Wits strike with a light dodge.", stat: "wits", power: 8 },
      { level: 5, name: "Ghost Fork", effect: "Heavy Wits damage through a fake signal.", stat: "wits", power: 13 },
      { level: 10, name: "Backdoor Blur", effect: "Wits damage and speed reduces the counterhit.", stat: "wits", power: 17 },
      { level: 15, name: "Blackout Sprint", effect: "Big Wits hit with a clean getaway angle.", stat: "wits", power: 22 },
      { level: 20, name: "Zero-Day Mirage", effect: "Devastating Wits strike that scrambles the scene.", stat: "wits", power: 30 },
    ],
  },
  breaker: {
    name: "Chrome Breaker",
    description: "Heavy implants, louder decisions, fewer apologies.",
    statBonus: { guts: 2, wits: 0, charm: 1 },
    moves: [
      { level: 1, name: "Knuckle Charge", effect: "Direct Guts attack with extra force.", stat: "guts", power: 9 },
      { level: 5, name: "Pain Battery", effect: "Guts attack that restores a little Guts.", stat: "guts", power: 13, heal: 4 },
      { level: 10, name: "Chrome Haymaker", effect: "Heavy Guts damage through armor.", stat: "guts", power: 18 },
      { level: 15, name: "Streetquake", effect: "Massive Guts hit that rattles elite foes.", stat: "guts", power: 24 },
      { level: 20, name: "Riot Engine", effect: "Devastating Guts attack and self-repair surge.", stat: "guts", power: 31, heal: 8 },
    ],
  },
  face: {
    name: "Neon Face",
    description: "A smile, a knife, and several forged identities.",
    statBonus: { guts: 1, wits: 1, charm: 2 },
    moves: [
      { level: 1, name: "Silver Lie", effect: "Charm strike that softens the counterhit.", stat: "charm", power: 7 },
      { level: 5, name: "Debt Smile", effect: "Charm damage with a credit skim.", stat: "charm", power: 12, credits: 8 },
      { level: 10, name: "Borrowed Face", effect: "Charm hit that leaves the foe uncertain.", stat: "charm", power: 16 },
      { level: 15, name: "Turncoat Signal", effect: "Heavy Charm attack through social pressure.", stat: "charm", power: 22 },
      { level: 20, name: "Crown of Lies", effect: "Devastating Charm strike that pays extra.", stat: "charm", power: 29, credits: 18 },
    ],
  },
};

const portraits = Array.from({ length: 16 }, (_, index) => `portrait-${String(index + 1).padStart(2, "0")}`);

const pixelArt = {
  rook: "pixel-rook",
  glass: "pixel-glass",
  wastes: "pixel-wastes",
  dock: "pixel-dock",
  penthouse: "pixel-penthouse",
  convoy: "pixel-convoy",
  rookMarket: "pixel-market-rook",
  glassMarket: "pixel-market-glass",
  wasteMarket: "pixel-market-waste",
  harbor: "pixel-harbor",
  foundry: "pixel-foundry",
  reef: "pixel-reef",
  harborMarket: "pixel-market-harbor",
  foundryMarket: "pixel-market-foundry",
  reefMarket: "pixel-market-reef",
  canal: "pixel-foe-canal",
  moldjack: "pixel-foe-moldjack",
  medic: "pixel-foe-medic",
  drone: "pixel-foe-drone",
  hexer: "pixel-foe-hexer",
  courier: "pixel-foe-courier",
  raider: "pixel-foe-raider",
  titan: "pixel-foe-titan",
  scav: "pixel-foe-scav",
  sewerBruiser: "pixel-foe-sewerBruiser",
  ratKing: "pixel-foe-ratKing",
  gateWarden: "pixel-foe-gateWarden",
  killDrone: "pixel-foe-killDrone",
  ashlung: "pixel-foe-ashlung",
  scrapHorror: "pixel-foe-scrapHorror",
  ambiguousStranger: "pixel-foe-ambiguousStranger",
  cyberBrute: "pixel-foe-cyberBrute",
  neonSniper: "pixel-foe-neonSniper",
  biotechCreature: "pixel-foe-biotechCreature",
  lostWorker: "pixel-foe-lostWorker",
  sludgeCultist: "pixel-foe-sludgeCultist",
  whistleblower: "pixel-foe-whistleblower",
  corpAssassin: "pixel-foe-corpAssassin",
  wastelandPilgrim: "pixel-foe-wastelandPilgrim",
  sandstormBeast: "pixel-foe-sandstormBeast",
  smugglerTrouble: "pixel-foe-smugglerTrouble",
  craneEnforcer: "pixel-foe-craneEnforcer",
  burnedWorker: "pixel-foe-burnedWorker",
  furnaceGuard: "pixel-foe-furnaceGuard",
  reefGuardian: "pixel-foe-reefGuardian",
  abyssHorror: "pixel-foe-abyssHorror",
};

const areas = {
  rook: {
    name: "Rook Sprawl",
    level: 1,
    art: pixelArt.rook,
    description: "Rain-fed alleys, bargain cybernetics, and jobs nobody sober would post.",
    nodes: [
      { type: "merchant", id: "rookMarket", title: "Grinwire Market", slot: "upper-left" },
      { type: "area", id: "glass", title: "Glassline Heights", slot: "upper-right" },
      { type: "quest", id: "dock", title: "Flood Dock Shakedown", slot: "center" },
      { type: "quest", id: "sewers", title: "Blackwater Sewers", slot: "lower-left", requires: { item: "Hazmat Suit", count: 1 } },
      { type: "area", id: "wastes", title: "Outer Wastes", slot: "lower-right" },
    ],
  },
  glass: {
    name: "Glassline Heights",
    level: 3,
    art: pixelArt.glass,
    description: "Executive towers, clean streets, private drones, and crimes with better lighting.",
    nodes: [
      { type: "merchant", id: "glassMarket", title: "Elevator 99 Dealers", slot: "upper-right" },
      { type: "area", id: "rook", title: "Rook Sprawl", slot: "upper-left" },
      { type: "quest", id: "penthouse", title: "Penthouse Data Wake", slot: "center" },
      { type: "area", id: "harbor", title: "Chrome Harbor", slot: "lower-left" },
      { type: "quest", id: "skybridge", title: "Private Skybridge", slot: "lower-right", requires: { item: "Forged Access Badge", count: 1 } },
    ],
  },
  wastes: {
    name: "Outer Wastes",
    level: 5,
    art: pixelArt.wastes,
    description: "Past the wall: dead satellites, hungry sand, and salvage worth dying for.",
    nodes: [
      { type: "merchant", id: "wasteMarket", title: "Dust Saint Caravan", slot: "lower-left" },
      { type: "quest", id: "convoy", title: "Burnt Convoy Signal", slot: "center" },
      { type: "quest", id: "deadzone", title: "Dead Air Crater", slot: "upper-right", requires: { item: "Oxygen Bottle", count: 1 } },
      { type: "area", id: "foundry", title: "Orbital Foundry", slot: "lower-right" },
      { type: "area", id: "rook", title: "Rook Sprawl", slot: "upper-left" },
    ],
  },
  harbor: {
    name: "Chrome Harbor",
    level: 7,
    art: pixelArt.harbor,
    description: "Smuggler docks, rain-slick cranes, and data cargo nobody admits exists.",
    nodes: [
      { type: "merchant", id: "harborMarket", title: "Tidewire Exchange", slot: "upper-right" },
      { type: "area", id: "glass", title: "Glassline Heights", slot: "upper-left" },
      { type: "quest", id: "smugglerPier", title: "Smuggler Pier", slot: "center" },
      { type: "quest", id: "serverVault", title: "Submerged Server Vault", slot: "lower-right", requires: { item: "Diving Rig", count: 1 } },
      { type: "area", id: "reef", title: "Neon Reef", slot: "lower-left" },
    ],
  },
  reef: {
    name: "Neon Reef",
    level: 15,
    art: pixelArt.reef,
    description: "A submerged neon colony where coral grows through server glass and pressure locks decide who lives.",
    nodes: [
      { type: "merchant", id: "reefMarket", title: "Reefglass Market", slot: "upper-right" },
      { type: "area", id: "harbor", title: "Chrome Harbor", slot: "upper-left" },
      { type: "quest", id: "coralShrine", title: "Coral Data Shrine", slot: "center" },
      { type: "quest", id: "abyssRelay", title: "Abyss Relay", slot: "lower-right", requires: { item: "Pressure Beacon", count: 1 } },
    ],
  },
  foundry: {
    name: "Orbital Foundry",
    level: 9,
    art: pixelArt.foundry,
    description: "A rusted launchworks where furnace crews sell secrets under falling sparks.",
    nodes: [
      { type: "merchant", id: "foundryMarket", title: "Sparkfall Bazaar", slot: "lower-left" },
      { type: "area", id: "wastes", title: "Outer Wastes", slot: "upper-left" },
      { type: "quest", id: "furnaceLine", title: "Furnace Line", slot: "center" },
      { type: "quest", id: "vacuumYard", title: "Vacuum Yard", slot: "upper-right", requires: { item: "Pressure Seal", count: 1 } },
    ],
  },
};

const questArt = {
  dock: pixelArt.dock,
  sewers: "pixel-quest-sewers",
  penthouse: pixelArt.penthouse,
  skybridge: "pixel-quest-skybridge",
  convoy: pixelArt.convoy,
  deadzone: "pixel-quest-deadzone",
  smugglerPier: "pixel-quest-smuggler",
  serverVault: "pixel-quest-vault",
  furnaceLine: "pixel-quest-furnace",
  vacuumYard: "pixel-quest-vacuum",
  coralShrine: "pixel-quest-coral",
  abyssRelay: "pixel-quest-abyss",
};

const foes = {
  dock: [
    { name: "Canal Knife", key: "canal", hp: 16, damage: 4, xp: 8, credits: 16, loot: "Wetwired Switchblade" },
    { name: "Moldjack Enforcer", key: "moldjack", hp: 22, damage: 5, xp: 10, credits: 22, loot: "Encrypted Paystub" },
    {
      name: "Pinned Back-Alley Medic",
      key: "medic",
      hp: 18,
      damage: 3,
      xp: 10,
      credits: 12,
      loot: "Trauma Kit",
      help: {
        label: "Pull them out",
        prompt: "The medic is caught under a sparking clinic door while looters close in.",
        success: "You haul the medic free before the door cooks them. They press a warm loot pouch into your hand.",
      },
    },
  ],
  sewers: [
    { name: "Sump Leech Bruiser", key: "sewerBruiser", hp: 34, damage: 8, xp: 22, credits: 52, loot: "Industrial Biofilter" },
    { name: "Hazard Rat King", key: "ratKing", hp: 38, damage: 9, xp: 24, credits: 58, loot: "Mutant Crown Gland" },
  ],
  penthouse: [
    { name: "Lobby Saint Drone", key: "drone", hp: 28, damage: 7, xp: 16, credits: 44, loot: "Polished Targeting Lens" },
    { name: "Boardroom Hexer", key: "hexer", hp: 34, damage: 8, xp: 18, credits: 52, loot: "Executive Blackmail Shard" },
    {
      name: "Cornered Data Courier",
      key: "courier",
      hp: 26,
      damage: 6,
      xp: 18,
      credits: 38,
      loot: "Hot Courier Cache",
      help: {
        label: "Cover the courier",
        prompt: "A courier with a skull port full of stolen evidence begs for a clean exit.",
        success: "You fake a security sweep and the courier vanishes, leaving coordinates and a cache key.",
      },
    },
  ],
  skybridge: [
    { name: "Executive Gate Warden", key: "gateWarden", hp: 48, damage: 11, xp: 32, credits: 92, loot: "Private Elevator Cipher" },
    { name: "Glassline Kill-Drone", key: "killDrone", hp: 46, damage: 12, xp: 34, credits: 98, loot: "Platinum Drone Heart" },
  ],
  convoy: [
    { name: "Sun-Baked Raider", key: "raider", hp: 42, damage: 10, xp: 24, credits: 74, loot: "Convoy Fuel Heart" },
    { name: "Scrap Titan", key: "titan", hp: 58, damage: 12, xp: 32, credits: 110, loot: "Military Grade Spine" },
    {
      name: "Half-Buried Scavenger",
      key: "scav",
      hp: 38,
      damage: 8,
      xp: 28,
      credits: 70,
      loot: "Pre-Collapse Salvage Map",
      help: {
        label: "Dig them free",
        prompt: "A scavenger is pinned beneath a solar rig. Their pack might be bait. Their breathing is real.",
        success: "You pry the rig loose. The scavenger coughs up thanks and points you to buried salvage.",
      },
    },
  ],
  deadzone: [
    { name: "Ashlung Marauder", key: "ashlung", hp: 68, damage: 15, xp: 46, credits: 160, loot: "Irradiated Core Cell" },
    { name: "Crater Scrap Horror", key: "scrapHorror", hp: 82, damage: 17, xp: 52, credits: 188, loot: "Meteor-Cut Alloy" },
  ],
  smugglerPier: [
    { name: "Tidewire Cutter", key: "canal", hp: 48, damage: 11, xp: 32, credits: 84, loot: "Smuggled Optic Crate" },
    { name: "Dockside Signal Thief", key: "courier", hp: 44, damage: 10, xp: 30, credits: 78, loot: "Salted Data Pearl" },
  ],
  serverVault: [
    { name: "Drowned Server Wraith", key: "sewerBruiser", hp: 62, damage: 14, xp: 44, credits: 140, loot: "Submerged Memory Core" },
    { name: "Pressure-Locked Guardian", key: "killDrone", hp: 66, damage: 15, xp: 48, credits: 152, loot: "Abyssal Cooling Key" },
  ],
  furnaceLine: [
    { name: "Furnace Crew Butcher", key: "raider", hp: 56, damage: 13, xp: 38, credits: 110, loot: "Molten Gearheart" },
    { name: "Sparkfall Saboteur", key: "hexer", hp: 52, damage: 12, xp: 36, credits: 104, loot: "Ignition Cipher" },
  ],
  vacuumYard: [
    { name: "Vacuum Yard Reaver", key: "ashlung", hp: 74, damage: 17, xp: 54, credits: 180, loot: "Void-Sealed Reactor" },
    { name: "Orbital Scrap Colossus", key: "scrapHorror", hp: 92, damage: 19, xp: 62, credits: 220, loot: "Starfall Alloy Spine" },
  ],
  coralShrine: [
    { name: "Coral Data Guardian", key: "reefGuardian", hp: 94, damage: 20, xp: 72, credits: 260, loot: "Coral Logic Core" },
    { name: "Reefglass Sentinel", key: "killDrone", hp: 88, damage: 19, xp: 68, credits: 240, loot: "Glass Current Lens" },
    { name: "Drowned Shrine Keeper", key: "whistleblower", hp: 82, damage: 18, xp: 70, credits: 230, loot: "Shrine Keeper's Cache", help: { label: "Seal the leak", prompt: "A shrine keeper clutches a cracked oxygen seal while the data coral flashes a warning pattern.", success: "You patch the seal and the keeper opens a hidden coral cache before fading into the blue light." } },
    { name: "Bioelectric Reef Stalker", key: "biotechCreature", hp: 92, damage: 21, xp: 74, credits: 255, loot: "Charged Coral Spine" },
  ],
  abyssRelay: [
    { name: "Abyss Relay Horror", key: "abyssHorror", hp: 122, damage: 25, xp: 96, credits: 340, loot: "Abyss Relay Heart" },
    { name: "Pressure-Cracked Colossus", key: "scrapHorror", hp: 132, damage: 27, xp: 104, credits: 380, loot: "Pressure-Cut Alloy" },
    { name: "Lost Deep Diver", key: "smugglerTrouble", hp: 102, damage: 23, xp: 92, credits: 320, loot: "Deep Diver's Beacon", help: { label: "Share the beacon", prompt: "A deep diver drifts beyond the relay glass, one hand raised around a dying signal beacon.", success: "You sync your beacon with theirs and pull them into the lock. They leave their backup beacon in your hands." } },
    { name: "Blackwater Relay Wraith", key: "sewerBruiser", hp: 118, damage: 26, xp: 100, credits: 360, loot: "Null-Signal Pearl" },
  ],
};

const actionLabels = {
  attack: ["Smoke this fool!", "Ruin this creep", "Drop the hammer", "Make it loud"],
  trick: ["Hack the angle", "Spoof their eyes", "Turn the scene sideways", "Crash their nerve"],
  run: ["Run Away! Run Away!", "Let's lose this jerk", "Vanish into static", "Find better odds"],
};

const helpLoot = ["Prototype Med-Chip", "Gratitude-Wrapped Credstick", "Lucky Circuit Charm", "Black Clinic Voucher", "Old World Battery"];

const questExtraFoes = {
  dock: [
    { name: "Neon Sniper Ambusher", key: "neonSniper", hp: 20, damage: 6, xp: 12, credits: 28, loot: "Scoped Optic Chip" },
  ],
  sewers: [
    { name: "Lost Sewer Worker", key: "lostWorker", hp: 30, damage: 7, xp: 24, credits: 48, loot: "Union Hazard Key", help: { label: "Guide them out", prompt: "A sewer worker waves a broken lamp and begs for a path back to daylight.", success: "You mark the tunnel walls and get them moving. They hand over a hazard key before vanishing into steam." } },
    { name: "Toxic Sludge Cultist", key: "sludgeCultist", hp: 36, damage: 10, xp: 28, credits: 62, loot: "Cult Filtration Mask" },
  ],
  penthouse: [
    { name: "Executive Assassin", key: "corpAssassin", hp: 36, damage: 10, xp: 22, credits: 70, loot: "Assassin Contract Shard" },
  ],
  skybridge: [
    { name: "Corporate Whistleblower", key: "whistleblower", hp: 42, damage: 9, xp: 34, credits: 88, loot: "Witness Keycard", help: { label: "Extract the witness", prompt: "A terrified whistleblower is pinned behind smartglass while security closes the bridge.", success: "You break the bridge lights and pull the witness through the blind spot. They leave you a keycard and a shaking nod." } },
    { name: "Glassline Assassin", key: "corpAssassin", hp: 50, damage: 13, xp: 38, credits: 110, loot: "Mirror-Knife Handle" },
  ],
  convoy: [
    { name: "Sandstorm Beast", key: "sandstormBeast", hp: 56, damage: 14, xp: 36, credits: 120, loot: "Storm-Hardened Fang" },
  ],
  deadzone: [
    { name: "Wasteland Pilgrim", key: "wastelandPilgrim", hp: 58, damage: 13, xp: 50, credits: 150, loot: "Pilgrim's Rad Compass", help: { label: "Share air", prompt: "A pilgrim claws at a cracked respirator and points toward a safer cut through the crater.", success: "You give them a breath of clean air. They mark a salvage cache before stumbling away." } },
    { name: "Crater Sandstorm Beast", key: "sandstormBeast", hp: 76, damage: 18, xp: 58, credits: 190, loot: "Irradiated Fang Cluster" },
  ],
  smugglerPier: [
    { name: "Cornered Smuggler", key: "smugglerTrouble", hp: 46, damage: 11, xp: 36, credits: 92, loot: "Smuggler's Wet Cache", help: { label: "Cut them loose", prompt: "A smuggler is tangled in electrified mooring cable as rivals close in.", success: "You kill the current and let them slip the cable. They toss you a wet cache and disappear under the pier." } },
    { name: "Dock Crane Enforcer", key: "craneEnforcer", hp: 58, damage: 14, xp: 40, credits: 118, loot: "Crane Override Hook" },
  ],
  serverVault: [
    { name: "Trapped Vault Diver", key: "smugglerTrouble", hp: 64, damage: 15, xp: 52, credits: 160, loot: "Diver's Blackbox", help: { label: "Equalize pressure", prompt: "A diver pounds on a pressure door as the server vault fills with black water.", success: "You equalize the lock and drag them out with seconds to spare. Their blackbox is yours." } },
    { name: "Biotech Vault Creature", key: "biotechCreature", hp: 78, damage: 18, xp: 60, credits: 205, loot: "Wet Biotech Heart" },
  ],
  furnaceLine: [
    { name: "Burned Foundry Worker", key: "burnedWorker", hp: 54, damage: 12, xp: 42, credits: 120, loot: "Foundry Union Token", help: { label: "Pull them from the slag", prompt: "A burned worker is trapped beside a slag trough while security pretends not to see.", success: "You drag them clear and they press a union token into your palm." } },
    { name: "Furnace Armored Guard", key: "furnaceGuard", hp: 66, damage: 16, xp: 46, credits: 140, loot: "Heat-Scarred Badge" },
  ],
  vacuumYard: [
    { name: "Airlock Burn Victim", key: "burnedWorker", hp: 72, damage: 16, xp: 58, credits: 188, loot: "Pressure-Safe Cache", help: { label: "Seal the airlock", prompt: "A worker is half-pinned in a failing airlock, one hand still holding the pressure lever.", success: "You seal the airlock before the yard vents. The worker leaves you the cache code." } },
    { name: "Vacuum Furnace Guard", key: "furnaceGuard", hp: 90, damage: 20, xp: 66, credits: 235, loot: "Vacuum-Forged Plate" },
  ],
};

const equipmentSlots = {
  lHand: "L hand",
  rHand: "R hand",
  head: "Head",
  body: "Body",
  feet: "Feet",
};

const implantSlots = {
  neural: "Neural implant",
  arms: "Arm implant",
  core: "Core implant",
  legs: "Leg implant",
};

const gearStats = {
  attack: "A",
  defense: "D",
  speed: "S",
  wits: "W",
  guts: "G",
  charm: "C",
};

const itemArt = {
  "Street Pistol": "street-pistol",
  "Trashcan Shield": "trashcan-shield",
  "Snap Baton": "snap-baton",
  "Signal Beanie": "signal-beanie",
  "Rainproof Jacket": "rainproof-jacket",
  "Grip Sole Sneakers": "grip-sole-sneakers",
  "Monowire Cuff": "monowire-cuff",
  "Executive Buckler": "executive-buckler",
  "Polite Stiletto": "polite-stiletto",
  "Glass Halo Visor": "glass-halo-visor",
  "Mirrorweave Suit": "mirrorweave-suit",
  "Softstep Dress Shoes": "softstep-dress-shoes",
  "Rail Hatchet": "rail-hatchet",
  "Convoy Door Shield": "convoy-door-shield",
  "Storm Rifle": "storm-rifle",
  "Nomad Plating": "nomad-plating",
  "Cheap Reflex Thread": "extra/cheap-reflex-thread",
  "Pocket Lie Filter": "extra/pocket-lie-filter",
  "Bone Buzzers": "extra/bone-buzzers",
  "Boardroom Cortex": "extra/boardroom-cortex",
  "Handshake Razors": "extra/handshake-razors",
  "Social Malware": "extra/social-malware",
  "Storm Injector": "extra/storm-injector",
  "Nomad Knee Pistons": "extra/nomad-knee-pistons",
  "War Memory Cache": "extra/war-memory-cache",
  "Cheap Medpack": "extra/cheap-medpack",
  "Nerve Popper": "extra/nerve-popper",
  "Grin Tonic": "extra/grin-tonic",
  "Hazmat Suit": "extra/hazmat-suit",
  "Executive Medfoam": "extra/executive-medfoam",
  "Focus Bloom": "extra/focus-bloom",
  "Velvet Signal": "extra/velvet-signal",
  "Forged Access Badge": "extra/forged-access-badge",
  "Dust Saint Medpack": "extra/dust-saint-medpack",
  "War Rush Ampoule": "extra/war-rush-ampoule",
  "Desert Ghost Dose": "extra/desert-ghost-dose",
  "Oxygen Bottle": "extra/oxygen-bottle",
  "Wetwired Switchblade": "extra/wetwired-switchblade",
  "Encrypted Paystub": "extra/encrypted-paystub",
  "Trauma Kit": "extra/trauma-kit",
  "Industrial Biofilter": "extra/industrial-biofilter",
  "Mutant Crown Gland": "extra/mutant-crown-gland",
  "Polished Targeting Lens": "extra/polished-targeting-lens",
  "Executive Blackmail Shard": "extra/executive-blackmail-shard",
  "Hot Courier Cache": "extra/hot-courier-cache",
  "Private Elevator Cipher": "extra/private-elevator-cipher",
  "Platinum Drone Heart": "extra/platinum-drone-heart",
  "Convoy Fuel Heart": "extra/convoy-fuel-heart",
  "Military Grade Spine": "extra/military-grade-spine",
  "Pre-Collapse Salvage Map": "extra/pre-collapse-salvage-map",
  "Irradiated Core Cell": "extra/irradiated-core-cell",
  "Meteor-Cut Alloy": "extra/meteor-cut-alloy",
  "Prototype Med-Chip": "extra/cheap-reflex-thread",
  "Gratitude-Wrapped Credstick": "extra/encrypted-paystub",
  "Lucky Circuit Charm": "extra/social-malware",
  "Black Clinic Voucher": "extra/private-elevator-cipher",
  "Old World Battery": "extra/convoy-fuel-heart",
};

const merchants = {
  rookMarket: {
    name: "Grinwire Market",
    intro: "A cracked neon awning buzzes over crates of questionable upgrades.",
    dealers: {
      weapons: [
        { name: "Street Pistol", type: "weapon", slot: "hand", cost: 35, mods: { attack: 3, speed: 1 }, note: "A 3 / S 1" },
        { name: "Trashcan Shield", type: "shield", slot: "hand", cost: 32, mods: { defense: 3, guts: 1, speed: -1 }, note: "D 3 / G 1 / S -1" },
        { name: "Snap Baton", type: "weapon", slot: "hand", cost: 28, mods: { attack: 2, speed: 1, wits: 1 }, note: "A 2 / S 1 / W 1" },
      ],
      armor: [
        { name: "Signal Beanie", type: "head", slot: "head", cost: 24, mods: { defense: 1, wits: 2 }, note: "D 1 / W 2" },
        { name: "Rainproof Jacket", type: "body", slot: "body", cost: 38, mods: { defense: 4, speed: -1 }, note: "D 4 / S -1" },
        { name: "Grip Sole Sneakers", type: "feet", slot: "feet", cost: 30, mods: { speed: 3, defense: 1 }, note: "S 3 / D 1" },
      ],
      implants: [
        { name: "Cheap Reflex Thread", type: "implant", slot: "legs", cost: 46, mods: { speed: 2, attack: 1 }, note: "Leg implant: S 2 / A 1" },
        { name: "Pocket Lie Filter", type: "implant", slot: "neural", cost: 44, mods: { charm: 2, wits: 1 }, note: "Neural implant: C 2 / W 1" },
        { name: "Bone Buzzers", type: "implant", slot: "arms", cost: 52, mods: { guts: 2, attack: 1 }, note: "Arm implant: G 2 / A 1" },
      ],
      items: [
        { name: "Cheap Medpack", type: "consumable", kind: "heal", cost: 18, heal: 12, note: "Restores 12 Guts" },
        { name: "Nerve Popper", type: "consumable", kind: "booster", cost: 34, duration: 2, mods: { speed: 2, wits: 1 }, note: "S +2 / W +1 for 2 quests" },
        { name: "Grin Tonic", type: "consumable", kind: "booster", cost: 30, duration: 2, mods: { charm: 2 }, note: "C +2 for 2 quests" },
        { name: "Hazmat Suit", type: "resource", cost: 26, value: 13, note: "Consumed to quest in Blackwater Sewers" },
      ],
    },
  },
  glassMarket: {
    name: "Elevator 99 Dealers",
    intro: "A luxury elevator that only stops for people with credits.",
    dealers: {
      weapons: [
        { name: "Monowire Cuff", type: "weapon", slot: "hand", cost: 88, mods: { attack: 5, wits: 2 }, note: "A 5 / W 2" },
        { name: "Executive Buckler", type: "shield", slot: "hand", cost: 82, mods: { defense: 5, charm: 1, speed: -1 }, note: "D 5 / C 1 / S -1" },
        { name: "Polite Stiletto", type: "weapon", slot: "hand", cost: 76, mods: { attack: 4, charm: 2 }, note: "A 4 / C 2" },
      ],
      armor: [
        { name: "Glass Halo Visor", type: "head", slot: "head", cost: 72, mods: { defense: 2, wits: 3, charm: 1 }, note: "D 2 / W 3 / C 1" },
        { name: "Mirrorweave Suit", type: "body", slot: "body", cost: 96, mods: { defense: 6, charm: 1, guts: -1 }, note: "D 6 / C 1 / G -1" },
        { name: "Softstep Dress Shoes", type: "feet", slot: "feet", cost: 70, mods: { speed: 4, charm: 1 }, note: "S 4 / C 1" },
      ],
      implants: [
        { name: "Boardroom Cortex", type: "implant", slot: "neural", cost: 118, mods: { wits: 4, charm: 1 }, note: "Neural implant: W 4 / C 1" },
        { name: "Handshake Razors", type: "implant", slot: "arms", cost: 112, mods: { attack: 3, charm: 2 }, note: "Arm implant: A 3 / C 2" },
        { name: "Social Malware", type: "implant", slot: "core", cost: 105, mods: { charm: 4, defense: 1 }, note: "Core implant: C 4 / D 1" },
      ],
      items: [
        { name: "Executive Medfoam", type: "consumable", kind: "heal", cost: 48, heal: 28, note: "Restores 28 Guts" },
        { name: "Focus Bloom", type: "consumable", kind: "booster", cost: 76, duration: 3, mods: { wits: 3 }, note: "W +3 for 3 quests" },
        { name: "Velvet Signal", type: "consumable", kind: "booster", cost: 72, duration: 3, mods: { charm: 3, speed: 1 }, note: "C +3 / S +1 for 3 quests" },
        { name: "Forged Access Badge", type: "resource", cost: 64, value: 32, note: "Consumed to quest on the Private Skybridge" },
      ],
    },
  },
  wasteMarket: {
    name: "Dust Saint Caravan",
    intro: "Armored vans circle a fire made from obsolete server racks.",
    dealers: {
      weapons: [
        { name: "Rail Hatchet", type: "weapon", slot: "hand", cost: 140, mods: { attack: 8, guts: 2, speed: -2 }, note: "A 8 / G 2 / S -2" },
        { name: "Convoy Door Shield", type: "shield", slot: "hand", cost: 126, mods: { defense: 8, speed: -2, charm: -1 }, note: "D 8 / S -2 / C -1" },
        { name: "Storm Rifle", type: "weapon", slot: "hand", cost: 155, mods: { attack: 7, wits: 2, speed: 1 }, note: "A 7 / W 2 / S 1" },
      ],
      armor: [
        { name: "Dust Crown Hood", type: "head", slot: "head", cost: 96, mods: { defense: 3, wits: 2, charm: 1 }, note: "D 3 / W 2 / C 1" },
        { name: "Nomad Plating", type: "body", slot: "body", cost: 130, mods: { defense: 9, guts: 1, speed: -2 }, note: "D 9 / G 1 / S -2" },
        { name: "Sandspike Boots", type: "feet", slot: "feet", cost: 104, mods: { speed: 6, defense: 1 }, note: "S 6 / D 1" },
      ],
      implants: [
        { name: "Storm Injector", type: "implant", slot: "core", cost: 136, mods: { guts: 4, speed: 1 }, note: "Core implant: G 4 / S 1" },
        { name: "Nomad Knee Pistons", type: "implant", slot: "legs", cost: 124, mods: { speed: 5, defense: 1 }, note: "Leg implant: S 5 / D 1" },
        { name: "War Memory Cache", type: "implant", slot: "neural", cost: 145, mods: { wits: 3, attack: 2 }, note: "Neural implant: W 3 / A 2" },
      ],
      items: [
        { name: "Dust Saint Medpack", type: "consumable", kind: "heal", cost: 68, heal: 42, note: "Restores 42 Guts" },
        { name: "War Rush Ampoule", type: "consumable", kind: "booster", cost: 98, duration: 3, mods: { guts: 3, attack: 2, speed: -1 }, note: "G +3 / A +2 / S -1 for 3 quests" },
        { name: "Desert Ghost Dose", type: "consumable", kind: "booster", cost: 110, duration: 4, mods: { speed: 4, wits: 1 }, note: "S +4 / W +1 for 4 quests" },
        { name: "Oxygen Bottle", type: "resource", cost: 82, value: 41, note: "Consumed to quest in Dead Air Crater" },
      ],
    },
  },
  harborMarket: {
    name: "Tidewire Exchange",
    intro: "Smugglers sell clean steel, wet data, and excuses under sodium dock lamps.",
    dealers: {
      weapons: [
        { name: "Harbor Flechette", type: "weapon", slot: "hand", cost: 168, mods: { attack: 8, speed: 2 }, note: "A 8 / S 2" },
        { name: "Bulkhead Shield", type: "shield", slot: "hand", cost: 150, mods: { defense: 9, speed: -1 }, note: "D 9 / S -1" },
        { name: "Tidehook Blade", type: "weapon", slot: "hand", cost: 132, mods: { attack: 6, charm: 2 }, note: "A 6 / C 2" },
      ],
      armor: [
        { name: "Saltglass Hood", type: "head", slot: "head", cost: 112, mods: { defense: 3, wits: 3 }, note: "D 3 / W 3" },
        { name: "Smuggler Slickcoat", type: "body", slot: "body", cost: 148, mods: { defense: 7, charm: 2 }, note: "D 7 / C 2" },
        { name: "Mag-Dock Boots", type: "feet", slot: "feet", cost: 120, mods: { speed: 5, defense: 2 }, note: "S 5 / D 2" },
      ],
      implants: [
        { name: "Tide Lung Mesh", type: "implant", slot: "core", cost: 170, mods: { guts: 3, defense: 2 }, note: "Core implant: G 3 / D 2" },
        { name: "Smuggler Palm Port", type: "implant", slot: "arms", cost: 154, mods: { wits: 3, charm: 2 }, note: "Arm implant: W 3 / C 2" },
        { name: "Harbor Ghost Eye", type: "implant", slot: "neural", cost: 166, mods: { wits: 4, speed: 1 }, note: "Neural implant: W 4 / S 1" },
      ],
      items: [
        { name: "Harbor Medpack", type: "consumable", kind: "heal", cost: 76, heal: 48, note: "Restores 48 Guts" },
        { name: "Tide Rush Dose", type: "consumable", kind: "booster", cost: 118, duration: 4, mods: { speed: 3, charm: 2 }, note: "S +3 / C +2 for 4 quests" },
        { name: "Diving Rig", type: "resource", cost: 96, value: 48, note: "Consumed to quest in Submerged Server Vault" },
      ],
    },
  },
  foundryMarket: {
    name: "Sparkfall Bazaar",
    intro: "Foundry crews trade furnace salvage while the launch tower groans overhead.",
    dealers: {
      weapons: [
        { name: "Furnace Maul", type: "weapon", slot: "hand", cost: 190, mods: { attack: 10, guts: 2, speed: -2 }, note: "A 10 / G 2 / S -2" },
        { name: "Arc Cutter", type: "weapon", slot: "hand", cost: 178, mods: { attack: 9, wits: 2 }, note: "A 9 / W 2" },
        { name: "Heat Door Shield", type: "shield", slot: "hand", cost: 172, mods: { defense: 10, speed: -2 }, note: "D 10 / S -2" },
      ],
      armor: [
        { name: "Weldmask Crown", type: "head", slot: "head", cost: 128, mods: { defense: 5, wits: 2 }, note: "D 5 / W 2" },
        { name: "Foundry Plate", type: "body", slot: "body", cost: 184, mods: { defense: 11, guts: 2, speed: -2 }, note: "D 11 / G 2 / S -2" },
        { name: "Sparkstep Greaves", type: "feet", slot: "feet", cost: 140, mods: { speed: 5, defense: 3 }, note: "S 5 / D 3" },
      ],
      implants: [
        { name: "Furnace Heart", type: "implant", slot: "core", cost: 210, mods: { guts: 5, defense: 2 }, note: "Core implant: G 5 / D 2" },
        { name: "Assembler Tendons", type: "implant", slot: "arms", cost: 196, mods: { attack: 4, speed: 2 }, note: "Arm implant: A 4 / S 2" },
        { name: "Orbital Math Cache", type: "implant", slot: "neural", cost: 205, mods: { wits: 5, attack: 1 }, note: "Neural implant: W 5 / A 1" },
      ],
      items: [
        { name: "Foundry Medpack", type: "consumable", kind: "heal", cost: 88, heal: 56, note: "Restores 56 Guts" },
        { name: "Molten Focus", type: "consumable", kind: "booster", cost: 132, duration: 4, mods: { attack: 3, wits: 2 }, note: "A +3 / W +2 for 4 quests" },
        { name: "Pressure Seal", type: "resource", cost: 118, value: 59, note: "Consumed to quest in Vacuum Yard" },
      ],
    },
  },
  reefMarket: {
    name: "Reefglass Market",
    intro: "Pressure-suited dealers trade salvage beneath humming coral glass.",
    dealers: {
      weapons: [
        { name: "Coral Arc Spear", type: "weapon", slot: "hand", cost: 260, mods: { attack: 13, wits: 3 }, note: "A 13 / W 3" },
        { name: "Reefbreaker Shield", type: "shield", slot: "hand", cost: 240, mods: { defense: 13, speed: -1 }, note: "D 13 / S -1" },
        { name: "Tideglass Cutter", type: "weapon", slot: "hand", cost: 235, mods: { attack: 11, speed: 3 }, note: "A 11 / S 3" },
      ],
      armor: [
        { name: "Pressure Halo", type: "head", slot: "head", cost: 205, mods: { defense: 6, wits: 4 }, note: "D 6 / W 4" },
        { name: "Reefglass Suit", type: "body", slot: "body", cost: 280, mods: { defense: 14, guts: 3, speed: -1 }, note: "D 14 / G 3 / S -1" },
        { name: "Current-Step Fins", type: "feet", slot: "feet", cost: 210, mods: { speed: 8, defense: 2 }, note: "S 8 / D 2" },
      ],
      implants: [
        { name: "Coral Cortex Bloom", type: "implant", slot: "neural", cost: 300, mods: { wits: 6, charm: 2 }, note: "Neural implant: W 6 / C 2" },
        { name: "Abyss Lung", type: "implant", slot: "core", cost: 310, mods: { guts: 6, defense: 2 }, note: "Core implant: G 6 / D 2" },
        { name: "Current Tendons", type: "implant", slot: "legs", cost: 290, mods: { speed: 7, attack: 2 }, note: "Leg implant: S 7 / A 2" },
      ],
      items: [
        { name: "Reef Medpack", type: "consumable", kind: "heal", cost: 120, heal: 80, note: "Restores 80 Guts" },
        { name: "Abyss Focus Dose", type: "consumable", kind: "booster", cost: 180, duration: 5, mods: { wits: 4, speed: 2 }, note: "W +4 / S +2 for 5 quests" },
        { name: "Pressure Beacon", type: "resource", cost: 160, value: 80, note: "Consumed to quest in Abyss Relay" },
      ],
    },
  },
};

const dealerDetails = {
  weapons: {
    title: "Weapons dealer",
    art: "pixel-dealer-weapons",
    tile: "Blades, guns, shields",
    welcomes: [
      "Keep your hands where I can see them. Unless you're buying hands.",
      "Big noise, small noise, quiet little knife. Pick a problem solver.",
      "Everything here is legal somewhere.",
    ],
  },
  armor: {
    title: "Armor / clothing dealer",
    art: "pixel-dealer-armor",
    tile: "Hats, suits, boots",
    welcomes: [
      "You want to look good, live longer, or both?",
      "Rainproof, bladeproof, mostly regret-proof.",
      "Try the boots. If they bite, that means they like you.",
    ],
  },
  implants: {
    title: "Implant dealer",
    art: "pixel-dealer-implants",
    tile: "Neural, arms, core, legs",
    welcomes: [
      "Fresh chrome, old warranties, no refunds after screaming.",
      "Your meat is holding you back. Friendly observation.",
      "Lie down, breathe shallow, and do not insult the tools.",
    ],
  },
  items: {
    title: "Item dealer",
    art: "pixel-dealer-items",
    tile: "Medpacks and boosters",
    welcomes: [
      "Patch kits, bright pills, borrowed courage. What hurts?",
      "Everything here is temporary. That is why it works.",
      "Take two if the alley starts singing back.",
    ],
  },
  bank: {
    title: "Bank / pawn",
    art: "pixel-dealer-bank",
    tile: "Protected storage",
    welcomes: [
      "Vault rent is free today. Suspicion costs extra.",
      "Deposit what you cannot afford to wake up without.",
      "Credits in the vault do not bleed when you do.",
    ],
  },
};

const defaultLog = ["You wake under a vending machine awning with your name half-remembered and the city already billing you interest."];

let activeSlot = Number(localStorage.getItem(SLOT_KEY) || 0);
let state = activeSlot ? loadState(activeSlot) : menuState();

function menuState() {
  return {
    mode: "mainMenu",
    area: "rook",
    player: null,
    quest: null,
    result: null,
    log: [...defaultLog],
  };
}

function starterState() {
  return {
    mode: "create",
    area: "rook",
    player: null,
    quest: null,
    result: null,
    log: [...defaultLog],
  };
}

function slotKey(slot) {
  return `${SAVE_KEY}-slot-${slot}`;
}

function loadState(slot = activeSlot) {
  try {
    const saved = JSON.parse(localStorage.getItem(slotKey(slot)));
    return saved || starterState();
  } catch {
    return starterState();
  }
}

function saveState() {
  if (activeSlot) localStorage.setItem(slotKey(activeSlot), JSON.stringify(state));
}

function setState(next) {
  state = { ...state, ...next };
  saveState();
  render();
}

function addLog(message) {
  state.log = [message, ...(state.log || [])].slice(0, 12);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function effectiveStat(stat) {
  const player = state.player;
  return player.stats[stat] + gearMod(stat) + (classes[player.classId].statBonus[stat] || 0);
}

function armorValue() {
  return gearMod("defense");
}

function ensureLoadout() {
  if (!state.player) return;
  state.player.equipment ||= { lHand: null, rHand: null, head: null, body: null, feet: null };
  state.player.implants ||= { neural: null, arms: null, core: null, legs: null };
  state.player.activeBoosts ||= [];
  state.player.addedClasses ||= [];
  state.player.equippedSkills ||= [];
  state.player.skillCooldowns ||= {};
  state.player.bank ||= { credits: 0, items: [] };
}

function equippedItems() {
  ensureLoadout();
  return [...Object.values(state.player.equipment), ...Object.values(state.player.implants)].filter(Boolean);
}

function gearMod(stat) {
  ensureLoadout();
  const equipped = equippedItems().reduce((sum, item) => sum + ((item.mods && item.mods[stat]) || 0), 0);
  const boosted = state.player.activeBoosts.reduce((sum, boost) => sum + ((boost.mods && boost.mods[stat]) || 0), 0);
  return equipped + boosted;
}

function statLine(item) {
  if (!item?.mods) return item?.note || item?.type || "";
  return Object.entries(item.mods)
    .map(([key, value]) => `${gearStats[key] || key}: ${value > 0 ? "+" : ""}${value}`)
    .join(" / ");
}

function itemImage(item) {
  const slug = itemArt[item?.name];
  if (slug?.startsWith("extra/")) {
    return `<span class="item-image" style="background-image: url('assets/items-extra/${slug.replace("extra/", "")}.png')"></span>`;
  }
  if (slug) return `<span class="item-image" style="background-image: url('assets/items/${slug}.png')"></span>`;
  const fallback = item?.type ? `item-image-${item.type}` : "item-image-empty";
  return `<span class="item-image ${fallback}"></span>`;
}

function stackKey(item) {
  return JSON.stringify({
    name: item.name,
    type: item.type,
    slot: item.slot || "",
    kind: item.kind || "",
    mods: item.mods || null,
    value: item.value || 0,
    cost: item.cost || 0,
  });
}

function inventoryStacks(itemsWithIndexes) {
  const map = new Map();
  itemsWithIndexes.forEach(({ item, index }) => {
    const key = stackKey(item);
    if (!map.has(key)) map.set(key, { item, indexes: [], count: 0 });
    const stack = map.get(key);
    stack.indexes.push(index);
    stack.count += 1;
  });
  return [...map.values()];
}

function countBadge(count) {
  return count > 1 ? `<span class="count-badge">x${count}</span>` : "";
}

function canEquip(item, slot) {
  if (!item) return false;
  if (slot === "lHand" || slot === "rHand") return item.slot === "hand";
  return item.slot === slot;
}

function equipItem(index, slot, implant = false) {
  ensureLoadout();
  const item = state.player.inventory[index];
  if (!item) return;
  const target = implant ? state.player.implants : state.player.equipment;
  if (implant && item.type !== "implant") return;
  if (!implant && !canEquip(item, slot)) return;
  const previous = target[slot];
  target[slot] = item;
  state.player.inventory.splice(index, 1);
  if (previous) state.player.inventory.push(previous);
  addLog(`Equipped ${item.name}.`);
  setState({});
}

function unequip(slot, implant = false) {
  ensureLoadout();
  const target = implant ? state.player.implants : state.player.equipment;
  if (!target[slot]) return;
  state.player.inventory.push(target[slot]);
  addLog(`Unequipped ${target[slot].name}.`);
  target[slot] = null;
  setState({});
}

function useItem(index) {
  ensureLoadout();
  const item = state.player.inventory[index];
  if (!item || item.type !== "consumable") return;
  if (item.kind === "heal") {
    const before = state.player.guts;
    state.player.guts = Math.min(state.player.maxGuts, state.player.guts + item.heal);
    state.player.inventory.splice(index, 1);
    addLog(`${item.name} restored ${state.player.guts - before} Guts.`);
    setState({});
    return;
  }
  if (item.kind === "booster") {
    state.player.activeBoosts.push({ name: item.name, mods: item.mods, remaining: item.duration });
    state.player.inventory.splice(index, 1);
    addLog(`${item.name} active for ${item.duration} quests.`);
    setState({});
  }
}

function questRequirement(questId) {
  const area = areas[state.area];
  return area.nodes.find((node) => node.type === "quest" && node.id === questId)?.requires || null;
}

function consumeRequirement(requirement) {
  if (!requirement) return { ok: true, message: "" };
  const index = state.player.inventory.findIndex((item) => item.name === requirement.item);
  if (index < 0) {
    return { ok: false, message: `This quest requires ${requirement.item}. It can be acquired from the local market's Item dealer before taking this job.` };
  }
  state.player.inventory.splice(index, requirement.count || 1);
  return { ok: true, message: `${requirement.item} consumed to enter the job.` };
}

function tickBoosts() {
  ensureLoadout();
  state.player.activeBoosts.forEach((boost) => {
    boost.remaining -= 1;
  });
  const expired = state.player.activeBoosts.filter((boost) => boost.remaining <= 0);
  state.player.activeBoosts = state.player.activeBoosts.filter((boost) => boost.remaining > 0);
  expired.forEach((boost) => addLog(`${boost.name} wore off.`));
}

function tickSkillCooldowns() {
  ensureLoadout();
  Object.keys(state.player.skillCooldowns).forEach((id) => {
    state.player.skillCooldowns[id] = Math.max(0, state.player.skillCooldowns[id] - 1);
    if (state.player.skillCooldowns[id] === 0) delete state.player.skillCooldowns[id];
  });
}

function applyDeathPenalty() {
  ensureLoadout();
  const player = state.player;
  const lostCredits = Math.floor(player.credits / 2);
  player.credits -= lostCredits;

  const candidates = player.inventory.map((item, index) => ({ item, source: "inventory", index }));
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  const lossCount = Math.ceil(candidates.length / 2);
  const lostItems = shuffled.slice(0, lossCount);

  lostItems.forEach((entry) => {
    if (entry.source === "inventory") {
      const currentIndex = player.inventory.indexOf(entry.item);
      if (currentIndex >= 0) player.inventory.splice(currentIndex, 1);
    }
  });

  return {
    credits: lostCredits,
    gear: lostItems.map((entry) => entry.item.name),
  };
}

function xpForNext() {
  return state.player.level * 26;
}

function maybeLevelUp() {
  let leveled = false;
  while (state.player.xp >= xpForNext()) {
    state.player.xp -= xpForNext();
    state.player.level += 1;
    state.player.maxGuts += 5;
    state.player.guts = state.player.maxGuts;
    state.player.unspent += 2;
    leveled = true;
  }
  if (leveled) addLog(`Level ${state.player.level}. New doors open, and your special move tree grows teeth.`);
  return leveled;
}

function startGame(formData) {
  const stats = {
    guts: Number(formData.get("guts")),
    wits: Number(formData.get("wits")),
    charm: Number(formData.get("charm")),
  };
  const maxGuts = 18 + stats.guts * 3;
  const classId = String(formData.get("classId"));
  const firstSkillId = skillId(classId, classes[classId].moves[0]);
  state = {
    mode: "area",
    area: "rook",
    player: {
      name: String(formData.get("name") || "No-Name").trim() || "No-Name",
      classId,
      portrait: String(formData.get("portrait")),
      level: 1,
      xp: 0,
      credits: 30,
      stats,
      unspent: 0,
      maxGuts,
      guts: maxGuts,
      status: [],
      inventory: [],
      equipment: { lHand: null, rHand: null, head: null, body: null, feet: null },
      implants: { neural: null, arms: null, core: null, legs: null },
      activeBoosts: [],
      addedClasses: [],
      equippedSkills: [firstSkillId],
      skillCooldowns: {},
    },
    quest: null,
    result: null,
    log: [...defaultLog],
  };
  addLog(`${state.player.name} steps into Rook Sprawl as a ${classes[state.player.classId].name}.`);
  saveState();
  render();
}

function travel(areaId) {
  const target = areas[areaId];
  if (state.player.level < target.level) {
    addLog(`${target.name} is locked until level ${target.level}. The checkpoint scanner laughs in red.`);
  } else {
    state.area = areaId;
    addLog(`You move into ${target.name}.`);
  }
  setState({ mode: "area" });
}

function startQuest(questId) {
  const requirement = questRequirement(questId);
  const consumed = consumeRequirement(requirement);
  if (!consumed.ok) {
    addLog(consumed.message);
    state.result = { title: "Required item missing", body: consumed.message, done: true };
    setState({ mode: "result" });
    return;
  }
  if (consumed.message) addLog(consumed.message);
  const pool = [...(foes[questId] || []), ...(questExtraFoes[questId] || [])];
  const foe = calibrateFoe({ ...pick(pool) }, questId);
  state.quest = {
    id: questId,
    foe,
    foeHp: foe.hp,
    choices: {
      attack: pick(actionLabels.attack),
      trick: pick(actionLabels.trick),
      run: pick(actionLabels.run),
    },
  };
  setState({ mode: "quest", result: null });
}

function calibrateFoe(foe, questId) {
  const gated = Boolean(questRequirement(questId));
  foe.hp = Math.ceil(foe.hp * (gated ? 1.18 : 1.1));
  foe.damage = Math.ceil(foe.damage * (gated ? 1.22 : 1.14));
  return foe;
}

function finishEncounter(title, body) {
  tickBoosts();
  tickSkillCooldowns();
  state.result = { title, body, done: true };
  state.quest = null;
  state.mode = "result";
  saveState();
  render();
}

function continueEncounter(title, body) {
  state.result = { title, body, done: false };
  state.mode = "result";
  saveState();
  render();
}

function act(action) {
  const player = state.player;
  const quest = state.quest;
  const foe = quest.foe;

  if (action === "run") {
    const loss = Math.min(player.credits, 8 + foe.damage);
    const cleanEscape = Math.ceil(Math.random() * 20) + gearMod("speed") >= 16;
    if (cleanEscape) {
      addLog(`You escaped ${foe.name} cleanly.`);
      finishEncounter("Clean getaway", `You move before ${foe.name} can read the angle. No credits lost, no blood owed.`);
      return;
    }
    player.credits -= loss;
    addLog(`You escaped ${foe.name} and lost ${loss} credits.`);
    finishEncounter("You got away", `You bolt through wet neon and service steam. ${foe.name} loses the trail, but ${loss} credits shake loose on the way out.`);
    return;
  }

  if (action === "help") {
    resolveHelp();
    return;
  }

  let damage = 0;
  let note = "";
  if (action === "attack") {
    damage = 5 + effectiveStat("guts") + gearMod("attack") + Math.ceil(Math.random() * 5);
    note = "The hit lands hard enough to make the alley lights blink.";
  }
  if (action === "trick") {
    damage = 3 + effectiveStat("wits") * 2 + Math.ceil(gearMod("attack") / 2) + Math.ceil(Math.random() * 4);
    note = "Their gear obeys you for half a second, which is all the opening you need.";
  }
  if (action.startsWith("skill:")) {
    const skill = equippedSkillList().find((entry) => entry.id === action.slice(6));
    if (!skill || skillCooldown(skill) > 0) return;
    damage = skill.power + player.level + effectiveStat(skill.stat) + gearMod("attack");
    if (skill.heal) player.guts = Math.min(player.maxGuts, player.guts + skill.heal);
    if (skill.credits) player.credits += skill.credits;
    player.skillCooldowns[skill.id] = skill.cooldown;
    note = `${skill.name} fires clean. ${skill.effect}`;
  }

  quest.foeHp = Math.max(0, quest.foeHp - damage);
  if (quest.foeHp <= 0) {
    rewardWin(foe.xp, foe.credits, foe.loot);
    const leveled = maybeLevelUp();
    finishEncounter("Encounter cleared", `${note} ${foe.name} folds. You gain ${foe.xp} XP, ${foe.credits} credits, and ${foe.loot}.${leveled ? " You also leveled up." : ""}`);
    return;
  }

  const incoming = Math.max(2, foe.damage + Math.ceil(player.level / 6) - Math.floor(armorValue() * 0.85) - Math.floor(gearMod("speed") / 4) - (player.status.includes("Inspired") ? 1 : 0));
  player.guts = Math.max(0, player.guts - incoming);
  if (player.guts <= 0) {
    const penalty = applyDeathPenalty();
    player.guts = Math.ceil(player.maxGuts * 0.45);
    player.status = ["Bruised"];
    addLog("You blacked out and woke up owing clinic money.");
    finishEncounter("Clinic drawer sunrise", `${note} ${foe.name} still tags you for ${incoming} Guts. The world cuts to black. You wake up patched and Bruised. Death penalty: lost ${penalty.credits} credits${penalty.gear.length ? ` and ${penalty.gear.join(", ")}` : ""}.`);
  } else {
    continueEncounter("The fight shifts", `${note} ${foe.name} takes ${damage} damage, then answers for ${incoming} Guts. They have ${quest.foeHp}/${foe.hp} nerve left.`);
  }
}

function resolveHelp() {
  const player = state.player;
  const quest = state.quest;
  const foe = quest.foe;
  if (!foe.help) return;

  const roll = Math.ceil(Math.random() * 20) + effectiveStat("charm");
  if (roll >= 15) {
    const xp = Math.ceil(foe.xp * 0.9);
    const loot = pick(helpLoot);
    player.xp += xp;
    player.status = ["Inspired"];
    player.inventory.push({ name: loot, type: "loot", value: 24 + player.level * 12, note: "Reward for helping someone survive" });
    const leveled = maybeLevelUp();
    addLog(`You helped during ${foe.name} and earned ${xp} XP plus ${loot}.`);
    finishEncounter("Help paid off", `${foe.help.success} You gain ${xp} XP and ${loot}.${leveled ? " You also leveled up." : ""}`);
    return;
  }

  const incoming = Math.max(2, Math.ceil(foe.damage * 0.85) + Math.ceil(player.level / 8) - Math.floor(armorValue() * 0.85) - Math.floor(gearMod("speed") / 4));
  player.guts = Math.max(0, player.guts - incoming);
  addLog(`The help attempt failed and cost ${incoming} Guts.`);
  if (player.guts <= 0) {
    const penalty = applyDeathPenalty();
    player.guts = Math.ceil(player.maxGuts * 0.45);
    player.status = ["Bruised"];
    finishEncounter("Good deed, bad angle", `You reach for the save, but the scene snaps shut. You take ${incoming} Guts and wake up later with Bruised status. Death penalty: lost ${penalty.credits} credits${penalty.gear.length ? ` and ${penalty.gear.join(", ")}` : ""}.`);
  } else {
    continueEncounter("Good deed went sideways", `You try to help, but the timing is wrong. ${foe.name} punishes the opening for ${incoming} Guts. The encounter is still live.`);
  }
}

function rewardWin(xp, credits, loot) {
  const charmBonus = state.player.classId === "face" ? effectiveStat("charm") : 0;
  state.player.xp += xp;
  state.player.credits += credits + charmBonus;
  state.player.inventory.push({ name: loot, type: "loot", value: Math.ceil(credits * 0.75), note: "Sellable quest loot" });
  addLog(`Won ${xp} XP, ${credits + charmBonus} credits, and ${loot}.`);
}

function continueResult() {
  const done = state.result?.done;
  state.result = null;
  setState({ mode: done ? "area" : "quest" });
}

function bestClassStat() {
  if (state.player.classId === "breaker") return "guts";
  if (state.player.classId === "runner") return "wits";
  return "charm";
}

function classTracks() {
  ensureLoadout();
  return [
    { classId: state.player.classId, addedAt: 1, treeLevel: state.player.level },
    ...state.player.addedClasses.map((entry) => ({
      classId: entry.classId,
      addedAt: entry.addedAt,
      treeLevel: Math.max(1, state.player.level - entry.addedAt + 1),
    })),
  ];
}

function skillId(classId, move) {
  return `${classId}:${move.name}`;
}

function allSkills() {
  return classTracks().flatMap((track) => classes[track.classId].moves.map((move) => ({
    ...move,
    id: skillId(track.classId, move),
    classId: track.classId,
    className: classes[track.classId].name,
    treeLevel: track.treeLevel,
    unlocked: track.treeLevel >= move.level,
    cooldown: Math.ceil(move.level / 5),
  })));
}

function unlockedMoves() {
  return allSkills().filter((move) => move.unlocked);
}

function equippedSkillList() {
  ensureLoadout();
  const skills = allSkills();
  return state.player.equippedSkills
    .map((id) => skills.find((skill) => skill.id === id))
    .filter(Boolean);
}

function skillCooldown(skill) {
  ensureLoadout();
  return state.player.skillCooldowns[skill.id] || 0;
}

function equipSkill(id) {
  ensureLoadout();
  if (state.player.equippedSkills.includes(id) || state.player.equippedSkills.length >= 3) return;
  const skill = allSkills().find((entry) => entry.id === id && entry.unlocked);
  if (!skill) return;
  state.player.equippedSkills.push(id);
  setState({});
}

function unequipSkill(id) {
  ensureLoadout();
  state.player.equippedSkills = state.player.equippedSkills.filter((entry) => entry !== id);
  setState({});
}

function availableClassAdds() {
  ensureLoadout();
  const earned = [25, 50, 75].filter((level) => state.player.level >= level).length;
  return earned - state.player.addedClasses.length;
}

function addClass(classId) {
  ensureLoadout();
  if (availableClassAdds() <= 0) return;
  if (classTracks().some((track) => track.classId === classId)) return;
  state.player.addedClasses.push({ classId, addedAt: state.player.level });
  addLog(`${classes[classId].name} skill tree added.`);
  setState({});
}

function buy(merchantId, dealer, index) {
  const item = merchants[merchantId].dealers[dealer][index];
  if (state.player.credits < item.cost) {
    addLog(`The dealer taps the price again. ${item.cost} credits means ${item.cost} credits.`);
    setState({});
    return;
  }
  state.player.credits -= item.cost;
  if (item.type === "item" && item.heal) {
    state.player.guts = Math.min(state.player.maxGuts, state.player.guts + item.heal);
    addLog(`${item.name} burns cold. You recover ${item.heal} Guts.`);
  } else {
    state.player.inventory.push({ ...item });
    addLog(`Purchased ${item.name}.`);
  }
  setState({});
}

function sellLoot(index) {
  const item = state.player.inventory[index];
  if (!item || item.type !== "loot") return;
  state.player.credits += item.value;
  state.player.inventory.splice(index, 1);
  addLog(`Sold ${item.name} for ${item.value} credits.`);
  setState({});
}

function merchantBuys(dealer, item) {
  if (!item) return false;
  if (item.type === "loot") return true;
  if (dealer === "weapons") return item.type === "weapon" || item.type === "shield";
  if (dealer === "armor") return ["head", "body", "feet"].includes(item.type);
  if (dealer === "implants") return item.type === "implant";
  if (dealer === "items") return item.type === "consumable" || item.type === "resource";
  return false;
}

function sellItem(index) {
  const item = state.player.inventory[index];
  if (!merchantBuys(state.dealer, item)) return;
  const value = item.value || Math.max(1, Math.floor((item.cost || 10) * 0.55));
  state.player.credits += value;
  state.player.inventory.splice(index, 1);
  addLog(`Sold ${item.name} for ${value} credits.`);
  setState({});
}

function sellAllLoot() {
  const loot = state.player.inventory.filter((item) => item.type === "loot");
  if (!loot.length) return;
  const total = loot.reduce((sum, item) => sum + (item.value || 1), 0);
  state.player.inventory = state.player.inventory.filter((item) => item.type !== "loot");
  state.player.credits += total;
  addLog(`Sold all loot for ${total} credits.`);
  setState({});
}

function depositCredits() {
  ensureLoadout();
  const amount = Math.floor(state.player.credits / 2);
  if (amount <= 0) return;
  state.player.credits -= amount;
  state.player.bank.credits += amount;
  addLog(`Deposited ${amount} credits.`);
  setState({});
}

function withdrawCredits() {
  ensureLoadout();
  const amount = state.player.bank.credits;
  if (amount <= 0) return;
  state.player.credits += amount;
  state.player.bank.credits = 0;
  addLog(`Withdrew ${amount} credits.`);
  setState({});
}

function storeItem(index) {
  ensureLoadout();
  const item = state.player.inventory[index];
  if (!item) return;
  state.player.bank.items.push(item);
  state.player.inventory.splice(index, 1);
  addLog(`Stored ${item.name}.`);
  setState({});
}

function withdrawItem(index) {
  ensureLoadout();
  const item = state.player.bank.items[index];
  if (!item) return;
  state.player.inventory.push(item);
  state.player.bank.items.splice(index, 1);
  addLog(`Withdrew ${item.name}.`);
  setState({});
}

function addStat(stat) {
  if (state.player.unspent <= 0) return;
  state.player.stats[stat] += 1;
  state.player.unspent -= 1;
  if (stat === "guts") {
    state.player.maxGuts += 3;
    state.player.guts += 3;
  }
  addLog(`${stat[0].toUpperCase() + stat.slice(1)} increased.`);
  setState({});
}

function resetGame() {
  if (activeSlot) localStorage.setItem(slotKey(activeSlot), JSON.stringify(starterState()));
  state = activeSlot ? starterState() : menuState();
  render();
}

function openSlots() {
  activeSlot = 0;
  localStorage.removeItem(SLOT_KEY);
  state = { ...menuState(), mode: "slotSelect" };
  render();
}

function selectSlot(slot) {
  activeSlot = slot;
  localStorage.setItem(SLOT_KEY, String(slot));
  state = loadState(slot);
  render();
}

function eraseSlot(slot) {
  localStorage.removeItem(slotKey(slot));
  if (activeSlot === slot) {
    activeSlot = 0;
    localStorage.removeItem(SLOT_KEY);
  }
  state = { ...menuState(), mode: "slotSelect" };
  render();
}

function confirmEraseSlot(slot) {
  state = { ...menuState(), mode: "slotSelect", confirmErase: slot };
  render();
}

function cancelEraseSlot() {
  state = { ...menuState(), mode: "slotSelect" };
  render();
}

function quitToMenu() {
  activeSlot = 0;
  localStorage.removeItem(SLOT_KEY);
  state = menuState();
  render();
}

function slotSummary(slot) {
  try {
    const saved = JSON.parse(localStorage.getItem(slotKey(slot)));
    if (!saved?.player) return null;
    return {
      name: saved.player.name,
      portrait: saved.player.portrait,
      className: classes[saved.player.classId]?.name || "Unknown",
      level: saved.player.level,
      area: areas[saved.area]?.name || "Unknown",
    };
  } catch {
    return null;
  }
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `${renderMain()}${state.player && activeSlot ? renderBottomBar() : ""}`;
  bindEvents();
}

function renderMain() {
  if (state.mode === "mainMenu") return renderMainMenu();
  if (state.mode === "slotSelect") return renderSlotSelect();
  if (!state.player || state.mode === "create") return renderCreate();
  if (state.mode === "quest") return renderQuest();
  if (state.mode === "result") return renderResult();
  if (state.mode === "merchant") return renderMerchant();
  if (state.mode === "equipment") return renderEquipment();
  if (state.mode === "level") return renderLevel();
  return renderArea();
}

function renderShell(content) {
  return `
    <header class="topline">
      <div class="brand">
        <h1>Neon Exile</h1>
        <p>Cyberpunk choices, street-level trouble, and salvage beyond the city wall.</p>
      </div>
    </header>
    <section class="screen">${content}</section>
  `;
}

function renderMainMenu() {
  return `
    <section class="main-menu">
      <div class="main-title">
        <h1>Neon Exile</h1>
      </div>
      <button class="primary menu-play" data-open-slots>Play</button>
    </section>
  `;
}

function renderSlotSelect() {
  return `
    <section class="main-menu slot-menu">
      <div class="main-title">
        <h1>Neon Exile</h1>
        <p>Select a character slot</p>
      </div>
      <div class="slot-grid">
        ${Array.from({ length: SLOT_COUNT }, (_, index) => renderSlotCard(index + 1)).join("")}
      </div>
      <button class="danger menu-quit" data-quit-menu>Quit</button>
    </section>
  `;
}

function renderSlotCard(slot) {
  const summary = slotSummary(slot);
  const confirming = state.confirmErase === slot;
  return `
    <article class="slot-card">
      ${summary ? renderPortrait(summary.portrait) : `<span class="portrait">+</span>`}
      <h2>Slot ${slot}</h2>
      ${confirming ? `<p>This will permanently erase ${summary.name}. Are you sure?</p>` : summary ? `<p>${summary.name}</p><p>${summary.className} / Lv ${summary.level}</p><p>${summary.area}</p>` : `<p>Empty character slot</p>`}
      ${confirming ? `<button class="danger" data-erase-slot="${slot}">Yes, erase</button><button data-cancel-erase>Cancel</button>` : `<button class="primary" data-select-slot="${slot}">${summary ? "Continue" : "New Character"}</button>${summary ? `<button class="danger" data-confirm-erase="${slot}">Erase</button>` : ""}`}
    </article>
  `;
}

function renderPortrait(portrait) {
  const isImage = String(portrait || "").startsWith("portrait-");
  return isImage
    ? `<span class="portrait portrait-image" style="background-image: url('assets/portraits/${portrait}.png')"></span>`
    : `<span class="portrait">${portrait || "VX"}</span>`;
}

function renderCreate() {
  return renderShell(`
    <form class="create-panel" id="createForm">
      <div class="create-grid">
        <section class="class-grid-wrap">
          <div class="field">
            <label for="name">Character name</label>
            <input id="name" name="name" maxlength="24" value="Vex" />
          </div>
          <p class="section-label">Class</p>
          <div class="class-grid">
            ${Object.entries(classes).map(([id, item], index) => `
              <button class="class-card ${index === 0 ? "selected" : ""}" type="button" data-class="${id}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
              </button>
            `).join("")}
          </div>
          <input type="hidden" name="classId" value="runner" />
          <p class="section-label">Portrait</p>
          <div class="portrait-grid">
            ${portraits.map((portrait, index) => `
              <button class="portrait-btn ${index === 0 ? "selected" : ""}" type="button" data-portrait="${portrait}">
                ${renderPortrait(portrait)}
              </button>
            `).join("")}
          </div>
          <input type="hidden" name="portrait" value="portrait-01" />
        </section>
        <section>
          <p class="section-label">Starting points: <span id="pointsLeft">6</span></p>
          ${["guts", "wits", "charm"].map((stat) => `
            <div class="stat-row">
              <strong>${stat}</strong>
              <button class="stepper" type="button" data-dec="${stat}">-</button>
              <span id="${stat}Value">2</span>
              <button class="stepper" type="button" data-inc="${stat}">+</button>
            </div>
            <input type="hidden" name="${stat}" value="2" />
          `).join("")}
          <div class="moves-grid">
            ${classes.runner.moves.map((move) => `
              <article class="move-card">
                <h3>Lv ${move.level}: ${move.name}</h3>
                <p>${move.effect}</p>
              </article>
            `).join("")}
          </div>
        </section>
      </div>
      <button class="primary" type="submit">Enter Rook Sprawl</button>
    </form>
  `);
}

function nodeArt(node) {
  if (node.type === "area") return areas[node.id].art;
  if (node.type === "merchant") return pixelArt[node.id];
  return questArt[node.id];
}

function dealerArt(marketId, dealer) {
  const market = marketId === "glassMarket" ? "glass"
      : marketId === "wasteMarket" ? "waste"
        : marketId === "harborMarket" ? "harbor"
          : marketId === "foundryMarket" ? "foundry"
            : marketId === "reefMarket" ? "reef"
          : "rook";
  return `dealer-${market}-${dealer}`;
}

function marketArt(marketId) {
  return pixelArt[marketId] || "pixel-market-alley";
}

function renderArea() {
  const area = areas[state.area];
  return renderShell(`
    <section class="area-stage pixel-scene ${area.art}">
      <div class="area-copy">
        <h2>${area.name}</h2>
        <p>${area.description}</p>
      </div>
      ${area.nodes.map((node) => {
        const locked = node.type === "area" && state.player.level < areas[node.id].level;
        const subtitle = node.type === "quest"
          ? (node.requires ? `Requires ${node.requires.item}` : "Quest")
          : node.type === "merchant" ? "Street dealers" : `Requires level ${areas[node.id].level}`;
        return `
          <button class="node node-${node.slot} ${node.type === "quest" ? "quest-node" : ""} ${locked ? "locked" : ""}" data-node-type="${node.type}" data-node-id="${node.id}">
            <span class="node-image pixel-tile ${nodeArt(node)}"></span>
            <span><strong>${node.title}</strong><small>${locked ? "Locked - " : ""}${subtitle}</small></span>
          </button>
        `;
      }).join("")}
    </section>
  `);
}

function renderQuest() {
  const quest = state.quest;
  const foe = quest.foe;
  const pct = Math.max(0, Math.round((quest.foeHp / foe.hp) * 100));
  const skillButtons = equippedSkillList().map((skill) => {
    const cooldown = skillCooldown(skill);
    return `<button class="choice-card" data-action="skill:${skill.id}" ${cooldown ? "disabled" : ""}><h3>${skill.name}</h3><p>${cooldown ? `Resets in ${cooldown} quests.` : skill.effect}</p></button>`;
  }).join("");
  return renderShell(`
    <section class="quest-panel">
      <div class="encounter-hero">
        <div class="encounter-art pixel-tile ${pixelArt[foe.key]}"></div>
        <div class="foe-box">
          <p class="section-label">Random trouble</p>
          <h2 class="foe-name">${foe.name}</h2>
          <div class="meter" aria-label="Foe health"><span style="--value: ${pct}%"></span></div>
          <p>${quest.foeHp}/${foe.hp} nerve left. Damage ${foe.damage}. Loot signal: ${foe.loot}.</p>
          ${foe.help ? `<p class="help-prompt">${foe.help.prompt}</p>` : ""}
        </div>
      </div>
      <div class="choice-grid">
        <button class="choice-card" data-action="attack"><h3>${quest.choices.attack}</h3><p>Guts-based attack. Direct, messy, effective.</p></button>
        <button class="choice-card" data-action="trick"><h3>${quest.choices.trick}</h3><p>Wits-based play. Turn the scene sideways.</p></button>
        ${foe.help ? `<button class="choice-card" data-action="help"><h3>${foe.help.label}</h3><p>Charm-based ambiguous choice. Success gives XP and random loot.</p></button>` : ""}
        ${skillButtons}
        <button class="choice-card danger" data-action="run"><h3>${quest.choices.run}</h3><p>Escape the fight, lose some credits.</p></button>
      </div>
    </section>
  `);
}

function renderResult() {
  const result = state.result;
  return renderShell(`
    <section class="result-panel">
      <div class="result-copy">
        <p class="section-label">Consequence</p>
        <h2>${result.title}</h2>
        <p>${result.body}</p>
      </div>
      <button class="primary" data-continue-result>Continue</button>
    </section>
  `);
}

function renderMerchant() {
  const merchant = merchants[state.merchant];
  const dealer = state.dealer;
  if (!dealer) {
    return renderShell(`
      <section class="market-panel pixel-scene ${marketArt(state.merchant)}">
        <div class="area-copy market-copy">
          <p class="section-label">Market</p>
          <h2>${merchant.name}</h2>
          <p>${merchant.intro}</p>
        </div>
        <div class="dealer-tile-grid">
          ${Object.entries(dealerDetails).map(([id, detail]) => `
            <button class="dealer-tile" data-dealer="${id}">
              <span class="dealer-art pixel-tile ${dealerArt(state.merchant, id)}"></span>
              <span><strong>${detail.title}</strong><small>${detail.tile}</small></span>
            </button>
          `).join("")}
        </div>
        <button data-back class="primary market-back">Back to ${areas[state.area].name}</button>
      </section>
    `);
  }
  const detail = dealerDetails[dealer];
  if (dealer === "bank") return renderBank(merchant, detail);
  const sellable = inventoryStacks(state.player.inventory
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => merchantBuys(dealer, item)));
  const lootTotal = state.player.inventory
    .filter((item) => item.type === "loot")
    .reduce((sum, item) => sum + (item.value || 1), 0);
  return renderShell(`
    <section class="merchant-panel">
      <div class="dealer-header">
        <div class="merchant-portrait pixel-tile ${dealerArt(state.merchant, dealer)}"></div>
        <div>
          <p class="section-label">${merchant.name}</p>
          <h2>${detail.title}</h2>
          <p>${pick(detail.welcomes)}</p>
        </div>
      </div>
      <div class="shop-grid">
        ${merchant.dealers[dealer].map((item, index) => `
          <button class="shop-card" data-buy="${index}" data-buy-dealer="${dealer}">
            ${itemImage(item)}
            <h3>${item.name}</h3>
            <p>${statLine(item)}</p>
            <span class="tag">${item.cost} credits</span>
          </button>
        `).join("")}
      </div>
      <p class="section-label">Sell to this dealer</p>
      ${lootTotal ? `<button class="primary sell-all" data-sell-all-loot>Sell all loot for ${lootTotal} credits</button>` : ""}
      <div class="inventory-grid">
        ${sellable.length ? sellable.map(({ item, indexes, count }) => `
          <article class="inventory-card">
            ${itemImage(item)}
            ${countBadge(count)}
            <h3>${item.name}</h3>
            <p>${statLine(item)}</p>
            <button data-sell-item="${indexes[0]}">Sell one for ${item.value || Math.max(1, Math.floor((item.cost || 10) * 0.55))}</button>
          </article>
        `).join("") : `<p class="empty">This dealer is not buying anything in your pack.</p>`}
      </div>
      <div class="dealer-actions">
        <button data-merchant-hub>Return to ${merchant.name}</button>
        <button data-back class="primary">Back to ${areas[state.area].name}</button>
      </div>
    </section>
  `);
}

function renderBank(merchant, detail) {
  ensureLoadout();
  const storedStacks = inventoryStacks(state.player.bank.items.map((item, index) => ({ item, index })));
  const packStacks = inventoryStacks(state.player.inventory.map((item, index) => ({ item, index })));
  return renderShell(`
    <section class="merchant-panel">
      <div class="dealer-header">
        <div class="merchant-portrait pixel-tile pixel-dealer-bank"></div>
        <div>
          <p class="section-label">${merchant.name}</p>
          <h2>${detail.title}</h2>
          <p>${pick(detail.welcomes)}</p>
        </div>
      </div>
      <div class="bank-grid">
        <article class="equipment-card">
          <span class="item-image bank-vault-image"></span>
          <h3>Protected credits</h3>
          <p>${state.player.bank.credits} credits stored. Carrying ${state.player.credits}.</p>
          <div class="equip-actions">
            <button data-deposit-credits>Deposit half carried</button>
            <button data-withdraw-credits ${state.player.bank.credits <= 0 ? "disabled" : ""}>Withdraw all</button>
          </div>
        </article>
      </div>
      <p class="section-label">Store from pack</p>
      <div class="inventory-grid">
        ${packStacks.length ? packStacks.map(({ item, indexes, count }) => `
          <article class="inventory-card">
            ${itemImage(item)}
            ${countBadge(count)}
            <h3>${item.name}</h3>
            <p>${statLine(item)}</p>
            <button data-store-item="${indexes[0]}">Store one</button>
          </article>
        `).join("") : `<p class="empty">Your pack is empty.</p>`}
      </div>
      <p class="section-label">Withdraw from vault</p>
      <div class="inventory-grid">
        ${storedStacks.length ? storedStacks.map(({ item, indexes, count }) => `
          <article class="inventory-card">
            ${itemImage(item)}
            ${countBadge(count)}
            <h3>${item.name}</h3>
            <p>${statLine(item)}</p>
            <button data-withdraw-item="${indexes[0]}">Withdraw one</button>
          </article>
        `).join("") : `<p class="empty">No items in protected storage.</p>`}
      </div>
      <div class="dealer-actions">
        <button data-merchant-hub>Return to ${merchant.name}</button>
        <button data-back class="primary">Back to ${areas[state.area].name}</button>
      </div>
    </section>
  `);
}

function renderLevel() {
  ensureLoadout();
  const classAddChoices = availableClassAdds() > 0
    ? Object.entries(classes)
      .filter(([id]) => !classTracks().some((track) => track.classId === id))
      .map(([id, item]) => `<button class="class-card" data-add-class="${id}"><h3>${item.name}</h3><p>Add this skill tree at tree level 1.</p></button>`)
      .join("")
    : "";
  return renderShell(`
    <section class="level-panel">
      <div>
        <p class="section-label">Level ${state.player.level}</p>
        <h2>Spend stat points</h2>
        <p>${state.player.unspent} points waiting. Guts increases max Guts too.</p>
      </div>
      ${["guts", "wits", "charm"].map((stat) => `
        <div class="stat-row">
          <strong>${stat}: ${state.player.stats[stat]} base / ${effectiveStat(stat)} effective</strong>
          <span></span>
          <button class="primary" data-level-stat="${stat}" ${state.player.unspent <= 0 ? "disabled" : ""}>Add</button>
        </div>
      `).join("")}
      <p class="section-label">Special move tree</p>
      <div class="moves-grid">
        ${allSkills().map((move) => `
          <article class="move-card">
            <h3>${move.unlocked ? "Unlocked" : "Locked"}: ${move.className} Lv ${move.level} ${move.name}</h3>
            <p>${move.effect} Tree level ${move.treeLevel}. Reset ${move.cooldown} quests.</p>
          </article>
        `).join("")}
      </div>
      ${classAddChoices ? `<p class="section-label">Add class tree</p><div class="class-grid">${classAddChoices}</div>` : ""}
      <button data-back class="primary">Back to ${areas[state.area].name}</button>
    </section>
  `);
}

function renderEquipment() {
  ensureLoadout();
  const player = state.player;
  const totals = ["attack", "defense", "speed", "wits", "guts", "charm"]
    .map((stat) => `<span class="tag">${gearStats[stat]} ${gearMod(stat) >= 0 ? "+" : ""}${gearMod(stat)}</span>`)
    .join("");
  const boosts = player.activeBoosts.length
    ? player.activeBoosts.map((boost) => `<span class="tag">${boost.name}: ${statLine(boost)} / ${boost.remaining} quests</span>`).join("")
    : `<span class="tag">No active boosters</span>`;
  const equippedIds = new Set(player.equippedSkills);
  const equippedSkills = equippedSkillList();
  const skillCards = allSkills().map((skill) => {
    const equipped = equippedIds.has(skill.id);
    const cooldown = skillCooldown(skill);
    return `
      <article class="move-card">
        <h3>${skill.unlocked ? "" : "Locked: "}${skill.name}</h3>
        <p>${skill.className} Lv ${skill.level}. ${skill.effect} Reset ${skill.cooldown} quests.${cooldown ? ` Cooling down: ${cooldown}.` : ""}</p>
        ${skill.unlocked ? (equipped ? `<button data-unequip-skill="${skill.id}">Unequip</button>` : `<button data-equip-skill="${skill.id}" ${player.equippedSkills.length >= 3 ? "disabled" : ""}>Equip skill</button>`) : ""}
      </article>
    `;
  }).join("");
  return renderShell(`
    <section class="equipment-panel">
      <div>
        <p class="section-label">Equipment</p>
        <h2>Loadout</h2>
        <div class="tag-list">${totals}</div>
      </div>
      <p class="section-label">Active boosters</p>
      <div class="tag-list">${boosts}</div>
      <p class="section-label">Equipped skills (${equippedSkills.length}/3)</p>
      <div class="tag-list">${equippedSkills.length ? equippedSkills.map((skill) => `<span class="tag">${skill.name}${skillCooldown(skill) ? `: ${skillCooldown(skill)} quests` : ""}</span>`).join("") : `<span class="tag">No skills equipped</span>`}</div>
      <div class="moves-grid">${skillCards}</div>
      <p class="section-label">Gear slots</p>
      <div class="equipment-grid">
        ${Object.entries(equipmentSlots).map(([slot, label]) => renderSlot(slot, label, player.equipment[slot], false)).join("")}
      </div>
      <p class="section-label">Implants</p>
      <div class="equipment-grid">
        ${Object.entries(implantSlots).map(([slot, label]) => renderSlot(slot, label, player.implants[slot], true)).join("")}
      </div>
      <p class="section-label">Pack</p>
      <div class="inventory-grid">
        ${player.inventory.length ? inventoryStacks(player.inventory.map((item, index) => ({ item, index }))).map((stack) => renderPackItem(stack)).join("") : `<p class="empty">No equippable gear in your pack.</p>`}
      </div>
    </section>
  `);
}

function renderSlot(slot, label, item, implant) {
  return `
    <article class="equipment-card">
      <h3>${label}</h3>
      ${item ? `${itemImage(item)}<p>${item.name}</p><span class="tag">${statLine(item)}</span><button data-unequip="${slot}" data-implant="${implant ? "1" : "0"}">Unequip</button>` : `<p class="empty">Empty</p>`}
    </article>
  `;
}

function renderPackItem(stack) {
  const { item, indexes, count } = stack;
  const index = indexes[0];
  if (item.type === "consumable") {
    return `
      <article class="inventory-card">
        ${itemImage(item)}
        ${countBadge(count)}
        <h3>${item.name}</h3>
        <p>${statLine(item)}</p>
        <div class="equip-actions"><button data-use-item="${index}">Use</button></div>
      </article>
    `;
  }
  const gearButtons = Object.entries(equipmentSlots)
    .filter(([slot]) => canEquip(item, slot))
    .map(([slot, label]) => `<button data-equip="${index}" data-slot="${slot}">Equip ${label}</button>`)
    .join("");
  const implantButton = item.type === "implant" && implantSlots[item.slot]
    ? `<button data-equip="${index}" data-slot="${item.slot}" data-implant="1">Install ${implantSlots[item.slot]}</button>`
    : "";
  return `
    <article class="inventory-card">
      ${itemImage(item)}
      ${countBadge(count)}
      <h3>${item.name}</h3>
      <p>${statLine(item)}</p>
      <div class="equip-actions">${gearButtons}${implantButton}</div>
    </article>
  `;
}

function renderBottomBar() {
  const player = state.player;
  ensureLoadout();
  return `
    <footer class="bottom-bar theme-${state.area}">
      ${renderPortrait(player.portrait)}
      <div class="status-grid">
        <span class="status-pill"><b>${player.name}</b>${classes[player.classId].name}</span>
        <span class="status-pill"><b>Level</b>${player.level} (${player.xp}/${xpForNext()} XP)</span>
        <span class="status-pill"><b>Guts left</b>${player.guts}/${player.maxGuts}</span>
        <span class="status-pill"><b>Money</b>${player.credits} credits</span>
        <span class="status-pill"><b>Status</b>${player.status.length ? player.status.join(", ") : "Clear"}</span>
      </div>
      <nav class="bar-actions" aria-label="Game links">
        <button data-mode="area">Map</button>
        <button data-mode="level">Stats</button>
        <button data-mode="equipment">Equip</button>
        <button data-open-slots>Slots</button>
        <button data-quit-menu class="danger">Quit</button>
      </nav>
    </footer>
  `;
}

function bindEvents() {
  document.querySelector("#createForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    startGame(new FormData(event.currentTarget));
  });

  document.querySelectorAll("[data-class]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.querySelector("#createForm");
      form.elements.classId.value = button.dataset.class;
      document.querySelectorAll("[data-class]").forEach((item) => item.classList.toggle("selected", item === button));
      document.querySelector(".moves-grid").innerHTML = classes[button.dataset.class].moves.map((move) => `
        <article class="move-card"><h3>Lv ${move.level}: ${move.name}</h3><p>${move.effect}</p></article>
      `).join("");
    });
  });

  document.querySelectorAll("[data-portrait]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.querySelector("#createForm");
      form.elements.portrait.value = button.dataset.portrait;
      document.querySelectorAll("[data-portrait]").forEach((item) => item.classList.toggle("selected", item === button));
    });
  });

  const updateCreateStats = (stat, delta) => {
    const form = document.querySelector("#createForm");
    const currentTotal = ["guts", "wits", "charm"].reduce((sum, key) => sum + Number(form.elements[key].value), 0);
    const current = Number(form.elements[stat].value);
    if (delta > 0 && currentTotal >= 12) return;
    if (delta < 0 && current <= 1) return;
    form.elements[stat].value = current + delta;
    document.querySelector(`#${stat}Value`).textContent = current + delta;
    document.querySelector("#pointsLeft").textContent = 12 - ["guts", "wits", "charm"].reduce((sum, key) => sum + Number(form.elements[key].value), 0);
  };

  document.querySelectorAll("[data-inc]").forEach((button) => button.addEventListener("click", () => updateCreateStats(button.dataset.inc, 1)));
  document.querySelectorAll("[data-dec]").forEach((button) => button.addEventListener("click", () => updateCreateStats(button.dataset.dec, -1)));

  document.querySelectorAll("[data-node-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.nodeType;
      const id = button.dataset.nodeId;
      if (type === "area") travel(id);
      if (type === "quest") startQuest(id);
      if (type === "merchant") setState({ mode: "merchant", merchant: id, dealer: null });
    });
  });

  document.querySelectorAll("[data-open-slots]").forEach((button) => button.addEventListener("click", openSlots));
  document.querySelectorAll("[data-select-slot]").forEach((button) => button.addEventListener("click", () => selectSlot(Number(button.dataset.selectSlot))));
  document.querySelectorAll("[data-confirm-erase]").forEach((button) => button.addEventListener("click", () => confirmEraseSlot(Number(button.dataset.confirmErase))));
  document.querySelectorAll("[data-erase-slot]").forEach((button) => button.addEventListener("click", () => eraseSlot(Number(button.dataset.eraseSlot))));
  document.querySelectorAll("[data-cancel-erase]").forEach((button) => button.addEventListener("click", cancelEraseSlot));
  document.querySelectorAll("[data-quit-menu]").forEach((button) => button.addEventListener("click", quitToMenu));
  document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => act(button.dataset.action)));
  document.querySelectorAll("[data-continue-result]").forEach((button) => button.addEventListener("click", continueResult));
  document.querySelectorAll("[data-dealer]").forEach((button) => button.addEventListener("click", () => setState({ dealer: button.dataset.dealer })));
  document.querySelectorAll("[data-merchant-hub]").forEach((button) => button.addEventListener("click", () => setState({ dealer: null })));
  document.querySelectorAll("[data-buy]").forEach((button) => button.addEventListener("click", () => buy(state.merchant, button.dataset.buyDealer, Number(button.dataset.buy))));
  document.querySelectorAll("[data-equip]").forEach((button) => button.addEventListener("click", () => equipItem(Number(button.dataset.equip), button.dataset.slot, button.dataset.implant === "1")));
  document.querySelectorAll("[data-unequip]").forEach((button) => button.addEventListener("click", () => unequip(button.dataset.unequip, button.dataset.implant === "1")));
  document.querySelectorAll("[data-use-item]").forEach((button) => button.addEventListener("click", () => useItem(Number(button.dataset.useItem))));
  document.querySelectorAll("[data-sell]").forEach((button) => button.addEventListener("click", () => sellLoot(Number(button.dataset.sell))));
  document.querySelectorAll("[data-sell-item]").forEach((button) => button.addEventListener("click", () => sellItem(Number(button.dataset.sellItem))));
  document.querySelectorAll("[data-sell-all-loot]").forEach((button) => button.addEventListener("click", sellAllLoot));
  document.querySelectorAll("[data-deposit-credits]").forEach((button) => button.addEventListener("click", depositCredits));
  document.querySelectorAll("[data-withdraw-credits]").forEach((button) => button.addEventListener("click", withdrawCredits));
  document.querySelectorAll("[data-store-item]").forEach((button) => button.addEventListener("click", () => storeItem(Number(button.dataset.storeItem))));
  document.querySelectorAll("[data-withdraw-item]").forEach((button) => button.addEventListener("click", () => withdrawItem(Number(button.dataset.withdrawItem))));
  document.querySelectorAll("[data-level-stat]").forEach((button) => button.addEventListener("click", () => addStat(button.dataset.levelStat)));
  document.querySelectorAll("[data-add-class]").forEach((button) => button.addEventListener("click", () => addClass(button.dataset.addClass)));
  document.querySelectorAll("[data-equip-skill]").forEach((button) => button.addEventListener("click", () => equipSkill(button.dataset.equipSkill)));
  document.querySelectorAll("[data-unequip-skill]").forEach((button) => button.addEventListener("click", () => unequipSkill(button.dataset.unequipSkill)));
  document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => setState({ mode: "area" })));
  document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => setState({ mode: button.dataset.mode })));
  document.querySelectorAll("[data-reset]").forEach((button) => button.addEventListener("click", resetGame));
}

render();
