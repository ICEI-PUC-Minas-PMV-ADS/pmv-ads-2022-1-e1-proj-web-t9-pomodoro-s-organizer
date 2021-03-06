/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//bt incluir atividade
var addConf = document.getElementById('btConf-i');
var addCanc = document.getElementById('btCanc');//bt cancelar inclusão
var bdAgenda = JSON.parse(localStorage.getItem("bdAgenda")); // banco de dados da agenda
var bdTemp = [];

//ação que trata o bdAgenda e exibe a tabela de atividades no momento do carregamento.	
window.onload = function(){
		if(bdAgenda == null)
		bdAgenda = [];
		
		for (var i = 0; i < bdAgenda.length; i++){
			bdAgenda[i].status = 0;
		}
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
		carregaTemp('i'); //carrega dados temporarios nos forms (se tiver).
		exibeConfirma('i'); // verificar condições para habilitar botão confirma.
	});	
	
	
//Ação do Botão Confirmar (confirma a inclusão de dados no formulário)	
addConf.addEventListener('click', 
	function (){		
		// 'i' como parâmetro se refere ao botão de inclusão.
		document.getElementById('addTable').hidden = true;//esconde o botão incluir
		addAt.hidden = false;//exibe a tabela para inclusão	
		if (dadovazio('i') && maxtemp('i') && mintemp('i') && validatemp('i', bdAgenda)){//se não existir nenhum erro.
			incluir('i',bdAgenda, 0, 0);//faz a inclusão
			alert("Inclusão de dados realizada");
			ordenar(bdAgenda);		
			localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
			bdTemp = []; //reinicia a arrey temporária.
			
			ExibeAgenda ();//atualiza a tabela da agenda.
		} else {
			gravaTemp('i'); // grava os dados do formulário para reexibição.
		}			
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;
		bdTemp = [];
		exibeConfirma('i');	
	});	

/*********************************************************************/
/*************************FUNÇÕES************************************/

//grava os dados do formulário em uma variável temporária.
function gravaTemp(indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
				
		//cria variável no formato para ser incluído no Bd
		bdTemp = [
		nomeAtivi,
		hInicio,
		mInicio,			
		hFim,
		mFim]		
}

//grava uma array temporária com os dados de 1 elemendo do BdAgenda
function gravaTempBD(indice){
		var nomeAtivi = bdAgenda[indice].nome;	
		var hInicio =  bdAgenda[indice].inicio.hora;
		var mInicio = bdAgenda[indice].inicio.minuto;
		var hFim = bdAgenda[indice].fim.hora
		var mFim = bdAgenda[indice].fim.minuto;
				
		//cria variável no formato para ser incluído no Bd
		bdTemp = [
		nomeAtivi,
		hInicio,
		mInicio,			
		hFim,
		mFim]		
}

//carrega o formulário com os dados temporários guardado.
function carregaTemp(indice){
		if (bdTemp.length > 0){
			
			document.getElementById('ativNome-'+indice).value = bdTemp[0];
			document.getElementById('hAtivInicio-'+indice).value = bdTemp[1];
			document.getElementById('mAtivInicio-'+indice).value = bdTemp[2];
			document.getElementById('hAtivFim-'+indice).value = bdTemp[3];
			document.getElementById('mAtivFim-'+indice).value = bdTemp[4];
		}
}

//verifica se atividade não excede o tempo máximo.
function maxtemp (indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio > 300){//atividaed ultrapassa 2h
		alert("Atividade não pode exceder 5 horas");
		gravaTemp(indice);
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}//fim da função max2h

//verifica se atividade não não é menor que o tempo mínimo.
function mintemp(indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio < 30){//atividaed tem que tempo superia a 30 min
		alert("Atividade deve ter no mínimo 30 min");
		gravaTemp(indice);		
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}// fim da função min temp.
	
