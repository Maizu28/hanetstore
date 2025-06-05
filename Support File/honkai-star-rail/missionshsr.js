// file: questgi.js

// Data untuk Character Quest
const trailblazeMissionsData = {
    Prologue: [
        { id: "tm_pro_ChaosIntheDeep", name: "Chaos In the Deep", price: 5000 },
        { id: "tm_pro_EyeoftheStorm", name: "Eye of the Storm", price: 5000 },
        { id: "tm_pro_AMomentofPeace", name: "A Moment of Peace", price: 5000 },
        { id: "tm_pro_LingeringShadows", name: "Lingering Shadows", price: 5000 },
        { id: "tm_pro_TheVoyageContinues", name: "The Voyage Continues", price: 500 },
    ],
    JariloVI1: [
        { id: "tm_jv1_AGrandCoolAdventure", name: "A Grand Cool Adventure", price: 5000 },
        { id: "tm_jv1_TravelersonaWinterNight", name: "Travelers on a Winter Night", price: 5000 },
        { id: "tm_jv1_EverwinterNight", name: "Everwinter Night", price: 5000 },
        { id: "tm_jv1_YouCanRunButYouCantHide", name: "You Can Run, But You Can't Hide", price: 5000 },
        { id: "tm_jv1_Hide-and-Seek", name: "Hide-and-Seek", price: 5000 },
        { id: "tm_jv1_TheEighthandFinalRule", name: "The Eighth and Final Rule", price: 5000 },
        { id: "tm_jv1_LongWaitfortheBladesEdge", name: "Long Wait for the Blade's Edge", price: 5000 },
        { id: "tm_jv1_OnesFallenIntotheAbyss", name: "Ones Fallen Into the Abyss", price: 5000 },
        { id: "tm_jv1_ASunsetRendezvous", name: "A Sunset Rendezvous", price: 5000 },
        { id: "tm_jv1_ThePastWillReturnasanAvalanche", name: "The Past Will Return as an Avalanche", price: 5000 },
        { id: "tm_jv1_LyinginRust", name: "Lying in Rust", price: 5000 },
        { id: "tm_jv1_ToRotorToBurn", name: "To Rot or to Burn", price: 5000 },
        { id: "tm_jv1_NotGoodWithFarewells", name: "Not Good With Farewells", price: 5000 },
    ],
    JariloVI2: [
        { id: "tm_jv2_CleansetheDarknessOutside", name: "Cleanse the Darkness Outside", price: 5000 },
        { id: "tm_jv2_UnattainableIdol", name: "Unattainable Idol", price: 5000 },
        { id: "tm_jv2_YoungGuard", name: "Young Guard", price: 5000 },
        { id: "tm_jv2_SoldiersStaySilent", name: "Soldiers Stay Silent", price: 5000 },
        { id: "tm_jv2_TheStarsAreColdToys", name: "The Stars Are Cold Toys", price: 5000 },
        { id: "tm_jv2_RoadstothePastHaveLongBeenClosed", name: "Roads to the Past Have Long Been Closed", price: 5000 },
        { id: "tm_jv2_IntheDangerousMuddySwamp", name: "In the Dangerous Muddy Swamp", price: 5000 },
        { id: "tm_jv2_NoTimeforMeMyFriend", name: "No Time for Me, My Friend", price: 5000 },
        { id: "tm_jv2_SilentGalaxy", name: "Silent Galaxy", price: 5000 },
    ],
    XianzhouLoufu1: [
        { id: "tm_xl1_AnInvitationWithoutProffer", name: "An Invitation Without Proffer", price: 5000 },
        { id: "tm_xl1_AmidsttheMara-Struck", name: "Amidst the Mara-Struck", price: 5000 },
        { id: "tm_xl1_DevisingStratagems", name: "Devising Stratagems", price: 5000 },
        { id: "tm_xl1_TheHoundChasestheFox", name: "The Hound Chases the Fox", price: 5000 },
        { id: "tm_xl1_StarsSpunPrescienceSprung", name: "Stars Spun, Prescience Sprung", price: 5000 },
        { id: "tm_xl1_VenomBrewsImmortalityLooms", name: "Venom Brews, Immortality Looms", price: 5000 },
        { id: "tm_xl1_NewFriendsBringNewJoy", name: "New Friends Bring New Joy", price: 5000 },
        { id: "tm_xl1_OmniscientInquiryofArcana", name: "Omniscient Inquiry of Arcana", price: 5000 },
        { id: "tm_xl1_WoodSproutsAnewFateTiltsAskew", name: "Wood Sprouts Anew, Fate Tilts Askew", price: 5000 },
        { id: "tm_xl1_HummingAntlersEntwinedHorns", name: "Humming Antlers, Entwined Horns", price: 5000 },
        { id: "tm_xl1_SinnersMisledCredenceFalsified", name: "Sinners Misled, Credence Falsified", price: 5000 },
    ],
    XianzhouLoufu2: [
        { id: "tm_xl2_DesolateDepthsofDespair", name: "Desolate Depths of Despair", price: 5000 },
        { id: "tm_xl2_ADragonGallantItsOceanDistant", name: "A Dragon Gallant, Its Ocean Distant", price: 5000 },
    ],
    XianzhouLoufu3: [
        { id: "tm_xl3_ObsequiesPerformedALongRoadAhead", name: "Obsequies Performed, A Long Road Ahead", price: 5000 },
    ],
    Penacony1: [
        { id: "tm_pen1_LongDaysJourneyIntoNight", name: "Long Day's Journey Into Night", price: 5000 },
        { id: "tm_pen1_TheYouthsWhoChaseDream", name: "The Youths Who Chase Dream", price: 5000 },
        { id: "tm_pen1_SleeplessNight", name: "Sleepless Night", price: 5000 },
        { id: "tm_pen1_TalesfromtheGoldenAge", name: "Tales from the Golden Age", price: 5000 },
        { id: "tm_pen1_GoodOmenMyFriend", name: "Good Omen, My Friend", price: 5000 },
        { id: "tm_pen1_LullabyoftheNorthWind", name: "Lullaby of the North Wind", price: 5000 },
        { id: "tm_pen1_GentlenesstheNameofNocturne", name: "Gentleness, the Name of Nocturne", price: 5000 },
        { id: "tm_pen1_ThroughAGlassDarkly", name: "Through A Glass Darkly", price: 5000 },
        { id: "tm_pen1_ShouldOneAwakenatMidnight", name: "Should One Awaken at Midnight", price: 5000 },
        { id: "tm_pen1_Whodunit", name: "Whodunit", price: 5000 },
    ],
    Penacony2: [
        { id: "tm_pen2_TheDevilinVelvet", name: "The Devil in Velvet", price: 5000 },
        { id: "tm_pen2_LostGeneration", name: "Lost Generation", price: 5000 },
        { id: "tm_pen2_DoubleIndemnity", name: "Double Indemnity", price: 5000 },
        { id: "tm_pen2_WhentheSacredGinmillCloses", name: "When the Sacred Ginmill Closes", price: 5000 },
        { id: "tm_pen2_HeavenisaPlaceonEarth", name: "Heaven is a Place on Earth", price: 5000 },
        { id: "tm_pen2_WhyDotheHeathenRage", name: "Why Do the Heathen Rage", price: 5000 },
        { id: "tm_pen2_TheTell-TaleHeart", name: "The Tell-Tale Heart", price: 5000 },
        { id: "tm_pen2_AlltheSadTales", name: "All the Sad Tales", price: 5000 },
        { id: "tm_pen2_AWalkAmongtheTombstones", name: "A Walk Among the Tombstones", price: 5000 },
    ],
    Penacony3: [
        { id: "tm_pen3_TheGreatTrainRobbery", name: "The Great Train Robbery", price: 5000 },
        { id: "tm_pen3_TheFoolAlwaysRingsTwice", name: "The Fool Always Rings Twice", price: 5000 },
        { id: "tm_pen3_SmallTownGrotesque", name: "Small Town Grotesque", price: 5000 },
        { id: "tm_pen3_ThePublicEnemy", name: "The Public Enemy", price: 5000 },
        { id: "tm_pen3_Bullet&Brain", name: "Bullet & Brain", price: 5000 },
        { id: "tm_pen3_TheOnlyPathtoTomorrow", name: "The Only Path to Tomorrow", price: 5000 },
        { id: "tm_pen3_Seabiscuit", name: "Seabiscuit", price: 5000 },
        { id: "tm_pen3_BeautyandDestruction", name: "Beauty and Destruction", price: 5000 },
        { id: "tm_pen3_ThenWaketoWeep", name: "Then Wake to Weep", price: 5000 },
        { id: "tm_pen3_EverythingthatRisesMustConverge", name: "Everything that Rises Must Converge", price: 5000 },
        { id: "tm_pen3_TheSunAlsoRises", name: "The Sun Also Rises", price: 5000 },
        { id: "tm_pen3_AndoftheEightDay", name: "And of the Eight Day", price: 5000 },
    ],
    Penacony4: [
        { id: "tm_pen4_Unconquered", name: "Unconquered", price: 5000 },
        { id: "tm_pen4_AllAboutEve", name: "All About Eve", price: 5000 },
        { id: "tm_pen4_RiversRunWithoutReturn", name: "Rivers Run Without Return", price: 5000 },
        { id: "tm_pen4_LifeisButaDriftingDream", name: "Life is But a Drifting Dream", price: 5000 },
        { id: "tm_pen4_SoldiersPay", name: "Soldier’s Pay", price: 5000 },
        { id: "tm_pen4_AThousandBellsatDawn", name: "A Thousand Bells at Dawn", price: 5000 },
        { id: "tm_pen4_StrangerinaStrangeLand", name: "Stranger in a Strange Land", price: 5000 },
    ],
    Penacony5: [
        { id: "tm_pen5_AllWhoWakes", name: "All Who Wakes", price: 5000 },
        { id: "tm_pen5_TheDepartedWillReturnFirst", name: "The Departed Will Return First", price: 5000 },
        { id: "tm_pen5_AMisfortuneofSurvivors", name: "A Misfortune of Survivors", price: 5000 },
        { id: "tm_pen5_RealityisButDreamsEcho", name: "Reality is But Dream's Echo", price: 5000 },
        { id: "tm_pen5_SoundofFarewellHumsReunion", name: "Sound of Farewell Hums Reunion", price: 5000 },
        { id: "tm_pen5_BowOutAtMomentofDebut", name: "Bow Out At Moment of Debut", price: 5000 },
    ],
    Amphoreus1: [
        { id: "tm_amp1_SilverChariotAwaytothatBlackenedLand", name: "Silver Chariot, Away to that Blackened Land", price: 5000 },
        { id: "tm_amp1_DistantTravelersListentothisWorldsPrayer", name: "Distant Travelers, Listen to this World's Prayer", price: 5000 },
        { id: "tm_amp1_StarsAccompanyMySlumber", name: "Night Stars, Accompany My Slumber", price: 5000 },
        { id: "tm_amp1_WastelandHarkBackGloryofOld", name: "Wasteland, Hark Back Glory of Old", price: 5000 },
        { id: "tm_amp1_NightVeilShroudtheSilentPast", name: "Night Veil, Shroud the Silent Past", price: 5000 },
        { id: "tm_amp1_KremnosCleanseThyRustedBloodPartI", name: "Kremnos, Cleanse Thy Rusted Blood Part I", price: 5000 },
        { id: "tm_amp1_ACleansingofGold", name: "A Cleansing of Gold", price: 5000 },
        { id: "tm_amp1_KremnosCleanseThyRustedBloodPartII", name: "Kremnos, Cleanse Thy Rusted Blood Part II", price: 5000 },
        { id: "tm_amp1_AWitchsScientificRepose", name: "A Witch's Scientific Repose", price: 5000 },
        { id: "tm_amp1_HeroBearThyCoreflame", name: "Hero, Bear Thy Coreflame", price: 5000 },
    ],
    Amphoreus2: [
        { id: "tm_amp2_StrifeDispeltheAccompanyingFears", name: "Strife, Dispel the Accompanying Fears", price: 5000 },
        { id: "tm_amp2_GloryTurnFromImbibedPrison", name: "Glory, Turn From Imbibed Prison", price: 5000 },
        { id: "tm_amp2_GroveWhereforeAretheWiseSilent", name: "Grove, Wherefore Are the Wise Silent", price: 5000 },
        { id: "tm_amp2_LamentationsBringNotEmptyTears", name: "Lamentations, Bring Not Empty Tears", price: 5000 },
        { id: "tm_amp2_MemoriesVeiledinBlazingMist", name: "Memories, Veiled in Blazing Mist", price: 5000 },
        { id: "tm_amp2_PassagesKnockingEchoesinDreams", name: "Passages, Knocking Echoes in Dreams", price: 5000 },
        { id: "tm_amp2_NemesisScorchedbyGoldenBlood", name: "Nemesis Scorched by Golden Blood", price: 5000 },
        { id: "tm_amp2_ThroneEndThoseLongYearsForlorn", name: "Throne, End Those Long Years Forlorn", price: 5000 },
        { id: "tm_amp2_PassageRevealthePastOnceMore", name: "Passage, Reveal the Past Once More", price: 5000 },
    ],
    Amphoreus3: [
        { id: "tm_amp3_SpindleLaboringtoweavetheTapestryofTime", name: "Spindle, Laboring to Weave the Tapestry of Time", price: 5000 },
        { id: "tm_amp3_OliveCasttotheConferenceChair", name: "Olive, Cast to the Conference Chair", price: 5000 },
        { id: "tm_amp3_PapyrusReadtheBlasphemersWill", name: "Papyrus, Read the Blasphemer's Will", price: 5000 },
        { id: "tm_amp3_DebateDiscourseWithoutSpears", name: "Debate, Discourse Without Spears", price: 5000 },
        { id: "tm_amp3_BrokenDreamEnlightenFromtheBeyond", name: "Broken Dream, Enlighten From the Beyond", price: 5000 },
        { id: "tm_amp3_PathstriderSetSailUpontheRiverofSouls", name: "Pathstrider, Set Sail Upon the River of Souls", price: 5000 },
        { id: "tm_amp3_FerrymanFerryMeAcrosstheStreamofSouls", name: "Ferryman, Ferry Me Across the Stream of Souls", price: 5000 },
        { id: "tm_amp3_CitizenListentoThoseRoaringTides", name: "Citizen, Listen to Those Roaring Tides", price: 5000 },
        { id: "tm_amp3_HomewardJourneyNeverLookBackUponthePathWhenceYouCame", name: "Homeward Journey, Never Look Back Upon the Path Whence You Came", price: 5000 },
        { id: "tm_amp3_ScholarLetUsMeetAgainBeforetheGatesofTruth", name: "Scholar, Let Us Meet Again Before the Gates of Truth", price: 5000 },
        { id: "tm_amp3_WitchsMirroredReversal", name: "Witch's Mirrored Reversal", price: 5000 },
    ],
    Amphoreus4: [
        { id: "tm_amp4_StarsCleansetheTroubledThoughts", name: "Stars, Cleanse the Troubled Thoughts", price: 5000 },
        { id: "tm_amp4_ScrollsTurntheBladesGaze", name: "Scrolls, Turn the Blade's Gaze", price: 5000 },
        { id: "tm_amp4_ChestBeartheBygoneDust", name: "Chest, Bear the Bygone Dust", price: 5000 },
        { id: "tm_amp4_GoldenThreadRelaytheSaviorsFate", name: "Golden Thread, Relay the Savior's Fate", price: 5000 },
        { id: "tm_amp4_GroveJudgethePastandPresent", name: "Grove, Judge the Past and Present", price: 5000 },
        { id: "tm_amp4_PoetSpeakoftheSkyThroughMePartI", name: "Poet, Speak of the Sky Through Me Part I", price: 5000 },
        { id: "tm_amp4_PoetSpeakoftheSkyThroughMePartII", name: "Poet, Speak of the Sky Through Me Part II", price: 5000 },
        { id: "tm_amp4_SlateWhyNeglectThatLightsShade", name: "Slate, Why Neglect That Light's Shade", price: 5000 },
        { id: "tm_amp4_DawnShineattheWorldsEnd", name: "Dawn, Shine at the World's End", price: 5000 },
    ]
};

