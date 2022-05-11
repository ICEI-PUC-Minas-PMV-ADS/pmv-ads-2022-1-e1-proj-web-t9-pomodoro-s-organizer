/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//btn incluir atividade
var addConf = document.getElementById('btConf');//btn confirmar inclusão
var addCanc = document.getElementById('btCanc');//btn cancelar inclusão
var bdAgenda = [];
//var dataHj = document.getElementById('diaAtual')

/*********************************************************************/
/*******Funcionalidades dos Botões************************************/
//Acção para pŕeencher da data atual qdo carregar a página.

window.addEventListener('pageshow', (event) => {
	hj = new Date;
	document.getElementById('diaAtual').textContent = `Agenda dia ${hj.getDate()}
	 / ${hj.getMonth()} / ${hj.getFullYear()}`;
	 
});

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
		
		let hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		let mInicio = parseInt(document.getElementById('mAtivInicio').value);
		let hFim = parseInt(document.getElementById('hAtivFim').value);
		let mFim = parseInt(document.getElementById('mAtivFim').value);
		//let tInicio =  hInicio * 60 + mInicio; /tempo em minutos
		//let tFim = hFim * 60 + mFim;	/tempo em ninutos
		
		tempItem = {
		nome:   document.getElementById('ativNome').value,
		inicio: {
			horaInicio:  hInicio,
			minutoInicio: mInicio,
			//tempoInicio: tInicio,
		},
		fim: {
			horaFim: hFim,
			minutoFim: mFim,
			//tempoFim: tFim,
		},
		status: 0,
		progress: 0,
		};
		bdAgenda[bdAgenda.length] = tempItem;
		alert("Inclusão de dados realizada");
		document.getElementById("ativNome").value = null;	
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
var bdAgenda =[ //Exemplo:
	/*{nome: "Teste",
	hrInicio: "",
	hrFim: "",
	status: 0, //0 não iniciado, 1 andamento, 2 conclúído
	progress: 0.75 //percentual de progresso
	},*/
	];