//Função para exibir tabela da agenda:
function ExibeAgenda() {
	var tabela = document.getElementById('tabelaAgenda');
	var textoHTML = `
	<table class = "table table-bordered">
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
	
	
	if (bdAgenda.length == 0){//se não tem atidivada programada	
		tabela.innerHTML = textoHTML + `
		<tr>		  
			<td colspan="4"><i>Nenhuma Atividade Cadastrada</i></td>
		</tr>
		</tbody>
		</table>
		`;//preenche uma linha dizendo que não tem atividade programada
	} else {
		
		//preencher cada linha da tabela com os dados que foram inseridos pelo usuário.
		for (var i = 0; i < bdAgenda.length; i++){
			textoHTML +=`
						<tr>
							<th scope="row" rowspan = "2" class="align-middle">${i+1}</br>
							 
							  <td class="align-middle"><b>${bdAgenda[i].nome}</b></td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.minuto)}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.minuto)}</td>
							 </th>
						</tr>
						<tr>
							
							<td class="align-middle"> 
							
								<form>
														
								 <input type="range" id = "statusbar${i}" name = "${i}" min = "0" max = "1" step = "0.01" value = "${bdAgenda[i].progress}" oninput = "frameRange(${i})">
								</form>
							
							</td>
							
							<td colspan="3">
								<div class = "btn-group">
									<button type="button" class="btn btn-outline-dark" id = "btn-p-${i}"  onclick = playTimer(${i})>
										<span id = "btn-play-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
											</svg>
										</span>
									</button>
									
									<button type="button" class="btn btn-outline-dark" id = "btn-s-${i}"  onclick = stopAtividade(${i}) hidden>	
										<span id = "btn-stop-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
											  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											  <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
											</svg>
										</span>
									</button>
									
									<button type="button" class="btn btn-outline-dark" onclick = frameExc(${i}) id = "btn-exc-${i}">
										<span name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
											  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
											</svg>
										</span>
									</button>
									
										
									<button type="button" class="btn btn-outline-dark" onclick = altFrame(${i}) id = "btn-alt-${i}" >
										<span name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
											  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
											</svg>
										</span>
									</button>
									
								</div>								
							</td>
						</tr>
						
						<tr id = "interation-table-${i}" hidden>
						
						</tr>
							
						`;						
		}//fim do for
		textoHTML +=`</tbody>
						</table>`
		tabela.innerHTML = textoHTML; //imprime a tabela.
	} //fim do else
		
	showButtons();
		
}//fim da função ExibeAgenda

//função para incluir item
function incluir (indice, arrayTemp, stat, progr){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
		
		//cria variável no formato para ser incluído no Bd
		tempItem = {
		nome:   nomeAtivi,
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
		status: stat, //0 não iniciado, 1 em adamento, 2 pausado, 3 concluido
		progress: progr,
		};		
		//inclui o item no BD Agenda
		arrayTemp[arrayTemp.length] = tempItem;
}//fim da função incluir

//função para ordenar o lista de avtividades (bubble sort).
function ordenar(arrayTemp1){
	var bdSize = arrayTemp1.length;
	
	if (bdSize > 0) {		
		for (var i = 1; i < bdSize; i++){
			for (var j = 0; j < bdSize - 1; j++){
				if (arrayTemp1[j].inicio.tempo > arrayTemp1[j+1].inicio.tempo){
					var hold = arrayTemp1[j];
					arrayTemp1[j] = arrayTemp1[j+1];
					arrayTemp1[j+1] = hold;					
				}
			}			
		}	
	}	
}// fim da função ordenar.


//função exibe botão de confirmar (só exibe qdo todos os dados estão preenchidos)
function exibeConfirma(indice){
		var addConfi = document.getElementById('btConf-'+indice);
	
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		
		if (nomeAtivi == "" || hInicio == "-1" || mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			addConfi.disabled = true;		
			
		}
		else {
			addConfi.disabled = false;
				
		}
}//fim da função exibeConfirma

//função valida tempo repetido
function validatemp(indice, bdAgenda){
	
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
		
		var tamanhoBD = bdAgenda.length;
		
		var result = false;
		
		//se não tiver nenhuma atividade cadastrada não precisa conferir
		if (tamanhoBD == 0){
			result = true;
			
		} else {
			//faz a verificação em cada atividade
			for (var i = 0; i < tamanhoBD; i++){
				if( tInicio > bdAgenda[i].inicio.tempo && tInicio < bdAgenda[i].fim.tempo){
					alert ("O inicio da atividade coincide com outra atividade já programada");
					result = false;
					break;
					
				} else if( tFim > bdAgenda[i].inicio.tempo && tFim < bdAgenda[i].fim.tempo){
					alert ("O Fim da atividade coincide com outra atividade já programada");
					result = false;
					break;
					
				} else if(bdAgenda[i].inicio.tempo > tInicio && bdAgenda[i].inicio.tempo < tFim) {
					alert ("Já existe atividade programada neste horário");
					result = false;
					break;
					
				} else if(bdAgenda[i].fim.tempo > tInicio && bdAgenda[i].fim.tempo < tFim){
					alert ("Já existe atividade programada neste horário");
					result = false;
					break;
					
				} else {
					result = true;
				}
			} // fim do for
		
		}
		return result;		
} // fim da função de validar tempo.

//função - check dado vazio
function dadovazio(indice){
		
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		
		if (nomeAtivi == "" || hInicio == "-1" ||  mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			alert("Favor preencher todos os dados");
			return false;			
		} else {
			return true;
			}//fim do else
}// fim da função dadovazio

//função para exibir frame para exclusão
function frameExc(element) {
	var tdBOX = document.getElementById("interation-table-"+element);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
							<td colspan = "4">
							
							<button type="reset" id="btConfExc-${element}" class="btn btn-secondary" onclick = "excluir(${element})"> Confirmar Exclusão</button>				
							<button type="reset" id="btCancExc-${element}" class="btn btn-secondary" onclick = "cancAlt(${element})"> Cancelar</button>				
						
							</td>
						
						`;
}

