<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Buat tabel Markdown secara visual. Edit sel, atur perataan kolom, dan salin hasilnya. Gratis dan tanpa login.">
    <meta name="theme-color" content="#FFF5E9">
    <title>TableCraft — Pembuat Tabel Markdown</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<header class="site-header shell">
    <a class="brand" href="{{ route('home') }}" aria-label="TableCraft, beranda"><span class="brand-icon" aria-hidden="true">▦</span> tablecraft<span class="brand-dot">.</span></a>
    <nav aria-label="Navigasi utama"><a href="#editor">Editor tabel <span aria-hidden="true">↗</span></a><span class="header-note">Tanpa login. Langsung bikin.</span></nav>
</header>
<main class="shell">
    <section class="hero" aria-labelledby="headline">
        <p class="eyebrow"><span aria-hidden="true">✳</span> IDE RAPI, TABEL SIAP.</p>
        <h1 id="headline">Buat Tabel Markdown dengan Mudah.</h1>
        <p class="hero-description">Susun tabel secara visual dan hasilkan kode Markdown dalam hitungan detik.</p>
        <div class="hero-notes"><span><i class="dot mint"></i>Gratis digunakan</span><span><i class="dot coral"></i>Tanpa database</span><span><i class="dot blue"></i>Hasil real-time</span></div>
    </section>
    <section id="editor" class="workspace" aria-label="Pembuat tabel Markdown">
        <div class="panel editor-panel">
            <div class="panel-heading"><div><p class="step">01 / SUSUN TABEL</p><h2>Ruang kreasi Anda</h2></div><span class="pill" id="dimensions">4 baris × 3 kolom</span></div>
            <div class="size-controls">
                <label>Baris <input id="row-count" type="number" min="1" max="20" value="4" inputmode="numeric" aria-describedby="limits"></label>
                <span class="multiply" aria-hidden="true">×</span>
                <label>Kolom <input id="column-count" type="number" min="1" max="10" value="3" inputmode="numeric" aria-describedby="limits"></label>
                <p id="limits">Maks. 20 × 10<br>Termasuk baris judul</p>
            </div>
            <div class="table-scroll" tabindex="0" role="region" aria-label="Tabel yang dapat diedit dan digeser"><table id="visual-table" aria-label="Editor isi tabel"></table></div>
            <div class="table-actions">
                <div role="group" aria-label="Pengaturan baris"><button type="button" data-action="add-row">＋ Baris</button><button type="button" data-action="remove-row" aria-label="Hapus baris terakhir">−</button></div>
                <div role="group" aria-label="Pengaturan kolom"><button type="button" data-action="add-column">＋ Kolom</button><button type="button" data-action="remove-column" aria-label="Hapus kolom terakhir">−</button></div>
            </div>
            <p class="editor-hint"><span aria-hidden="true">↳</span> Klik sel untuk mengedit. Atur perataan di atas setiap kolom.</p>
        </div>
        <div class="panel result-panel">
            <div class="panel-heading"><div><p class="step">02 / AMBIL HASILNYA</p><h2>Markdown Anda</h2></div><span class="live"><i class="dot"></i> Otomatis</span></div>
            <div class="code-top"><span><span aria-hidden="true">&lt;/&gt;</span> markdown</span><span>.md</span></div>
            <pre class="code-output" tabindex="0" aria-label="Kode Markdown"><code id="markdown-output"></code></pre>
            <div class="result-actions"><button type="button" id="copy-button" class="primary"><span aria-hidden="true">▣</span> Salin Markdown</button><button type="button" id="reset-button" class="reset">↺ Reset Tabel</button></div>
            <p class="result-hint">Siap ditempel ke README, dokumentasi, atau catatan Anda.</p>
        </div>
    </section>
    <div class="workspace-bottom"><p><span aria-hidden="true">✦</span> Sedikit klik. Tabel lebih rapi.</p><p>Isi tabel diproses di browser Anda.</p></div>
    <p id="status" class="status" role="status" aria-live="polite"></p>
    <noscript><p class="status">Aktifkan JavaScript untuk menggunakan editor tabel.</p></noscript>
</main>
<footer class="shell"><p>TableCraft — Pembuat Tabel Markdown.</p><span>Dibuat untuk merapikan ide Anda <span aria-hidden="true">↗</span></span></footer>
</body>
</html>
