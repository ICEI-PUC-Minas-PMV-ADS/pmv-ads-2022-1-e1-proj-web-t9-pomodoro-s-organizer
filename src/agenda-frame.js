/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//bt incluir atividade
var addConf = document.getElementById('btConf');//bt confirmar inclusão
var addCanc = document.getElementById('btCanc');//bt cancelar inclusão
var bdAgenda = JSON.parse(localStorage.getItem("bdAgenda")); // banco de dados da agenda
	
	
window.onload = function(){
		if(bdAgenda == null)
		bdAgenda = [];
		ExibeAgenda ();
	};

/*********************************************************************/
/*******Funcionalidades dos Botões************************************/

//Acção para pŕeencher da data atual qdo carregar a página.
window.addEventListener('pageshow', (event) => {
	hj = new Date;
	document.getElementById('diaAtual').textContent = `Agenda dia ${hj.getDate()}
	 / ${hj.getMonth()+1} / ${hj.getFullYear()}`;	 
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
		document.getElementById('addTable').hidden = true;//esconde o botão incluir
		addAt.hidden = false;//exibe a tabela para inclusão	
		if (dadovazio()){	
		incluir();//faz a inclusão
		alert("Inclusão de dados realizada");
		document.getElementById("ativNome").value = null; // LIMPA O INPUT	
		ExibeAgenda ();//atualiza a tabela da agenda.
		}	
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;		
	});

/*********************************************************************/
/*************************FUNÇÕES************************************/
	
//Função para exibir tabela da agenda:
function ExibeAgenda () {
	var tabela = document.getElementById('tabelaAgenda');
	var textoHTML = `
	<table class="table">
		  <thead>
			<tr>
			  <th scope="col">#</th>
			  <th scope="col">Descrição</th>
			  <th scope="col">Inicio</th>
			  <th scope="col">Fim</th>
			</tr>
		  </thead>
		  <tbody>
	`; //Preencher o HEADER da Tabela.
	console.log("bd agenda = "+bdAgenda.length);
	
	if (bdAgenda.length == 0){//se não tem atidivada programada	
		tabela.innerHTML = textoHTML + `
		<tr>		  
			<td colspan="4"><i>Nenhuma Atividade Cadastrada</i></td>
		</tr>
		`;//preenche uma linha dizendo que não tem atividade programada
	} else {
		
		//preencher cada linha da tabela com os dados que foram inseridos pelo usuário.
		for (var i = 0; i < bdAgenda.length; i++){
			textoHTML +=`
						<tr>
							  <th scope="row">${i+1}</th>
							  <td>${bdAgenda[i].nome}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.minuto)}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.minuto)}</td>
							 						  
						</tr>							
						`;						
		}//fim do for
		tabela.innerHTML = textoHTML; //imprime a tabela.
	} //fim do else
		
}//fim da função ExibeAgenda

//função para incluir item
function incluir (){	
		let hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		let mInicio = parseInt(document.getElementById('mAtivInicio').value);
		let hFim = parseInt(document.getElementById('hAtivFim').value);
		let mFim = parseInt(document.getElementById('mAtivFim').value);
		let tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		let tFim = hFim * 60 + mFim;	//tempo em ninutos
		
		//cria variável no formato para ser incluído no Bd
		tempItem = {
		nome:   document.getElementById('ativNome').value,
		inicio: {
			hora:  hInicio,
			minuto: mInicio,
			tempo: tInicio,
		},
		fim: {
			hora: hFim,
			minuto: mFim,
			tempo: tFim,
		},
		status: 0,
		progress: 0,
		};		
		//inclui o item no BD Agenda
		bdAgenda[bdAgenda.length] = tempItem;
		localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
}//fim da função incluir

//função - check dado vazio
function dadovazio(){
		let nomeAtivi = document.getElementById('ativNome').value;
		let hInicio =  document.getElementById('hAtivInicio').value;
		let mInicio = document.getElementById('mAtivInicio').value;
		let hFim = document.getElementById('hAtivFim').value;
		let mFim = document.getElementById('mAtivFim').value;	
		
		if (nomeAtivi == "" || hInicio == "-1" ||  mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			alert("Favor preencher todos os dados");
			return 0;			
		} else {
			return 1;
			}//fim do else
}// fim da função dadovazio

//função timer (Protótipo)
var tempoEmMinutos = 25;
var expiracao = new  Date(new Date().getTime() + tempoEmMinutos * 60000);

contador = window.setInterval(function(){
    faltam = expiracao - new Date();
    if (faltam <= 0){
        window.clearInerval(contador);
        console.log("Prazo expirado");
    }
    minutos = Math.floor(faltam / 60000);
    segundos = faltam % 60000;
    tempoRestante = `${minutos}:${segundos.toString().substring(0,2)}`;

    //abaixo, coloque no lugar de 'tempo' o id do elemento do html que contem o timer
    document.getElementById('timer').innerHTML = `<h3>${tempoRestante}</h3>`;
    //console.log(tempoRestante);
}, 1000);
