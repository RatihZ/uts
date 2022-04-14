setGame("1200x600");
game.folder = "img";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"JUDUL.png",
	startBtn:"TombolStart.png",
	maxBtn:"TMax.png",
	minBtn:"TMin.png",
	lompat:"lompat.png",
	jatuh:"jatuh.png",
	diam:"diam.png",
	lari:"lari.png",
	kena:"kena.png",
	cover:"latar.png",
	settile:"lahan.png",
	item2:"organic.png",
	item4:"organic2.png",
	item5:"anorganic2.png",
	item3:"anorganic.png",
	musuh2Idle:"musuh2diam.png",
	musuh2Run:"musuh2lari.png",
	musuh2Hit:"musuh2kena.png",
	bendera:"tiang.png"

}
//file suara yang dipakai dalam game
var suara = {
	dapat: "collect.mp3",
	dead: "mati.mp3",
	bgm: "bgs.mp3"
	
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("#191970");
	tampilkanGambar(dataGambar.logo, 600, 200);
	var startBtn = tombol(dataGambar.startBtn, 600, 450);
	if (tekan(startBtn)){
		setAwal();
		jalankan(gameLoop);
		musik(dataSuara.bgm);
	}
	resizeBtn(1125,50);
}	

function setAwal(){
	game.chara = setSprite(dataGambar.diam, 32, 32);
	game.skalaSprite= 2;
	game.chara.animDiam = dataGambar.diam;
	game.chara.animLompat = dataGambar.lompat;
	game.chara.animJalan = dataGambar.lari;
	game.chara.animJatuh = dataGambar.jatuh;
	game.chara.animMati = dataGambar.kena;
	setPlatform(map_3, dataGambar.settile, 32, game.chara);
	game.gameOver = ReplayGame;
	setPlatformItem(2, dataGambar.item2);
	setPlatformItem(3, dataGambar.item3);
	setPlatformItem(4, dataGambar.item4);
	setPlatformItem(5, dataGambar.item5);
	var musuh2 = {};
	musuh2.animDiam = dataGambar.musuh2Idle;
	musuh2.animJalan = dataGambar.musuh2Run;
	musuh2.animHit = dataGambar.musuh2Hit;
	setPlatformEnemy(2, musuh2);
	setPlatformTrigger(1,dataGambar.bendera);
}

function ReplayGame(){
	game.aktif = true;
	setAwal();
	jalankan(gameLoop);
}
function gameLoop(){
	if (game.kanan){
		gerakLevel (game.chara, 3, 0);
	}else if (game.kiri){
		gerakLevel (game.chara, -3, 0);
	}
	if (game.atas){
		gerakLevel (game.chara, 0, -10);
	}
	latar(dataGambar.cover, 0.5, 0);
	buatLevel();
	hitungscore();

	teks(game.score, 40, 60);
}
function hitungscore(){
	if (game.itemID == 2) {
		tambahScore (10);
		game.itemID = 0;
		mainkanSuara(dataSuara.dapat);
	}
	if (game.itemID == 3) {
		tambahScore (15);
		game.itemID = 0;
		mainkanSuara(dataSuara.dapat);
	}
	if (game.itemID == 4) {
		tambahScore (5);
		game.itemID = 0;
		mainkanSuara(dataSuara.dapat);
	}
	if (game.itemID == 5) {
		tambahScore (20);
		game.itemID = 0;
		mainkanSuara(dataSuara.dapat)
	}
	if (game.triggerID==1) {
		game.triggerID = 0;
		game.aktif = false;
		game.level++;
		alert('CONGRATULATIONS   Your score : ' + game.score)
        window.location.reload();
	}
}