//função para excluir item da agenda.
function excluir(element){
	bdAgenda.splice(element, 1);	
	localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
	ExibeAgenda ();	
}

//função para exibir frame de alteração
function altFrame(indice) {

	var tdBOX = document.getElementById("interation-table-"+indice);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
				<td colspan = "4">
					
					<p><label for="ativNome-${indice}">Atividade:</label>
					<input type = "text" id="ativNome-${indice}" step="2"  maxlength="30" required oninput = "exibeConfirma(${indice})"></p>									
				
			
				
					<p><label for="hAtivInicio-${indice}">Hora Inicio: </label>
					<select name="Hora Inicio" id="hAtivInicio-${indice}" required onchange = "exibeConfirma(${indice})">
					 <option value= -1>-</option>
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>	
					</select>
					
					<label for="mAtivInicio-${indice}">Minuto Inicio:	</label>
					<select name="Minuto Inicio" id="mAtivInicio-${indice}" required onchange = "exibeConfirma(${indice})">
					 <option value= -1 >-</option>
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>									 
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>
					 <option value= 25 >25</option>
					 <option value= 26 >26</option>
					 <option value= 27 >27</option>
					 <option value= 28 >28</option>
					 <option value= 29 >29</option>
					 <option value= 30 >30</option>
					 <option value= 31 >31</option>
					 <option value= 32 >32</option>
					 <option value= 33 >33</option>
					 <option value= 34 >34</option>
					 <option value= 35 >35</option>
					 <option value= 36 >36</option>
					 <option value= 37 >37</option>
					 <option value= 38 >38</option>
					 <option value= 39 >39</option>
					 <option value= 40 >40</option>
					 <option value= 41 >41</option>
					 <option value= 42 >42</option>
					 <option value= 43 >43</option>
					 <option value= 44 >44</option>
					 <option value= 45 >45</option>
					 <option value= 46 >46</option>
					 <option value= 47 >47</option>
					 <option value= 48 >48</option>
					 <option value= 49 >49</option>
					 <option value= 50 >50</option>
					 <option value= 51 >51</option>
					 <option value= 52 >52</option>
					 <option value= 53 >53</option>
					 <option value= 54 >54</option>
					 <option value= 55 >55</option>
					 <option value= 56 >56</option>
					 <option value= 57 >57</option>
					 <option value= 58 >58</option>
					 <option value= 59 >59</option>
					</select>																	
					</p>
				
	
				
					<label for="hAtivFim-${indice}">Hora Fim: </label>
					<select name="Hora Fim" id="hAtivFim-${indice}" required onchange = "exibeConfirma(${indice})">
					  <option value= -1 >-</option>		
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>		 
					</select>
					
					<label for="mAtivFim-${indice}">Minuto Fim: </label>
					<select name="Minuto Fim" id="mAtivFim-${indice}" required onchange = "exibeConfirma(${indice})">
					  <option value= -1 >-</option>	
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>									 
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>
					 <option value= 25 >25</option>
					 <option value= 26 >26</option>
					 <option value= 27 >27</option>
					 <option value= 28 >28</option>
					 <option value= 29 >29</option>
					 <option value= 30 >30</option>
					 <option value= 31 >31</option>
					 <option value= 32 >32</option>
					 <option value= 33 >33</option>
					 <option value= 34 >34</option>
					 <option value= 35 >35</option>
					 <option value= 36 >36</option>
					 <option value= 37 >37</option>
					 <option value= 38 >38</option>
					 <option value= 39 >39</option>
					 <option value= 40 >40</option>
					 <option value= 41 >41</option>
					 <option value= 42 >42</option>
					 <option value= 43 >43</option>
					 <option value= 44 >44</option>
					 <option value= 45 >45</option>
					 <option value= 46 >46</option>
					 <option value= 47 >47</option>
					 <option value= 48 >48</option>
					 <option value= 49 >49</option>
					 <option value= 50 >50</option>
					 <option value= 51 >51</option>
					 <option value= 52 >52</option>
					 <option value= 53 >53</option>
					 <option value= 54 >54</option>
					 <option value= 55 >55</option>
					 <option value= 56 >56</option>
					 <option value= 57 >57</option>
					 <option value= 58 >58</option>
					 <option value= 59 >59</option>
					</select>																	
					</p>
		
					<button type="reset" id="btConf-${indice}" class="btn btn-secondary" disabled onclick = "altera(${indice})" >Confirmar Alteração</button>				
					
					<button type="reset" id="btCanc-${indice}" class="btn btn-secondary" onclick = "cancAlt(${indice})">Cancelar</button>				
					</form>
				
				</td>						
						`;
		gravaTempBD(indice);				
		carregaTemp(indice);
		bdTemp = [];
}

//função para gravar alteração.
function altera(indice){
	var altBD =[];
	
	//variaveis para parâmetros de status e valor na inclusão.
	var status = bdAgenda[indice].status;
	var progress = bdAgenda[indice].progress;
	
	//faz uma cópía do banco de dados
	for (var i = 0; i < bdAgenda.length; i++){
		altBD[i] = bdAgenda[i];
	}
	
	var altEle = altBD.splice(indice, 1);
	var tdBOX = document.getElementById("interation-table-"+indice);
	
	//se não existir nenhum erro.
	if (dadovazio(indice) && maxtemp(indice) && mintemp(indice) && validatemp(indice, altBD)){
		bdAgenda.splice(indice, 1); // excui o elemento sem alteração.
		incluir(indice,bdAgenda, status, progress);//faz a inclusão dos dados alterados.
		ordenar(bdAgenda); // ordena
		
		localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda)); // grava no local storage
		bdTemp = []; //reinicia a arrey temporária.
		tdBOX.innerHTML = "";
		tdBOX.hidden = true;
		alert("Inclusão de dados realizada");
		
	} else{
		bdTemp = [];
		tdBOX.innerHTML = "";
		tdBOX.hidden = true;
	}
	
	ExibeAgenda();	
}

//função para os botões cancelar.
function cancAlt(indice){
	var tdBOX = document.getElementById("interation-table-"+indice);
	tdBOX.innerHTML = "";
	bdTemp = [];
	tdBOX.hidden = true;
}

//exibir frame de interação na mudança do range.
function frameRange(indice){

	var tdBOX = document.getElementById("interation-table-"+indice);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
		<td colspan = "4">
			<button type="reset" id="btConfRange-${indice}" class="btn btn-secondary" onclick = "mudaRange(${indice}, bdAgenda)">Gravar progresso</button>				
			<button type="reset" id="btCancRange-${indice}" class="btn btn-secondary" onclick = "cancRange(${indice}, bdAgenda)"> Cancelar</button>
		</td>						
						`;	
}

