// Quando ouver algum envio de formulário executar essa função.
function onSpreadsheetSubmit(e) {
  const user = getUser(e);
  
  // Checa se o envio e de uma pessoa precisando de ajuda, se sim envia um email.
  if (user.type == 'Não lidero e nem participo de uma iniciativa solidária e preciso de ajuda.') {
    sendEmail(user);
  }
}

// Obter os dados do usuario que enviou o formulário.
function getUser(e) {
  const email = e.namedValues['Endereço de e-mail'][0]
  const name = e.namedValues['Insira seu nome'][1]
  const type = e.namedValues['Eu:'][1]
  const primarySuport = e.namedValues['De que forma você está precisando de ajuda?'][0]
  const group = e.namedValues['A qual grupo você faz parte?'][0]
  const othersSuport = e.namedValues['Quais outras coisas você está precisando?']
  
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
  
  supporters = getSupporters(user);
  // Logger.log(supporters);
   
  var result = '<!DOCTYPE html><html><head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></head> <body>'
  
  var result = result + '<p>Olá ' + user.name +', recebemos seu cadastro no Existe amor em Curitiba</p><p>Eu selecionei algumas pessoas que estão prontas para te ajudar =), segue:</p>'
  var result = result + '<br><table border="1"> <tr> <th>Tipo de ajuda</th> <th>Grupo</th> <th>Região</th> <th>Nome</th> <th>Contato</th> <th>Descrição</th></tr>'
  
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
  
  var result = result + '</table>'
  var result = result + '<br> <p>Que tal manda um oi para elas?</p><br><br><p>Existe Amor em Curitiba 💟</p>'
  var result = result + '</body></html>'
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
    
    if (data[i][3] == 'Não lidero e nem participo de uma iniciativa solidária mas quero ajudar.') { 
      if (data[i][22] == user.primarySuport) {
        peoplePrimarySupporters.push({ primarySuport: data[i][22], primaryGroup: data[i][23], region: data[i][24], description: data[i][25], name: data[i][26], contact: data[i][27], othersSupport: data[i][28], otherGroups: data[i][29] })
      }
      
    }
    if (data[i][3] == 'Lidero ou participo de uma iniciativa solidária e estou oferecendo ajuda.') {
      if (data[i][4] == user.primarySuport) {
        orgnizationsSupporters.push({ primarySuport: data[i][4], primaryGroup: data[i][5], region: data[i][6], description: data[i][7], name: data[i][8], contact: data[i][9], othersSupport: data[i][10], otherGroups: data[i][11] })
      }
      /*
      var supportSecondary = data[i][11].split(',')
      var publicSecondary = data[i][12].split(',')
      for (support of supportSecondary) {
        if (support == user.primarySuport) {
         for (public of publicSecondary) {
          if (public == user.group || public == 'Todas as Pessoas' ) { 
           orgnizationsSupporters.push({ primarySuport: data[i][11], primaryGroup: data[i][12], region: data[i][6], description: data[i][7], name: data[i][8], contact: data[i][9], othersSupport: data[i][10], otherGroups: data[i][11] })
           break
          }
         } 
        
      }*/
      
    }
  }
  
  var peoplePrimarySupporters = peoplePrimarySupporters.filter((supporter) => { if (supporter.primaryGroup == user.group || supporter.primaryGroup == 'Todas as Pessoas') return supporter }).reverse();
  var orgnizationsSupporters = orgnizationsSupporters.filter((supporter) => { if (supporter.primaryGroup == user.group || supporter.primaryGroup == 'Todas as Pessoas') return supporter }).reverse();
  organizationsSupportSecondary.reverse();
  var supporters = {people: {primary: peoplePrimarySupporters, others: peopleSupportSecondar}, organizations: {primary: orgnizationsSupporters, others: organizationsSupportSecondary}};
  return supporters
}