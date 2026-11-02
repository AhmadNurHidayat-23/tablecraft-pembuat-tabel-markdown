import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTable, resizeTable, toMarkdown, escapeCell } from '../../resources/js/markdown.js';

test('menghasilkan tabel dengan judul dan pemisah yang valid', () => {
    const state = initialTable();
    const lines = toMarkdown(state).split('\n');
    assert.equal(lines.length, 5);
    assert.equal(lines[0], '| Nama | Peran | Status |');
    assert.equal(lines[1], '| :--- | :--- | :--- |');
});

test('menambah dan menghapus dimensi sambil mempertahankan sel dan perataan', () => {
    const state = initialTable();
    state.alignments[0] = 'right';
    resizeTable(state, 20, 10);
    assert.equal(state.cells.length, 20);
    assert.equal(state.cells[19].length, 10);
    assert.equal(state.cells[0][0], 'Nama');
    assert.equal(state.cells[19][9], '');
    assert.equal(state.alignments[0], 'right');
    resizeTable(state, 1, 1);
    assert.deepEqual(state.cells, [['Nama']]);
    assert.equal(toMarkdown(state), '| Nama |\n| ---: |');
});

test('menolak dimensi kosong, pecahan, dan di luar batas', () => {
    for (const [rows, columns] of [[0, 1], [21, 1], [1, 0], [1, 11], [1.5, 1], [NaN, 2]]) {
        assert.throws(() => resizeTable(initialTable(), rows, columns), RangeError);
    }
});

test('alignment kiri, tengah, kanan sesuai sintaks Markdown', () => {
    const state = initialTable();
    state.alignments = ['left', 'center', 'right'];
    assert.equal(toMarkdown(state).split('\n')[1], '| :--- | :---: | ---: |');
});

test('mengamankan pipe, backslash, markup, HTML, dan baris baru', () => {
    assert.equal(escapeCell('A|B'), 'A\\|B');
    assert.equal(escapeCell('C:\\tmp'), 'C:\\\\tmp');
    assert.equal(escapeCell('*tebal* _x_ `kode` [a] ~~b~~'), '\\*tebal\\* \\_x\\_ \\`kode\\` \\[a\\] \\~\\~b\\~\\~');
    assert.equal(escapeCell('<script>&\r\nbaru'), '&lt;script&gt;&amp;<br>baru');
    assert.equal(escapeCell('a'.repeat(501)).length, 500);
});

test('reset membuat salinan awal yang independen', () => {
    const first = initialTable();
    first.cells[0][0] = 'Berubah';
    first.alignments[0] = 'center';
    assert.equal(initialTable().cells[0][0], 'Nama');
    assert.equal(initialTable().alignments[0], 'left');
});