//grava qdo o usuário mudar o range na agenda
function mudaRange(indice, bdAgenda){
	var tdBOX = document.getElementById("interation-table-"+indice);
	var newrange = document.getElementById("statusbar"+indice).value;
	
	bdAgenda[indice].progress = newrange;
	localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda)); // grava no local storage
	tdBOX.innerHTML = "";
	tdBOX.hidden = true;
}

//cancela a mudança do range e carrega valor original.
function cancRange (indice, bdAgenda){
	document.getElementById("statusbar"+indice).value = bdAgenda[indice].progress;	
	cancAlt(indice);
}


//=================================================================================
//TIMER

//objeto do Timer
var pTimer = {nAtividade: -1, // qual atividade.
	tamanhoAtivi: 0, // tamanho da atividade em segundos.
	tempoInicio: 0, // hora que começa a atividade.
	ultimoTempo: 0, // ultimo loop de verificação do tempo
	progress: 0, // percentual concluido
	tRest: 0, // tempo restante para o fim da atividade
	status: 0, //0 não iniciado, 1 em adamento, 2 pausado, 3 concluido
	tEstudo: 0, //tempo estudado
	tPomod: 0, // tempo de estudo continuo (sem STOP).
	tPausa: 0 //tempo pausado em segundos.	
}; //objeto Timer

