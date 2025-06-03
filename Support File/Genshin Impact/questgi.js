// Data quest karakter
const characterQuestsData = {
    Mondstadt: [
        { id: "cq_mon_diluc1", name: "Diluc - Act 1: Darknight Hero's Alibi", price: 10000 },
        { id: "cq_mon_Amber1", name: "Amber - Act 1: Wind, Courage and Wings", price: 10000 },
        { id: "cq_mon_Venti1", name: "Venti - Act 1: Should You Be Trapped in a Windless Land", price: 10000 },
        { id: "cq_mon_Jean1", name: "Jean - Act 1: Master's Day Off", price: 10000 },
        { id: "cq_mon_Razor1", name: "Razor - Act 1: The Meaning of Lupical", price: 10000 },
        { id: "cq_mon_Mona1", name: "Mona - Act 1: Beyond This World's Stars", price: 10000 },
        { id: "cq_mon_Lisa1", name: "Lisa - Act 1: Troublesome Work", price: 10000 },
        { id: "cq_mon_Klee1", name: "Klee - Act 1: True Treasure", price: 10000 },
        { id: "cq_mon_Kaeya1", name: "Kaeya - Act 1: Secret Pirate Treasure", price: 10000 },
        { id: "cq_mon_Albedo1", name: "Albedo - Act 1: Traveler Observation Report", price: 10000 },
        { id: "cq_mon_Eula1", name: "Eula - Act 1: The Spindrift Shall Never Return to the Sea", price: 10000 },
        
    ],
    Liyue: [
        { id: "cq_liy_xingqiu1", name: "Xingqiu - Act 1: Bookworm Swordsman", price: 10000 },
        { id: "cq_liy_xiangling1", name: "Xiangling - Act 1: Mondstadt Gastronomy Trip", price: 10000 },
        { id: "cq_liy_Zhongli1", name: "Zhongli - Act 1: Sal Flore", price: 10000 },
        { id: "cq_liy_Zhongli2", name: "Zhongli - Act 1: Act 2: No Mere Stone", price: 10000 },
        { id: "cq_liy_Tartaglia1", name: "Tartaglia - Act 1: Mighty Cyclops' Adventure", price: 10000 },
        { id: "cq_liy_Ganyu1", name: "Ganyu - Act 1: Sea of Clouds, Sea of People", price: 10000 },
        { id: "cq_liy_HuTao1", name: "Hu Tao - Act 1: Act 1: Yet the Butterfly Flutters Away", price: 10000 },
        { id: "cq_liy_Xiao1", name: "Xiao - Act 1: Butterfly's Dream", price: 10000 },
        { id: "cq_liy_Yelan1", name: "Yelan - Act 1: Calculated Gambit", price: 10000 },
        { id: "cq_liy_Xianyun1", name: "Xianyun - Act 1: A Thousand Moonlit Miles", price: 10000 },
    ],

    Inazuma: [
        { id: "cq_ina_Kazuha1", name: "Kazuha - Act 1: A Strange and Friendless Road", price: 10000 },
        { id: "cq_ina_yoimiya1", name: "Yoimiya - Act 1: Dreamlike Timelessness", price: 10000 },
        { id: "cq_ina_yoimiya2", name: "Yoimiya - Act 2: Star-Pickers' Passage", price: 10000 },
        { id: "cq_ina_Ayaka1", name: "Ayaka - Act 1: The Whispers of the Crane and the White Rabbit", price: 10000 },
        { id: "cq_ina_Kokomi1", name: "Kokomi - Act 1: Warriors' Dreams Like Spring Grass Renewing", price: 10000 },
        { id: "cq_ina_Raiden1", name: "Raiden - Act 1: Reflections of Mortality", price: 10000 },
        { id: "cq_ina_Raiden2", name: "Raiden - Act 2: Transient Dreams", price: 10000 },
        { id: "cq_ina_Itto1", name: "Itto - Act 1: Rise Up, Golden Soul", price: 10000 },
        { id: "cq_ina_YaeMiko1", name: "Yae Miko - Act 1: The Great Narukami Offering", price: 10000 },
        { id: "cq_ina_Ayato1", name: "Ayato - Act 1: The Firmiana Leaf Falls", price: 10000 },
        { id: "cq_ina_Chiori1", name: "Chiori - Act 1: When They Talk About Tonight", price: 10000 },
        { id: "cq_ina_Mizuki1", name: "Mizuki - Act 1: Dream Eater's Melancholia", price: 10000 },
        { id: "cq_ina_Baizhu1", name: "Baizhu - Act 1: The Heart of Healing", price: 10000 },
    ],

    Sumeru: [
        { id: "cq_sum_Tighnari1", name: "Tighnari - Act 1: The Unanswerable Problems", price: 10000 },
        { id: "cq_sum_Cyno1", name: "Cyno - Act 1: Sands of Solitude", price: 10000 },
        { id: "cq_sum_Cyno2", name: "Cyno - Act 2: Oathkeeper", price: 10000 },
        { id: "cq_sum_Nilou1", name: "Nilou - Act 1: To the Wise", price: 10000 },
        { id: "cq_sum_Nahida1", name: "Nahida - Act 1: Lingering Warmth", price: 10000 },
        { id: "cq_sum_Nahida2", name: "Nahida - Act 2: Homecoming", price: 10000 },
        { id: "cq_sum_Alhaitham1", name: "Alhaitham - Act 1: Illusions of the Mob", price: 10000 },
        { id: "cq_sum_Dehya1", name: "Dehya - Act 1: Lionsblood", price: 10000 },
    ],
    
    Fontaine: [
        { id: "cq_fon_Lyney1", name: "Lyney - Act 1: The Forgotten Thief", price: 10000 },
        { id: "cq_fon_Wriothesley1", name: "Wriothesley - Act 1: Reborn in the Land of Grievances", price: 10000 },
        { id: "cq_fon_Neuvillette1", name: "Neuvillette - Act 1: The Remains of the Past Day", price: 10000 },
        { id: "cq_fon_Furina1", name: "Furina - Act 1: The Little Oceanid", price: 10000 },
        { id: "cq_fon_Navia1", name: "Navia - Act 1: Braving the Tides Together", price: 10000 },
        { id: "cq_fon_Arlecchino1", name: "Arlecchino - Act 1: When the Hearth-Flame Goes Out", price: 10000 },
        { id: "cq_fon_Clorinde", name: "Clorinde - Act 1: Silent Night", price: 10000 },
        { id: "cq_fon_Sigewinne1", name: "Sigewinne - Act 1: The Warmth of Lies", price: 10000 },
        { id: "cq_fon_Emilie1", name: "Emilie - Act 1: Floral Debt, Blood Due", price: 10000 },
        { id: "cq_fon_Escoffier1", name: "Escoffier - Act 1: Treasured Above All", price: 10000 },
    ],

    Natlan: [
        { id: "cq_nat_Mualani1", name: "Mualani - Act 1: Journey to the Mysterious Island", price: 10000 },
        { id: "cq_nat_Kinich1", name: "Kinich - Act 1: Kinich's Deal", price: 10000 },
        { id: "cq_nat_Xilonen1", name: "Xilonen - Act 1: Melodious Chant", price: 10000 },
        { id: "cq_nat_Chasca1", name: "Chasca - Act 1: Guns and Wings", price: 10000 },
        { id: "cq_nat_Citlali1", name: "Citlali - Act 1: The Truth of the Battle of Seven Colors", price: 10000 },
        { id: "cq_nat_Mavuika1", name: "Mavuika - Act 1: Act 1: As the Blazing Sun", price: 10000 },
        { id: "cq_nat_Varesa1", name: "Varesa - Act 1: Mushroom Realm's Mystery", price: 10000 },
        { id: "cq_nat_Skirk1", name: "Skirik - Comingsoon", price: 10000 },
    ],
};

