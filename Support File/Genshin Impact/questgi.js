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
        { id: "aq_liy_cha1_act4", name: "Chapter 1 - Act 4: We Will be Reunited", price: 15000 }, 
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
    ]
};

// Fungsi generik untuk mempopulasi daftar quest dari objek data
function populateQuestsList(dataObject, idPrefix, listElementClass = 'selectable-sub-item', displayPriceInLabel = true) {
    for (const categoryKey in dataObject) {
        const targetElementId = `${idPrefix}-${categoryKey.toLowerCase().replace(/\s+/g, '-')}`;
        const questListULElement = document.getElementById(targetElementId);

        if (questListULElement) {
            questListULElement.innerHTML = ''; // Kosongkan list sebelum mengisi
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
    if (document.querySelector('[id^="world-quest-"]')) { // Pastikan HTML Anda memiliki ID seperti world-quest-mondstadt, dll.
         populateQuestsList(worldQuestsData, 'world-quest');
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