//função para startar o timer
function playTimer (indice) {
	var agora = new Date();
	var hora = agora.getHours() * 3600
	var minuto = agora.getMinutes() * 60;
	var segundo = agora.getSeconds();	
	agora = hora + minuto + segundo; //tempo em segundos.
	
	bdAgenda[indice].status = 1;	
	//alteraPlay(0); // desabilita todos os botões play
	showButtons();

	
	
	document.getElementById(`btn-p-${indice}`).hidden = true; //esconde botão play
	document.getElementById(`btn-s-${indice}`).hidden = false; // apresenta botão stop
			
	pTimer.nAtividade = indice;
	pTimer.tamanhoAtivi = (bdAgenda[indice].fim.tempo - bdAgenda[indice].inicio.tempo)*60;
	pTimer.progress =bdAgenda[indice].progress
	//pTimer.status = bdAgenda[indice].status;
	pTimer.tempoInicio = agora;
	pTimer.ultimoTempo = pTimer.tempoInicio;
	pTimer.tEstudo = pTimer.tamanhoAtivi * pTimer.progress;
	pTimer.tRest = pTimer.tamanhoAtivi - pTimer.tEstudo;
	
	document.getElementById("AtivName").innerHTML = `<i>${bdAgenda[indice].nome}</i>`

	
	//chama a função de contagem regressiva.
	meuIntervalo = setInterval(loopTimer, 1000, pTimer, indice);
	
}

