/*
  ------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  ------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/reminders';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data?.reminders?.forEach(item => insertList(
            item.id,
            item.name,
            item.description,
            item.interval,
            item.send_email,
            item.email,
            item.recurring
          )
        )
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    ----------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    ----------------------------------------------------------------------------
  */
  getList()
  
   /*
    ----------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    ----------------------------------------------------------------------------
  */
    const postItem = async (
        inputName,
        inputDescription,
        inputInterval,
        inputSendEmail,
        inputEmail,
        inputRecurring
      ) => {
        const formData = new FormData();
        formData.append('name', inputName);
        formData.append('description', inputDescription);
        formData.append('interval', inputInterval);
        formData.append('send_email', inputSendEmail);
        formData.append('email', inputEmail);
        formData.append('recurring', inputRecurring);
        let url = 'http://127.0.0.1:5000/create';
        fetch(url, {
          method: 'post',
          body: formData
        })
          .then((response) => response.json())
          .catch((error) => {
            console.log(body);
            alert('Error:', error);
          });
      }
      
      /*
        ------------------------------------------------------------------------
        Função para criar um botão remove para cada item da lista
        ------------------------------------------------------------------------
      */
      const insertButton = (parent) => {
        let span = document.createElement('span');
        let txt = document.createTextNode('\u00D7');
        span.className = 'remove';
        span.appendChild(txt);
        parent.appendChild(span);
      }

      /*
        ------------------------------------------------------------------------
        Função para criar um botão edit para cada item da lista
        ------------------------------------------------------------------------
      */
        const insertEditButton = (parent) => {
          let span = document.createElement('span');
          let txt = document.createTextNode('*');
          span.className = 'edit';
          span.appendChild(txt);
          parent.appendChild(span);
        }
      
      /*
        ------------------------------------------------------------------------
        Função para remover um item da lista a partir do clique no botão remove
        ------------------------------------------------------------------------
      */
      const removeElement = () => {
        let remove = document.getElementsByClassName('remove');
        let i;
        for (i = 0; i < remove.length; i++) {
          remove[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const idItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm('Você tem certeza?')) {
              div.remove()
              deleteReminder(idItem)
              alert('Removido!')
            }
          }
        }
      }
      
      /*
        ------------------------------------------------------------------------
        Função que faz a requisição de remover lembrete ao servidor.
        ------------------------------------------------------------------------
      */
      const deleteReminder = (id) => {
        let url = 'http://127.0.0.1:5000/delete?id=' + id;
        fetch(url, {
          method: 'delete'
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      /*
        ------------------------------------------------------------------------
        Função para editar um item da lista a partir do clique no botão edit.
        ------------------------------------------------------------------------
      */
      const updateElement = () => {
        let update = document.getElementsByClassName('edit');
        let i;
        for (i = 0; i < update.length; i++) {
          update[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const idItem = div.getElementsByTagName('td')[0].innerHTML;
            const nameItem = div.getElementsByTagName('td')[1].innerHTML;
            const descriptionItem = div.getElementsByTagName('td')[2].innerHTML;
            const intervalItem = div.getElementsByTagName('td')[3].innerHTML;
            const sendEmailItem = div.getElementsByTagName('input')[0].checked;
            const emailItem = div.getElementsByTagName('td')[5].innerHTML;
            const recurringItem = div.getElementsByTagName('input')[1].checked;
            openAndCloseModal(
              idItem,
              nameItem,
              descriptionItem,
              intervalItem,
              sendEmailItem,
              emailItem,
              recurringItem
            )
          }
        }
      }

      /*
        ------------------------------------------------------------------------
        Função que faz a requisição de atualizar o lembrete ao servidor.
        ------------------------------------------------------------------------
      */
        const updateReminder = (
          toUpdId,
          toUpdName,
          toUpdDescription,
          toUpdInterval,
          toUpdSendEmail,
          toUpdEmail,
          toUpdRecurring
        ) => {
          const formData = new FormData();
          formData.append('id', toUpdId);
          formData.append('name', toUpdName);
          formData.append('description', toUpdDescription);
          formData.append('interval', toUpdInterval);
          formData.append('send_email', toUpdSendEmail);
          formData.append('email', toUpdEmail);
          formData.append('recurring', toUpdRecurring);
          let url = 'http://127.0.0.1:5000/update'
          fetch(url, {
            method: 'put',
            body: formData
          })
            .then((response) => response.json())
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      
      /*
        ------------------------------------------------------------------------
        Função que abre ou fecha o modal de edição do lembrete.
        ------------------------------------------------------------------------
      */
      const openAndCloseModal = (
        id, name, description, interval, sendEmail, email, recurring
      ) => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        setModalInputsValues(
          id,
          name,
          description,
          interval,
          sendEmail,
          email,
          recurring
        );
        let span = document.getElementsByClassName('close')[0];
        span.onclick = function () {
          modal.style.display = 'none';
        }
      }

      /*
        ------------------------------------------------------------------------
        Função que fecha o modal de edição do lembrete.
        ------------------------------------------------------------------------
      */
      const closeModal = (span) => {
        span.onclick = function() {
          modal.style.display = 'none';
        }
      }

      /*
        ------------------------------------------------------------------------
        Função que captura os valores dos inputs da tabela e envia para o modal.
        ------------------------------------------------------------------------
      */
      const setModalInputsValues = (
        idToUpd, name, description, interval, sendEmail, email, recurring
      ) => {
        let modalId = document.getElementById('updId');
        let modalName = document.getElementById('updName');
        let modalDescrip = document.getElementById('updDescription');
        let modalInterval = document.getElementById('updInterval');
        let modalSendEmail = document.getElementById('updSendEmail');
        let modalEmail = document.getElementById('updEmail');
        let modalRecurring = document.getElementById('updRecurring');
        modalId.value = idToUpd;
        modalName.value = name;
        modalDescrip.value = description;
        modalInterval.value = interval;
        modalEmail.value = email;
        modalSendEmail.checked = sendEmail;
        modalRecurring.checked = recurring;
        toggleModalEmailInput();
      }
      updtBtn = document.getElementById('updBtn');
      updtBtn.onclick = function () {
        let idToUpd = document.getElementById('updId').value;
        let nameToUpd = document.getElementById('updName').value;
        let descripToUpd = document.getElementById('updDescription').value;
        let intervalToUpd = document.getElementById('updInterval').value;
        let sendEmailToUpd = document.getElementById('updSendEmail').checked;
        let emailToUpd = document.getElementById('updEmail').value;
        let recurringToUpd = document.getElementById('updRecurring').checked
        updateReminder(
          idToUpd,
          nameToUpd,
          descripToUpd,
          intervalToUpd,
          sendEmailToUpd,
          emailToUpd,
          recurringToUpd
        )
        location.reload()
          getList()
          alert('Lembrete atualizado!')
      }

      /*
        ------------------------------------------------------------------------
        Função para adicionar um novo lembrete 
        ------------------------------------------------------------------------
      */
      const newReminder = () => {
        let inputName = document.getElementById('newName').value;
        let inputDescription = document.getElementById('newDescription').value;
        let inputInterval = document.getElementById('newInterval').value;
        let inputSendEmail = document.getElementById('newSendEmail').checked;
        let inputEmail = document.getElementById('newEmail').value;
        let inputRecurring = document.getElementById('newRecurring').checked;
      
        if (
          inputName === '' 
          || inputDescription === '' 
          || inputInterval === ''
        ) {
          alert('Os campos nome, descrição e intervalo são obrigatórios!');
        } else if (isNaN(inputInterval)) {
          alert('O campo intervalo precisa ser numérico!');
        } else if (inputInterval.toString().length > 3) {
          alert('O intervalo precisa ser menor do que 1000!');
        }else if (inputSendEmail && !inputEmail) {
          alert('O campo enviar email foi selecionado, mas o email está vazio!');
        } else {
          postItem(
            inputName,
            inputDescription,
            inputInterval,
            inputSendEmail,
            inputEmail,
            inputRecurring
          )
          location.reload()
          getList()
          alert('Lembrete adicionado!')
        }
      }
      
      /*
        ------------------------------------------------------------------------
        Função para inserir items na lista apresentada no frontend
        ------------------------------------------------------------------------
      */
      const insertList = (
        id,
        name,
        description,
        interval,
        sendEmail,
        email,
        recurring
      ) => {
        let item = [id, name, description, interval, sendEmail, email, recurring]
        let table = document.getElementById('myTable');
        let row = table.insertRow();
      
        for (let i = 0; i < item.length; i++) {
          let cel = row.insertCell(i);
          if (item[i] === true || item[i] === false) {
            const boolItem = row.getElementsByTagName('td').item(i);
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('disabled', true);
            boolItem.append(checkBox);
            boolItem.classList.add('checkboxStyle');
            let getCheckBox = cel.getElementsByTagName('input')[0];
            getCheckBox.checked = item[i];
          } else {
            cel.textContent = item[i];
          }
        }
        insertButton(row.insertCell(-1));
        insertEditButton(row.insertCell(-1))
        document.getElementById('newId').value = '';
        document.getElementById('newName').value = '';
        document.getElementById('newDescription').value = '';
        document.getElementById('newInterval').value = '';
        document.getElementById('newSendEmail').value = '';
        document.getElementById('newEmail').value = '';
        document.getElementById('newRecurring').value = '';
      
        removeElement()
        updateElement()
      }

      /*
        ------------------------------------------------------------------------
        Função para exibir o campo email apenas quando enviar email for checked.
        ------------------------------------------------------------------------
      */
      const toggleEmailInput = () => {
        let sendEmailCheckBox = document.getElementById('newSendEmail');
        let emailElement = document.getElementById('newEmail');
        if (sendEmailCheckBox.checked) {
          emailElement.style.display = 'flex';
        } else {
          emailElement.style.display = 'none';
        }
      }

      /*
        ------------------------------------------------------------------------
        Função para exibir o campo email do modal apenas quando enviar email 
        for checked.
        ------------------------------------------------------------------------
      */
      const toggleModalEmailInput = () => {
        let updSendEmailCheckBox = document.getElementById('updSendEmail');
        let updEmailElement = document.getElementById('updEmail');
        if (updSendEmailCheckBox.checked) {
          updEmailElement.style.display = 'flex';
        } else {
          updEmailElement.style.display = 'none';
        }
      }
