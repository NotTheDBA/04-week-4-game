//Players - Anakin as he progresses
var player =
    [["p1-young-Anakin.jpg", "light", 120, 4, "Young Anakin"]
        , ["p2-prime-Anakin.jpg", "light", 140, 6, "Padawan Anakin"]
        , ["p3-bad-Anakin.jpg", "dark", 160, 8, "Emo Anakin"]
        , ["p4-corrupt-Anakin.jpg", "dark", 180, 10, "Corrupt Anakin"]
        , ["p5-Darth-Vader.jpg", "dark", 200, 12, "Darth Anakin"]
    ];

//Good guys - Jedi
var jedi =
    [["j1-Saesee-Tiin.jpg", "light", 120, 4, "Saesee Tiin"]
        , ["j2-Aayla-Segura.jpg", "light", 140, 6, "Aayla Segura"]
        , ["j3-Obi-Wan.jpg", "light", 160, 8, "Obi-Wan Can-old-be"]
        , ["j4-Yoda.jpg", "light", 180, 10, "Yoda Boghopper"]
        , ["j5-Luke-Skywalker.jpg", "light", 200, 12, "Luke Skywalker"]
    ];

//Bad guys - sith
var sith =
    [["s1-Darth-Vesevan.jpg", "dark", 120, 4, "Darth Vesevan"]
        , ["s2-Darth-Maul.jpg", "dark", 140, 6, "Darth Maul"]
        , ["s3-Darth-Revan.jpg", "dark", 160, 8, "Darth Revan"]
        , ["s4-Darth-Sidious.jpg", "dark", 180, 10, "Darth Sidious"]
        , ["s5-Darth-Plagueis.jpg", "dark", 200, 12, "Darth Plagueis"]
    ];

var isFight = false;
var gameOver = false;
var playerAttack = 0;
var playerDamage = 0;
var playerHealth = 0;
var defenderDamage = 0;
var defenderHealth = 0;
var defenderCount = 5;

var sabers =
    ["2 clash 2.wav"
        , "2 clash 3.wav"
        , "2 clash 4.wav"
        , "2 clash 5.wav"
        , "2 Clash Ck.wav"
        , "2 clash.wav"
        , "3 clash 1.wav"
        , "3 clash 2.wav"
        , "3 Clash Ck.wav"
        , "4 clash 2.wav"
        , "4 Clash good.wav"
        , "5 clash 2.wav"
        , "clash 01.wav"
    ]

$(document).ready(function () {

    //player choices
    player.forEach(function (player) {
        var playerChoice = characterBox(player)
        playerChoice.on("click", function () {
            playerPick(this);
        });
        playerChoice.children('img').addClass("player");
        $("#player-choice").append(playerChoice);
    });

    //enemy choices
    function enemyChoices(group, side) {
        group.forEach(function (enemy) {
            var enemyChoice = characterBox(enemy)
            enemyChoice.on("click", function () {
                defenderPick(this, enemy[1]);
            });
            enemyChoice.children('img').addClass("enemy " + side);
            $("#enemy-choice").append(enemyChoice);
        });
    }

    //character display box
    function characterBox(character) {

        var image = $("<img>");
        image.attr("src", "assets/images/" + character[0]);
        image.addClass("character");

        var caption = $("<figcaption>");
        caption.text(character[4]);

        var figure = $("<figure>");
        figure.append(image);
        figure.append(caption); figure.attr("id", character[0]);
        figure.attr("force", character[1]);
        figure.attr("health", character[2]);
        figure.attr("attack", character[3]);

        return figure;
    }

    //player picks character
    function playerPick(character) {
        fightSounds("sw4-lightsabre.wav");
        playerAttack += parseInt(character.attributes["attack"].value);
        playerDamage += playerAttack;
        playerHealth = character.attributes["health"].value;

        //clears group, then re-adds our choice
        $('#player-choice').empty().append(character);
        $(".health").css("visibility", "visible");
        $("#player-health").text(playerHealth);
        $("#character-description").text(character.id);

        if (character.attributes["force"].value === "light") {
            enemyChoices(sith, "sith");
        } else {
            enemyChoices(jedi, "jedi");
        }
        $(".enemy").css("visibility", "visible");
    }

    //player picks defender
    function defenderPick(defender) {

        if (isFight || gameOver) {
            return;
        }
        fightSounds("SaberOn.wav");

        defenderDamage = parseInt(defender.attributes["attack"].value);
        defenderHealth = defender.attributes["health"].value;

        defender.remove();
        $("#defender-choice").append(defender);
        $("#defender-health").text(defenderHealth);

        $("#fight-attack").off("click"); //reset our button function
        $("#fight-attack").on("click", function () {
            allFight(defender, $("#player-choice").children('figure')[0]);
        });

        $(".defender").css("display", "initial");
        defenderCount--;
        startFight();

    }

    //Fight!
    function allFight(defender, attacker) {
        fightSounds(sabers[Math.floor(Math.random() * sabers.length)]);
        // Player damages Defender
        trackDamage(defender, playerDamage, $("#defender-health"));
        defenderHealth = parseInt(defender.attributes["health"].value);
        // Defender fights back 
        if (defenderHealth > 0) {
            trackDamage(attacker, defenderDamage, $("#player-health"));
            playerHealth = parseInt(attacker.attributes["health"].value);
        }

        // Player increases attack value (but less against weaker opponents)
        var defenderOffset = 0;
        if (playerAttack > defenderDamage) {
            defenderOffset = Math.round((defenderDamage / 2))
        };

        playerDamage += playerAttack - defenderOffset;
        //defender doesn't increase their damage

        if (playerHealth === 0) {
            endGame(false);
        } else if (defenderHealth === 0 && defenderCount === 0) {
            endGame(true);
        }
    }

    //Who's wounded
    function trackDamage(character, damage, display) {

        if (parseInt(damage) < character.attributes["health"].value) {
            character.attributes["health"].value -= damage;
        } else {
            character.attributes["health"].value = 0;
            character.remove();
            endFight();
        }

        // Update display
        display.text(character.attributes["health"].value);
    }

    function startFight() {
        isFight = true;
        $(".defender").css("display", "inherit");
        $(".fight").css("display", "initial");
    }

    function endFight() {
        isFight = false;
        $(".defender").css("display", "none");
        $(".fight").css("display", "none");
    }

    function fightSounds(sound) {
        // TODO: Preload(?) sounds for game performance on phones.

        var audioSource = $("<source>");
        var fightAudio = $('#fightAudio');

        audioSource.attr("type", "audio/wav");
        audioSource.attr("src", "assets/sounds/" + sound);

        fightAudio[0].pause(); //interrupt if still playing...
        fightAudio.empty();
        fightAudio.append(audioSource);
        fightAudio[0].load();
    }

    function endGame(iWin) {
        gameOver = true;
        $('.character-description').text("");
        $('.health').text("");
        $('.fight').empty();
        if (iWin) {
            var image = $("<img>");
            image.attr("src", "assets/images/hate.gif");
            image.addClass("final");
            $(".defender").css("display", "inherit");
            $('#defender-choice').empty().append(image);
            $('#defender-label').text("You Win!")
        } else {
            var image = $("<img>");
            image.attr("src", "assets/images/chosen.jpg");
            image.addClass("final");
            $('#player-choice').empty().append(image);
            $('#player-label').text("You Lose!")
        }
    }
});