// Data Archon Quests
const archonQuestsData = {
    Mondstadt: [
        { id: "aq_mon_pro_cha_act1", name: "Prologue Chapter - Act 1 Subquests", price: 15000 },
        { id: "aq_mon_pro_cha_act2", name: "Prologue Chapter - Act 2 Subquests", price: 15000 },
        { id: "aq_mon_pro_cha_act3", name: "Prologue Chapter - Act 3 Subquests", price: 15000 },
    ],

    Liyue: [
        { id: "aq_liy_cha1_act1", name: "Chapter 1 - Act 1 Subquests", price: 15000 },
        { id: "aq_liy_cha1_act2", name: "Chapter 1 - Act 2 Subquests", price: 15000 },
        { id: "aq_liy_cha1_act3", name: "Chapter 1 - Act 3 Subquests", price: 15000 },
        { id: "aq_liy_cha1_act4", name: "Chapter 1 - Act 4 Subquests", price: 15000 },
    ],

    Inazuma: [
        { id: "aq_ina_cha2_act1", name: "Chapter 2 - Act 1 Subquests", price: 15000 },
        { id: "aq_ina_cha2_act2", name: "Chapter 2 - Act 2 Subquests", price: 15000 },
        { id: "aq_ina_cha2_act3", name: "Chapter 2 - Act 3 Subquests", price: 15000 },
        { id: "aq_ina_cha2_act4", name: "Chapter 2 - Act 4 Subquests", price: 15000 },
    ],

    Sumeru: [
        { id: "aq_sum_cha3_act1", name: "Chapter 3 - Act 1 Subquests", price: 15000 },
        { id: "aq_sum_cha3_act2", name: "Chapter 3 - Act 2 Subquests", price: 15000 },
        { id: "aq_sum_cha3_act3", name: "Chapter 3 - Act 3 Subquests", price: 15000 },
        { id: "aq_sum_cha3_act4", name: "Chapter 3 - Act 4 Subquests", price: 15000 },
        { id: "aq_sum_cha3_act5", name: "Chapter 3 - Act 5 Subquests", price: 15000 },
        { id: "aq_sum_cha3_act6", name: "Chapter 3 - Act 6 Subquests", price: 15000 },
    ],

    Fontaine: [
        { id: "aq_fon_cha4_act1", name: "Chapter 4 - Act 1 Subquests", price: 15000 },
        { id: "aq_fon_cha4_act2", name: "Chapter 4 - Act 2 Subquests", price: 15000 },
        { id: "aq_fon_cha4_act3", name: "Chapter 4 - Act 3 Subquests", price: 15000 },
        { id: "aq_fon_cha4_act4", name: "Chapter 4 - Act 4 Subquests", price: 15000 },
        { id: "aq_fon_cha4_act5", name: "Chapter 4 - Act 5 Subquests", price: 15000 },
        { id: "aq_fon_cha4_act6", name: "Chapter 4 - Act 6 Subquests", price: 15000 },
    ],

    Natlan: [
        { id: "aq_nat_cha5_act1", name: "Chapter 5 - Act 1 Subquests", price: 15000 },
        { id: "aq_nat_cha5_act2", name: "Chapter 5 - Act 2 Subquests", price: 15000 },
        { id: "aq_nat_cha5_act3", name: "Chapter 5 - Act 3 Subquests", price: 15000 },
        { id: "aq_nat_cha5_act4", name: "Chapter 5 - Act 4 Subquests", price: 15000 },
        { id: "aq_nat_cha5_int1", name: "Chapter 5 - Interlude Subquests", price: 15000 },
        { id: "aq_nat_cha5_act5", name: "Chapter 5 - Act 5 Subquests", price: 15000 },
    ],

    InterludeChapter: [
        { id: "aq_int_cha1_act1", name: "Interlude Chapter (Liyue) - Act 1 Subquests ", price: 15000 },
        { id: "aq_int_cha1_act2", name: "Interlude Chapter (The Chasm) - Act 2 Subquests", price: 15000 },
        { id: "aq_int_cha1_act3", name: "Interlude Chapter (Sumeru) - Act 3 Subquests", price: 15000 },
        { id: "aq_int_cha1_act4", name: "Interlude Chapter (Mondstads) - Act 4 Subquests ", price: 15000 },
    ],
}