//função para interromper o timer.	
function paraTimer(){
	clearInterval(meuIntervalo);	
}

//função que mostra contagem regressiva e grava progresso.
function loopTimer(pTimer, indice){
	
		var agoraloop = new Date();
		var horaloop = agoraloop.getHours() * 3600
		var minutoloop = agoraloop.getMinutes() * 60;
		var segundoloop = agoraloop.getSeconds();	
		agoraloop = horaloop + minutoloop + segundoloop; //tempo em segundos dentro do loop
		
		pTimer.tPomod += agoraloop - pTimer.ultimoTempo;
		pTimer.tEstudo += agoraloop - pTimer.ultimoTempo; // acrescenta tempo de estudo.
		pTimer.ultimoTempo = agoraloop;
		pTimer.progress =pTimer.tEstudo / pTimer.tamanhoAtivi;
		pTimer.tRest = pTimer.tamanhoAtivi - pTimer.tEstudo;
		
		veriMomento(pTimer.tPomod)
			
		
		if (pTimer.tRest < 0){
			stopAtividade (indice)						
			document.getElementById("AtivName").innerHTML = `PARABÉNS! TAREFA CONCLUÍDA!<br>Escolha a próxima atividade`;
			paraTimer();
			
		//separa o tempo restante em horas minutos e segundo para imprimir formatado.
		} else {
			var h = pTimer.tRest;
			var m = parseInt(h) % 3600;
			var s = parseInt(m) % 60;
			document.getElementById('timer').innerHTML = `${parseInt(h / 3600)} : ${parseInt(m / 60)} : ${s}`;
		}
		bdAgenda[indice].progress = pTimer.progress; // atualiza o progresso no banco de dados
		document.getElementById("statusbar"+indice).value = bdAgenda[indice].progress; // atualiza o status bar da agenda		
		localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda)); // armazena no JSON
		document.getElementById("tprogress").style = `width: ${parseInt(pTimer.progress * 100)}%` // atualiza barra de progresso
		document.getElementById("tprogress").innerHTML = `${parseInt(pTimer.progress * 100)}%`
		
		
}

//função para desabilitar botões da agenda.
function alteraPlay(opcao){
	
	// se 0 desativa todos os botões Play
	if (opcao == 0){	
		for (var i = 0; i < bdAgenda.length; i++){			
			document.getElementById(`btn-p-${i}`).disabled = true;			
		}//end for
	//se diferente de 0 habilita todos os botões.
	} else {
		for (var i = 0; i < bdAgenda.length; i++){			
			document.getElementById(`btn-p-${i}`).disabled = false;			
		}//end for
	}
}

//função para stopar atividade.
function stopAtividade (indice){	
	paraTimer();
	
	bdAgenda[indice].status = 0;
	
	showButtons();
	
	document.getElementById("AtivName").innerHTML = `<i>Escolha a Atividade</i>`;
	document.getElementById('timer').innerHTML = ``;
	document.getElementById("time-pomodoro").innerHTML = ``
	
	//alteraPlay(1); // reabilita todos os plays;
	
	//document.getElementById(`btn-p-${indice}`).hidden = false; //apresenta botão play
	//document.getElementById(`btn-s-${indice}`).hidden = true; // esconde botão stop	
}

