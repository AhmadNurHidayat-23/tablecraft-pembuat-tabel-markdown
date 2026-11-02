import { initialTable, resizeTable, toMarkdown, MAX_ROWS, MAX_COLUMNS, MAX_CELL_LENGTH } from './markdown';

let state = initialTable();
const table = document.querySelector('#visual-table');
const rowCount = document.querySelector('#row-count');
const columnCount = document.querySelector('#column-count');
const output = document.querySelector('#markdown-output');
const status = document.querySelector('#status');
const copyButton = document.querySelector('#copy-button');
let copyTimer;

function updateOutput() {
    output.textContent = toMarkdown(state);
}

function announce(message) {
    status.textContent = message;
}

function makeCell(value, row, column) {
    const cell = document.createElement(row === 0 ? 'th' : 'td');
    if (row === 0) cell.scope = 'col';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.maxLength = MAX_CELL_LENGTH;
    input.dataset.row = row;
    input.dataset.column = column;
    input.style.textAlign = state.alignments[column];
    input.setAttribute('aria-label', `${row === 0 ? 'Judul' : `Baris ${row + 1}`}, kolom ${column + 1}`);
    input.autocomplete = 'off';
    input.spellcheck = false;
    cell.append(input);
    return cell;
}

function render() {
    table.replaceChildren();
    const head = table.createTHead();
    const alignmentRow = head.insertRow();
    state.alignments.forEach((alignment, column) => {
        const cell = document.createElement('th');
        cell.scope = 'col';
        const select = document.createElement('select');
        select.dataset.column = column;
        select.setAttribute('aria-label', `Perataan kolom ${column + 1}`);
        [['left', '← Kiri'], ['center', '↔ Tengah'], ['right', 'Kanan →']].forEach(([value, label]) => {
            select.add(new Option(label, value, false, value === alignment));
        });
        cell.append(select);
        alignmentRow.append(cell);
    });
    const body = table.createTBody();
    state.cells.forEach((cells, row) => {
        const tableRow = (row === 0 ? head : body).insertRow();
        cells.forEach((value, column) => tableRow.append(makeCell(value, row, column)));
    });
    const rows = state.cells.length;
    const columns = state.alignments.length;
    rowCount.value = rows;
    columnCount.value = columns;
    document.querySelector('#dimensions').textContent = `${rows} baris × ${columns} kolom`;
    const limits = { 'add-row': rows >= MAX_ROWS, 'remove-row': rows <= 1,
        'add-column': columns >= MAX_COLUMNS, 'remove-column': columns <= 1 };
    Object.entries(limits).forEach(([action, disabled]) => {
        document.querySelector(`[data-action="${action}"]`).disabled = disabled;
    });
    updateOutput();
}

table.addEventListener('input', (event) => {
    const input = event.target;
    if (!input.matches('input[data-row]')) return;
    state.cells[Number(input.dataset.row)][Number(input.dataset.column)] = input.value;
    updateOutput();
});

table.addEventListener('change', (event) => {
    const select = event.target;
    if (!select.matches('select')) return;
    const column = Number(select.dataset.column);
    state.alignments[column] = select.value;
    table.querySelectorAll(`input[data-column="${column}"]`).forEach((input) => {
        input.style.textAlign = select.value;
    });
    updateOutput();
});

function resize(rows, columns) {
    try {
        resizeTable(state, rows, columns);
        render();
        announce(`Ukuran tabel: ${rows} baris dan ${columns} kolom.`);
    } catch (error) {
        rowCount.value = state.cells.length;
        columnCount.value = state.alignments.length;
        announce(error.message);
    }
}

[rowCount, columnCount].forEach((input) => {
    input.addEventListener('input', () => {
        if (rowCount.value && columnCount.value && rowCount.validity.valid && columnCount.validity.valid) {
            resize(Number(rowCount.value), Number(columnCount.value));
        }
    });
    input.addEventListener('change', () => {
        resize(Number(rowCount.value), Number(columnCount.value));
    });
});

document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const delta = action.startsWith('add') ? 1 : -1;
        resize(state.cells.length + (action.endsWith('row') ? delta : 0),
            state.alignments.length + (action.endsWith('column') ? delta : 0));
    });
});

copyButton.addEventListener('click', async () => {
    try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard');
        await navigator.clipboard.writeText(toMarkdown(state));
        clearTimeout(copyTimer);
        copyButton.textContent = '✓ Berhasil disalin';
        announce('Markdown berhasil disalin ke papan klip.');
        copyTimer = setTimeout(() => { copyButton.textContent = '▣ Salin Markdown'; }, 2200);
    } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(output);
        selection.removeAllRanges();
        selection.addRange(range);
        announce('Salin otomatis tidak tersedia. Kode telah dipilih; tekan ⌘C atau Ctrl+C untuk menyalin.');
        output.parentElement.focus();
    }
});

document.querySelector('#reset-button').addEventListener('click', () => {
    if (!window.confirm('Reset tabel ke contoh awal? Isi dan perataan Anda akan diganti.')) return;
    state = initialTable();
    render();
    announce('Tabel dikembalikan ke contoh awal.');
});

render();
