const entry_s = [];

const exit_s = [];

let loadApp = ()=>{
    loadHeader();
    loadEntry();
    loadExit();
}

let totalEntry = ()=>{
    let totalEntry = 0;
    for(let entry of entry_s){
        totalEntry += entry.value;
    }
    return totalEntry;
}

let totalExit = ()=>{
    let totalExit = 0;
    for(let exit of exit_s){
        totalExit += exit.value;
    }
    return totalExit;
}

let loadHeader = ()=>{
    let budget = totalEntry() - totalExit();
    let percentageExit = totalExit()/totalEntry();
    document.getElementById('budget').innerHTML = moneyFormat(budget);
    document.getElementById('percentage').innerHTML = percentageFormat(percentageExit);
    document.getElementById('entry').innerHTML = moneyFormat(totalEntry());
    document.getElementById('exit').innerHTML =
    moneyFormat(totalExit());
}

const moneyFormat = (value)=>{
    return value.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const percentageFormat = (value)=>{
    return value.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const loadEntry = ()=>{
    let entryHTML = '';
    for (let entry of entry_s){
        entryHTML += createEntryHTML(entry);
    }
    document.getElementById('entry-list').innerHTML = entryHTML;
}

const createEntryHTML = (entry)=>{
    let entryHTML = `
    <div class="element cleanStyle">
    <div class="element_description">${entry.description}</div>
    <div class="right cleanStyle">
        <div class="element_value">${moneyFormat(entry.value)}</div>
        <div class="element_remove">
            <button class="element_remove--btn"><i class="far fa-times-circle" onclick='delEntry(${entry.id})'></i></button>
        </div>
    </div>
    </div>
    `;
    return entryHTML;
}

const delEntry = (id)=>{
    let idEntry = entry_s.findIndex(entry => entry.id === id);
    entry_s.splice(idEntry, 1);
    loadHeader();
    loadEntry();
}

const loadExit = ()=>{
    let exitHTML = '';
    for (let exit of exit_s){
        exitHTML += createExitHTML(exit);
    }
    document.getElementById('exit-list').innerHTML = exitHTML;
}

const createExitHTML = (exit)=>{
    let exitHTML = `
    <div class="element cleanStyle">
        <div class="element_description">${exit.description}</div>
        <div class="right cleanStyle">
            <div class="element_value">${moneyFormat(exit.value)}</div>
            <div class="element_percentage">${percentageFormat(exit.value/totalEntry())}</div>
            <div class="element_remove"><button class="element_remove--btn"><i class="far fa-times-circle" onclick='delExit(${exit.id})'></i></button></div>
        </div>
    </div>
    `;
    return exitHTML;
}

const delExit = (id)=>{
    let idExit = exit_s.findIndex(exit => exit.id === id);
    exit_s.splice(idExit, 1);
    loadHeader();
    loadExit();
}

let addData = ()=>{
    let form=document.forms['form'];
    let type= form['type'];
    let description = form['description'];
    let value = form['value'];

    if(description.value !== '' && value.value !== ''){
        if(type.value === 'entry'){
            entry_s.push(new Entry(description.value, +value.value));
            loadHeader();
            loadEntry();
        }
        else if(type.value === 'exit'){
            exit_s.push(new Exit(description.value, +value.value));
            loadHeader();
            loadExit();
        }
    }
}