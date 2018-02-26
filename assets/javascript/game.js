function Char(name, force, health, attack, image) {
    this.name = name,
        this.force = force,
        this.health = health,
        this.attack = attack,
        this.image = image
        // pickMe = function() { mePick(this); }
        // addEventListener("click", () => { mePick(this); }, false);
        // on("click", function() {
        //     playerPick(this);
        // });
}

//Players - Anakin as he progresses
var player = [
    new Char(name = "Young Anakin", force = "light", health = 120, attack = 4, image = "p1-young-Anakin.jpg"),
    new Char(name = "Padawan Anakin", force = "light", health = 140, attack = 6, image = "p2-prime-Anakin.jpg"),
    new Char(name = "Emo Anakin", force = "dark", health = 160, attack = 8, image = "p3-bad-Anakin.jpg"),
    new Char(name = "Corrupt Anakin", force = "dark", health = 180, attack = 10, image = "p4-corrupt-Anakin.jpg"),
    new Char(name = "Darth Anakin", force = "dark", health = 200, attack = 12, image = "p5-Darth-Vader.jpg")
]

//Good guys - Jedi
var jedi = [
    new Char(name = "Saesee Tiin", force = "light", health = 120, attack = 4, image = "j1-Saesee-Tiin.jpg"),
    new Char(name = "Aayla Segura", force = "light", health = 140, attack = 6, image = "j2-Aayla-Segura.jpg"),
    new Char(name = "Obi-Wan Can-old-be", force = "light", health = 160, attack = 8, image = "j3-Obi-Wan.jpg"),
    new Char(name = "Yoda Boghopper", force = "light", health = 180, attack = 10, image = "j4-Yoda.jpg"),
    new Char(name = "Luke Skywalker", force = "light", health = 200, attack = 12, image = "j5-Luke-Skywalker.jpg")
]

//Bad guys - sith
var sith = [
    new Char(name = "Darth Vesevan", force = "dark", health = 120, attack = 4, image = "s1-Darth-Vesevan.jpg"),
    new Char(name = "Darth Maul", force = "dark", health = 140, attack = 6, image = "s2-Darth-Maul.jpg"),
    new Char(name = "Darth Revan", force = "dark", health = 160, attack = 8, image = "s3-Darth-Revan.jpg"),
    new Char(name = "Darth Sidious", force = "dark", health = 180, attack = 10, image = "s4-Darth-Sidious.jpg"),
    new Char(name = "Darth Plagueis", force = "dark", health = 200, attack = 12, image = "s5-Darth-Plagueis.jpg")
]

var isFight = false;
var gameOver = false;
var playerAttack = 0;
var playerDamage = 0;
var playerHealth = 0;
var defenderDamage = 0;
var defenderHealth = 0;
var defenderCount = 5;

var sabers = ["2 clash 2.wav", "2 clash 3.wav", "2 clash 4.wav", "2 clash 5.wav", "2 Clash Ck.wav", "2 clash.wav", "3 clash 1.wav", "3 clash 2.wav", "3 Clash Ck.wav", "4 clash 2.wav", "4 Clash good.wav", "5 clash 2.wav", "clash 01.wav"]

$(document).ready(function() {

    //player choices
    player.forEach(function(player) {
        var playerChoice = characterBox(player)
            // playerChoice.on("click", function() {
            //     playerChoice.pickMe();
            // });
        playerChoice.on("click", function() {
            playerPick(this);
        });
        playerChoice.children('img').addClass("player");
        $("#player-choice").append(playerChoice);
    });

    //character display box
    function characterBox(character) {
        // debugger;
        var image = $("<img>");
        image.attr("src", "assets/images/" + character.image);
        image.addClass("character");

        var caption = $("<figcaption>");
        caption.text(character.name);

        var figure = $("<figure>");
        figure.append(image);
        figure.append(caption);
        figure.attr("id", character.name);
        figure.attr("force", character.force);
        figure.attr("health", character.health);
        figure.attr("attack", character.attack);

        return figure;
    }

    //enemy choices
    function enemyChoices(group, side) {
        group.forEach(function(enemy) {
            var enemyChoice = characterBox(enemy)
            enemyChoice.on("click", function() {
                defenderPick(this, enemy[1]);
            });
            enemyChoice.children('img').addClass("enemy " + side);
            $("#enemy-choice").append(enemyChoice);
        });
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
        $("#fight-attack").on("click", function() {
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
        fightAudio[0].play();
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