//função para exibir ou desabilitar botões.
function showButtons(){
	
	var statusPlay = 0;
	
	for (var i = 0; i < bdAgenda.length; i++){
		if(bdAgenda[i].status == 1){
			document.getElementById(`btn-p-${i}`).hidden = true;//botão play
			document.getElementById(`btn-s-${i}`).hidden = false;
			
			document.getElementById(`btn-exc-${i}`).disabled = true;
			document.getElementById(`btn-exc-${i}`).disabled = true;
			document.getElementById(`btn-alt-${i}`).disabled = true;
			document.getElementById(`statusbar${i}`).disabled = true;
			statusPlay = 1;
		} else{
			document.getElementById(`btn-p-${i}`).hidden = false;//botão play
			document.getElementById(`btn-s-${i}`).hidden = true;
			
			document.getElementById(`btn-exc-${i}`).disabled = false;
			document.getElementById(`btn-exc-${i}`).disabled = false;
			document.getElementById(`btn-alt-${i}`).disabled = false;
			document.getElementById(`statusbar${i}`).disabled = false;			
		}		
	}//end for
	
	if (statusPlay == 1){
		alteraPlay(0); // desabilita todos os plays;		
	} else{
		alteraPlay(1); 	
	}	
	
}

//=================================================================================
//Método Pomodoro

//objeto Pomodoro
var pomodoroTimes = {
	tEstudo: 25 * 60,
	pausaCurta: 5 * 60,
	pausaLonga: 30 * 60}

//objeto que define os intervalos de estudo e pausa.
var pIntervalos = {	
	tEst1: 0,
	tpausa1: pomodoroTimes.tEstudo,
	tEst2: pomodoroTimes.tEstudo * 1 + pomodoroTimes.pausaCurta * 1,
	tpausa2: pomodoroTimes.tEstudo * 2 + pomodoroTimes.pausaCurta * 1,
	tEst3: pomodoroTimes.tEstudo * 2 + pomodoroTimes.pausaCurta * 2,
	tpausa3: pomodoroTimes.tEstudo * 3 + pomodoroTimes.pausaCurta * 2,
	tEst4: pomodoroTimes.tEstudo * 3 + pomodoroTimes.pausaCurta * 3,
	tpausa4: pomodoroTimes.tEstudo * 4 + pomodoroTimes.pausaCurta * 3,
	tfinal: pomodoroTimes.tEstudo * 4 + pomodoroTimes.pausaCurta * 3 + pomodoroTimes.pausaLonga,
}

//função que verifica se é momento de pausa ou estudo.
function veriMomento(tSemStop){	
	//verifica qual é a rodada (começa com 0);
	var i = parseInt(tSemStop / pIntervalos.tfinal);
	
	//verifica se está em momento de estudo.	
	if ((tSemStop >=  pIntervalos.tEst1 + pIntervalos.tfinal * i && tSemStop < pIntervalos.tpausa1 + pIntervalos.tfinal * i) ||
		(tSemStop >=  pIntervalos.tEst2 + pIntervalos.tfinal * i && tSemStop < pIntervalos.tpausa2 + pIntervalos.tfinal * i) ||
		(tSemStop >=  pIntervalos.tEst3 + pIntervalos.tfinal * i && tSemStop < pIntervalos.tpausa3 + pIntervalos.tfinal * i) ||
		(tSemStop >=  pIntervalos.tEst4 + pIntervalos.tfinal * i && tSemStop < pIntervalos.tpausa4 + pIntervalos.tfinal * i) ) {
			document.getElementById("time-pomodoro").innerHTML = `
				<table class = "table bg-success text-center text-white">					
					<tr>
						<td><b>Momento Estudo/Atividade </b></td>							
					</tr>	
				</table>`
				
	//verifica se está na pausa longa.	
	} else if(tSemStop >= pIntervalos.tpausa4 && tSemStop < pIntervalos.tfinal + pIntervalos.tfinal * i){
				document.getElementById("time-pomodoro").innerHTML = `
				<table class = "table bg-danger text-center text-white">					
					<tr>
						<td><b>Pausa LONGA</b></td>							
					</tr>	
				</table>`	
				
	//se não apresenta que é momento de pausa
	} else {
				document.getElementById("time-pomodoro").innerHTML = `
				<table class = "table bg-danger text-center text-white">					
					<tr>
						<td><b>Pausa CURTA</b></td>							
					</tr>	
				</table>`		
	}
} // fim da função veriMomento


