var addAt = document.getElementById('btAdd');
var addConf = document.getElementById('btConf');
var addCanc = document.getElementById('btCanc');

/*const boxAdd = "<form>	
		Atividade<input type = "text">
		Hora Inicio<input type="time">
		Hora Fim <input type="time">	
		</form>";/*

/*var agenda = {
	[nome: "Teste",
	hrInicio: 1234,
	hrFim: 1234
	]
	
}*/

addAt.addEventListener('click', 
	function (){
		this.hidden = true;
		document.getElementById('addTable').hidden = false;			
	});
	
addConf.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;		
	});
	
addCanc.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;		
	});
	
	
