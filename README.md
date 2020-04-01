# Projeto Existe Amor
![enter image description here](https://i.imgur.com/Nevxi8a.jpg)

Para saber mais sobre o projeto [clique aqui.](https://sites.google.com/view/existeamoremcuritiba)
# Match GCP Script
Esse script foi desenvolvido para realizar o match entre pessoas e organizações que precisam de alguma ajuda ou podem ajudar de alguma forma utilizando a Google Cloud Platform.

Ele foi construído para trabalhar em conjunto com a planilha, estrutura de de dados e formulários oficias do projeto.

Qualquer dúvida ou sugestões podem ser enviadas aqui pelo Github via issues ou para o email de contato oficial: existeamor.curitiba@gmail.com

# Como instalar o script

Após realizar a copia do formulário oficial, crie ou abra sua planilha do Google sheets para armazenar os dados do formulário.

A partir dessa planilha que o script vai rodar.

### 1 - Criar script

Confirme se a tabela onde o formulário grava as respostas esta com o nome **Respostas**

Em seguida para iniciar a instalação clique em **Ferramentas** e em seguida **Editor de script**

![enter image description here](https://i.imgur.com/b2UO8t6.png)
![enter image description here](https://i.imgur.com/V66mAX5.png)

### 2 - Salvando o script
Copie e cole o código do arquivo Código.gs aqui do Github para dentro do arquivo Código.gs do editor de scripts do Google.

Clique no botão de **Salvar** e coloque o nome para script de **Match script**

![enter image description here](https://lh3.googleusercontent.com/akq_eIp0isYgq5No-Tz9HTRLUmSuwnbroZ_RDCJOelus3116d5SnV4Qet4CZwecxvqSC9syHv_iXG9vjnToAwEiF5Q2TCK2QkM-D9_fd9Jy3guR41drFJTXsGcXjNwf_hWQyJm9QQuunj0zGotPleto5LGiSUzr4IM9_gcNXodK2P4Z2AHGoAT7t9dPH8xm9rKjfjn7bIhbMXcFINXbLjXJx47kXPuYiq3ynr2yWKytuy3EnLmCvyEdwO2ogBzZTRLNpdsdiaGWje7HaceksN0pdT1epuMj7YAw6vcvuVtQe4sCcsGWGeeEmQ_Uj14X-BeEFj70wapYk5h6U0oNmJSgiOwu_PaX5092e13LGWgDXRVunG6LD-1IeleugrwEa_ovWqEK0zIJeU80SxKilxBUVhpIRQM95i6EFVm5fcivbRVMOTMjJEYtvfFtx8BU4YICyIQGMJUu4Sba9vtTxMPPJa5QM_yO7BnFU7bovE-Uv8UrhgONRuvbSjz2cTNaYTpFig3gDsb-fKfNyHg5w4OgeIRtkrGgRRvtcDplO2-_i7xxaLqbZ-X2cB5qMV_7yaNIbFYKzgxqWAyXju4zqBL53blrc8citnCc__7aCQX6sduSntFQJ9XF_Ow4kkpyhFGegLKwQXxRSykoLyd6YtNwmgeZq7AFJSwUxVyBtvoURxbc-Kze5p4JtVY68QeWuUpxBAoL6eS_eV062XnlblGecDkC1iaX_fu0D3IEZRVi5VDK58_1PNqw=w1596-h860-no)


### 3 - Concedendo permissões para o script rodar
Para dar permissão pro o script rodar corretamente

Selecione **onSpreadsheetSubmit** na seleção de função e clique em **Executar** ao lado, isso vai pedir para você autorizar sua conta Google, siga as etapas de autorização conforme o Gif abaixo.

![enter image description here](https://lh3.googleusercontent.com/nSgL-n8ddrBbFf_KAukiBx3XS7c4XZetKJJNqB_mD2GJKmmTHwGlD63ysytWjnn5sUA1bHqTtzOT8-ggo0AwlTeR_QE8DwDBZpqchV00nmc-PKp6qWdtHzcPhtbk3SzzbGjrGy-O-9NYHqjYuhw6x1_EJNqKD00X3Npz5dNRanelMfBOdEQC3q2RHS5qRXytPFCINylcW2QLfPOfhvS27fwANpvpzrpbMICaXFJaYbjIzsAcfXqWZna5qhgcsB8tK9MGOupP9_Hcr4SUQ7IV72P39wGcFIPu9wLXC69yuDL97TNJiy5myFPOlr1zK4bdOauSfZvhYFimqbSrXeZZPJGXo9X4-huSQhkZ4GlkhxLM9cAX2hlfcJiH6yg3deAk9xQjFLf_00-DW16LgJsDRmHrGq9aCO308uB4bO9fSYYn_a7mZoiM9zARuseztG-M5w0b3BShSU7uLuz9Gvc38hhyawg5jCGP-153aY85shwAHuAjx33AA-HEvYszGyE-zmwIBbl-UjL8PyfSbPGqSkD2aRantTcyY3XqRC2Jm4JsvpVNaGWUMt1iYDZJPSxFEcL4oXowSQx6CBS8pR9JrruqvnECWuCUm0HDik0_BaH5AvpSE2KVXcmsyDMj2dl-dhKLx18AacCvUZknNQyex58QkoXdAC2WUMGWFGnHKY7L4iQrCMvsnPhz51V33z-LnXErvqrDOjwVCkMQzh7DbFOto2lvJo9rXP86Nb0HeaED2q2xqkrc9dU=w1667-h930-no)

### 4 - Configurando a execução automática
Agora vamos configurar para que o script seja executado toda vez que uma nova pessoa enviar sua necessidade de ajuda ou sua solidadriedade em ajudar.

Para isso no editor de scripts do Google, vá na opção de **Editar** e clique em **Acionadores do projeto atual**.

Isso vai abrir uma nova aba sem nenhum acionador configurado, vamos criar ele.

Na sua lateral direita, clique no botão azul **Adicionar acionador**

Na opção **Selecione o tipo de evento** selecione **Ao enviar o formulário**

E na opção **Configurações de notificação de falha** selecione **Receber notificação imediatamente**


![enter image description here](https://lh3.googleusercontent.com/m01m5RkGOsZBy_RwQUf0WTFgTDYjqc6wXNd5ksksPBcUaRRqBme1KP10xUdra3EuFaqTIQLCXZtZUQ_mhHp7wyejeZv2qFKlrdmkv5DXe86QVoXoQbN-KEpjRwc4rvu1TuvYctVGfDRpuVnIsfK7lk8EbUcqtx3NXElEvJFQpnEsRIilwAqUYYmQI4AUVTUu9G9B3nAedKYO7wIcA19IOXC8vYKuGSukgXASEQSh9--7ZpswjwAH1nq2vC4Y0MenYbBonPB0lI_QFksa9L6rWwVjvAu6Q-OGHWnM3H4GpiNie6xnYH_z8p0ekSSHxsMzl7kt_-nuAUzAllxaain0oLKQ6GnJcpyYJSHP8Y-76eosvEzFmqLAx0dh4l0163frBBfjjxMoGXfjg3v4m0CUlpQEVueMChXC21pHOvV2bzlut1bkFI5NpW25zZr1lGmO_QSxg6D0Mh6U1MON5DDNFY8aLVmS8hTsA48iIQnrWOLKBkTRUAOa4uMGnUSUD5vM0JVZg44LAqw9MrfXprfMAnuoPcQF7pAZnj1W9X8Av67InbBwZTEeX-lMsyVJPlKTFsw8tMHA8n6KRj9qpIn8ylPERfipE29WPBrGhw0fmuzGqJFgQEBql3mO5aPO00MzTrz6T8X271wrlDIDuvZwdjCtZvx7HqC79NpTAZbjS3yFCQWjcenMEj8Wi0yBzTOEdL49S01mkctdSvOpG7nZsa5QRbCJqiPhtCl8Aex3hl1dAAxqX_OlrWQ=w1846-h932-no)

### 5 - Tudo certo!
**Você** configurou o script de match =)

Faça um experimento no seu formulário para checar se tudo esta funcionando como o esperado.

![enter image description here](https://i.imgur.com/iDRN3Sf.jpg)

# Contribuir / Problemas?

Se você encontrar qualquer problema, dificuldade, sugestão ou bug, por favor abra uma issue no Github ou pode nos contatar diretamente pelo email oficial do projeto: existeamor.curitiba@gmail.com

Esse projeto tem a intenção de ser um espaço seguro e acolhedor para contribuições.
