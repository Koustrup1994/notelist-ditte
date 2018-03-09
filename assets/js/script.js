function getLocal() {
  var notes = localStorage.getItem('noteList');

  if(notes != null) {
      return JSON.parse(notes);
  }
  else {
    return [];
  }
}

function setLocal(origNotes) {
  var newNotes = JSON.stringify(origNotes);
  localStorage.setItem('noteList', newNotes);
}

function submitNote(inputText, inputDate, inputImportant, inputIcon) {
  var origNotes = getLocal();
  var newNote = {
    text:       inputText,
    date:       inputDate,
    important:  inputImportant,
    icon:       inputIcon
  };
  origNotes.push(newNote);

  setLocal(origNotes);
}

//setLocal('Cry', '2018-04-03 11:11:11', true, 'empire');

function buildList() {
  var notes = getLocal();

  var ulElm = document.querySelector('ul');
  ulElm.innerHTML = '';

  for(var i = 0; i < notes.length; i++) {
    var liElm = document.createElement('li');
    var pElm = document.createElement('p');
    var delBtn = document.createElement('button');
    var btnText = document.createTextNode('Edit');

    if(notes[i].important === true) {
      liElm.style.backgroundColor = 'deeppink';
      liElm.style.color = 'white';
    }

    pElm.innerHTML = notes[i].text;
    pElm.classList.add('pinkUnicorn');
    pElm.setAttribute('data-index', i);

    pElm.addEventListener('click', function(event) {
      var index = event.target.getAttribute('data-index')
      var notes = getLocal();
      console.log(notes[index]);
      notes[index].text = "Changed";
      var inputTemp = document.querySelector('#noteText');
      inputTemp.value = 'whatever';
      setLocal(notes);
      buildList();
    });

    liElm.appendChild(pElm);
    liElm.appendChild(delBtn);
    delBtn.appendChild(btnText);

    if(notes[i].date !== '') {
      var pDateElm = document.createElement('p');
      pDateElm.innerHTML = notes[i].date;
      liElm.appendChild(pDateElm);
    }

    ulElm.appendChild(liElm);
  }
}

window.onload = function() {
  buildList();
}

var submitBtn = document.querySelector('#addNote');

submitBtn.addEventListener('click', function() {
  var text = document.querySelector('#noteText');
  var important = document.querySelector('#noteImportant');
  var date = document.querySelector('#noteTime');

  submitNote(text.value, date.value, important.checked, 'empire');
  buildList();

  text.value = '';
  date.value = '';
  important.checked = false;
})