//Data World Quests
const worldQuestsData = {
    Mondstadt: [
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Guest from Liyue", name: "A Guest from Liyue", price: 15000 },
        { id: "wq_mon_world_A Land Entombed", name: "A Land Entombed", price: 15000 },
        { id: "wq_mon_world_After the Storm", name: "After the Storm", price: 15000 },
        { id: "wq_mon_world_Ah, Fresh Meat!", name: "Ah, Fresh Meat!", price: 15000 },
        { id: "wq_mon_world_An Ode to Yonder City", name: "An Ode to Yonder City", price: 15000 },
        { id: "wq_mon_world_Battlefield of Dice, Cats, and Cards", name: "Battlefield of Dice, Cats, and Cards", price: 15000 },
        { id: "wq_mon_world_Bough Keeper: Dainsleif", name: "Bough Keeper: Dainsleif", price: 15000 },
        { id: "wq_mon_world_Break the Sword Cemetery Seal", name: "Break the Sword Cemetery Seal", price: 15000 },
        { id: "wq_mon_world_Busy Adventurers' Guild", name: "Busy Adventurers' Guild", price: 15000 },
        { id: "wq_mon_world_Cleanup at Dawn", name: "Cleanup at Dawn", price: 15000 },
        { id: "wq_mon_world_Collector of Anemo Sigils", name: "Collector of Anemo Sigils", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },
        { id: "wq_mon_world_A Fine Opportunity?", name: "A Fine Opportunity?", price: 15000 },

        
        
    ],
}

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
                if (displayPriceInLabel) {
                    labelText += ` (Rp ${quest.price.toLocaleString('id-ID')})`;
                }
                label.appendChild(document.createTextNode(labelText));
                listItem.appendChild(label);
                questListULElement.appendChild(listItem);
            });
        } else {
            // console.warn(`Elemen UL dengan ID '${targetElementId}' tidak ditemukan untuk kategori '${categoryKey}'.`);
        }
    }
}


