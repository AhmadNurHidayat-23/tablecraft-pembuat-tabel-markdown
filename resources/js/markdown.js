export const MAX_ROWS = 20;
export const MAX_COLUMNS = 10;
export const MAX_CELL_LENGTH = 500;

export function initialTable() {
    return {
        cells: [
            ['Nama', 'Peran', 'Status'],
            ['Alya', 'Desainer', 'Selesai'],
            ['Bima', 'Pengembang', 'Dikerjakan'],
            ['Citra', 'Penulis', 'Selesai'],
        ],
        alignments: ['left', 'left', 'left'],
    };
}

export function resizeTable(state, rows, columns) {
    if (!Number.isInteger(rows) || !Number.isInteger(columns)
        || rows < 1 || rows > MAX_ROWS || columns < 1 || columns > MAX_COLUMNS) {
        throw new RangeError('Gunakan 1–20 baris dan 1–10 kolom.');
    }
    state.cells = Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, column) => state.cells[row]?.[column] ?? ''));
    state.alignments = Array.from({ length: columns }, (_, column) => state.alignments[column] ?? 'left');
}

export function escapeCell(value) {
    return String(value).slice(0, MAX_CELL_LENGTH)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\r\n|\r|\n/g, '<br>')
        .replace(/\\/g, '\\\\')
        .replace(/([|`*_\[\]~])/g, '\\$1');
}

export function toMarkdown(state) {
    const line = (cells) => `| ${cells.map(escapeCell).join(' | ')} |`;
    const separators = { left: ':---', center: ':---:', right: '---:' };
    return [
        line(state.cells[0]),
        `| ${state.alignments.map((alignment) => separators[alignment] ?? ':---').join(' | ')} |`,
        ...state.cells.slice(1).map(line),
    ].join('\n');
}