// Data untuk Trailblaze Continuance
const trailblazeContinuanceData = {
    JariloVI: [
        { id: "tc_jar1_FutureMarketPrologue", name: "Future Market (Prologue)", price: 5000 },
        { id: "tc_jar1_FutureMarketI", name: "Future Market (I)", price: 5000 },
        { id: "tc_jar1_FutureMarketII", name: "Future Market (II)", price: 5000 },
    ],
    Xianzhou1: [
        { id: "tc_xia1_SojournersGhastlyReverie", name: "Sojourners' Ghastly Reverie", price: 5000 },
        { id: "tc_xia1_FyxestrollGatheringI", name: "Fyxestroll Gathering I", price: 5000 },
        { id: "tc_xia1_Twins", name: "Twins", price: 5000 },
        { id: "tc_xia1_FyxestrollGatheringII", name: "Fyxestroll Gathering II", price: 5000 },
        { id: "tc_xia1_Percipient", name: "Percipient", price: 5000 },
        { id: "tc_xia1_FyxestrollGatheringIII", name: "Fyxestroll Gathering III", price: 5000 },
        { id: "tc_xia1_SwordEssence", name: "Sword Essence", price: 5000 },
        { id: "tc_xia1_FyxestrollGatheringIV", name: "Fyxestroll Gathering IV", price: 5000 },
        { id: "tc_xia1_FoxianDream", name: "Foxian Dream", price: 5000 },
    ],
    HertaSpaceStation: [
        { id: "tc_hss1_WhentheStarsofIngenuityShine", name: "When the Stars of Ingenuity Shine", price: 5000 },
        { id: "tc_hss1_MundaneTroubles", name: "Mundane Troubles", price: 5000 },
    ],
    Xianzhou2: [
        { id: "tc_xia2_HomecomingWardance", name: "Homecoming Wardance", price: 5000 },
        { id: "tc_xia2_EmissaryMystique", name: "Emissary Mystique", price: 5000 },
        { id: "tc_xia2_FromGrowlstoGrace", name: "From Growls to Grace", price: 5000 },
        { id: "tc_xia2_TheQuietingofQuillons", name: "The Quieting of Quillons", price: 5000 },
        { id: "tc_xia2_ByWordsofMany", name: "By Words of Many", price: 5000 },
        { id: "tc_xia2_MarchtoMasteryAStarisBorn", name: "March to Mastery: A Star is Born", price: 5000 },
        { id: "tc_xia2_AStartlementofFurandFeathers", name: "A Startlement of Fur and Feathers", price: 5000 },
        { id: "tc_xia2_InquisitiontoRectitude", name: "Inquisition to Rectitude", price: 5000 },
        { id: "tc_xia2_RoguesontheRun1", name: "Rogues on the Run", price: 5000 },
    ],
    Xianzhou3: [
        { id: "tc_xia3_AtDawnToWar", name: "At Dawn, To War", price: 5000 },
        { id: "tc_xia3_AWebofPastsRewoven", name: "A Web of Pasts Rewoven", price: 5000 },
        { id: "tc_xia3_AloneinPeril", name: "Alone in Peril", price: 5000 },
        { id: "tc_xia3_TheRedWarcry", name: "The Red Warcry", price: 5000 },
        { id: "tc_xia3_NoviceinZenithalDuel", name: "Novice in Zenithal Duel", price: 5000 },
        { id: "tc_xia3_ASwarmofCarnage", name: "A Swarm of Carnage", price: 5000 },
        { id: "tc_xia3_SweepbyMerlinsClaw", name: "Sweep by Merlin's Claw", price: 5000 },
        { id: "tc_xia3_LastStandofaLoneWolf", name: "Last Stand of a Lone Wolf", price: 5000 },
        { id: "tc_xia3_IShallTurntheTide", name: "I Shall Turn the Tide", price: 5000 },
        { id: "tc_xia3_ComradeinArms", name: "Comrade in Arms", price: 5000 },
        { id: "tc_xia3_UndertheSpell", name: "Under the Spell", price: 5000 },
        { id: "tc_xia3_EbbofPastSins", name: "Ebb of Past Sins", price: 5000 },
        { id: "tc_xia3_AFugueFromBeyond", name: "A Fugue From Beyond", price: 5000 },
    ],
    Penacony: [
        { id: "tc_pen1_AnAndalusianMonkey", name: "An Andalusian Monkey", price: 5000 },
        { id: "tc_pen1_The400Bananas", name: "The 400 Bananas", price: 5000 },
        { id: "tc_pen1_ReservoirMonkeys", name: "Reservoir Monkeys", price: 5000 },
        { id: "tc_pen1_AClockworkBanana", name: "A Clockwork Banana", price: 5000 },
        { id: "tc_pen1_DeadBananaSociety", name: "Dead Banana Society", price: 5000 },
        { id: "tc_pen1_TheMenWhoTreadontheMonkeysTail", name: "The Men Who Tread on the Monkey's Tail", price: 5000 },
        { id: "tc_pen1_AsdanianRhapsody", name: "Asdanian Rhapsody", price: 5000 },
        { id: "tc_pen1_BattlesWithoutNinjaandHumanity", name: "Battles Without Ninja and Humanity", price: 5000 },
    ],
};

