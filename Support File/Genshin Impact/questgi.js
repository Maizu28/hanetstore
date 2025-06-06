// file: questgi.js

// Data untuk Character Quest
const characterQuestsData = {
    Mondstadt: [
        { id: "cq_mon_diluc1", name: "Diluc - Act 1: Darknight Hero's Alibi", price: 10000 },
        { id: "cq_mon_amber1", name: "Amber - Act 1: Wind, Courage and Wings", price: 10000 }, // ID disesuaikan
        { id: "cq_mon_venti1", name: "Venti - Act 1: Should You Be Trapped in a Windless Land", price: 10000 },
        { id: "cq_mon_jean1", name: "Jean - Act 1: Master's Day Off", price: 10000 },
        { id: "cq_mon_razor1", name: "Razor - Act 1: The Meaning of Lupical", price: 10000 },
        { id: "cq_mon_mona1", name: "Mona - Act 1: Beyond This World's Stars", price: 10000 },
        { id: "cq_mon_lisa1", name: "Lisa - Act 1: Troublesome Work", price: 10000 },
        { id: "cq_mon_klee1", name: "Klee - Act 1: True Treasure", price: 10000 },
        { id: "cq_mon_kaeya1", name: "Kaeya - Act 1: Secret Pirate Treasure", price: 10000 },
        { id: "cq_mon_albedo1", name: "Albedo - Act 1: Traveler Observation Report", price: 10000 },
        { id: "cq_mon_eula1", name: "Eula - Act 1: The Spindrift Shall Never Return to the Sea", price: 10000 },
    ],
    Liyue: [
        { id: "cq_liy_xingqiu1", name: "Xingqiu - Act 1: Bookworm Swordsman", price: 10000 },
        { id: "cq_liy_xiangling1", name: "Xiangling - Act 1: Mondstadt Gastronomy Trip", price: 10000 },
        { id: "cq_liy_zhongli1", name: "Zhongli - Act 1: Sal Flore", price: 10000 },
        { id: "cq_liy_zhongli2", name: "Zhongli - Act 2: No Mere Stone", price: 10000 }, // Nama diperbaiki
        { id: "cq_liy_tartaglia1", name: "Tartaglia - Act 1: Mighty Cyclops' Adventure", price: 10000 },
        { id: "cq_liy_ganyu1", name: "Ganyu - Act 1: Sea of Clouds, Sea of People", price: 10000 },
        { id: "cq_liy_hutao1", name: "Hu Tao - Act 1: Yet the Butterfly Flutters Away", price: 10000 }, // Nama diperbaiki
        { id: "cq_liy_xiao1", name: "Xiao - Act 1: Butterfly's Dream", price: 10000 },
        { id: "cq_liy_yelan1", name: "Yelan - Act 1: Calculated Gambit", price: 10000 },
        { id: "cq_liy_xianyun1", name: "Xianyun - Act 1: A Thousand Moonlit Miles", price: 10000 },
        { id: "cq_liy_Baizhu1", name: "Baizhu - Act 1: The Heart of Healing", price: 10000 }, 
    ],
    Inazuma: [
        { id: "cq_ina_kazuha1", name: "Kazuha - Act 1: A Strange and Friendless Road", price: 10000 },
        { id: "cq_ina_yoimiya1", name: "Yoimiya - Act 1: Dreamlike Timelessness", price: 10000 },
        { id: "cq_ina_yoimiya2", name: "Yoimiya - Act 2: Star-Pickers' Passage", price: 10000 },
        { id: "cq_ina_ayaka1", name: "Ayaka - Act 1: The Whispers of the Crane and the White Rabbit", price: 10000 },
        { id: "cq_ina_kokomi1", name: "Kokomi - Act 1: Warriors' Dreams Like Spring Grass Renewing", price: 10000 },
        { id: "cq_ina_raiden1", name: "Raiden Shogun - Act 1: Reflections of Mortality", price: 10000 }, // Nama disesuaikan
        { id: "cq_ina_raiden2", name: "Raiden Shogun - Act 2: Transient Dreams", price: 10000 }, // Nama disesuaikan
        { id: "cq_ina_itto1", name: "Itto - Act 1: Rise Up, Golden Soul", price: 10000 },
        { id: "cq_ina_yaemiko1", name: "Yae Miko - Act 1: The Great Narukami Offering", price: 10000 },
        { id: "cq_ina_ayato1", name: "Ayato - Act 1: The Firmiana Leaf Falls", price: 10000 },
        { id: "cq_ina_chiori1", name: "Chiori - Act 1: When They Talk About Tonight", price: 10000 },
        { id: "cq_ina_Mizuki1", name: "Mizuki - Act 1: Dream Eater's Melancholia", price: 10000 }, // Mizuki bukan karakter resmi, mungkin placeholder?
        
    ],
    Sumeru: [
        { id: "cq_sum_tighnari1", name: "Tighnari - Act 1: The Unanswerable Problems", price: 10000 },
        { id: "cq_sum_cyno1", name: "Cyno - Act 1: Sands of Solitude", price: 10000 },
        { id: "cq_sum_cyno2", name: "Cyno - Act 2: Oathkeeper", price: 10000 },
        { id: "cq_sum_nilou1", name: "Nilou - Act 1: To the Wise", price: 10000 },
        { id: "cq_sum_nahida1", name: "Nahida - Act 1: Lingering Warmth", price: 10000 },
        { id: "cq_sum_nahida2", name: "Nahida - Act 2: Homecoming", price: 10000 },
        { id: "cq_sum_alhaitham1", name: "Alhaitham - Act 1: Illusions of the Mob", price: 10000 },
        { id: "cq_sum_dehya1", name: "Dehya - Act 1: Lionsblood", price: 10000 },
    ],
    Fontaine: [
        { id: "cq_fon_lyney1", name: "Lyney - Act 1: The Forgotten Thief", price: 10000 },
        { id: "cq_fon_wriothesley1", name: "Wriothesley - Act 1: Reborn in the Land of Grievances", price: 10000 },
        { id: "cq_fon_neuvillette1", name: "Neuvillette - Act 1: The Remains of the Past Day", price: 10000 },
        { id: "cq_fon_furina1", name: "Furina - Act 1: The Little Oceanid", price: 10000 },
        { id: "cq_fon_navia1", name: "Navia - Act 1: Braving the Tides Together", price: 10000 },
        { id: "cq_fon_arlecchino1", name: "Arlecchino - Act 1: When the Hearth-Flame Goes Out", price: 10000 },
        { id: "cq_fon_clorinde1", name: "Clorinde - Act 1: Silent Night", price: 10000 }, // ID disesuaikan
        { id: "cq_fon_sigewinne1", name: "Sigewinne - Act 1: The Warmth of Lies", price: 10000 },
        { id: "cq_fon_emilie1", name: "Emilie - Act 1: Floral Debt, Blood Due", price: 10000 },
        { id: "cq_fon_escoffier1", name: "Escoffier - Act 1: Treasured Above All", price: 10000 }, // Escoffier bukan karakter playable
    ],
    Natlan: [
        { id: "cq_nat_mualani1", name: "Mualani - Act 1: Journey to the Mysterious Island", price: 10000 },
        { id: "cq_nat_kinich1", name: "Kinich - Act 1: Kinich's Deal", price: 10000 },
        { id: "cq_nat_xilonen1", name: "Xilonen - Act 1: Melodious Chant", price: 10000 },
        { id: "cq_nat_chasca1", name: "Chasca - Act 1: Guns and Wings", price: 10000 },
        { id: "cq_nat_citlali1", name: "Citlali - Act 1: The Truth of the Battle of Seven Colors", price: 10000 },
        { id: "cq_nat_mavuika1", name: "Mavuika - Act 1: As the Blazing Sun", price: 10000 }, // Nama diperbaiki
        { id: "cq_nat_varesa1", name: "Varesa - Act 1: Mushroom Realm's Mystery", price: 10000 },
        { id: "cq_nat_skirk1", name: "Skirk - Comingsoon", price: 10000 }, // Nama diperbaiki
    ],
};

