var $btnAddTask = document.getElementById('btn-add');
var $inputField = document.getElementById('input-field');
var $todoList = document.getElementById('todoList');
var $hideItemsCheckbox = document.getElementById('checkboxHideItem');
var $btnDelAllCompleted = document.getElementById('btnDelAllCompleted');
var $btnDelAll = document.getElementById('btnDelAll');

$btnAddTask.addEventListener('click', function (event) {
    event.preventDefault();
    var inputResult = $inputField.value;
    if (!inputResult || inputResult.length === 0) {
        alert('YOU HAVE TO ENTER A TASK !');
        return;
    }

    $todoList.appendChild(createTodoItem(inputResult));
    $inputField.value = '';
});

$todoList.addEventListener('click', function (event) {
    if (!event.target) {
        return;
    }
    if (event.target.matches("a.del")) {
        event.target.parentElement.remove();
    } else if (event.target.matches("input.checkbox-item")) {
        var $span = event.target.parentElement.querySelector('span');
        if (event.target.checked) {
            $span.classList.add('task-done');
            if ($hideItemsCheckbox.checked) {
                $span.parentElement.parentElement.classList.add('hide-item');
            }
        } else {
            $span.classList.remove('task-done');
        }
    }
});

$hideItemsCheckbox.addEventListener('click', function () {
    var $hiddenItems = $todoList.querySelectorAll('li > label > input:checked');
    var hide = this.checked;
    $hiddenItems.forEach(function (item) {
        var classList = item.parentElement.parentElement.classList;
        if (hide) {
            classList.add('hide-item');
        } else {
            classList.remove('hide-item');
        }
     });
});

$btnDelAllCompleted.addEventListener('click', function () {
    var $hiddenItems = $todoList.querySelectorAll('li > label > input:checked');
    $hiddenItems.forEach(function (item) {
        item.parentElement.parentElement.remove();
    });
});

$btnDelAll.addEventListener('click', function () {
    var $items = $todoList.querySelectorAll('li');
    $items.forEach(function (item) {
        item.remove();
    });
});

// functions create elements
function createTodoItem(value) {
    var $li = document.createElement('li');
    $li.classList.add('task');
    $li.appendChild(createDeleteLink());
    $li.appendChild(createTextField(value));
    return $li;
}

function createDeleteLink() {
    var $link = document.createElement('a');
    $link.classList.add('del');
    $link.href = '#';
    return $link;
}

function createTextField(value) {
    var $label = document.createElement('label');
    $label.appendChild(createCheckbox());
    $label.appendChild(createSpan(value));
    return $label;
}

function createCheckbox() {
    var $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.classList.add('checkbox-item');
    return $checkbox;
}

function createSpan(value) {
    var $span = document.createElement('span');
    $span.textContent = value;
    return $span;
}