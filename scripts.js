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
        data.reminders.forEach(item => insertList(
            item.name,
            item.description,
            item.interval,
            item.send_email,
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
        inputRecurring
      ) => {
        const formData = new FormData();
        formData.append('name', inputName);
        formData.append('description', inputDescription);
        formData.append('interval', inputInterval);
        formData.append('send_email', inputSendEmail);
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
            const nameItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm('Você tem certeza?')) {
              div.remove()
              deleteReminder(nameItem)
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
      const deleteReminder = (item) => {
        let url = 'http://127.0.0.1:5000/delete?name=' + item;
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
            const nameItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm('Você confirma as alterações?')) {
              updateReminder(nameItem)
              alert('Lembrete atualizado!')
            }
          }
        }
      }

      /*
        ------------------------------------------------------------------------
        Função que faz a requisição de atualizar o lembrete ao servidor.
        ------------------------------------------------------------------------
      */
        const updateReminder = (item) => {
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
        Função para adicionar um novo lembrete 
        ------------------------------------------------------------------------
      */
      const newReminder = () => {
        let inputName = document.getElementById('newName').value;
        let inputDescription = document.getElementById('newDescription').value;
        let inputInterval = document.getElementById('newInterval').value;
        let inputSendEmail = document.getElementById('newSendEmail').checked;
        let inputRecurring = document.getElementById('newRecurring').checked;
        let showSendEmail = inputSendEmail ? 'Sim' : 'Não';
        let showRecurring = inputRecurring ? 'Sim' : 'Não';
      
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
        } else {
          postItem(
            inputName,
            inputDescription,
            inputInterval,
            inputSendEmail,
            inputRecurring
          )
          insertList(
            inputName,
            inputDescription,
            inputInterval,
            showSendEmail,
            showRecurring
          )
          alert('Lembrete adicionado!')
        }
      }
      
      /*
        ------------------------------------------------------------------------
        Função para inserir items na lista apresentada no frontend
        ------------------------------------------------------------------------
      */
      const insertList = (
        name,
        description,
        interval,
        sendEmail,
        recurring
      ) => {
        var item = [name, description, interval, sendEmail, recurring]
        var table = document.getElementById('myTable');
        var row = table.insertRow();
      
        for (var i = 0; i < item.length; i++) {
          var cel = row.insertCell(i);
          cel.textContent = item[i];
        }
        insertButton(row.insertCell(-1));
        insertEditButton(row.insertCell(-1))
        document.getElementById('newName').value = '';
        document.getElementById('newDescription').value = '';
        document.getElementById('newInterval').value = '';
        document.getElementById('newSendEmail').value = '';
        document.getElementById('newRecurring').value = '';
      
        removeElement()
      }
