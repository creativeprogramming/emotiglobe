function init(){ 
	// if no WebGL do nothing (leave placeholder text)
	if (!Detector.webgl) return;
	//Detector.addGetWebGLMessage();
	
	var years = ['1990','1995','2000'];
	var container = document.getElementById('container');
	// empty container from the placeholder content before we continue...
	container.innerHTML = "";
	var globe = new DAT.Globe(container, function(label) {
	return new THREE.Color([
	  0xEEEEEE, 0xFF0000, 0x00FF00][label]);
	});
	
	var i, tweens = [];
	
	var settime = function(globe, t) {
	return function() {
	  new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
	  /*var y = document.getElementById('year'+years[t]);
	  if (y.getAttribute('class') === 'year active') {
		return;
	  }
	  var yy = document.getElementsByClassName('year');
	  for(i=0; i<yy.length; i++) {
		yy[i].setAttribute('class','year');
	  }
	  y.setAttribute('class', 'year active');*/
	};
	};
	/*
	for(var i = 0; i<years.length; i++) {
	var y = document.getElementById('year'+years[i]);
	y.addEventListener('mouseover', settime(globe,i), false);
	}
	*/
	var xhr;
	TWEEN.start();
	
	
	xhr = new XMLHttpRequest();
	xhr.open('GET', '/data.json', true);
	xhr.onreadystatechange = function(e) {
	if (xhr.readyState === 4) {
	  if (xhr.status === 200) {
		console.log(xhr.responseText);
		var data = JSON.parse(xhr.responseText);
		window.data = data;
		for (i=0;i<data.length;i++) {
		  globe.addData(data[i][1], {format: 'legend', name: data[i][0], animated: true});
		}
		globe.createPoints();
		settime(globe,0)();
		globe.animate();
	  }
	}
	};
	xhr.send(null);

}