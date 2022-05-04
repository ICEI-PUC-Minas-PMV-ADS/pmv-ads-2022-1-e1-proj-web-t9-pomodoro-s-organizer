/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//btn incluir atividade
var addConf = document.getElementById('btConf');//btn confirmar inclusão
var addCanc = document.getElementById('btCanc');//btn cancelar inclusão
var bdAgenda = [];
/*********************************************************************/
/*******Funcionalidades dos Botões************************************/

// Ação do Botão para incluir atividade
addAt.addEventListener('click', 
	function (){
		this.hidden = true;
		document.getElementById('addTable').hidden = false;			
	});

//Ação do Botão Confirmar (confirma a inclusão de dados no formulário)	
addConf.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;
		
		let inicio = parseFloat(document.getElementById('ativInicio').value)
		let fim = parseFloat(document.getElementById('ativFim').value)
		
		tempItem = {
		nome:   document.getElementById('ativNome').value,
		hrInicio:  inicio,
		hrFim: fim,
		status: 0,
		progress: 0,
		};
		bdAgenda[bdAgenda.length] = tempItem;
		
		
		
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;		
	});
	
/*********************************************************************/
/*******Local STORAGE************************************/	
// JSON com o banco de dados da agenda.	
var bdAgenda =[
	{nome: "Teste",
	hrInicio: "",
	hrFim: "",
	status: 0, //0 não iniciado, 1 andamento, 2 conclúído
	progress: 0.75 //percentual de progresso
	},
	];
