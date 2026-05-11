function getData(key){ return JSON.parse(localStorage.getItem(key) || '[]'); }
function setData(key,val){ localStorage.setItem(key, JSON.stringify(val)); }

function save(key, inputId){
  const v = document.getElementById(inputId).value.trim();
  if(!v) return alert('Enter value');
  const data = getData(key); data.push(v); setData(key,data);
  document.getElementById(inputId).value='';
  alert('Saved');
}

function fillSelect(id, key, multiple=false){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML='';
  getData(key).forEach(v=>{
    const o=document.createElement('option'); o.value=v; o.textContent=v; el.appendChild(o);
  });
}

window.onload = function(){
  fillSelect('companySelect','companies');
  fillSelect('brandSelect','brands');
  fillSelect('storeSelect','stores');
};

function saveEntry(){
  const stores = Array.from(document.getElementById('storeSelect').selectedOptions).map(o=>o.value);
  const row = {
    type: document.getElementById('type').value,
    company: document.getElementById('companySelect').value,
    brand: document.getElementById('brandSelect').value,
    stores: stores.join(', '),
    salesTarget: document.getElementById('salesTarget').value,
    brandPercent: document.getElementById('brandPercent').value,
    brandAmount: document.getElementById('brandAmount').value,
    remarks: document.getElementById('remarks').value
  };
  const entries = getData('entries'); entries.push(row); setData('entries', entries);
  alert('Entry Saved');
}

function exportCSV(){
  const entries = getData('entries');
  if(!entries.length) return alert('No data');
  const headers = Object.keys(entries[0]);
  const csv = [headers.join(',')].concat(entries.map(r => headers.map(h => `"${r[h]||''}"`).join(','))).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'entries.csv';
  a.click();
}

function loadDashboard(){
  const entries = getData('entries');
  const tbl = document.getElementById('tbl');
  if(!tbl || !entries.length) return;
  const headers = Object.keys(entries[0]);
  tbl.innerHTML = '<tr>' + headers.map(h=>`<th>${h}</th>`).join('') + '</tr>';
  entries.forEach(r=>{
    tbl.innerHTML += '<tr>' + headers.map(h=>`<td>${r[h]||''}</td>`).join('') + '</tr>';
  });
}
