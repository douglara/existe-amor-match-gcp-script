// Quando ouver algum envio de formulário executar essa função.
function onSpreadsheetSubmit(e) {
  const user = getUser(e);
  //Logger.log(user);
  
  // Checa se o envio e de uma pessoa precisando de ajuda, se sim envia um email.
  sendEmail(user);
}

// Obter os dados do usuario que enviou o formulário.
function getUser(e) {
  const email = e.namedValues['Endereço de e-mail'][0]
  const type = e.namedValues['Eu:'][1]
  var name = ''
  var primarySuport = ''
  var group = ''
  var othersSuport = ''
  if (type == 'Não lidero e nem participo de uma iniciativa solidária e preciso de ajuda.') { 
    var name = e.namedValues['Insira seu nome'][1]
    var primarySuport = e.namedValues['De que forma você está precisando de ajuda?'][0]
    var group = e.namedValues['A qual grupo você faz parte?'][0]
    var othersSuport = e.namedValues['Quais outras coisas você está precisando?'] 
  }
  else if (type == 'Lidero ou participo de uma iniciativa solidária e estou precisando de ajuda.') { 
    var primarySuport = e.namedValues['O que a sua rede está precisando?'][0]
    var group = e.namedValues['Qual o público-alvo principal da sua iniciativa?'][1]
    var othersSuport = e.namedValues['Quais outras coisas você está precisando?'] 
  }
  else if (type == 'Não lidero e nem participo de uma iniciativa solidária mas quero ajudar.') {
    var name = e.namedValues['Insira seu nome'][1]
    var primarySuport = e.namedValues['De que forma você pode ajudar?'][0]
    var group = e.namedValues['Qual o público principal que poderá ser mais beneficiado pela sua ajuda?'][0]
    var othersSuport = e.namedValues['Quais outras formas de apoio a sua ajuda atende?'] 
  }
  else if (type == 'Lidero ou participo de uma iniciativa solidária e estou oferecendo ajuda.') {
    var name = e.namedValues['Insira seu nome'][1]
    var primarySuport = e.namedValues['Qual a principal forma de ajuda da sua iniciativa?'][0]
    var group = e.namedValues['Qual o público-alvo principal da sua iniciativa?'][0]
    var othersSuport = e.namedValues['Quais outros públicos a sua iniciativa atende?'] 
  }
  
  return { email, name, type, primarySuport, othersSuport, group }
}

// Envia email com a lista das organizações e pessoas dispostas a ajudar.
function sendEmail(user) {
    MailApp.sendEmail({
      to: user.email,
      subject: ('Oii ' + user.name +' aqui é do Existe Amor em Curitiba'),
      htmlBody: createEmailContent(user),
    });
}

// Constroi o conteudo do email.
function createEmailContent(user) { 
  var result = '<!DOCTYPE html><html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></head> <body>'  
  var result = result + '<p>Olá ' + user.name +', Recebemos o seu cadastro na plataforma #existeamor :)</p><p>Selecionamos abaixo algumas pessoas e redes já inscritas na plataforma que você já pode se conectar.</p><p>De qualquer forma, convidamos você a sempre acessar ao site pois diariamente temos novos cadastros com novas redes ou pessoas oferecendo e precisando de ajuda. </p>'
  var result = result + createTable(user)
  var result = result + '</body></html>'
  return result
}

