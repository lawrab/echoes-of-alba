/**
 * THE SEAL WIFE OF SKYE - Complete Story Data
 *
 * Structure: Each beat has:
 * - id: unique identifier
 * - background: image key
 * - text: story text
 * - choices: array of {text, nextId} (if not ending)
 * - isEnding: true for final beats
 * - endingTitle: title for ending screen
 */

const SELKIE_STORY = {
    // === START ===
    start: {
        id: 'start',
        background: 'beach-day',
        text: `The morning sun sparkles on the waves as you walk along the shore of Skye, searching for interesting shells and sea glass. Your footsteps leave temporary marks in the wet sand, soon to be erased by the tide.\n\nAs you round a corner near the sea caves, something catches your eye—a shimmer of silver tucked between two rocks. You approach carefully and discover a beautiful skin, soft as silk and patterned like a seal's coat. It seems to glow with an inner light.\n\nYou've heard the old stories about Selkie folk—seal people who can shed their skins to walk on land. The tales say their magic is powerful, and their skins are their most precious possessions.`,
        choices: [
            { text: 'Hide the skin and wait to see who comes looking for it', nextId: 'path_hide' },
            { text: 'Try the seal skin on yourself', nextId: 'path_transform' },
            { text: 'Leave it here and tell the village about your discovery', nextId: 'path_warning' }
        ]
    },

    // === PATH 1: THE HIDDEN SKIN ===
    path_hide: {
        id: 'path_hide',
        background: 'cave-interior',
        text: `You carefully fold the seal skin and tuck it into a dry crevice deeper in the cave, marking the spot with a small cairn of pebbles. Then you settle behind a large rock to watch and wait.\n\nThe day grows warmer. Seabirds call overhead. The tide begins to turn.\n\nJust as you're wondering if you should leave, a young woman appears at the cave entrance. She has long dark hair tangled with seaweed, and her eyes are the shifting gray-green of deep water. She moves with unusual grace, searching frantically among the rocks.\n\n"Where is it? Where is it?" she murmurs, her voice like waves on sand. "I left it right here..."`,
        choices: [
            { text: 'Reveal yourself and tell her you have her skin', nextId: 'choice_reveal_immediately' },
            { text: 'Stay hidden and watch what she does', nextId: 'choice_watch_longer' }
        ]
    },

    choice_reveal_immediately: {
        id: 'choice_reveal_immediately',
        background: 'cave-interior',
        text: `"Are you looking for this?" you ask gently, stepping out from your hiding place with the seal skin held respectfully in your arms.\n\nThe woman spins to face you, her eyes wide with hope and fear. When she sees her skin, tears of relief stream down her face.\n\n"You found it! Oh, thank the tides—I thought I'd lost it forever!" She reaches out with trembling hands. "You don't know what this means. Without my skin, I cannot return to the sea. I would be trapped here, cut off from my family, my home, my true self."`,
        choices: [
            { text: 'Return the skin immediately, no questions asked', nextId: 'ending_grateful_gift' },
            { text: 'Offer to return it, but ask to hear her story first', nextId: 'shared_path_moira' }
        ]
    },

    choice_watch_longer: {
        id: 'choice_watch_longer',
        background: 'cave-interior',
        text: `You remain hidden, watching as the woman's search grows more desperate. She checks every crack and crevice, her movements becoming frantic. Finally, she sinks down on a rock, her shoulders shaking with silent sobs.\n\n"Lost," she whispers to the waves. "My skin is lost. I'll never see my family again, never swim the deep currents, never feel the ocean's embrace..." Her grief is so profound it makes your own chest ache.\n\nYou can't bear to watch her suffer any longer. You step out from behind the rock.\n\n"Excuse me," you say softly. "I think I found what you're looking for."`,
        choices: [
            { text: 'Give her the skin and listen to her story', nextId: 'shared_path_moira' }
        ]
    },

    // === PATH 2: THE TRANSFORMATION ===
    path_transform: {
        id: 'path_transform',
        background: 'beach-day',
        text: `Curiosity overwhelms caution. The skin is so beautiful, so strange—you have to know what it feels like. You drape it over your shoulders like a cloak.\n\nThe change is instant and startling. The world shifts. Colors become sharper, sounds clearer. You feel your body reshaping, becoming sleek and streamlined. Your arms fold into flippers, your legs fuse together. Whiskers sprout from your face, sensitive to every current in the air.\n\nYou've become a seal! And somehow, it feels as natural as breathing.\n\nThe ocean calls to you with irresistible urgency. You dive into the waves, and suddenly you're not just in the water—you ARE the water, flowing, diving, spinning with joy. A pod of seals surfaces nearby, their dark eyes curious and welcoming.`,
        choices: [
            { text: 'Swim deeper with the seal pod', nextId: 'path_deep_swim' },
            { text: 'Stay near the shore, nervous about going too far', nextId: 'path_return_shore' }
        ]
    },

    path_deep_swim: {
        id: 'path_deep_swim',
        background: 'underwater',
        text: `The seals chitter and bark in greeting, and somehow you understand them. They circle you playfully, then dive deep, inviting you to follow.\n\nYou plunge into the blue depths. The underwater world is breathtaking—forests of kelp sway in gentle currents, fish shimmer in schools, and far below, you see something impossible: structures of coral and pearl that could only be buildings.\n\nThe seals lead you down to the coral castle. As you approach, some of them transform, shedding their seal forms to reveal the Selkie people beneath. They smile and welcome you into their home.\n\nA kind woman with the same gray-green eyes you saw in the cave approaches. "You wear my daughter's skin," she says, but her tone is warm, not angry. "She sheds it sometimes to walk on land. Come, young one. Let me show you the wonders of our world."`,
        choices: [
            { text: 'Explore the underwater palace', nextId: 'ending_underwater_wonders' }
        ]
    },

    path_return_shore: {
        id: 'path_return_shore',
        background: 'beach-day',
        text: `The deep water intimidates you. You're still getting used to this new body, and the thought of going too far from shore makes you anxious. You paddle in the shallows instead, enjoying the sensation of water sliding over your seal form.\n\nAfter a while, you swim back to the beach. The moment you haul yourself onto the sand, you feel the skin loosening. With a thought, you shed it, returning to your human form. The transformation leaves you breathless and amazed.\n\nYou carefully fold the seal skin, and as you do, you notice someone watching from the cave entrance—the same young woman you would have met if you'd hidden the skin. She approaches slowly, her expression a mixture of relief and uncertainty.`,
        choices: [
            { text: 'Apologize and explain what happened', nextId: 'shared_path_moira' }
        ]
    },

    // === PATH 3: THE WARNING ===
    path_warning: {
        id: 'path_warning',
        background: 'village',
        text: `You decide this discovery is too important to keep to yourself. You leave the seal skin where you found it and hurry to the village, finding old Calum, the village elder, outside his cottage.\n\n"A Selkie skin, you say?" Calum's weathered face grows serious. "Aye, that's powerful magic, child. The Selkie folk are neither good nor evil, but their magic is not to be trifled with. Many a fisherman has been enchanted by their songs, and many a heart broken by their departures."\n\nHe tells you tales of Selkies—some beautiful, some sad. Stories of seal-people who married humans but always returned to the sea, leaving sorrow behind. Stories of stolen skins and trapped Selkies who withered away from longing.\n\n"The wisest course," Calum says, "is to leave such things alone. Let the magic folk keep their secrets."`,
        choices: [
            { text: 'Take his advice and stay away from the caves', nextId: 'ending_cautious_path' },
            { text: 'Thank him for the warning, but return to investigate', nextId: 'path_return_investigate' }
        ]
    },

    path_return_investigate: {
        id: 'path_return_investigate',
        background: 'cave-interior',
        text: `You thank Calum for his wisdom, but curiosity pulls you back to the shore. You need to know more. You need to understand.\n\nWhen you return to the cave, the seal skin is still there, gleaming in the shadows. But now you're not alone. A young woman stands at the cave entrance, silhouetted against the bright sky. As your eyes adjust, you see her clearly—dark hair, gray-green eyes, moving with the grace of ocean waves.\n\nShe sees the skin at the same moment you do. Her face lights with relief and joy.`,
        choices: [
            { text: 'Let her take her skin and introduce yourself', nextId: 'shared_path_moira' }
        ]
    },

    // === SHARED PATH A: MEETING MOIRA ===
    shared_path_moira: {
        id: 'shared_path_moira',
        background: 'moonlit-shore',
        text: `"I'm Moira," she says, holding her seal skin close like a cherished blanket. "And you've shown me great kindness today. Most humans who find a Selkie's skin try to keep it, to trap us on land. But you..." She studies your face with those deep sea-colored eyes. "You're different."\n\nShe sits on a smooth rock and gestures for you to join her. The sun is setting now, painting the sky in shades of amber and rose.\n\n"Would you like to know about my world?" she asks. "The Selkies have lived in these waters since the old days, before humans came to Skye. We swim the deep currents, dance with the dolphins, and guard the secrets of the sea. We're not so different from you, really. We love, we laugh, we tell stories and sing songs. We just... belong to two worlds instead of one."\n\nShe pauses, then adds softly, "It's a gift, but also a burden. We're never fully at home in either world."`,
        choices: [
            { text: 'Offer to help protect the Selkies and their secrets', nextId: 'ending_guardian' },
            { text: 'Ask if you could visit her world again someday', nextId: 'ending_between_worlds' }
        ]
    },

    // === ENDING 1: THE GRATEFUL GIFT ===
    ending_grateful_gift: {
        id: 'ending_grateful_gift',
        background: 'underwater',
        text: `Moira wraps herself in her seal skin, transforming instantly into her true form. But before she dives into the waves, she turns back to you. In her flipper, she holds a small, perfect pearl that glows with the same inner light as her skin.\n\n"This is selkie-blessed," she says, her voice now carrying the rhythm of waves. "Hold it underwater and you'll be able to breathe beneath the sea for one full day. Use it wisely—it only works once."\n\nShe touches her nose to your hand in a gesture of gratitude, then slips into the water and disappears.\n\nYou stand on the shore, the magical pearl warm in your palm, knowing that whenever you choose to use it, an entire ocean of wonders awaits you.`,
        isEnding: true,
        endingTitle: 'The Grateful Gift'
    },

    // === ENDING 2: UNDERWATER WONDERS ===
    ending_underwater_wonders: {
        id: 'ending_underwater_wonders',
        background: 'underwater',
        text: `Moira's mother guides you through the coral palace, showing you rooms of pearl and chambers where bioluminescent creatures provide gentle light. You see Selkie children playing, their laughter creating bubbles that rise like silver balloons. You watch Selkie craftspeople weaving tapestries from seaweed and carving sculptures from driftwood.\n\nMoira herself appears, delighted to find you in her home. She shows you the Hall of Songs, where the Selkies' stories are preserved in spiral shells that sing when you hold them to your ear.\n\nWhen it's finally time to return to land, the Selkies give you a gift—a pearl on a cord that will let you return whenever you wish. As you swim back to shore and shed the skin, you realize that you've been given a rare privilege: friendship with the folk of the deep.\n\nYou carefully return Moira's skin to her, and she promises that the ocean will always welcome you back.`,
        isEnding: true,
        endingTitle: 'Underwater Wonders'
    },

    // === ENDING 3: THE CAUTIOUS PATH ===
    ending_cautious_path: {
        id: 'ending_cautious_path',
        background: 'village',
        text: `You take Calum's advice to heart. Magic is powerful and unpredictable, and sometimes the wisest choice is to let it remain mysterious.\n\nThe next morning, you return to the beach, drawn by curiosity you can't quite suppress. But the seal skin is gone. In its place, you find a small pile of unusually beautiful shells arranged in a pattern—perhaps a thank you, perhaps just coincidence.\n\nOver the following years, you sometimes see seals watching you from the waves when you walk the shore. Their dark eyes seem knowing, almost amused. Sometimes, on foggy mornings, you hear singing that might be Selkie voices, or might just be the wind.\n\nYou'll never know what might have happened if you'd been braver that day. But you also know you made a choice that kept you safe, and sometimes safety is its own kind of magic.`,
        isEnding: true,
        endingTitle: 'The Cautious Path'
    },

    // === ENDING 4: THE GUARDIAN ===
    ending_guardian: {
        id: 'ending_guardian',
        background: 'moonlit-shore',
        text: `"You would do that?" Moira's eyes shine with unshed tears. "Protect our secrets? Stand between my people and those who would harm us?"\n\nYou nod firmly. "The Selkies deserve to live in peace. I'll be a friend to your people, a guardian of your secrets."\n\nMoira clasps your hands. "Then you are blessed by the sea, and the sea will remember you."\n\nFrom that day forward, you become a keeper of Selkie lore. You guide curious villagers away from the caves during molting season when the Selkies shed their skins. You warn fishermen away from the seal colonies. You teach children to respect the sea and its magic.\n\nOnce a year, on the longest night, Moira visits you on the shore. She brings stories from beneath the waves and listens to your tales from the land. You become a bridge between two worlds—a trusted friend to the folk of the deep.\n\nIt's a quiet kind of magic, but it's real, and it's yours.`,
        isEnding: true,
        endingTitle: 'The Guardian'
    },

    // === ENDING 5: BETWEEN TWO WORLDS ===
    ending_between_worlds: {
        id: 'ending_between_worlds',
        background: 'moonlit-shore',
        text: `Moira smiles, a smile full of moonlight and mischief. "You want to walk between worlds, as I do?" She reaches into a small pouch at her belt and pulls out a spiral shell, opalescent and perfect.\n\n"This is a calling shell," she explains. "Hold it to your ear, and you'll hear the ocean's voice. Speak my name into it when you're by the sea, and I'll come to you. We can swim together, explore tide pools, dive for treasures. I'll teach you the secret languages of whales and the dances of dolphins."\n\nShe presses the shell into your hand. "You've given me back my freedom today. I give you the freedom to wander both worlds—land and sea, human and Selkie. It's not a gift many receive."\n\nShe transforms then, her seal form slipping into the waves. But before she disappears, she surfaces once more, and you hear her voice in your mind: "Call me soon, friend. We have oceans to explore."\n\nYou stand on the moonlit shore, the calling shell warm in your hand, knowing that your adventures have only just begun.`,
        isEnding: true,
        endingTitle: 'Between Two Worlds'
    }
};

// Validate story on load
if (window.DEBUG_MODE) {
    console.log('Story data loaded:', Object.keys(SELKIE_STORY).length, 'beats');
}
