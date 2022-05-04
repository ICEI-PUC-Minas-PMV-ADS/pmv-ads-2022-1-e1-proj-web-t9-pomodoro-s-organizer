var addAt = document.getElementById('btAdd');

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