// Data untuk World Quest
const worldQuestsData = {
    Mondstadt: [
        { id: "wq_mon_time_and_wind", name: "Time and the Wind", price: 10000 },
        { id: "wq_mon_Bough_Keeper_Dainsleif", name: "Bough Keeper: Dainsleif", price: 10000 },
        { id: "wq_mon_In_The_Mountains", name: "In The Mountains", price: 10000 },
        { id: "wq_mon_The_Festering_Fang", name: "The_Festering_Fang", price: 10000 },
        { id: "wq_mon_Great_Mountain_Survey_I", name: "The Great Mountain Survey I", price: 10000 },
        { id: "wq_mon_The_Great_Mountain_Survey_II", name: "The Great Mountain Survey II", price: 10000 },
        { id: "wq_mon_A_Land_Entombed", name: "A_Land_Entombed", price: 10000 },
        { id: "wq_mon_Lost_In_The_Snow", name: "Lost In The Snow", price: 10000 },
        { id: "wq_mon_Ah_Fresh_Meat!", name: "Ah, Fresh Meat!", price: 10000 },
    ],
    Liyue: [
        { id: "wq_liy_Little_Game", name: "Little Game", price: 10000 },
        { id: "wq_liy_And_This_Treasure_Goes_To...", name: "And This Treasure Goes To...", price: 10000 },
        { id: "wq_liy_A_Provisional_Arrangement", name: "A Provisional Arrangement", price: 10000 },
        { id: "wq_liy_Big_Business", name: "Big Business", price: 10000 },
        { id: "wq_liy_Books_in_The_Woods", name: "Books in The Woods", price: 10000 },
        { id: "wq_liy_Luhua_Landscape", name: "Luhua Landscape", price: 10000 },
        { id: "wq_liy_Nine_Pillars_of_Peace", name: "Nine Pillars of Peace", price: 10000 },
        { id: "wq_liy_No_Restoring_This_Past_Land_of_Beauty", name: "No Restoring This Past Land of Beauty", price: 10000 },
        { id: "wq_liy_Old_Tastes_Die_Hard", name: "Old Tastes Die Hard", price: 10000 },
        { id: "wq_liy_Overstretched", name: "Overstretched", price: 10000 },
        { id: "wq_liy_Share_Not_Your_Treasures", name: "Share Not Your Treasures", price: 10000 },
        { id: "wq_liy_The_Chi_of_Guyun", name: "The Chi of Guyun", price: 10000 },
        { id: "wq_liy_The_Tree_Who_Stands_Alone", name: "The Tree Who Stands Alone", price: 10000 },
        { id: "wq_liy_Treasure_Lost,_Treasure_Found", name: "Treasure Lost, Treasure Found", price: 10000 },
        { id: "wq_liy_The_Yakshas_Wish", name: "The Yaksha's Wish", price: 10000 },
    ],
    Inazuma: [
        { id: "wq_ina_TheSeventhSamurai", name: "The Seventh Samurai", price: 10000 },
        { id: "wq_ina_DreamsOfSwordArt", name: "Dreams Of Sword Art", price: 10000 },
        { id: "wq_ina_TreatmentOnTheIsland", name: "Treatment On The Island", price: 10000 },
        { id: "wq_ina_GourmetSupremosAssemble!", name: "Gourmet Supremos, Assemble!", price: 10000 },
        { id: "wq_ina_TheGourmetSupremosOfShrinesAndSakura", name: "The Gourmet Supremos: Of Shrines And Sakura", price: 10000 },
        { id: "wq_ina_TheGourmetSupremosTheSeashoreStrider", name: "The Gourmet Supremos: The Seashore Strider", price: 10000 },
        { id: "wq_ina_HayashiOfTanukiInTheForest", name: "HayashiOfTanukiInTheForest", price: 10000 },
        { id: "wq_ina_HiromisWatch", name: "Hiromi's Watch", price: 10000 },
        { id: "wq_ina_RelicsOfSeirai", name: "RelicsOfSeirai", price: 10000 },
        { id: "wq_ina_NekoIsACatSeries", name: "Neko Is A Cat Series", price: 10000 },
        { id: "wq_ina_TataraTalesSeries", name: "Tatara Tales Series", price: 10000 },
        { id: "wq_ina_TemariaGame", name: "Temaria Game", price: 10000 },
    ],
    Sumeru: [
        { id: "wq_sum_ADelicacyforNara", name: "A Delicacy for Nara ", price: 10000 },
        { id: "wq_sum_APrayerforRainontheFecundLand", name: "A Prayer for Rain on the Fecund Land", price: 10000 },
        { id: "wq_sum_AdventureTakesCourage!", name: "Adventure Takes Courage!", price: 10000 },
        { id: "wq_sum_TheChildrenofVimaraVillage", name: "The Children of Vimara Village", price: 10000 },
        { id: "wq_sum_IntotheWoods", name: "Into the Woods", price: 10000 },
        { id: "wq_sum_TheLostChild", name: "The Lost Child", price: 10000 },
        { id: "wq_sum_TheWorldofAranara", name: "The World of Aranara", price: 10000 },
        { id: "wq_sum_ChildrenoftheForest", name: "Children of the Forest", price: 10000 },
        { id: "wq_sum_TheRhythmthatLeadstotheGloomyPath", name: "The Rhythm that Leads to the Gloomy Path", price: 10000 },
        { id: "wq_sum_TheRhythmthatNurturestheSprout", name: "The Rhythm that Nurtures the Sprout", price: 10000 },
        { id: "wq_sum_TheRhythmthatRevealstheBeastlyTrail", name: "The Rhythm that Reveals the Beastly Trail", price: 10000 },
        { id: "wq_sum_CookingtheFlavorofNature", name: "Cooking, the Flavor of Nature", price: 10000 },
        { id: "wq_sum_CookingaPleasantMemory", name: "Cooking, a Pleasant Memory", price: 10000 },
        { id: "wq_sum_CookingtheAromaofHomecoming", name: "Cooking, the Aroma of Homecoming", price: 10000 },
        { id: "wq_sum_CookingtheBeautyofSharing", name: "Cooking, the Beauty of Sharing", price: 10000 },
        { id: "wq_sum_ADelicacyforNara2", name: "A Delicacy for Nara", price: 10000 },
        { id: "wq_sum_StarryNightChapter", name: "Starry Night Chapter", price: 10000 },
        { id: "wq_sum_RisenMoonChapter", name: "Risen Moon Chapter", price: 10000 },
        { id: "wq_sum_TheFinalChapter", name: "The Final Chapter", price: 10000 },
        { id: "wq_sum_AranakinsOldFriend", name: "Aranakin's Old Friend", price: 10000 },
        { id: "wq_sum_AragarusDrawing", name: "Aragaru's Drawing", price: 10000 },
        { id: "wq_sum_AranagasMemory", name: "Aranaga's Memory", price: 10000 },
        { id: "wq_sum_MemorysFinalChapter", name: "Memory's Final Chapter", price: 10000 },
        { id: "wq_sum_VarunaGatha1", name: "Varuna Gatha 1", price: 10000 },
        { id: "wq_sum_MemoryofStone", name: "Memory of Stone ", price: 10000 },
        { id: "wq_sum_SlumberingRoots", name: "Slumbering Roots", price: 10000 },
        { id: "wq_sum_IrateIronChunk", name: "Irate Iron Chunk ", price: 10000 },
        { id: "wq_sum_APrayerforRainontheFecundLand2", name: "A Prayer for Rain on the Fecund Land ", price: 10000 },
        { id: "wq_sum_FirstChapter", name: "First Chapter", price: 10000 },
        { id: "wq_sum_RoyinjanChapter", name: "Royinjan's Chapter", price: 10000 },
        { id: "wq_sum_RoyinjanChapterLinga", name: "Royinjan's Chapter: Linga", price: 10000 },
        { id: "wq_sum_RoyinjanChapterYoni", name: "Royinjan's Chapter: Yoni ", price: 10000 },
        { id: "wq_sum_JazarisChapter", name: "Jazari's Chapter", price: 10000 },
        { id: "wq_sum_DevDelverChapter", name: "Dev Delver Chapter", price: 10000 },
        { id: "wq_sum_UntilVanaisHealed", name: "Until Vana is Healed", price: 10000 },
        { id: "wq_sum_SproutingSeedlings", name: "Sprouting Seedlings", price: 10000 },
        { id: "wq_sum_ForABetterReunion", name: "For A Better Reunion", price: 10000 },
        { id: "wq_sum_FestivalUtsava", name: "Festival Utsava", price: 10000 },
        { id: "wq_sum_DeliciousRiddle", name: "Delicious Riddle", price: 10000 },
        { id: "wq_sum_GardenFairies", name: "Garden Fairies", price: 10000 },
        { id: "wq_sum_TasteofHappiness", name: "Taste of Happiness", price: 10000 },
        { id: "wq_sum_RishbolandTigerroaaar", name: "Rishboland Tiger, roaaar", price: 10000 },
        { id: "wq_sum_ForFruitsSeedsandTrees", name: "For Fruits, Seeds, and Trees", price: 10000 },
        { id: "wq_sum_FortheChildrenofthePast", name: "For the Children of the Past", price: 10000 },
        { id: "wq_sum_ForAllChildrenWhoLongforLife", name: "For All Children Who Long for Life", price: 10000 },
        { id: "wq_sum_NextTimeOnKingofInvokations", name: "Next Time, On King of Invokations", price: 10000 },
        { id: "wq_sum_WhereAretheFierceCreatures", name: "Where Are the Fierce Creatures", price: 10000 },
        { id: "wq_sum_ForaDreamITarry", name: "For a Dream I Tarry", price: 10000 },
        { id: "wq_sum_TheFoolishFatuus", name: "The Foolish Fatuus", price: 10000 },
    ],
    Fontaine: [
        { id: "wq_fon_ancient_colors", name: "Ancient Colors Series", price: 10000 },
        { id: "wq_fon_Annofthenarzissenkreuz", name: "Ann of the Narzissenkreuz Series", price: 10000 },
        { id: "wq_fon_CanticlesofHarmony", name: "Canticles of Harmony Series", price: 10000 },
        { id: "wq_fon_FontaineResearchInstituteChronicles", name: "Ann of the NarzissenkreuzFontaine Research Institute Chronicles Series", price: 10000 },
        { id: "wq_fon_IntheWakeofNarcissus", name: "In the Wake of Narcissus Series", price: 10000 },
        { id: "wq_fon_QuestioningMelusineandAnsweringMachine", name: "Questioning Melusine and Answering Machine Series", price: 10000 },
        { id: "wq_fon_ScenesfromLifeinMeropide", name: "Scenes from Life in Meropide Series", price: 10000 },
        { id: "wq_fon_TheWildFairyofErinnyes", name: "The Wild Fairy of Erinnyes", price: 10000 },
        { id: "wq_fon_HeyThisIsntPumpkinSoup...", name: "Hey, This Isn't Pumpkin Soup...", price: 10000 },
        { id: "wq_fon_ACertainNotice", name: "A Certain Notice", price: 10000 },
        { id: "wq_fon_ACertainStamp", name: "A Certain Stamp", price: 10000 },
        { id: "wq_fon_ACertainTrifle", name: "A Certain Trifle", price: 10000 },
        { id: "wq_fon_AFontainianMessage", name: "A Fontainian Message", price: 10000 },
        { id: "wq_fon_ALetter", name: "A Letter", price: 10000 },
        { id: "wq_fon_AnExpectedLie", name: "An Expected Lie", price: 10000 },
        { id: "wq_fon_AnExpectedPlan", name: "An Expected Plan", price: 10000 },
        { id: "wq_fon_AnotherHorizonofAdventure", name: "Another Horizon of Adventure", price: 10000 },
        { id: "wq_fon_AqueousTidemarks", name: "Aqueous Tidemarks", price: 10000 },
        { id: "wq_fon_BookofEsotericRevelations", name: "Book of Esoteric Revelations", price: 10000 },
        { id: "wq_fon_BothBrainsandBrawn", name: "Both Brains and Brawn", price: 10000 },
        { id: "wq_fon_DangerLurksEverywhereinFontaine", name: "Danger Lurks Everywhere in Fontaine", price: 10000 },
        { id: "wq_fon_DaydreamsBeyondSpaceandTime", name: "Daydreams Beyond Space and Time", price: 10000 },
        { id: "wq_fon_EchoesoftheAncientWorld", name: "Echoes of the Ancient World", price: 10000 },
        { id: "wq_fon_FishingGame", name: "Fishing Game", price: 10000 },
        { id: "wq_fon_ForYesterdayandTomorrow", name: "For Yesterday and Tomorrow", price: 10000 },
        { id: "wq_fon_FreeVerse", name: "Free Verse", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste(BelleauRegion)", name: "Good Stuff, but Terrible Taste (Belleau Region)", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste(CentralBerylRegion)", name: "Good Stuff, but Terrible Taste (Central Beryl Region)", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste(CourtofFontaineRegion)", name: "Good Stuff, but Terrible Taste (Court of Fontaine Region)", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste(SoutheastBerylRegion)", name: "Good Stuff, but Terrible Taste (Southeast Beryl Region)", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste(WestBerylRegion)", name: "Good Stuff, but Terrible Taste (West Beryl Region)", price: 10000 },
        { id: "wq_fon_GoodStuffbutTerribleTaste—Continued", name: "Good Stuff, but Terrible Taste — Continued", price: 10000 },
        { id: "wq_fon_HappyBirthday", name: "Happy Birthday", price: 10000 },
        { id: "wq_fon_ImpromptuPoemoftheCrimsonDawn", name: "Impromptu Poem of the Crimson Dawn", price: 10000 },
        { id: "wq_fon_InExpertCompany?(I)", name: "In Expert Company? (I)", price: 10000 },
        { id: "wq_fon_InExpertCompany?(II)", name: "In Expert Company? (II)", price: 10000 },
        { id: "wq_fon_InSearchofLostTime", name: "In Search of Lost Time", price: 10000 },
        { id: "wq_fon_InSearchofLostTime:North", name: "In Search of Lost Time: North", price: 10000 },
        { id: "wq_fon_InSearchofLostTime:South", name: "In Search of Lost Time: South", price: 10000 },
        { id: "wq_fon_InSearchofLostTime:West", name: "In Search of Lost Time: West", price: 10000 },
        { id: "wq_fon_InitialFacts", name: "Initial Facts", price: 10000 },
        { id: "wq_fon_LatecomingHomecoming", name: "Latecoming Homecoming", price: 10000 },
        { id: "wq_fon_Leroy:BeautifulFriends", name: "Leroy: Beautiful Friends", price: 10000 },
        { id: "wq_fon_Leroy:DyingFlash", name: "Leroy: Dying Flash", price: 10000 },
        { id: "wq_fon_Leroy:FiringSquad", name: "Leroy: Firing Squad", price: 10000 },
        { id: "wq_fon_Leroy:HangmansNoose", name: "Leroy: Hangman's Noose", price: 10000 },
        { id: "wq_fon_Leroy:HighNoon", name: "Leroy: High Noon", price: 10000 },
        { id: "wq_fon_Leroy:QueenoftheNightsAria", name: "Leroy: Queen of the Night's Aria", price: 10000 },
        { id: "wq_fon_Leroy:UnderGuard", name: "Leroy: Under Guard", price: 10000 },
        { id: "wq_fon_OurPurposeIsinAnotherCanal", name: "Our Purpose Is in Another Canal", price: 10000 },
        { id: "wq_fon_Pursuit(Part1)", name: "Pursuit (Part 1)", price: 10000 },
        { id: "wq_fon_Pursuit(Part2)", name: "Pursuit (Part 2)", price: 10000 },
        { id: "wq_fon_RiddlesAwaitingAnswers", name: "Riddles Awaiting Answers", price: 10000 },
        { id: "wq_fon_RoadtotheSingularity", name: "Road to the Singularity", price: 10000 },
        { id: "wq_fon_Semi-AutomaticForging", name: "Semi-Automatic Forging", price: 10000 },
        { id: "wq_fon_SteambirdInterview", name: "Steambird Interview", price: 10000 },
        { id: "wq_fon_StillMouthwatering!", name: "Still Mouthwatering!", price: 10000 },
        { id: "wq_fon_StrangeStoneChronicle(Part1)", name: "Strange Stone Chronicle (Part 1)", price: 10000 },
        { id: "wq_fon_StrangeStoneChronicle(Part2)", name: "Strange Stone Chronicle (Part 2)", price: 10000 },
        { id: "wq_fon_StrangeStoneChronicle(Part3)", name: "Strange Stone Chronicle (Part 3)", price: 10000 },
        { id: "wq_fon_TheFinalQuestion", name: "The Final Question", price: 10000 },
        { id: "wq_fon_TheFountainFlowsAgain", name: "The Fountain Flows Again", price: 10000 },
        { id: "wq_fon_TheLonePhantomSail", name: "The Lone Phantom Sail", price: 10000 },
        { id: "wq_fon_TheLong-FailedGraphAdversarialTechnology", name: "The Long-Failed 'Graph Adversarial Technology'", price: 10000 },
        { id: "wq_fon_TheThreePrimaryColorsoftheSolarCorona", name: "The Three Primary Colors of the Solar Corona", price: 10000 },
        { id: "wq_fon_ThroughtheLookingGlass", name: "Through the Looking Glass", price: 10000 },
        { id: "wq_fon_TreacherousLightoftheDepths", name: "Treacherous Light of the Depths", price: 10000 },
        { id: "wq_fon_TrulyMouthwatering!", name: "Truly Mouthwatering!", price: 10000 },
        { id: "wq_fon_UnfinishedStory", name: "Unfinished Story", price: 10000 },
        { id: "wq_fon_UponaFloweryFieldofGrass", name: "Upon a Flowery Field of Grass", price: 10000 },
        { id: "wq_fon_Villains", name: "Villains", price: 10000 },
        { id: "wq_fon_WereItSoEasy", name: "Were It So Easy", price: 10000 },
        { id: "wq_fon_WhereHisLifeLies", name: "Where His Life Lies", price: 10000 },
        { id: "wq_fon_Wish-FulfillingTreasureHunt", name: "Wish-Fulfilling Treasure Hunt", price: 10000 },
    ],
    Natlan: [
        { id: "wq_nat_TreasuresandCollectors", name: "Treasures and Collectors", price: 10000 },
        { id: "wq_nat_TaleofDreamsPluckedFromFire", name: "Tale of Dreams Plucked From Fire", price: 10000 },
        { id: "wq_nat_TracerNoTracing", name: "Tracer No Tracing", price: 10000 },
        { id: "wq_nat_SeekerNoFinding", name: "Seeker No Finding", price: 10000 },
        { id: "wq_nat_ShadowsoftheMountains", name: "Shadows of the Mountains", price: 10000 },
        { id: "wq_nat_BeneaththeCrystalRock", name: "Beneath the Crystal Rock", price: 10000 },
        { id: "wq_nat_IntheFootstepsoftheChosenofDragons", name: "In the Footsteps of the Chosen of Dragons", price: 10000 },
        { id: "wq_nat_FeelinglikeFishToday!", name: "Feeling like Fish Today!", price: 10000 },
        { id: "wq_nat_SpecialFriends", name: "Special Friends", price: 10000 },
        { id: "wq_nat_PeacetotheSlumbering", name: "Peace to the Slumbering", price: 10000 },
        { id: "wq_nat_LiesandPromises", name: "Lies and Promises", price: 10000 },
        { id: "wq_nat_LightsKameraAction!", name: "Lights, Kamera, Action!", price: 10000 },
        { id: "wq_nat_LostintheWoods", name: "Lost in the Woods", price: 10000 },
        { id: "wq_nat_ASaurianLoversOrdinaryDays", name: "A Saurian Lover's Ordinary Days", price: 10000 },
        { id: "wq_nat_RiteoftheBold", name: "Rite of the Bold", price: 10000 },
        { id: "wq_nat_RevelationsFromthePast", name: "Revelations From the Past", price: 10000 },
        { id: "wq_nat_BetweenPledgeandForgettance", name: "Between Pledge and Forgettance", price: 10000 },
        { id: "wq_nat_TepetlisaurusHide-and-Seek", name: "Tepetlisaurus Hide-and-Seek", price: 10000 },
        { id: "wq_nat_WeightyWings", name: "Weighty Wings", price: 10000 },
        { id: "wq_nat_GiftsandGiftsinReturn", name: "Gifts and Gifts in Return", price: 10000 },
        { id: "wq_nat_WaitingForSeedstoSprout", name: "Waiting For Seeds to Sprout", price: 10000 },
        { id: "wq_nat_StrideonRainbowsSplittheWaves", name: "Stride on Rainbows, Split the Waves", price: 10000 },
        { id: "wq_nat_RipeforTrouble", name: "Ripe for Trouble", price: 10000 },
        { id: "wq_nat_TotheNightWhatisthenights", name: "To the Night, What is the Night's", price: 10000 },
        { id: "wq_nat_TowardRed-HotAdventure!", name: "Toward Red-Hot Adventure!", price: 10000 },
        { id: "wq_nat_TheCaseoftheCraftingBench", name: "The Case of the Crafting Bench", price: 10000 },
        { id: "wq_nat_ToWishUponaStar", name: "To Wish Upon a Star", price: 10000 },
        { id: "wq_nat_TheRoadAhead", name: "The Road Ahead", price: 10000 },
        { id: "wq_nat_ASaurianReturnstotheNest", name: "A Saurian Returns to the Nest", price: 10000 },
        { id: "wq_nat_IncidentsAreEverSudden", name: "Incidents Are Ever Sudden", price: 10000 },
        { id: "wq_nat_LostTravelerintheAshenRealm", name: "Lost Traveler in the Ashen Realm", price: 10000 },
        { id: "wq_nat_VaultingtheWallofMorningMist", name: "Vaulting the Wall of Morning Mist", price: 10000 },
        { id: "wq_nat_FromOneCasetoAnother", name: "From One Case to Another", price: 10000 },
        { id: "wq_nat_TheMysteryofTecoloapanBeach", name: "The Mystery of Tecoloapan Beach", price: 10000 },
        { id: "wq_nat_Sauro-VetsDilemma", name: "Sauro-Vet's Dilemma", price: 10000 },
        { id: "wq_nat_BeattheClock24Hours", name: "Beat the Clock: 24 Hours", price: 10000 },
        { id: "wq_nat_TheChosenOnesPromise", name: "The Chosen One's Promise", price: 10000 },
        { id: "wq_nat_MomentofAwakening", name: "Moment of Awakening", price: 10000 },
        { id: "wq_nat_TheOtherSideoftheSky", name: "The Other Side of the Sky", price: 10000 },
        { id: "wq_nat_PalaceoftheVisionSerpent", name: "Palace of the Vision Serpent", price: 10000 },
        { id: "wq_nat_AdventureintheLandofMists", name: "Adventure in the Land of Mists", price: 10000 },
        { id: "wq_nat_TotheSky-Road", name: "To the Sky-Road", price: 10000 },
        { id: "wq_nat_DancinintheMoonlight!", name: "Dancin’ in the Moonlight!", price: 10000 },
        { id: "wq_nat_TheLoneIsleNamedNight", name: "The Lone Isle Named Night", price: 10000 },
        { id: "wq_nat_AnAirRaceandanAlibi", name: "An Air Race and an Alibi", price: 10000 },
        { id: "wq_nat_OpenYourHearttoMe", name: "Open Your Heart to Me", price: 10000 },
        { id: "wq_nat_StonesCoconutsandDragonTraffickers", name: "Stones, Coconuts, and Dragon Traffickers", price: 10000 },
        { id: "wq_nat_ComeFlyWithMe", name: "Come Fly With Me", price: 10000 },
        { id: "wq_nat_ChargeForwardGogogo!", name: "Charge Forward! Go, go, go!", price: 10000 },
        { id: "wq_nat_FarewellFinalSaurusCracker", name: "Farewell, Final Saurus Cracker", price: 10000 },
        { id: "wq_nat_StandbyMe", name: "Stand by Me", price: 10000 },
        { id: "wq_nat_FriendsofFireandWater", name: "Friends of Fire and Water", price: 10000 },
        { id: "wq_nat_MoltingSeason", name: "Molting Season", price: 10000 },
        { id: "wq_nat_TwistedExtension", name: "Twisted Extension", price: 10000 },
        { id: "wq_nat_EveryAspectofaWarrior", name: "Every Aspect of a Warrior", price: 10000 },
        { id: "wq_nat_Night-WindLetter", name: "Night-Wind Letter", price: 10000 },
        { id: "wq_nat_VisionofAshenDesolation", name: "Vision of Ashen Desolation", price: 10000 },
        { id: "wq_nat_TheSpiritofAhKulbatil", name: "The Spirit of Ah K'ulbatil", price: 10000 },
        { id: "wq_nat_TheWayIntotheMountain", name: "The Way Into the Mountain", price: 10000 },
        { id: "wq_nat_TheAttackofthePurpleTepetlisaurus?", name: "The Attack of the... Purple Tepetlisaurus?", price: 10000 },
        { id: "wq_nat_PathtotheFlamingPeaks", name: "Path to the Flaming Peaks", price: 10000 },
        { id: "wq_nat_NahuatzinsLeap", name: "Nahuatzin's Leap", price: 10000 },
        { id: "wq_nat_ChronicaleroftheCrumblingCity", name: "Chronicler of the Crumbling City", price: 10000 },
        { id: "wq_nat_TheFrozenRekindlingLand", name: "The Frozen, Rekindling Land", price: 10000 },
        { id: "wq_nat_InvestigatorofAncientRuins", name: "Investigator of Ancient Ruins", price: 10000 },
        { id: "wq_nat_ABriefHistoryofRocks", name: "A Brief History of Rocks", price: 10000 },
        { id: "wq_nat_TheSealedSiteofSacrifice", name: "The Sealed Site of Sacrifice", price: 10000 },
        { id: "wq_nat_TheForsakenSeaofWisdom", name: "The Forsaken Sea of Wisdom", price: 10000 },
        { id: "wq_nat_IsIntensityReallytheKey?", name: "Is 'Intensity' Really the Key?", price: 10000 },
        { id: "wq_nat_TheEndoftheRoad", name: "The End of the Road", price: 10000 },
        { id: "wq_nat_AstheBurningSunSearsShadows", name: "As the Burning Sun Sears Shadows", price: 10000 },
        { id: "wq_nat_AnOmenofAnnihilationandtheFinalEntreaty", name: "An Omen of Annihilation and the Final Entreaty", price: 10000 },
        { id: "wq_nat_OnceTheSacredSeatofJudgement", name: "Once, the Sacred Seat of Judgement", price: 10000 },
        { id: "wq_nat_WhereOnceThereWasaCalculationArray", name: "Where Once There Was a Calculation Array", price: 10000 },
        { id: "wq_nat_InSearchofaHiddenHeart", name: "In Search of a Hidden Heart", price: 10000 },
        { id: "wq_nat_WhereOnceThereWereArmsAplenty", name: "Where Once There Were Arms Aplenty", price: 10000 },
        { id: "wq_nat_WhereOnceForceWasReversed", name: "Where Once Force Was Reversed", price: 10000 },
        { id: "wq_nat_SingHoFortheGreatnessofFat!", name: "Sing, Ho, For the Greatness of Fat!", price: 10000 },
        { id: "wq_nat_SomedayWeAllMustWalkAlone", name: "Someday, We All Must Walk Alone", price: 10000 },
    ]
};

// Data untuk hangout quests
const hangoutQuestsData = {
    Mondstadt: [
        { id: "cq_ina_Barbara1", name: "Barbara - Act 1: Wellspring of Healing", price: 10000 },
        { id: "cq_ina_Bennett1", name: "Bennett - Act 1: Fantastic Voyage", price: 10000 },
        { id: "cq_ina_Diona1", name: "Diona - Act 1: The Cat and the Cocktail", price: 10000 },
        { id: "cq_ina_Kaeya1", name: "Kaeya - Act 1: Shenanigans and Sweet Wine", price: 10000 },
        { id: "cq_ina_Noelle1", name: "Noelle - Act 1: Chivalric Training", price: 10000 },
        { id: "cq_ina_Noelle2", name: "Noelle - Act 2: Knightly Exam Prep", price: 10000 },
    ],
    Liyue: [
        { id: "cq_ina_Beidou1", name: "Beidou - Act 1: When the Crux Shines Bright", price: 10000 },
        { id: "cq_ina_Chongyun1", name: "Chongyun - Act 1: Signs of Evil", price: 10000 },
        { id: "cq_ina_Ningguang1", name: "Ningguang - Act 1: The Jade Chamber's Returning Guest", price: 10000 },
        { id: "cq_ina_Yun Jin1", name: "Yun Jin - Act 1: A Song That Knows Grace", price: 10000 },
        
    ],
    Inazuma: [
        { id: "cq_ina_Heizou1", name: "Heizou - Act 1: Trap 'Em by Storm", price: 10000 },
        { id: "cq_ina_Sayu1", name: "Sayu - Act 1: Yoohoo Art: Seichou no Jutsu", price: 10000 },
        { id: "cq_ina_Shinobu1", name: "Shinobu - Act 1: The Gang's Daily Deeds", price: 10000 },
        { id: "cq_ina_Thoma1", name: "Thoma - Act 1: A Housekeeper's Daily Chores", price: 10000 },
        { id: "cq_ina_Gorou1", name: "Gorou - Act 1: The Canine General's Special Operations", price: 10000 },
    ],

    Sumeru: [
        { id: "cq_ina_Kaveh1", name: "Kaveh - Act 1: The Pendulum of Weal and Woe", price: 10000 },
        { id: "cq_ina_Layla1", name: "Layla - Act 1: Ever Silent Stars", price: 10000 },
        { id: "cq_ina_Faruzan1", name: "Faruzan - Act 1: A Confounding Conundrum", price: 10000 },
    ],
    Fontaine: [
        { id: "cq_ina_Lynette1", name: "Lynette - Act 1: Checks and Cats", price: 10000 },
    ],
    
}


// Fungsi untuk mempopulasi daftar quest
function populateQuestsList(dataObject, idPrefix, listElementClass = 'selectable-sub-item', displayPriceInLabel = true) {
    for (const categoryKey in dataObject) {
        const targetElementId = `${idPrefix}-${categoryKey.toLowerCase().replace(/\s+/g, '-')}`;
        const questListULElement = document.getElementById(targetElementId);

        if (questListULElement) {
            questListULElement.innerHTML = ''; 
            dataObject[categoryKey].forEach(quest => {
                const listItem = document.createElement('li');
                const label = document.createElement('label');
                const checkbox = document.createElement('input');

                checkbox.type = 'checkbox';
                checkbox.className = listElementClass;
                checkbox.value = quest.name; 
                checkbox.dataset.price = quest.price; 
                checkbox.dataset.questId = quest.id; 

                label.appendChild(checkbox);
                let labelText = ` ${quest.name}`;
                if (displayPriceInLabel && quest.price !== undefined) { // Hanya tampilkan harga jika ada
                    labelText += ` (Rp ${quest.price.toLocaleString('id-ID')})`;
                }
                label.appendChild(document.createTextNode(labelText));
                listItem.appendChild(label);
                questListULElement.appendChild(listItem);
            });
        } else {
            // console.warn(`Elemen UL dengan ID '${targetElementId}' tidak ditemukan untuk kategori '${categoryKey}' pada prefix '${idPrefix}'.`);
        }
    }
}

// --- EVENT LISTENER DOM UTAMA ---
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM siap, menjalankan setup dari questgi.js...");

    // Panggil fungsi untuk mempopulasi quest jika elemen targetnya ada di halaman ini
    if (document.querySelector('[id^="character-quest-"]')) {
         populateQuestsList(trailblazeMissionsData, 'trailblaze-missions');
    }
    if (document.querySelector('[id^="archon-quest-"]')) {
         populateQuestsList(archonQuestsData, 'archon-quest');
    }
    if (document.querySelector('[id^="world-quest-"]')) { 
         populateQuestsList(worldQuestsData, 'world-quest');
    }
    if (document.querySelector('[id^="world-quest-"]')) { 
         populateQuestsList(hangoutQuestsData, 'hangout-quest');
    }
});