// Cria tabela
function createTable(user){
  supporters = getSupporters(user);
  var result = '<br><table border="1"> <tr> <th>Tipo de ajuda</th> <th>Grupo</th> <th>Região</th> <th>Nome</th> <th>Contato</th> <th>Descrição</th></tr>'
  
  if (user.type == 'Não lidero e nem participo de uma iniciativa solidária e preciso de ajuda.' || user.type == 'Lidero ou participo de uma iniciativa solidária e estou precisando de ajuda.') {
    // Acrescenta organizações na tabela.
    for (var i = 0; i < supporters.organizations.primary.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].description +'</td></tr>'
    }
    
    // Acrescenta pessoas na tabela.
    for (var i = 0; i < supporters.people.primary.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].description +'</td></tr>'
    }
    
    // Acrescenta organizações que também podem ajudar na tabela.
    for (var i = 0; i < supporters.organizations.others.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].description +'</td></tr>'
    }
  }
  else {
    // Acrescenta organizações na tabela.
    for (var i = 0; i < supporters.organizations.primary.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.primary[i].description +'</td></tr>'
    }
    
    // Acrescenta pessoas na tabela.
    for (var i = 0; i < supporters.people.primary.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.people.primary[i].description +'</td></tr>'
    }
    
    // Acrescenta organizações que também podem ajudar na tabela.
    for (var i = 0; i < supporters.organizations.others.length; i++) {
      var result = result + '<tr><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].primarySuport +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].primaryGroup +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].region +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].name +'</td> <td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].contact +'</td><td style="padding-right: 10px; padding-left: 10px;">'+ supporters.organizations.others[i].description +'</td></tr>'
    }
  }
  
  var result = result + '</table>'
  return result
}

// Obtem as ajudas que dão match
function getSupporters(user) {
  
  var sheet = SpreadsheetApp.getActive().getSheetByName('Respostas');
  var data = sheet.getDataRange().getValues();
  
  var orgnizationsSupporters = []
  var organizationsSupportSecondary = []
  var peoplePrimarySupporters = []
  var peopleSupportSecondar = []
  
  for (var i = 0; i < data.length; i++) {
    if (user.type == 'Não lidero e nem participo de uma iniciativa solidária e preciso de ajuda.' || user.type == 'Lidero ou participo de uma iniciativa solidária e estou precisando de ajuda.') {
      if (data[i][3] == 'Não lidero e nem participo de uma iniciativa solidária mas quero ajudar.') { 
        if (data[i][22] == user.primarySuport && (data[i][23] == user.group || data[i][23] == 'Todas as Pessoas')) {
          peoplePrimarySupporters.push({ primarySuport: data[i][22], primaryGroup: data[i][23], region: data[i][24], description: data[i][25], name: data[i][26], contact: data[i][27], othersSupport: data[i][28], otherGroups: data[i][29] })
        }
        
      }
      if (data[i][3] == 'Lidero ou participo de uma iniciativa solidária e estou oferecendo ajuda.') {
        if (data[i][4] == user.primarySuport && (data[i][5] == user.group || data[i][5] == 'Todas as Pessoas')) {
          orgnizationsSupporters.push({ primarySuport: data[i][4], primaryGroup: data[i][5], region: data[i][6], description: data[i][7], name: data[i][8], contact: data[i][9], othersSupport: data[i][10], otherGroups: data[i][11] })
        }      
      }
    }
    else {
      if (data[i][3] == 'Não lidero e nem participo de uma iniciativa solidária e preciso de ajuda.') { 
        if (data[i][30] == user.primarySuport && (data[i][31] == user.group || data[i][31] == 'Todas as Pessoas') ) {
          peoplePrimarySupporters.push({ primarySuport: data[i][30], primaryGroup: data[i][31], region: data[i][32], description: data[i][33], name: data[i][34], contact: data[i][35], othersSupport: '', otherGroups: '' })
        }
      }
      
      if (data[i][3] == 'Lidero ou participo de uma iniciativa solidária e estou precisando de ajuda.') {
        if (data[i][13] == user.primarySuport && (data[i][14] == user.group || data[i][14] == 'Todas as Pessoas')) {
          orgnizationsSupporters.push({ primarySuport: data[i][13], primaryGroup: data[i][14], region: data[i][15], description: data[i][16], name: data[i][17], contact: data[i][18], othersSupport: '', otherGroups: '' })
        }      
      }
      
    }
  }
  
  peoplePrimarySupporters.reverse();
  orgnizationsSupporters.reverse();
  organizationsSupportSecondary.reverse();
  var supporters = {people: {primary: peoplePrimarySupporters, others: peopleSupportSecondar}, organizations: {primary: orgnizationsSupporters, others: organizationsSupportSecondary}};
  return supporters
}