// --- EVENT LISTENER DOM UTAMA ---
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM siap, menjalankan setup dari list.js...");
    // Panggil fungsi untuk mempopulasi quest jika elemennya ada
    // Cek keberadaan salah satu elemen target untuk masing-masing jenis quest
    if (document.querySelector('[id^="character-quest-"]')) {
         populateQuestsList(characterQuestsData, 'character-quest');
    }
    if (document.querySelector('[id^="archon-quest-"]')) {
         populateQuestsList(archonQuestsData, 'archon-quest');
    }
    if (document.querySelector('[id^="world-quest-"]')) {
         populateQuestsList(worldQuestsData, 'world-quest');
    }
    // Tambahkan pemanggilan untuk jenis quest lain jika ada (World Quest, dll.)

    // ... (Sisa kode DOMContentLoaded Anda dari file list.js sebelumnya:
    //      - Badge Promo
    //      - Listener tombol .add-to-cart generik
    //      - Listener Search Input (Enter & isi dari URL)
    //      - Setup UI Auth Header (jika diaktifkan dan auth diimpor)
    //      - Listener Navigasi Slide-in (jika ada)
    // ) ...
});

// === Jadikan Fungsi yang Dipanggil dari HTML Global ===
// (Fungsi addToCart, addSelectedItemsToCart, orderNow, handleSearch, dll. Anda yang sudah ada)
// Pastikan fungsi-fungsi ini didefinisikan di luar DOMContentLoaded agar bisa diakses global
// atau tempelkan ke window jika file ini adalah module.

// Contoh (asumsi fungsi ini ada di file ini atau diimpor dan perlu diekspos):
// if (typeof addSelectedItemsToCart === 'function') window.addSelectedItemsToCart = addSelectedItemsToCart;
// if (typeof orderNow === 'function') window.orderNow = orderNow;
// if (typeof handleSearch === 'function') window.handleSearch = handleSearch;