// JavaScript untuk Dropdown Kategori Quest Utama
document.addEventListener('DOMContentLoaded', function () {
    // Dropdown untuk Kategori Quest Utama (misalnya, ARCHON QUEST, WORLD QUEST)
    const mainCategoryToggles = document.querySelectorAll('.package-card > h2.quest-category-main-toggle');

    mainCategoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const packageCard = this.closest('.package-card'); // Parent .package-card
            const content = packageCard.querySelector('.quest-category-main-content');

            if (!content) {
                console.warn("Konten dropdown utama tidak ditemukan untuk toggle:", this);
                return;
            }

            packageCard.classList.toggle('open'); // Untuk styling ikon pada h2

            // Animasi slide
            if (content.style.display === "none" || content.classList.contains('collapsing')) {
                // Buka
                content.classList.remove('collapsing');
                content.style.display = 'block'; // Harus block dulu sebelum hitung height
                const height = content.scrollHeight;
                content.style.height = height + 'px';
                content.classList.add('show');

                // Hapus height style setelah animasi agar dinamis
                setTimeout(() => {
                    if (content.classList.contains('show')) {
                       // content.style.height = ''; // Opsional: hapus untuk tinggi dinamis
                    }
                }, 350); // Sesuaikan durasi transisi CSS
            } else {
                // Tutup
                content.style.height = content.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    content.classList.add('collapsing');
                    content.classList.remove('show');
                    content.style.height = '0px';
                });

                setTimeout(() => {
                    if (content.classList.contains('collapsing')) {
                        content.style.display = 'none';
                        content.classList.remove('collapsing');
                        content.style.height = '';
                    }
                }, 350);
            }
        });
    });

    // JavaScript untuk Sub-Dropdown (Region Quest) - JIKA BELUM ADA ATAU PERLU DISATUKAN
    // Jika Anda sudah memiliki JS untuk sub-dropdown, pastikan selectornya benar
    // dan tidak konflik. Kode di bawah adalah contoh jika Anda ingin menyatukannya.
    // Pastikan kelas 'quest-region-toggle' ada pada h3/h4 di dalam '.quest-category-main-content'
    const subRegionToggles = document.querySelectorAll('.quest-category-main-content .quest-region-toggle');

    subRegionToggles.forEach(subToggle => {
        subToggle.addEventListener('click', function () {
            const parentGroup = this.closest('.quest-region-group');
            const questList = parentGroup.querySelector('.quest-list');

            if (!questList) {
                console.warn("Sub-list quest tidak ditemukan untuk sub-toggle:", this);
                return;
            }

            parentGroup.classList.toggle('active'); // Untuk styling ikon pada h3/h4

            // Animasi untuk sub-list
            if (questList.style.display === "none" || questList.classList.contains('collapsing')) {
                questList.classList.remove('collapsing');
                questList.style.display = 'block';
                const height = questList.scrollHeight;
                questList.style.height = height + 'px';
                questList.classList.add('show');
                setTimeout(() => {
                    if (questList.classList.contains('show')) {
                       // questList.style.height = '';
                    }
                }, 350);
            } else {
                questList.style.height = questList.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    questList.classList.add('collapsing');
                    questList.classList.remove('show');
                    questList.style.height = '0px';
                });
                setTimeout(() => {
                    if (questList.classList.contains('collapsing')) {
                        questList.style.display = 'none';
                        questList.classList.remove('collapsing');
                        questList.style.height = '';
                    }
                }, 350);
            }
        });
    });
});