// Data untuk Archon Quest
const archonQuestsData = {
    Mondstadt: [
        { id: "aq_mon_pro_act1", name: "Prologue - Act 1: The Outlander Who Caught the Wind", price: 15000 },
        { id: "aq_mon_pro_act2", name: "Prologue - Act 2: For a Tomorrow Without Tears", price: 15000 },
        { id: "aq_mon_pro_act3", name: "Prologue - Act 3: Song of the Dragon and Freedom", price: 15000 },
    ],
    Liyue: [
        { id: "aq_liy_cha1_act1", name: "Chapter I - Act 1: Of the Land Amidst Monoliths", price: 15000 },
        { id: "aq_liy_cha1_act2", name: "Chapter I - Act 2: Farewell, Archaic Lord", price: 15000 },
        { id: "aq_liy_cha1_act3", name: "Chapter I - Act 3: A New Star Approaches", price: 15000 },
        { id: "aq_liy_cha1_act4", name: "Chapter I - Act 4: We Will be Reunited", price: 15000 }, 
    ],
    Inazuma: [
        { id: "aq_ina_cha2_act0", name: "Chapter II - Prologue: Autumn Winds, Scarlet Leaves", price: 15000 },
        { id: "aq_ina_cha2_act1", name: "Chapter II - Act 1: The Immovable God and the Eternal Euthymia", price: 15000 },
        { id: "aq_ina_cha2_act2", name: "Chapter II - Act 2: Stillness, the Sublimation of Shadow", price: 15000 },
        { id: "aq_ina_cha2_act3", name: "Chapter II - Act 3: Omnipresence Over Mortals", price: 15000 },
        { id: "aq_ina_cha2_act4", name: "Chapter II - Act 4: Requiem of the Echoing Depths", price: 15000 }, 
    ],
    Sumeru: [
        { id: "aq_sum_cha3_act1", name: "Chapter III - Act 1: Through Mists of Smoke and Forests Dark", price: 15000 },
        { id: "aq_sum_cha3_act2", name: "Chapter III - Act 2: The Morn a Thousand Roses Brings", price: 15000 },
        { id: "aq_sum_cha3_act3", name: "Chapter III - Act 3: Dreams, Emptiness, Deception", price: 15000 },
        { id: "aq_sum_cha3_act4", name: "Chapter III - Act 4: King Deshret and the Three Magi", price: 15000 },
        { id: "aq_sum_cha3_act5", name: "Chapter III - Act 5: Akasha Pulses, the Kalpa Flame Rises", price: 15000 },
        { id: "aq_sum_cha3_act6", name: "Chapter III - Act 6: Caribert", price: 15000 }, 
    ],
    Fontaine: [
        { id: "aq_fon_cha4_act1", name: "Chapter IV - Act 1: Prelude of Blancheur and Noirceur", price: 15000 },
        { id: "aq_fon_cha4_act2", name: "Chapter IV - Act 2: As Light Rain Falls Without Reason", price: 15000 },
        { id: "aq_fon_cha4_act3", name: "Chapter IV - Act 3: To the Stars Shining in the Depths", price: 15000 },
        { id: "aq_fon_cha4_act4", name: "Chapter IV - Act 4: Cataclysm's Quickening", price: 15000 },
        { id: "aq_fon_cha4_act5", name: "Chapter IV - Act 5: Masquerade of the Guilty", price: 15000 },
        { id: "aq_fon_cha4_act6", name: "Chapter IV - Act 6: Bedtime", price: 15000 },
    ],
    Natlan: [ 
        { id: "aq_nat_cha5_act1", name: "Chapter V - Act 1: Flowers Resplendent on the Sun-Scorched Sojourn", price: 15000 },
        { id: "aq_nat_cha5_act2", name: "Chapter V - Act 2: Black Stone Under a White Stone", price: 15000 },
        { id: "aq_nat_cha5_act3", name: "Chapter V - Act 3: Beyond the Smoke and Mirrors", price: 15000 },
        { id: "aq_nat_cha5_act4", name: "Chapter V - Act 4: The Rainbow Destined to Burn", price: 15000 }, // Tidak ada resmi
        { id: "aq_nat_cha5_int1", name: "Chapter V - Interlude: All Fires Fuel the Flame", price: 15000 },
        { id: "aq_nat_cha5_act5", name: "Chapter V - Act 5: Incandescent Ode of Resurrection", price: 15000 },
     ],
    InterludeChapter: [ // Key diubah agar lebih mudah di-parse
        { id: "aq_int_liyue_crane", name: "Interlude Chapter - Act 1: The Crane Returns on the Wind (Liyue)", price: 15000 },
        { id: "aq_int_chasm_perilous", name: "Interlude Chapter - Act 2: Perilous Trail (The Chasm)", price: 15000 },
        { id: "aq_int_sumeru_inversion", name: "Interlude Chapter - Act 3: Inversion of Genesis (Sumeru)", price: 15000 },
        { id: "aq_int_mondstadt_windblume", name: "Interlude Chapter - Act 4 Paralogism (Mondstadt)", price: 15000 }, 
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
         populateQuestsList(characterQuestsData, 'character-quest');
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
